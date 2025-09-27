import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Page } from 'playwright';

let page: Page;

Given('I navigate to {string}', { timeout: 20000 }, async function (url: string) {
  page = await this.browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: `reports/screenshots/screenshot-navigate.png`, fullPage: true });
});


Then('the page title should contain {string}', { timeout: 10000 }, async function (title: string) {
  const actualTitle = await page.title();
  expect(actualTitle).toContain(title);
  await page.screenshot({ path: `reports/screenshots/screenshot-title.png`, fullPage: true });
  await page.close();
});

// Step definitions for TC002_Validation_fields
import { When } from '@cucumber/cucumber';

When('I enter username {string} and password {string}', async function (username: string, password: string) {
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.screenshot({ path: `reports/screenshots/screenshot-filled.png`, fullPage: true });
});

When('I click the login button', async function () {
  await page.getByRole('button', { name: 'Login' }).click();
  await page.screenshot({ path: `reports/screenshots/screenshot-after-login.png`, fullPage: true });
});

Then('the page should contain text {string}', async function (text: string) {
  await expect(page.locator('h6')).toContainText(text);
  await page.screenshot({ path: `reports/screenshots/screenshot-dashboard.png`, fullPage: true });
  await page.close();
});
