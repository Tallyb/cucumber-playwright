import { ICustomWorld } from '../support/custom-world';
import { Then } from '@cucumber/cucumber';

Then('Snapshot {string}', async function (this: ICustomWorld, name: string) {
  await this.pagesObj?.basePage.screenshot(name);
});

Then('Snapshot', async function (this: ICustomWorld) {
  const image = await this.page?.screenshot();
  image && (await this.attach(image, 'image/png'));
});

Then('debug', async function () {
  // eslint-disable-next-line no-debugger
  debugger;
});
