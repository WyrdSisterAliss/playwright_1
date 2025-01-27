# README #

## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

### [Installation](https://playwright.dev/docs/intro) ###
Clone the project with git clone
Do the npm install and install playwright with dependencies and browsers from the root directory
You can also install playwright extension for VS Code


```shell
npm install
npx playwright install --with-deps
```

#### Set up a dotenv file with environment variables ####
```sh
BASE_URL is a base url for the environment
HEADLESS_MODE set to true or false to run in either of the modes]
include user credentials for USER_PASSWORD, STANDARD_USER, LOCKED_OUT_USER
```

### Usage ###
By default runs with 3 browsers (chrome, firefox and safari)
Two reports by default: line and html

#### Basic commands ####
```shell
// To run all tests:
npx playwright test

// To run in Headed more
HEADLESS=false npx playwright test 
```

#### Additional commands ####
```shell
// Run a single test file:
npx playwright test tests/todo-page.spec.ts
// Run in chrome browser
npx playwright test --project=chromium
```

#### Debugging ####
Among usual debuggers, you may also use trace report for debugging.
[Trace Viewer](https://playwright.dev/docs/trace-viewer-intro) - Playwright trace contains test execution screencast, live DOM snapshots, action explorer, test source, and many more.
```shell
// Debugging in UI mode:
npx playwright test --ui
// Debugging in default debugger"
npx playwright test --debug
```
[More info on running and debugging tests](https://playwright.dev/docs/running-tests)




### Reports ###
By default this suite uses two reporters: line and html.
Line is visible and informative in console.
You can also check more detailed html report after the run.

```shell
// show html report in browser
npx playwright show-report
```

## Project Structure ##

```sh
 |- pages #  Pages of the application, defined most locators, helper functions.
 |- test-results #  Folder for reports to be saved
 |- tests # Here are the tests
 |- utils # helper class for generating data
```

## Updating playwright ##
[usefull thread with additional commands](https://stackoverflow.com/questions/75163236/how-to-update-upgrade-playwright)

```sh
//Checking for update
npm outdated @playwright/test
//Update to latest version 
npm install -D @playwright/test@latest
//update browsers after playwright update
npx playwright install
```

### Tools ###
[Codegen](https://playwright.dev/docs/codegen) -  Generate tests by recording your actions.

[Playwright inspector](https://playwright.dev/docs/debug#playwright-inspector) - Inspect page, generate selectors, step through the test execution, see click points, explore execution logs.

[Trace Viewer](https://playwright.dev/docs/trace-viewer-intro) - Playwright trace contains test execution screencast, live DOM snapshots, action explorer, test source, and many more.