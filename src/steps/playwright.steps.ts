import { ICustomWorld } from '../support/custom-world';
import { Given, When, Then } from '@cucumber/cucumber';

Given('I go to the playwright website', async function (this: ICustomWorld) {
  await this.pagesObj?.homePage.goToHomePage();
});

When('I change the theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  await this.pagesObj?.homePage.changeThemeTo(mode);
});

Then(
  'I see the background color {string}',
  async function (this: ICustomWorld, backgroundColor: string) {
    await this.pagesObj?.homePage.expectBackgroundColor(backgroundColor);
  },
);
