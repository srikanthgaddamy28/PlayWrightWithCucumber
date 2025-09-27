import { test, expect } from '@playwright/test';

test('login page has expected title', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page).toHaveTitle(/OrangeHRM/);
  await page.close();
});

test('login with valid credentials', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h6')).toContainText('Dashboard');
  await page.close();
});

test('login with invalid credentials shows error', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('invalid');
  await page.getByPlaceholder('Password').fill('invalid');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
  await page.close();
});
