import { Locator } from '@playwright/test';
import { BaseElement } from '../base-element.po';

//It's expected that this element will appear all over the system,
//this is why we are creating a separate file Class for it so i t can be reused.
export class SimpleInputEl extends BaseElement {
  readonly label: Locator = this.$('label');
  readonly input: Locator = this.$('input').or(this.$('textarea'));

  async fill(value: string): Promise<void> {
    await this.input.fill(value);
  }
  async getPlaceholder(): Promise<string> {
    return await this.input.getAttribute('placeholder');
  }
  async isErrorShown(): Promise<boolean> {
    const classAttr = await this.input.getAttribute('class');
    return classAttr.includes('field-error');
  }
}
