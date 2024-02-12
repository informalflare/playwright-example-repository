import { Locator, Page } from '@playwright/test';
import { isLocator } from '../utils/general-utils';

export abstract class BaseElement {
  root: Locator | Page;
  page: Page;
  constructor(root: Locator | Page) {
    this.root = root;
    this.page = isLocator(root) ? (root as Locator).page() : (root as Page);
  }

  $(selector: string): Locator {
    return this.root.locator(selector);
  }

  protected getElement(identifier: string | number, el: Locator): Locator {
    return typeof identifier === 'number' ? el.nth(identifier) : el.filter({ hasText: identifier });
  }
}
