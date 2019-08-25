const { config } = require('./wdio.shared.sauce.conf');
// Needed to make a unique build number
const milliseconds = new Date().getMilliseconds();
const seleniumVersion = '3.141.59';
const chromeOptions = {
  'goog:chromeOptions': {
    args: [ '--no-sandbox', 'disable-infobars' ],
  },
};

// ============
// Specs
// ============
config.specs = [
  './tests/specs/sauce.chrome.upload.spec.js'
];

// ============
// Capabilities
// ============
config.capabilities = [
  // =======
  // Windows
  // =======
  {
    browserName: 'chrome',
    platformName: 'Windows 10',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1440x900',
      build: `upload-test.${ milliseconds }`,
      name: 'windows-upload',
    },
    ...chromeOptions,
  },
  // ===
  // Mac
  // ===
  {
    browserName: 'chrome',
    platformName: 'macOS 10.14',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1400x1050',
      build: `upload-test.${ milliseconds }`,
      name: 'mac-upload',
    },
    ...chromeOptions,
  },
];

exports.config = config;
