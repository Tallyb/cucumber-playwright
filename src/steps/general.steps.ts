import { ICustomWorld } from '../support/custom-world';
import { Then } from '@cucumber/cucumber';
import { join } from 'path';

Then('Snapshot {string}', async function (this: ICustomWorld, name: string) {
  await this.pagesObj?.basePage.screenshot(name);
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
