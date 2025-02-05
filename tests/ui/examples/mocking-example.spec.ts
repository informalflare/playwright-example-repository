import { expect, test } from '@fixtures';
import { GET_FRUITS } from 'src/ui/data';

//detailed information can be found at:
//https://playwright.dev/docs/mock#modify-api-responses
test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/api-mocking');
});
test.describe('Mock APIs @mocking', () => {
  test('NO mocking', async ({ page }) => {
    await expect(page.getByText('Strawberry')).toBeVisible();
    await expect(page.locator('ul li')).toHaveCount(17);
  });
  test('1 fruit', async ({ page, mocker }) => {
    await mocker.setMock(GET_FRUITS.expression, GET_FRUITS.scenarios.strawberryOnly);
    await page.reload();

    await expect(page.locator('ul li')).toHaveCount(1);
  });
  test('4 fruits', async ({ page, mocker }) => {
    await mocker.setMock(GET_FRUITS.expression, GET_FRUITS.scenarios.onlyGreen);
    await page.reload();

    await expect(page.getByText('Strawberry')).not.toBeVisible();
    await expect(page.locator('ul li')).toHaveCount(4);
  });
});
