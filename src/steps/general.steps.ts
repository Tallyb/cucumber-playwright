import { CustomWorld } from '../world';
import { Then } from '@cucumber/cucumber';

Then('Snapshot {string}', async function (this: CustomWorld, name: string) {
  const { page } = this;
  await page?.screenshot({ path: `screenshots/${name}.png` });
});

Then('debug', async function () {
  // eslint-disable-next-line no-debugger
  debugger;
});
