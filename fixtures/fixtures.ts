import { mergeTests, PlaywrightTestArgs, PlaywrightTestOptions } from '@playwright/test';
import { pageFixtures, PageFixtures } from './page-fixtures';
import { apiFixtures, APIFixtures } from './api-fixtures';
import { settingsFixture, TestOptions } from './settings-fixture';

export type CommonFixtures = PageFixtures &
  ConfigurationFixtures &
  PlaywrightTestArgs &
  PlaywrightTestOptions &
  APIFixtures &
  TestOptions;
//@ts-ignpre
export type UseFunction = (...args: any[]) => Promise<void>;

export interface ConfigurationFixtures {
  config: {
    baseUrl: string;
  };
}

export const test = mergeTests(settingsFixture, pageFixtures, apiFixtures);

export const expect = test.expect;
