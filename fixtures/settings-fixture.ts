import { test as base } from '@playwright/test';
require('dotenv').config();

export type TestOptions = {
  apiKey: string;
  filengy: boolean;
};

export const settingsFixture = base.extend<TestOptions>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  apiKey: [process.env.API_KEY, { option: true }], //default value
  filengy: true, //essential for settings
});
