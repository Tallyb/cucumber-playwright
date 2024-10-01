import { ICustomWorld } from '../support/custom-world';
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { v4 } from 'uuid';

Given('Go to the conduit website', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto('https://demo.realworld.how');
  await expect(page.locator('app-home-page').locator('.logo-font')).toHaveText('conduit');
});

Given('User signs up', async function (this: ICustomWorld) {
  const page = this.page!;
  this.username = `test-${v4().slice(0, 6)}`;
  await page.getByText('Sign up').click();
  await expect(page.locator('app-auth-page').locator('h1')).toHaveText('Sign up');
  await page.getByPlaceholder('Username').fill(this.username);
  await page.getByPlaceholder('Email').fill(`${this.username}@example.com`);
  await page.getByPlaceholder('Password').fill('test123456');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.locator('app-layout-header').locator('nav')).toContainText(this.username);
});
