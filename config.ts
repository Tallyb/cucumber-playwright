const config = {
  baseUrl: process.env.BASE_URL || 'https://playwright.dev',
  recordVideos: process.env.PWVIDEO || false,
  defaultTimeout: 60 * 1000, // milliseconds
  headless: true,
  runSlow: 0, // milliseconds
};

export default config;
