import { LaunchOptions } from 'playwright';
const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

export const config = {
  browserOptions,
  browser: process.env.BROWSER || 'chromium',
  BASE_URL: 'https://playwright.dev',
  IMG_THRESHOLD: { threshold: 0.4 },
};
