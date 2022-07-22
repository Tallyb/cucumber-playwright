# cucumber-playwright

![Test](https://github.com/Tallyb/cucumber-playwright/workflows/Test/badge.svg)

A starter repo for writing E2E tests based on Cucumber(7) with Playwright using Typescript.

## The Why
[Read](https://tally-b.medium.com/e2e-testing-with-cucumber-and-playwright-9584d3ef3360) or [watch](https://www.youtube.com/watch?v=PUVFmhYJNJA&list=PLwwCtx3xQxlVMZzS4oi2TafVRngQ1wF_0&index=2). 

## Can we use XXX from playwright in the playwright-cucumber project? 

The playwright-cucumber project started when playwright was a browser automation library. It did not have a test runner, hence cucumber-js was used as the test runner and PW used for the automation.
Since then PW added their amazing PW test library which is a test runner. But, sadly, it overlaps the functionality provided by cucumber-js. Therefore you need to make the decision now of which runner you want to run: cucumber for BDD style tests or PW test for “normal” tests. 
Some of the features provided by PW test are also available in cucumber-js, such as parallel run and different configurations (profiles in cucumber-js terms), but may require a different configuration. 

## Kudos

This repository is based on the [Cucumber-typescript-starter](https://github.com/hdorgeval/cucumber7-ts-starter/) repo.

## What's inside

- Typescript setup for writing steps with eslint/typescript and prettier
- Launching of Playwright browser before running all tests
- Launching new context and page for each scenario
- Running feature with video recording option
- Report generated with last good image attached
- Allure reports
- Utilies function to help you with writing steps
- VScode configuration to debug a single feature or an only scenario (run when located on the feature file)

## Usage

Create a repo based on this template and start writing your tests.

## To run your tests

`npm run test` or `npx cucumber-js` runs all tests
`npm run test <feature name>` or `npx cucumber-js <feature name>` run the single feature

## Browser selection

By default we will use chromium. You can define an envrionment variable called BROWSER and
set the name of the browser. Available options: chromium, firefox, webkit

On Linux and Mac you can write:

`BROWSER=firefox npm run test` or `BROWSER=firefox npx cucumber-js` runs all tests using Firefox

One Windows you need to write

```
set BROWSER=firefox
npm run test
```

## Working with Page Objects

I am not fond of the Page Object Model (POM) for testing. It feels like a leftover from Java world, and I do not think it fits the Javascript world. However, you can check [this PR](https://github.com/Tallyb/cucumber-playwright/pull/95/files) to see POM implementation. 

## Debugging Features

### From CLI

- `npm run debug` - headful mode with APIs enables both APIs and debug options
- `npm run api` - headless mode with debug apis
- `npm run video` - headless mode vith video

## In Visual Studio Code

- Open the feature
- Select the debug options in the VSCode debugger
- Set breakpoints in the code

To stop the feature, you can add the `Then debug` step inside your feature. It will stop your debugger.

## To choose a reporter

The last reporter/formatter found on the cucumber-js command-line wins:

```text
--format summary --format @cucumber/pretty-formatter --format cucumber-console-formatter
```

In [cucumber.mjs](cucumber.mjs) file, modify the options.


To use Allure reporting, you can run with env param: `USE_ALLURE=1`, and then use the `npm run allure` to show the report.

## To ignore a scenario

- tag the scenario with `@ignore`

## To check for typescript, linting and gherkin errors

- run the command `npm run build`.

## To view the steps usage

- run the command `npm run steps-usage`.

## To view the html report of the last run

- run the command `npm run report`.

### At least in Lubuntu 20.04 to open the html report

- Modify the `package.json` in `"report": "xdg-open reports/report.html"`

## To view allure report
- run the command `npm run allure`.

