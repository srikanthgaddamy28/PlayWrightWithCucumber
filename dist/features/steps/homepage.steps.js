"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let page;
let scenarioName;
// Step definitions for TC003_InvalidSearch_And_ValidSearch
(0, cucumber_1.When)('I search for {string}', { timeout: 20000 }, async function (searchTerm) {
    // Click on Admin menu (first occurrence)
    await page.locator("xpath=//*[text()='Admin']").first().click();
    // Wait for System Users section to be visible
    await page.waitForSelector("text=System Users", { timeout: 10000 });
    // Fill the search input (username field in System Users)
    await page.getByPlaceholder('Username').fill(searchTerm);
    // Click the Search button
    await page.getByRole('button', { name: 'Search' }).click();
    // Wait for results to load
    await page.waitForTimeout(2000);
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-search-${searchTerm}.png`, fullPage: true });
});
(0, cucumber_1.Then)('the page should show no search results', async function () {
    // Check for 'No Records Found' in the results table
    const noResults = await page.locator('text=No Records Found').isVisible();
    (0, test_1.expect)(noResults).toBeTruthy();
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-no-results.png`, fullPage: true });
});
(0, cucumber_1.Then)('the page should show valid search results', async function () {
    // Check for valid user in the results table
    const validResults = await page.locator('text=Paul Collings').isVisible();
    (0, test_1.expect)(validResults).toBeTruthy();
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-valid-results.png`, fullPage: true });
});
(0, cucumber_1.Before)(function (scenario) {
    scenarioName = scenario.pickle.name.replace(/\s+/g, '_');
});
(0, cucumber_1.Given)('I navigate to {string}', { timeout: 20000 }, async function (url) {
    page = await this.browser.newPage();
    await page.goto(url);
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-navigate.png`, fullPage: true });
});
(0, cucumber_1.Then)('the page title should contain {string}', { timeout: 10000 }, async function (title) {
    const actualTitle = await page.title();
    (0, test_1.expect)(actualTitle).toContain(title);
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-title.png`, fullPage: true });
    await page.close();
});
// Step definitions for TC002_Validation_fields
(0, cucumber_1.When)('I enter username {string} and password {string}', async function (username, password) {
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-filled.png`, fullPage: true });
});
(0, cucumber_1.When)('I click the login button', async function () {
    await page.getByRole('button', { name: 'Login' }).click();
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-after-login.png`, fullPage: true });
});
(0, cucumber_1.Then)('the page should contain text {string}', async function (text) {
    await (0, test_1.expect)(page.locator('h6')).toContainText(text);
    const dir = path.join('reports', 'screenshots', scenarioName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    await page.screenshot({ path: `${dir}/screenshot-dashboard.png`, fullPage: true });
    await page.close();
});
