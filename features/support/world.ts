import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, chromium, firefox, webkit } from 'playwright';

class CustomWorld extends World {
  browser?: Browser;
  constructor(options: IWorldOptions) {
    super(options);
  }
  async initBrowser() {
    const browserType = process.env.BROWSER || 'chromium';
    let browserLauncher;
    if (browserType === 'firefox') {
      browserLauncher = firefox;
    } else if (browserType === 'webkit') {
      browserLauncher = webkit;
    } else {
      browserLauncher = chromium;
    }
    this.browser = await browserLauncher.launch({ headless: false });
  }
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
import { Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.initBrowser();
});

After(async function () {
  await this.closeBrowser();
});
