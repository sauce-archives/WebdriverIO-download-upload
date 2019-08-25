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
  './tests/specs/sauce.upload.spec.js'
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
      prerun: 'sauce-storage:windows_download.bat',
    },
    ...chromeOptions,
  },
  {
    browserName: 'MicrosoftEdge',
    platformName: 'Windows 10',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1440x900',
      build: `upload-test.${ milliseconds }`,
      name: 'windows-upload',
      prerun: 'sauce-storage:windows_download.bat',
    },
  },
  {
    browserName: 'firefox',
    platformName: 'Windows 10',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1440x900',
      build: `upload-test.${ milliseconds }`,
      name: 'windows-upload',
      prerun: 'sauce-storage:windows_download.bat',
    },
  },
  {
    browserName: 'internet explorer',
    platformName: 'Windows 10',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1440x900',
      build: `upload-test.${ milliseconds }`,
      name: 'windows-upload',
      prerun: 'sauce-storage:windows_download.bat',
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
      build: `upload-test.${ milliseconds }`,
      name: 'mac-upload',
      prerun: 'sauce-storage:mac_download.sh',
    },
    ...chromeOptions,
  },
  {
    browserName: 'safari',
    platformName: 'macOS 10.14',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1400x1050',
      build: `upload-test.${ milliseconds }`,
      name: 'mac-upload',
      prerun: 'sauce-storage:mac_download.sh',
    },
  },
  {
    browserName: 'firefox',
    platformName: 'macOS 10.14',
    'sauce:options': {
      seleniumVersion,
      screenResolution: '1400x1050',
      build: `upload-test.${ milliseconds }`,
      name: 'mac-upload',
      prerun: 'sauce-storage:mac_download.sh',
    },
  },
];

// =====
// Hooks
// =====
/**
 * The `before`-hook is used to determine the platformName location on the current running VM
 */
config.before = (capabilities, specs) => {
  // The name of the subfolder, check the scripts in `./scripts/[linux|mac|windows]_download.[sh|bat]`
  // for the folder that is used there
  const subFolder = 'Desktop';
  /**
   * These are the locations that are used on Sauce Labs to store the
   * uploaded file on the VM
   */
  const platformNamePaths = {
    mac: `/Users/chef/${ subFolder }/`,
    windows: `C:\\Users\\sauce\\${ subFolder }\\`,
    // Windows Chrome and FF images have a different root user
    windowscf: `C:\\Users\\Administrator\\${ subFolder }\\`,
  };

  // Check the plaform name
  const isChrome = capabilities.browserName.toLowerCase().includes('chrome');
  const isFirefox = capabilities.browserName.toLowerCase().includes('firefox');
  const isWindows = capabilities.platformName.toLowerCase().includes('windows');
  const isWindowsChromeFirefox = isWindows && (isChrome || isFirefox);

  browser.platformFolder = platformNamePaths[ isWindowsChromeFirefox ? 'windowscf' : isWindows ? 'windows' : 'mac' ];
};

exports.config = config;
