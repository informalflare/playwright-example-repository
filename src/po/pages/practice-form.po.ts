import { BasePage } from '../base-page.po';
import {Locator, Page} from '@playwright/test';

export class PracticeForm extends BasePage {
  constructor(page:Page) {
    super(page,'/automation-practice-form');
  }

  readonly policyBtns: Locator = this.$('button[data-testid*="test"]');

  // async addUserData(userData: UserData): Promise<void> {
  //
  // }
}
