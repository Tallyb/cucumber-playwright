const common = `
  --require-module ts-node/register
  --require src/hooks/*.ts 
  --require src/steps/**/*.steps.ts
  --format message:reports/report.ndjson
  --format json:reports/report.json 
  --format html:reports/report.html
  --format summary 
  --format progress-bar 
  --format-options ${JSON.stringify({ snippetInterface: 'async-await' })}
  --publish-quiet
  `;

// --format node_modules/cucumber-pretty

const getWorldParams = () => {
  const params = {
    foo: 'bar',
  };

  return `--world-parameters ${JSON.stringify({ params })}`;
};

module.exports = {
  default: `${common} ${getWorldParams()}`,
};
