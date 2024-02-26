import { test } from '@fixtures';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();
test('Getting and Setting Token', async ({ api }) => {
  if (process.env.USER_NAME && process.env.USER_PASS) {
    const resp = await api.booking.logInAs(process.env.USER_NAME, process.env.USER_PASS);
    console.log(resp);
    const token = resp.token;
    if (token) {
      process.env.TOKEN = token;
      console.log('TOKEN was set to:');
      console.log(process.env.TOKEN);
    } else {
      throw new Error('TOKEN was NOT set correctly. Make sure credentials are correct.');
    }
  } else {
    throw new Error(
      'USER_NAME or USER_PASS is missing from .env file. ' +
        '\n Make sure you have created the file in your project root directory with correct credentials. ' +
        '\n' +
        '\n IMPORTANT: IF there is no need to logIn:' +
        '\n Remove the "api-setup" project form "api/api.config.ts"'
    );
  }
});
