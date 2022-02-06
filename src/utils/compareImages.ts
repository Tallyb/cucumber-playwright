import { config } from '../support/config';
import { ICustomWorld } from '../support/custom-world';
import { ensureFile, pathExists } from 'fs-extra';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import * as fs from 'fs';
import { writeFileSync } from 'fs';

/**
 * Compares a screenshot to a base image,
 * if the base image doesn't exist it fails the test but creates a new base image based on
 * the screenshot passed so it can be used on the next run.
 * @param screenshot a playwright screenshot
 * @param customWorld needed to create the base image path
 * @param threshold the difference threshold
 */
export async function compareToBaseImage(
  screenshot: Buffer,
  customWorld: ICustomWorld,
  threshold?: { threshold: number },
) {
  let baseImage;
  const testNameWithoutDate = customWorld.testName?.replace(
    /-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}/,
    '',
  );
  const baseImagePath = `screenshots/${customWorld.feature?.uri}/${process.platform}/${config.browser}/${testNameWithoutDate}.png`;
  const baseImgExist = await pathExists(baseImagePath);
  if (baseImgExist) {
    baseImage = PNG.sync.read(fs.readFileSync(baseImagePath));
  } else {
    await ensureFile(baseImagePath);
    writeFileSync(baseImagePath, screenshot);
    throw new Error(
      `The base Image doesn't exist, a screenshot was taken to ${baseImagePath} so it can be used for next run`,
    );
  }
  const img1 = PNG.sync.read(screenshot);
  const difference = getDifference(img1, baseImage, threshold);
  await reportDifference(difference, customWorld);
}

/**
 * Returns the difference between 2 images
 * @param img1
 * @param img2
 * @param threshold the difference threshold
 */
export function getDifference(img1: PNG, img2: PNG, threshold = config.IMG_THRESHOLD) {
  const { width, height } = img2;
  const diff = new PNG({ width, height });
  const difference = pixelmatch(img1.data, img2.data, diff.data, width, height, threshold);
  if (difference > 0) {
    return PNG.sync.write(diff);
  }
  return undefined;
}

/**
 * If there's any difference adds a screenshots showing them to the cucumber report and fails the test
 * @param difference
 * @param customWorld
 */
function reportDifference(difference: Buffer | undefined, customWorld: ICustomWorld) {
  if (difference) {
    customWorld.attach(difference, 'image/png;base64');
    throw new Error('Images are not matching');
  }
}
