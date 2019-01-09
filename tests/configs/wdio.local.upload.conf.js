const config = require('./wdio.shared.conf').config;

// ========
// Services
// ========
config.services = [ 'selenium-standalone'];

// ============
// Specs
// ============
config.specs = [
  './tests/specs/local.upload.spec.js'
];

// ============
// Capabilities
// ============
config.capabilities = [
  {
    browserName: 'chrome',
  },
  {
    browserName: 'firefox',
  },
];

exports.config = config;
