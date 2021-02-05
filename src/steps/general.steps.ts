import { CustomWorld } from '../support';
import { Then } from '@cucumber/cucumber';

Then('Snapshot {string}', async function (this: CustomWorld, name: string) {
  const { page } = this;
  await page?.screenshot({ path: `screenshots/${name}.png` });
});

Then('Snapshot', async function (this: CustomWorld) {
  const { page } = this;
  const image = await page?.screenshot();
  image && (await this.attach(image, 'image/png'));
});

Then('debug', async function () {
  // eslint-disable-next-line no-debugger
  debugger;
});
