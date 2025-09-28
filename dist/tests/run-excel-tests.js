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
const test_1 = require("@playwright/test");
const path = __importStar(require("path"));
const XLSX = __importStar(require("xlsx"));
const xlsxPath = path.join(__dirname, 'TestCases.xlsx');
function readXLSX(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
}
(async () => {
    const cases = readXLSX(xlsxPath);
    for (const tc of cases) {
        if (tc.Execute && tc.Execute.toString().trim().toLowerCase() === 'yes') {
            let browserType;
            switch (tc.Browser.toString().trim().toLowerCase()) {
                case 'chromium':
                    browserType = test_1.chromium;
                    break;
                case 'firefox':
                    browserType = test_1.firefox;
                    break;
                case 'webkit':
                    browserType = test_1.webkit;
                    break;
                default: browserType = test_1.chromium;
            }
            (0, test_1.test)(tc.TestName, async () => {
                const browser = await browserType.launch();
                const page = await browser.newPage();
                await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
                // Example: Check login page title
                await (0, test_1.expect)(page).toHaveTitle(/OrangeHRM/);
                // Add more OrangeHRM-specific assertions here as needed
                await browser.close();
            });
        }
    }
})();
