
import { Given, Then, When, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

Given('I navigate to {string}', { timeout: 20000 }, async function (url: string) {
  page = await this.browser.newPage();
  await page.goto(url);
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-navigate.png`, fullPage: true });
});

let page: Page;
let scenarioName: string;

// Step definitions for TC003_InvalidSearch_And_ValidSearch
When('I search for {string}', async function (searchTerm: string) {
  // Wait for System Users header to be visible before searching
  try {
    await page.waitForSelector('h5:has-text("System Users")', { timeout: 15000 });
  } catch (e) {
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/debug-admin-page.png`, fullPage: true });
    console.log('DEBUG: System Users header not found. Page content:', await page.content());
    throw e;
  }
  // Fill Username textbox using provided XPath
  await page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[1]/div/div[2]/input').fill(searchTerm);
  // Click dropdown using provided XPath
  await page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[1]/div/div[2]/div/div[2]/div/div/div[1]').click();
  // Click Search button using provided XPath
  await page.locator('xpath=//*[@id="app"]/div[1]/div[2]/div[2]/div/div[1]/div[2]/form/div[2]/button[2]').click();
  // Wait for results to load
  await page.waitForTimeout(2000);
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-search-${searchTerm}.png`, fullPage: true });
});


Before(function (scenario) {
  scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
});

When('I navigate to Admin page', { timeout: 20000 }, async function () {
  // Wait for dashboard to be visible before clicking Admin
  await page.waitForSelector('text=Dashboard', { timeout: 15000 });
  await page.locator("xpath=//*[text()='Admin']").first().click();
  await page.waitForSelector("text=System Users", { timeout: 15000 });
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-admin-page.png`, fullPage: true });
});



Then('the page title should contain {string}', { timeout: 10000 }, async function (title: string) {
  const actualTitle = await page.title();
  expect(actualTitle).toContain(title);
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-title.png`, fullPage: true });
  await page.close();
});

// Step definitions for TC002_Validation_fields


When('I enter username {string} and password {string}', async function (username: string, password: string) {
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-filled.png`, fullPage: true });
});


When('I click the login button', async function () {
  await page.getByRole('button', { name: 'Login' }).click();
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-after-login.png`, fullPage: true });
});


Then('the page should contain text {string}', async function (text: string) {
  await expect(page.locator('h6')).toContainText(text);
  const dir = path.join('reports', 'screenshots', scenarioName);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await page.screenshot({ path: `${dir}/screenshot-dashboard.png`, fullPage: true });
  await page.close();
});
