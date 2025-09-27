<<<<<<< HEAD
# PlayWrightWithCucumber
PlayWright With Cucumber Automation Project
=======
# BDD Playwright Automation Framework Setup

This project uses Playwright with Cucumber (BDD) and TypeScript for cross-browser web automation.

## Project Structure
- `features/` — Gherkin feature files and step definitions
- `features/steps/` — Step definition files (TypeScript)
- `features/support/` — Cucumber hooks and world setup
- `tests/` — (Optional) Playwright test files
- `playwright.config.ts` — Playwright configuration
- `cucumber.js` — Cucumber CLI config
- `tsconfig.json` — TypeScript config


## Key Commands
- Run all BDD scenarios:
  ```sh
  npx cucumber-js
  ```
- Run a specific feature file:
  ```sh
  npx cucumber-js features/homepage.feature
  ```
- Run with tags:
  ```sh
  npx cucumber-js --tags @smoke
  ```

## Grid Integration (BrowserStack Example)
- Set the environment variable for your grid endpoint:
  ```sh
  export BROWSERSTACK_WS_ENDPOINT=wss://cdp.browserstack.com/playwright?caps=...your_caps...
  ```
- Run Playwright tests on BrowserStack:
  ```sh
  npx playwright test --project=browserstack
  ```
- For Sauce Labs or Selenium Grid, add a similar project in `playwright.config.ts`.

## Advanced Reporting
- Generate a JSON report:
  ```sh
  npx cucumber-js --format json:reports/report.json
  ```
- Generate an HTML report (requires `cucumber-html-reporter`):
  ```sh
  npm install -D cucumber-html-reporter
  npx cucumber-js --format json:reports/report.json
  npx cucumber-html-reporter --require reports/report.json --output reports/report.html
  ```

## CI/CD Setup (GitHub Actions Example)
Add a workflow file at `.github/workflows/ci.yml`:
```yaml
name: Playwright BDD Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx cucumber-js
```

## Reporting
- To generate a JSON report:
  ```sh
  npx cucumber-js --format json:reports/report.json
  ```
- To generate an HTML report (requires `cucumber-html-reporter`):
  ```sh
  npm install -D cucumber-html-reporter
  npx cucumber-js --format json:reports/report.json
  # Then use a script to convert JSON to HTML
  ```

## Customization
- Add new `.feature` files in `features/`
- Add new step definitions in `features/steps/`
- Update `playwright.config.ts` for browser/grid settings
- Use hooks in `features/support/` for setup/teardown

---

For more, see `.github/copilot-instructions.md`.
>>>>>>> 37620e3 (Initial commit with Playwright and Cucumber setup)
