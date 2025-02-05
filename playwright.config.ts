import { defineConfig, devices, Locator, Page, TestInfo } from '@playwright/test';
import { CommonFixtures, expect } from '@fixtures';
import { AccessibilityScanner } from './src/ui/utils/accessibility-scanner';

require('dotenv').config();

export default defineConfig<CommonFixtures>({
  outputDir: '.tmp/test-results',
  reporter: [['list'], ['allure-playwright'], ['html', { outputFolder: '.tmp/report', open: 'never' }]],
  fullyParallel: true,
  timeout: 60 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  snapshotPathTemplate: 'src/ui/snapshots/{projectName}_{platform}/{testFileDir}/{arg}.png',
  use: {
    ignoreHTTPSErrors: true,
    trace: { mode: 'retain-on-failure', sources: true },
    screenshot: { mode: 'only-on-failure', fullPage: true },
  },
  projects: [
    {
      name: 'ui-main',
      testDir: 'tests/ui',
      use: {
        baseURL: 'https://demoqa.com/',
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 1000 },
        storageState: 'src/ui/state.json',
      },
      dependencies: ['ui-setup'], //uncomment this line if you will be using setup(authentication)
      // https://playwright.dev/docs/test-global-setup-teardown
    },
    {
      name: 'ui-setup',
      testDir: 'tests/ui',
      testMatch: /ui\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demoqa.com/' },
    },
    {
      name: 'api-main',
      dependencies: ['api-setup'],
      testDir: 'tests/api',
      use: {
        trace: 'on-all-retries',
        ignoreHTTPSErrors: true,
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'api-setup',
      testDir: 'tests/api',
      testMatch: /global\.api\.setup\.ts/,
      use: {
        trace: 'on-all-retries',
        ignoreHTTPSErrors: true,
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'visual',
      grep: /@visual/,
      testDir: 'tests/ui',
      use: {
        baseURL: 'https://demoqa.com/',
        trace: { mode: 'retain-on-failure', sources: true },
        ignoreHTTPSErrors: true,
        screenshot: { mode: 'only-on-failure', fullPage: true },
      },
    },
  ],
});
expect.extend({
  /**
   * Ensures the page is accessible according to configuration.
   *
   * If result of scanning have violations details of the violations will be attached to general report.
   *
   * ```js
   * await expect(page).toBeAccessible(testInfo);
   * await expect(page).toBeAccessible(testInfo, 'html_tag');
   * await expect(page).toBeAccessible(testInfo, 'css_selector');
   * await expect(page).toBeAccessible(testInfo, locator);
   * ```
   *
   * @param page Page provides methods to interact with a single tab.
   * @param testInfo TestInfo contains information about the currently running test.
   * @param include Playwright type Locator or string as CSS selector of page part for including to scanning. If not put it will be used selector from configuration.
   */
  async toBeAccessible(page: Page, testInfo: TestInfo, include: Locator | string = 'body') {
    const a11yScanner = new AccessibilityScanner(page);
    await a11yScanner.scanPage(include);

    if (a11yScanner.scanResults.violations.length === 0) {
      return {
        message: () => 'pass',
        pass: true,
      };
    } else {
      await a11yScanner.highlightViolations();

      await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(a11yScanner.generateViolationsReport(), null, 2),
        contentType: 'application/json',
      });
      return {
        message: () => a11yScanner.generateShortReport(),
        pass: false,
      };
    }
  },
});
