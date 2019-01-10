const config = require('./wdio.shared.conf').config;
// Needed to make a unique build number
const milliseconds = new Date().getMilliseconds();

// =================
// Service Providers
// =================
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.services = [ 'sauce', 'firefox-profile' ];
// For the options see
// http://kb.mozillazine.org/Firefox_:_FAQs_:_About:config_Entries
config.firefoxProfile = {
  // Check the allowed MIME types here
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
  'browser.helperApps.neverAsk.saveToDisk': 'application/octet-stream',
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
    platform: 'Windows 10',
    screenResolution: '1440x900',
    build: `download-test.${ milliseconds }`,
    name: 'windows-download',
  },
  {
    browserName: 'firefox',
    platform: 'Windows 10',
    screenResolution: '1440x900',
    build: `download-test.${ milliseconds }`,
    name: 'windows-download',
  },
  // =====
  // Linux
  // =====
  {
    browserName: 'chrome',
    platform: 'Linux',
    screenResolution: '1024x768',
    build: `download-test.${ milliseconds }`,
    name: 'linux-upload',
  },
  {
    browserName: 'firefox',
    platform: 'Linux',
    screenResolution: '1024x768',
    build: `download-test.${ milliseconds }`,
    name: 'linux-upload',
  },
  // ===
  // Mac
  // ===
  {
    browserName: 'chrome',
    platform: 'macOS 10.14',
    screenResolution: '1400x1050',
    build: `download-test.${ milliseconds }`,
    name: 'mac-upload',
  },
  {
    browserName: 'safari',
    platform: 'macOS 10.14',
    screenResolution: '1400x1050',
    build: `download-test.${ milliseconds }`,
    name: 'mac-upload',
  },
  {
    browserName: 'firefox',
    platform: 'macOS 10.14',
    screenResolution: '1400x1050',
    build: `download-test.${ milliseconds }`,
    name: 'mac-upload',
  },
];

// =====
// Hooks
// =====
/**
 * The `before`-hook is used to determine the platform location on the current running VM
 */
config.before = (capabilities, specs) => {
  /**
   * These are the locations that are used on Sauce Labs to store the
   * downloaded file on the VM
   */
  const downloadFolders = {
    linux: '/home/chef/Downloads/',
    mac: '/Users/chef/Downloads/',
    // Windows Chrome and FF images have a different root user
    windowsCF: 'C:\\Users\\Administrator\\Downloads\\',
  };

  // Check the platform name to to determine the download folder
  const isChrome = capabilities.browserName.toLowerCase().includes('chrome');
  const isFirefox = capabilities.browserName.toLowerCase().includes('firefox');
  const isWindows = capabilities.platform.toLowerCase().includes('windows');
  const isMac = capabilities.platform.toLowerCase().includes('macos');
  const isWindowsChromeFirefox = isWindows && (isChrome || isFirefox);

  // Add the download folder to the browser object to easily access it during tests
  browser.downloadFolder = downloadFolders[ isWindowsChromeFirefox ? 'windowsCF' : isMac ? 'mac' : 'linux' ];
};

exports.config = config;
