import { ICustomWorld } from '../support/custom-world';
import { compareToBaseImage, getImagePath } from '../utils/compareImages';
import { Then } from '@cucumber/cucumber';
import percySnapshot from '@percy/playwright';

Then('Snapshot {string}', async function (this: ICustomWorld, name: string) {
  const { page } = this;
  await page?.screenshot({ path: getImagePath(this, name) });
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

Then('Screen matches the base image {string}', async function (this: ICustomWorld, name: string) {
  const screenshot = await this.page!.screenshot({ animations: 'disabled' });
  await compareToBaseImage(this, name, screenshot as Buffer);
});

Then('Compare screen {string}', async function (this: ICustomWorld, name: string) {
  await percySnapshot(this.page, name);
});
