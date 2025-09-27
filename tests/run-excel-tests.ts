import { test, expect, chromium, firefox, webkit, BrowserType } from '@playwright/test';
import * as path from 'path';
import * as XLSX from 'xlsx';

const xlsxPath = path.join(__dirname, 'TestCases.xlsx');

function readXLSX(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

(async () => {
  const cases = readXLSX(xlsxPath) as Array<{TestName: string, URL: string, Execute: string, Browser: string}>;
  for (const tc of cases) {
    if (tc.Execute && tc.Execute.toString().trim().toLowerCase() === 'yes') {
      let browserType: BrowserType;
      switch (tc.Browser.toString().trim().toLowerCase()) {
        case 'chromium': browserType = chromium; break;
        case 'firefox': browserType = firefox; break;
        case 'webkit': browserType = webkit; break;
        default: browserType = chromium;
      }
      test(tc.TestName, async () => {
        const browser = await browserType.launch();
        const page = await browser.newPage();
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        // Example: Check login page title
        await expect(page).toHaveTitle(/OrangeHRM/);
        // Add more OrangeHRM-specific assertions here as needed
        await browser.close();
      });
    }
  }
})();
