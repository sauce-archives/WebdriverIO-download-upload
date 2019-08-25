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
  './tests/specs/sauce.download.spec.js'
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
      build: `download-test.${ milliseconds }`,
      name: 'windows-download',
    },
    ...chromeOptions,
  },
  {
    browserName: 'firefox',
    platformName: 'Windows 10',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1440x900',
      build: `download-test.${ milliseconds }`,
      name: 'windows-download',
    },
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
      build: `download-test.${ milliseconds }`,
      name: 'mac-upload',
    },
    ...chromeOptions,
  },
  {
    browserName: 'safari',
    platformName: 'macOS 10.14',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1400x1050',
      build: `download-test.${ milliseconds }`,
      name: 'mac-upload',
    },
  },
  {
    browserName: 'firefox',
    platformName: 'macOS 10.14',
    'sauce:options': {
      seleniumVersion,
      name: 'mac-upload',
      screenResolution: '1400x1050',
      build: `download-test.${ milliseconds }`,
    },
  },
];

// =====
// Hooks
// =====
/**
 * The `before`-hook is used to determine the platformName location on the current running VM
 */
config.before = (capabilities) => {
  /**
   * These are the locations that are used on Sauce Labs to store the
   * downloaded file on the VM
   */
  const downloadFolders = {
    mac: '/Users/chef/Downloads/',
    windows: 'C:\\Users\\Administrator\\Downloads\\',
  };

  // Check the platformName name to to determine the download folder
  const isWindows = capabilities.platformName.toLowerCase().includes('windows');

  // Add the download folder to the browser object to easily access it during tests
  browser.downloadFolder = downloadFolders[ isWindows ? 'windows' : 'mac' ];
};

exports.config = config;
