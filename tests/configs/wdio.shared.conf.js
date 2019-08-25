/**
 * This file holds all the shared config options
 * The rest of the files will extend options
 */
exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',

  // ===================
  // Test Configurations
  // ===================
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,
  baseUrl: 'https://the-internet.herokuapp.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  // ==============
  // Test Framework
  // ==============
  framework: 'jasmine',
  reporters: [ 'spec' ],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  // =====
  // Hooks
  // =====
  beforeSession: (c) => {
    require('@babel/register');
  },
};
