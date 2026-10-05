const { test, expect } = require('@playwright/test');
const { email, password } = require('./user');

test.describe('Авторизация на Нетологии', () => {

  test('Успешная авторизация', async ({ page }) => {
    test.setTimeout(120000);
    
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: 'Войти' }).click();

    await expect(page).toHaveURL(/.*profile/, { timeout: 60000 });
  });

  test('Неуспешная авторизация', async ({ page }) => {
    test.setTimeout(120000);
    
    await page.goto('https://netology.ru/?modal=sign_in');
    await page.locator('input[name="email"]').fill('wrong_email_test_qa@test.com');
    await page.locator('input[name="password"]').fill('wrong_password_123');
    await page.getByRole('button', { name: 'Войти' }).click();

    const errorElement = page.locator('[data-testid="login-error-hint"], form:has-text("неверн")').first();
    await expect(errorElement).toBeVisible({ timeout: 60000 });
  });

});