import { BasePage } from '../base-page.po';
import { Locator, Page } from '@playwright/test';
import { SimpleInputEl } from '@elements';
import { BaseElement } from '../base-element.po';
import { UserFormData } from '@interfaces';
import { step } from '../../utils/step-helper';

export class TextBoxPo extends BasePage {
  constructor(page: Page) {
    super(page, '/text-box'); //we define URLs here
  }
  //Without Page Elements
  readonly userName: Locator = this.$('input[id="userName"]');
  readonly email: Locator = this.$('input[id="userEmail"]');
  readonly emailLabel: Locator = this.$('label[id="userEmail-label"]');
  readonly curAddress: Locator = this.$('textarea[id="currentAddress"]');
  readonly perAddress: Locator = this.$('textarea[id="permanentAddress"]');
  readonly submitBtn: Locator = this.$('button[id="submit"]');

  readonly output: Locator = this.$('div[id="output"]');
  //With Page Elements
  readonly emailEl: SimpleInputEl = new SimpleInputEl(this.$('[id="userEmail-wrapper"]'));

  readonly outputEl: OutputEl = new OutputEl(this.$('[id="output"]'));
  readonly form: Locator = this.$('[class="text-field-container"]');

  //for lvl 7
  @step('Fill Form With Data')
  async addFormData(name: string, email: string, curAdr: string, perAdr: string) {
    await this.userName.fill(name);
    await this.emailEl.input.fill(email);
    await this.curAddress.fill(curAdr);
    await this.perAddress.fill(perAdr);
  }

  /*
    lvl 8
    fillFormWith() does the same task as addFormData() with few changes:
    a) the name was changed (we cant really have 2 functions with the same name) and it's another way of naming functions.
    b) it is now receiving only one parameter (userData) that has a type User (from the interfaces)
    c) since some parameters are optional we need to check if they are present (the ? in interfaces means it's optional)
    d) We are using @step decorator from step-helper.ts file to make the reporting more readable (This is not mandatory but recommended).
    */
  @step('Fill Form With Data')
  async fillFormWith(userData: UserFormData) {
    if (userData.name) await this.userName.fill(userData.name);
    if (userData.email) await this.emailEl.input.fill(userData.email);
    if (userData.curAdr) await this.curAddress.fill(userData.curAdr);
    if (userData.permAdr) await this.perAddress.fill(userData.permAdr);
  }
}

/*
    lvl 6.1
    NOTE: notice that the class is written Outside the scope of PageObject (outside the {} of TextBoxPo)
    OutputEl most likely is unique to this page
    This is why it is not very reusable, we can put it directly inside this file (no need to create a separate file)
    no need for import/export
     */
class OutputEl extends BaseElement {
  readonly name: Locator = this.$('p[id="name"]');
  readonly email: Locator = this.$('p[id="email"]');
  readonly curAddress: Locator = this.$('p[id="currentAddress"]');
  readonly perAddress: Locator = this.$('p[id="permanentAddress"]');

  //following code is for lvl 9
  async getData(): Promise<UserFormData> {
    const data: UserFormData = {
      name: await this.getName(), //this is the only mandatory field (no ? in the interface)
    };
    //since a lot of fields are optional(and might not be present) we would need a lot of IF's...
    if (await this.email.isVisible()) {
      data.email = await this.getEmail();
    }
    if (await this.curAddress.isVisible()) {
      data.curAdr = await this.getCurAdr();
    }
    if (await this.perAddress.isVisible()) {
      data.permAdr = await this.getPermAdr();
    }
    return data;
  }

  //next 4 functions are called getter functions
  //All they do are getting the actual output value trimming away the name of the fields
  async getName(): Promise<string> {
    return (await this.name.innerText()).replace('Name:', '');
  }
  async getEmail(): Promise<string> {
    return (await this.email.innerText()).replace('Email:', '');
  }
  async getCurAdr(): Promise<string> {
    return (await this.curAddress.innerText()).replace('Current Address :', '');
  }
  async getPermAdr(): Promise<string> {
    return (await this.perAddress.innerText()).replace('Permananet Address :', '');
  }
}
