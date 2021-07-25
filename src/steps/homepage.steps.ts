import { ICustomWorld } from '../support/custom-world';
import { Given, When } from '@cucumber/cucumber';

Given('Go to playwright website', async function (this: ICustomWorld) {
  const { page } = this;
  await page?.goto('https://playwright.dev');
  await page?.waitForSelector('nav >> a >> text="Playwright"');
});

When('Change the theme to {string}', async function (this: ICustomWorld, mode: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = this.page!;
  const current = await page.getAttribute('html', 'data-theme');
  if (current !== mode) {
    await page.click('.navbar >> .react-toggle');
  }
  await page.waitForSelector(`html[data-theme=${mode}]`);
  await this.attach(`New theme mode: ${mode}`);
});
