const config = require('./wdio.shared.conf').config;
// Needed to make a unique build number
const milliseconds = new Date().getMilliseconds();

// =================
// Service Providers
// =================
config.user = process.env.SAUCE_USERNAME;
config.key = process.env.SAUCE_ACCESS_KEY;
config.services = [ 'sauce' ];

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
    platform: 'Windows 10',
    screenResolution: '1440x900',
    build: `upload-test.${ milliseconds }`,
    name: 'windows-upload',
    prerun: 'sauce-storage:windows_download.bat',
  },
  {
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    screenResolution: '1440x900',
    build: `upload-test.${ milliseconds }`,
    name: 'windows-upload',
    prerun: 'sauce-storage:windows_download.bat',
  },
  {
    browserName: 'firefox',
    platform: 'Windows 10',
    screenResolution: '1440x900',
    build: `upload-test.${ milliseconds }`,
    name: 'windows-upload',
    prerun: 'sauce-storage:windows_download.bat',
  },
  {
    browserName: 'internet explorer',
    platform: 'Windows 10',
    screenResolution: '1440x900',
    build: `upload-test.${ milliseconds }`,
    name: 'windows-upload',
    prerun: 'sauce-storage:windows_download.bat',
  },
  // =====
  // Linux
  // =====
  {
    browserName: 'chrome',
    platform: 'Linux',
    screenResolution: '1024x768',
    build: `upload-test.${ milliseconds }`,
    name: 'linux-upload',
    prerun: 'sauce-storage:linux_download.sh',
  },
  {
    browserName: 'firefox',
    platform: 'Linux',
    screenResolution: '1024x768',
    build: `upload-test.${ milliseconds }`,
    name: 'linux-upload',
    prerun: 'sauce-storage:linux_download.sh',
  },
  // ===
  // Mac
  // ===
  {
    browserName: 'chrome',
    platform: 'macOS 10.14',
    screenResolution: '1400x1050',
    build: `upload-test.${ milliseconds }`,
    name: 'mac-upload',
    prerun: 'sauce-storage:mac_download.sh',
  },
  {
    browserName: 'safari',
    platform: 'macOS 10.14',
    screenResolution: '1400x1050',
    build: `upload-test.${ milliseconds }`,
    name: 'mac-upload',
    prerun: 'sauce-storage:mac_download.sh',
  },
  {
    browserName: 'firefox',
    platform: 'macOS 10.14',
    screenResolution: '1400x1050',
    build: `upload-test.${ milliseconds }`,
    name: 'mac-upload',
    prerun: 'sauce-storage:mac_download.sh',
  },
];

// =====
// Hooks
// =====
/**
 * The `before`-hook is used to determine the platform location on the current running VM
 */
config.before = (capabilities, specs) => {
  // The name of the subfolder, check the scripts in `./scripts/[linux|mac|windows]_download.[sh|bat]`
  // for the folder that is used there
  const subFolder = 'Desktop';
  /**
   * These are the locations that are used on Sauce Labs to store the
   * uploaded file on the VM
   */
  const platformPaths = {
    linux: `/home/chef/${ subFolder }/`,
    mac: `/Users/chef/${ subFolder }/`,
    windows: `C:\\Users\\sauce\\${ subFolder }\\`,
    // Windows Chrome and FF images have a different root user
    windowscf: `C:\\Users\\Administrator\\${ subFolder }\\`,
  };

  // Check the plaform name
  const isChrome = capabilities.browserName.toLowerCase().includes('chrome');
  const isFirefox = capabilities.browserName.toLowerCase().includes('firefox');
  const isWindows = capabilities.platform.toLowerCase().includes('windows');
  const isWindowsChromeFirefox = isWindows && (isChrome || isFirefox);
  const isMac = capabilities.platform.toLowerCase().includes('macos');

  browser.platformFolder = platformPaths[ isWindowsChromeFirefox ? 'windowscf' : isWindows ? 'windows' : isMac ? 'mac' : 'linux' ];
};

exports.config = config;
