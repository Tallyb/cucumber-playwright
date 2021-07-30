import { ICustomWorld } from '../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';
import expect from 'expect';

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const { page } = this;
  await page?.goto('https://playwright.dev');
  await page?.waitForSelector('nav >> a >> text="Playwright"');
});

When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = this.page!;
  const current = await page.getAttribute('html', 'data-theme');
  if (current !== mode) {
    await page.click('.navbar >> .react-toggle');
  }
  await page.waitForSelector(`html[data-theme=${mode}]`);
});

Then('We see {string} mode', async function (this: ICustomWorld, mode: string) {
  const { page } = this;
  const theme = await page?.getAttribute('html', 'data-theme');
  expect(theme).toEqual(mode);
});
