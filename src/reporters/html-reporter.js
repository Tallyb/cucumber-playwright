// eslint-disable-next-line @typescript-eslint/no-var-requires
const reporter = require('cucumber-html-reporter');

const options = {
  // theme: 'bootstrap', hierarchy
  theme: 'hierarchy',
  jsonFile: 'reports/report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: false,
  launchReport: true,
  ignoreBadJsonFile: true,
  metadata: {
    'App Version': '0.0.0',
    host: 'unknown',
  },
};

reporter.generate(options);
