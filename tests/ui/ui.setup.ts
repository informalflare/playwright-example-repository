import { test } from '@fixtures';

// This is a global setup file, It will be run Once before all of your tests
// Here we want to authenticate into the system+save the state of the browser to use in following tests
// https://playwright.dev/docs/auth

const authFilePath: string = 'src/ui/state.json'; //Path to the file

test('authenticate/ accept cookies etc', async ({ textBox, page }) => {
  //------------------------------------------------------------------------------------
  //a) Add actions to log into the application. //example:
  // await page.locator('button[id="Accept-All-Cookies"]').click(); //accept cookies
  // await page.locator('input[id*="username"]').fill('user1'); //input username
  // await page.locator('input[id*=password]').fill('password1'); // input password
  // await page.locator('[id="login-submit-button"]').click(); //click submit

  //b) Make sure you wait until the log in process finishes
  //await expect(page.locator('logged-in-element')).toBeVisible() //wait until logged in state

  //c) Save the state into the file
  //------------------------------------------------------------------------------------
  //a)
  await textBox.visit();
  if (await page.getByLabel('Consent', { exact: true }).isVisible()) {
    await page.getByLabel('Consent', { exact: true }).click();
  }
  //b)
  await page.waitForTimeout(1000); //just wait for the stuff to be finished
  // c)
  await page.context().storageState({ path: authFilePath });
});
