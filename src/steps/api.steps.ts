import { ICustomWorld } from '../support/custom-world';
import { expect } from '@playwright/test';
import { Given } from '@cucumber/cucumber';

Given('A cat fact is recieved', async function (this: ICustomWorld) {
  const response = await this.server?.get('facts');
  expect(response).toBeDefined();
});
