import { test } from '@fixtures';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();
test('Getting and Setting Token', async ({ apiBooking }) => {
  if (process.env.USER_NAME && process.env.USER_PASS) {
    const resp = await apiBooking.logInAs(process.env.USER_NAME, process.env.USER_PASS);

    const token = resp.token;
    if (token) {
      process.env.BOOKING_TOKEN = token;
      console.log(`process.env.BOOKING_TOKEN was set to: ${process.env.BOOKING_TOKEN}`);
      console.log();
    } else {
      throw new Error('BOOKING_TOKEN was NOT set correctly. Make sure credentials are correct.');
    }
  } else {
    throw new Error(
      'USER_NAME or USER_PASS is missing from .env file. ' +
        '\n Make sure you have created the file in your project root directory with correct credentials. ' +
        '\n' +
        '\n IMPORTANT: IF there is no need to logIn:' +
        '\n Remove the "api-setup" from your project in "playwright.config.ts"'
    );
  }
});
