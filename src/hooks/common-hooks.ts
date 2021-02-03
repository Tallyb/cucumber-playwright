import { CustomWorld } from '../world';
import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, ChromiumBrowser, LaunchOptions } from 'playwright';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      browser: ChromiumBrowser;
    }
  }
}

const browserOptions: LaunchOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
};

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: CustomWorld) {
  this.debug = true;
});

BeforeAll(async function () {
  global.browser = await chromium.launch(browserOptions);
});

AfterAll(async function () {
  await global.browser.close();
});

Before(async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  this.context = await global.browser.newContext();
  this.page = await this.context.newPage();
  this.feature = pickle;
});

//{pickle, gherkinDocument, result, testCaseStartedId}
After(async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();
      image && (await this.attach(image, 'image/png'));
    }
  }
  await this.page?.close();
  await this.context?.close();
  await global.browser.close();
});
