import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './specs',
  outputDir: '../.tmp/test-results-visual',
  snapshotPathTemplate: './snapshots/{projectName}_{platform}/{testFileDir}/{arg}.png',
  reporter: [['list'], ['html', { outputFolder: '../.tmp/report-visual', open: 'never' }]],
  fullyParallel: true,
  grep: /@visual/,
  timeout: 60 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'https://demoqa.com/',
    trace: { mode: 'retain-on-failure', sources: true },
    ignoreHTTPSErrors: true,
    screenshot: { mode: 'only-on-failure', fullPage: true },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } },
    },
  ],
});
