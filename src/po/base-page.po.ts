import { Locator, Page } from '@playwright/test';
export abstract class BasePage {
  page: Page;
  url: string;
  constructor(page: Page, url = '') {
    this.page = page;
    this.url = url;
  }

  async pause() {
    await this.page.pause();
  }
  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }
  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  $(selector: string): Locator {
    return this.page.locator(selector);
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url || '', { waitUntil: 'load' });
  }
  protected getRoot(identifier: string | RegExp | number, el: Locator): Locator {
    return typeof identifier === 'number' ? el.nth(identifier) : el.filter({ hasText: identifier });
  }
}
