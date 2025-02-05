import { expect, test } from '@fixtures';

// this is a play around file to change and try out some stuff
// you can run this test by adding .only after test ( test.only(....)
// and running the `npm run e2e -- --headed`
// change the URLs and what ever you want
test.setTimeout(180000);
test('First Test', async ({ page }) => {
  await page.goto('https://demoqa.com/automation-practice-form');
  //insert your code here like
  //await page.locator('[id="firstName"]').fill("Bob");

  await expect(page.locator('[id="userForm"]')).toBeVisible();
});
