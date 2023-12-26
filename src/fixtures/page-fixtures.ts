import * as po from '../po/pages';
import { Mocker } from '../utils/mocker';
import {CommonFixtures, UseFunction} from "@fixtures";

export interface PageFixtures {
  mocker: Mocker; //this one fakes the responses

  //EXAMPLE
  practiceForm: po.PracticeForm;
  textBox: po.TextBoxPo;
}
export const pageFixtures = {
  mocker: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new Mocker(page));
  },

  //EXAMPLE fixtures
  practiceForm: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new po.PracticeForm(page));
  },
  textBox: async ({ page }: CommonFixtures, use: UseFunction) => {
    await use(new po.TextBoxPo(page));
  },
};
