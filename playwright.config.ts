import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/specs',
  outputDir:'.tmp/test-results',
  reporter: [['list'], ['html', { outputFolder: '.tmp/report'}]],
  fullyParallel: true,
  timeout: 60 * 1000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'https://demoqa.com/',
    trace: { mode: 'retain-on-failure', sources: true },
    screenshot: { mode: 'only-on-failure', fullPage: true },
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        viewport:{width:1440, height:1000},
        storageState: 'src/state.json',},
      // dependencies: ['setup'], //uncomment this line if you will be using setup(authentication)
      // https://playwright.dev/docs/test-global-setup-teardown
    },
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      use: { ...devices['Desktop Chrome']},
    },
  ],
});
