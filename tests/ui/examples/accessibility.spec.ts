import { expect, test } from '@fixtures';
/*
A custom 'toBeAccessible()' matcher was added.
https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend
https://playwright.dev/docs/accessibility-testing
The main code that makes it work is located in:
1. ui/utils/accessibility-scanner.ts
2. ui/ui.config.ts
3. ui/global.d.ts
 */
test.skip('Accessibility test', async ({ page }, testInfo) => {
  await page.goto('/automation-practice-form');
  await expect(page).toBeAccessible(testInfo);
});
