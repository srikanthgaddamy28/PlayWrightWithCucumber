"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('login page has expected title', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await (0, test_1.expect)(page).toHaveTitle(/OrangeHRM/);
    await page.close();
});
(0, test_1.test)('login with valid credentials', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await (0, test_1.expect)(page).toHaveURL(/dashboard/);
    await (0, test_1.expect)(page.locator('h6')).toContainText('Dashboard');
    await page.close();
});
(0, test_1.test)('login with invalid credentials shows error', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('invalid');
    await page.getByPlaceholder('Password').fill('invalid');
    await page.getByRole('button', { name: 'Login' }).click();
    await (0, test_1.expect)(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    await page.close();
});
