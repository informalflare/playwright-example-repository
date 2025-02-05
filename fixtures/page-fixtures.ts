import * as po from '@pages';
import { Mocker } from '../src/ui/utils/mocker';
import { test as base } from '@playwright/test';

export interface PageFixtures {
  mocker: Mocker; //this one fakes the responses

  //EXAMPLE
  practiceForm: po.PracticeForm;
  textBox: po.TextBoxPo;
}
export const pageFixtures = base.extend<PageFixtures>({
  mocker: async ({ page }, use) => {
    await use(new Mocker(page));
  },

  //EXAMPLE fixtures
  practiceForm: async ({ page }, use) => {
    await use(new po.PracticeForm(page));
  },
  textBox: async ({ page }, use) => {
    await use(new po.TextBoxPo(page));
  },
});
