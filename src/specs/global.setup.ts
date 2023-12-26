import {test} from "@fixtures";

// This is a global setup file, It will be run Once before all of your tests
// Here we want to authenticate into the system+save the state of the browser to use in following tests
// https://playwright.dev/docs/auth

const authFilePath:string = 'src/state.json'; //Path to the file

test.skip('authenticate', async ({ page }) => {
    await page.goto('https://www.google.com');//change the url to the correct one
    //a) Add actions to log into the application //example:
    // await page.locator('button[id="Accept-All-Cookies"]').click(); //accept cookies
    // await page.locator('input[id*="username"]').fill('user1'); //input username
    // await page.locator('input[id*=password]').fill('password1'); // input password
    // await page.locator('[id="login-submit-button"]').click(); //click submit

    //b) Make sure you wait until the log in process finishes
    //await expect(page.locator('logged-in-element')).toBeVisible() //wait until logged in state

    //c) Save the state into the file
    await page.context().storageState({ path: authFilePath });
});