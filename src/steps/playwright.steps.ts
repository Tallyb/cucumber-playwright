import { CustomWorld } from '../world';
import { Given, When } from '@cucumber/cucumber';

Given('Go to the playwright docs website', async function (this: CustomWorld) {
  const { page } = this;
  await page?.goto('https://playwright.dev/docs/intro');
});

When('Enter search term {string}', async function (this: CustomWorld, term: string) {
  const { page } = this;
  await page?.fill('input[placeholder="Search"]', term);
  await page?.waitForSelector('[id*=searchBar]');
});
