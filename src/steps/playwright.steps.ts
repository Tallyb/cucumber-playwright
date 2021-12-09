import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import expect from 'expect';

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const { page } = this;
  await page?.goto(config.BASE_URL);
  await page?.waitForSelector('nav >> a >> text="Playwright"');
});

When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = this.page!;
  const current = await page.getAttribute('html', 'data-theme');
  if (current !== mode) {
    await page.click('nav >> div:has(input[type="checkbox"]) >> div[role="button"]');
  }
  await page.waitForSelector(`html[data-theme=${mode}]`);
});

Then('We see {string} mode', async function (this: ICustomWorld, mode: string) {
  const { page } = this;
  const theme = await page?.getAttribute('html', 'data-theme');
  expect(theme).toEqual(mode);
});
