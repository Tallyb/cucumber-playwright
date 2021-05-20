import config from '../../config';
import { Page, BrowserContext } from 'playwright';
import expect from 'expect';
import { join } from 'path';

export class BasePage {
  page: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  public get expect() {
    return expect;
  }

  public goto(optionalUrl?: string): Promise<any> {
    const pageToGoTo = optionalUrl ? (config.baseUrl += optionalUrl) : config.baseUrl;

    return this.page.goto(pageToGoTo);
  }

  public screenshot(name: string): Promise<Buffer> | undefined {
    return this.page.screenshot({ path: join('screenshots', `${name}.png`) });
  }
}