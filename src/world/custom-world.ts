import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { messages } from '@cucumber/messages';
import { BrowserContext, Page } from 'playwright';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export class CustomWorld extends World {
  public foo = false;
  public debug = false;
  public feature: messages.IPickle | undefined;
  public context: BrowserContext | undefined;
  public page: Page | undefined;
  /**
   *
   */
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
