const config = require('./wdio.shared.conf').config;
// Needed to make a unique build number
const milliseconds = new Date().getMilliseconds();

/**
 * These are the locations that are used on Sauce Labs to store the
 * downloaded file on the VM
 */
const subFolder = 'Downloads';
// Add the global download folders here
const downloadFolders = {
  linux: `/home/chef/${ subFolder }/`,
  mac: `/Users/chef/${ subFolder }/`,
  windows: `C:\\Users\\sauce\\${ subFolder }\\`,
  // Windows Chrome and FF images have a different root user
  windowsCF: `C:\\Users\\Administrator\\${ subFolder }\\`,
};

// =================
// Service Providers
// =================
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.services = [ 'sauce', 'firefox-profile' ];
// For the options see
// http://kb.mozillazine.org/Firefox_:_FAQs_:_About:config_Entries
config.firefoxProfile = {
  'browser.download.dir': downloadFolders.windowsCF,
  'browser.download.folderList': 2,
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
    // this overrides the default chrome download directory with our temporary one
    chromeOptions: {
      prefs: {
        'download.default_directory': downloadFolders.windowsCF,
      }
    },
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
    // this overrides the default chrome download directory with our temporary one
    chromeOptions: {
      prefs: {
        'download.default_directory': downloadFolders.mac,
      }
    },
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

  // Check the plaform name
  const isChrome = capabilities.browserName.toLowerCase().includes('chrome');
  const isFirefox = capabilities.browserName.toLowerCase().includes('firefox');
  const isWindows = capabilities.platform.toLowerCase().includes('windows');
  const isMac = capabilities.platform.toLowerCase().includes('macos');
  const isWindowsChromeFirefox = isWindows && (isChrome || isFirefox);

  browser.downloadFolder = downloadFolders[ isWindowsChromeFirefox ? 'windowsCF' : isWindows ? 'windows' : isMac ? 'mac' : 'linux' ];
};

exports.config = config;
