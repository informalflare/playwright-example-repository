import { TestInfo, Locator } from '@playwright/test';

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      /**
       * Ensures the page is accessible according to configuration from "playwright.config.ts".
       *
       * If results of scanning contain violations details of the violations will be attached to general report.
       *
       * ```js
       * await expect(page).toBeAccessible(testInfo);
       * await expect(page).toBeAccessible(testInfo, 'css_selector');
       * await expect(page).toBeAccessible(testInfo, locator);
       * ```
       *
       * @param testInfo TestInfo contains information about the currently running test.
       * @param include Playwright type Locator or string as CSS selector of page part for including to scanning. In not put it will be used selector from configuration.
       */
      toBeAccessible(testInfo: TestInfo, include?: Locator | string): Promise<R>;
    }
  }
}
