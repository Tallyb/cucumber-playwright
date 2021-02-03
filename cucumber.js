const common = `
  --require-module ts-node/register
  --require src/hooks/*.ts 
  --require src/steps/**/*.steps.ts
  --format json:reports/cucumber-report.json 
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
