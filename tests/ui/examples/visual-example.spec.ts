import { expect, test } from '@fixtures';

test.describe.skip('@visual', () => {
  //this test is designed to fail (remove the skip() if you want to run it)
  //Visual test should be run in docker container Locally and normally on CI/CD
  //to run the test use `npm run visual -- --run`
  //this will trigger a script in scripts.sh to run the tests inside the docker
  test('Text box Form View', async ({ textBox }, testInfo) => {
    await textBox.visit();
    await expect(textBox.form).toHaveScreenshot(`${testInfo.title}.png`);
  });
});
