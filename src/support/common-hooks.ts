import config from '../../config';
import { ICustomWorld } from './custom-world';
import { AllPagesObject } from '../pages/all-pages-object';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  LaunchOptions,
  webkit,
  WebKitBrowser,
} from 'playwright';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser; //change to your favorite browser
    }
  }
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : config.defaultTimeout);

const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
};

BeforeAll(async function () {
  switch (process.env.BROWSER) {
    case 'firefox':
      global.browser = await firefox.launch(browserOptions);
      break;
    case 'webkit':
      global.browser = await webkit.launch(browserOptions);
      break;
    default:
      global.browser = await chromium.launch(browserOptions);
  }
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await global.browser.newContext({
    acceptDownloads: true,
    recordVideo: config.recordVideos ? { dir: 'screenshots' } : undefined,
  });
  this.page = await this.context.newPage();
  this.pagesObj = new AllPagesObject(this.page, this.context);
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}}s`);

    if (result.status === Status.FAILED) {
      const image = await this.pagesObj?.basePage.screenshot(`${this.feature?.name}`);
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await global.browser.close();
});