import { AllureRuntime, CucumberJSAllureFormatter } from 'allure-cucumberjs';

function Reporter(options: any) {
  return new CucumberJSAllureFormatter(
    options,
    new AllureRuntime({ resultsDir: './reports/allure-results' }),
    {
      labels: [
        {
          name: 'epic',
          pattern: [/@feature:(.*)/],
        },
        {
          name: 'severity',
          pattern: [/@severity:(.*)/],
        },
      ],
      links: [
        {
          type: 'issue',
          pattern: [/@issue=(.*)/],
          urlTemplate: 'http://localhost:8080/issue/%s',
        },
        {
          type: 'tms',
          pattern: [/@tms=(.*)/],
          urlTemplate: 'http://localhost:8080/tms/%s',
        },
      ],
    },
  );
}
Reporter.prototype = Object.create(CucumberJSAllureFormatter.prototype);
Reporter.prototype.constructor = Reporter;

exports.default = Reporter;
