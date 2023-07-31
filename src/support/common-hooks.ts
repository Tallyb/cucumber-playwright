import { ICustomWorld } from './custom-world';
import { config } from './config';
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import {
  chromium,
  ChromiumBrowser,
  firefox,
  FirefoxBrowser,
  webkit,
  WebKitBrowser,
  ConsoleMessage,
  request,
  Response,
} from '@playwright/test';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { ensureDir } from 'fs-extra';
import { DigyRunner } from '@digy4/digyrunner-tallyb/types';

let browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
const tracesDir = 'traces';
const DIGY_RUNNER = new DigyRunner();

declare global {
  // eslint-disable-next-line no-var
  var browser: ChromiumBrowser | FirefoxBrowser | WebKitBrowser;
}

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

BeforeAll(async function () {
  switch (config.browser) {
    case 'firefox':
      browser = await firefox.launch(config.browserOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(config.browserOptions);
      break;
    default:
      browser = await chromium.launch(config.browserOptions);
  }
  await ensureDir(tracesDir);
  await DIGY_RUNNER.init(config);
});

Before({ tags: '@ignore' }, async function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'skipped' as any;
});

Before({ tags: '@debug' }, async function (this: ICustomWorld) {
  this.debug = true;
});

Before(async function (this: ICustomWorld, { pickle }: ITestCaseHookParameter) {
  this.startTime = new Date();
  this.testName = pickle.name.replace(/\W/g, '-');
  // customize the [browser context](https://playwright.dev/docs/next/api/class-browser#browsernewcontextoptions)
  this.context = await browser.newContext({
    acceptDownloads: true,
    recordVideo: process.env.PWVIDEO ? { dir: 'screenshots' } : undefined,
    viewport: { width: 1200, height: 800 },
    logger: {
      isEnabled: () => true,
      log: (name, severity, message) => {
        DIGY_RUNNER.captureDriverLog(
          this.testName,
          `Type=${name}, Level=${severity}, Message=${message}\n`,
        );
      },
    },
  });
  this.server = await request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: config.BASE_API_URL,
  });

  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.page.on('console', async (msg: ConsoleMessage) => {
    if (msg.type() === 'log') {
      await this.attach(msg.text());
    }
    await DIGY_RUNNER.captureConsoleLog(this.testName, msg);
  });
  this.page.on('response', async (response: Response) => {
    await DIGY_RUNNER.captureNetworkLog(this.testName, response);
  });
  this.feature = pickle;
});

After(async function (this: ICustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}s`);

    if (result.status !== Status.PASSED) {
      const image = await this.page?.screenshot();

      // Replace : with _ because colons aren't allowed in Windows paths
      const timePart = this.startTime?.toISOString().split('.')[0].replaceAll(':', '_');

      image && (await this.attach(image, 'image/png'));
      await this.context?.tracing.stop({
        path: `${tracesDir}/${this.testName}-${timePart}trace.zip`,
      });
    }
  }
  await DIGY_RUNNER.sendResult(result, this.page, this.context, this.testName);
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
  await DIGY_RUNNER.finish();
});
