import { ICustomWorld } from '../support/custom-world';
import { config } from '../support/config';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('Go to the playwright website', async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto(config.BASE_URL);
  // Updated selector to use the navbar title which contains "Playwright"
  await page.locator('.navbar__title >> text="Playwright"').waitFor();
});

When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  const html = page.locator('html');
  const toggleButton = page.locator('.toggleButton_gllP');

  // Get current theme state
  const currentThemeChoice = await html.getAttribute('data-theme-choice');

  // If we're already in the desired mode, no need to change
  if (currentThemeChoice === mode) {
    return;
  }

  // The theme toggle cycles through: system -> light -> dark -> system
  // We need to click until we reach the desired mode
  let attempts = 0;
  const maxAttempts = 3; // Maximum clicks to cycle through all states

  while (attempts < maxAttempts) {
    const currentChoice = await html.getAttribute('data-theme-choice');
    if (currentChoice === mode) {
      break; // We've reached the desired mode
    }

    // Click the theme toggle button
    await toggleButton.click();

    // Wait a moment for the theme to change
    await page.waitForTimeout(500);

    attempts++;
  }

  // Verify the theme has been set correctly
  await expect(page.locator('html')).toHaveAttribute('data-theme-choice', mode, { timeout: 10000 });

  // Also verify that data-theme matches (it should always match data-theme-choice)
  await expect(page.locator('html')).toHaveAttribute('data-theme', mode, { timeout: 10000 });
});

Then('We see {string} mode', async function (this: ICustomWorld, mode: string) {
  const page = this.page!;
  // Verify both theme attributes are set correctly
  await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
  await expect(page.locator('html')).toHaveAttribute('data-theme-choice', mode);
});
