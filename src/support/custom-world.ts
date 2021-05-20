import { AllPagesObject } from '../pages/all-pages-object';
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { messages } from '@cucumber/messages';
import { BrowserContext, Page } from 'playwright';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  debug: boolean;
  feature?: messages.IPickle;
  context?: BrowserContext;
  page?: Page;
  pagesObj?: AllPagesObject;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  debug = false;
}

setWorldConstructor(CustomWorld);
