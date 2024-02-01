import { PlaywrightTestArgs, PlaywrightTestOptions, test as baseTest } from '@playwright/test';
import { pageFixtures, PageFixtures } from './page-fixtures';
import { apiClientFixtures, APIFixtures } from './api-fixtures';

export type CommonFixtures = PageFixtures & ConfigurationFixtures & PlaywrightTestArgs & PlaywrightTestOptions & APIFixtures;
//@ts-ignpre
export type UseFunction = (...args: any[]) => Promise<void>;

export interface ConfigurationFixtures {
  config: {
    baseUrl: string;
  };
}

export const test = baseTest.extend<CommonFixtures>({
  ...pageFixtures,
  ...apiClientFixtures,
});

export const expect = test.expect;
