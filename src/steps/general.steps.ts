import { ICustomWorld } from '../support/custom-world';
import { compareToBaseImage } from '../utils/compareImages';
import { Then } from '@cucumber/cucumber';
import { join } from 'path';

Then('Snapshot {string}', async function (this: ICustomWorld, name: string) {
  const { page } = this;
  await page?.screenshot({ path: join('screenshots', `${name}.png`) });
});

Then('Snapshot', async function (this: ICustomWorld) {
  const { page } = this;
  const image = await page?.screenshot();
  image && (await this.attach(image, 'image/png'));
});

Then('debug', async function () {
  // eslint-disable-next-line no-debugger
  debugger;
});

Then(
  /^the screen matches the base image(?: with timeout of (\d+))?$/,
  async function (this: ICustomWorld, timeout) {
    if (timeout) await this.page?.waitForTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const screenshot = await this.page!.screenshot();
    await compareToBaseImage(screenshot as Buffer, this);
  },
);
