"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const playwright_1 = require("playwright");
class CustomWorld extends cucumber_1.World {
    browser;
    constructor(options) {
        super(options);
    }
    async initBrowser() {
        const browserType = process.env.BROWSER || 'chromium';
        let browserLauncher;
        if (browserType === 'firefox') {
            browserLauncher = playwright_1.firefox;
        }
        else if (browserType === 'webkit') {
            browserLauncher = playwright_1.webkit;
        }
        else {
            browserLauncher = playwright_1.chromium;
        }
        // Run headless in CI/CD, headed in VS Code/local
        const isCI = process.env.CI === 'true';
        this.browser = await browserLauncher.launch({ headless: isCI });
    }
    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
(0, cucumber_1.setWorldConstructor)(CustomWorld);
const cucumber_2 = require("@cucumber/cucumber");
(0, cucumber_2.Before)(async function () {
    await this.initBrowser();
});
(0, cucumber_2.After)(async function () {
    await this.closeBrowser();
});
