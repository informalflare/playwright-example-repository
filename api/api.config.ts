import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'specs',
  outputDir: '.tmp/test-results',
  reporter: [['list'], ['html', { outputFolder: '.tmp/report' }]],
  fullyParallel: true,
  timeout: 60 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    trace: { mode: 'retain-on-failure', sources: true },
  },

  projects: [
    {
      name: 'api',
      dependencies: ['api-setup'],
      use: {
        extraHTTPHeaders: { Cookie: `token=${process.env.TOKEN}` },
        trace: 'on-all-retries',
        ignoreHTTPSErrors: true,
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'api-setup',
      testMatch: /global\.api\.setup\.ts/,
      use: {
        // extraHTTPHeaders:''
        trace: 'on-all-retries',
        ignoreHTTPSErrors: true,
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
  ],
});
