const { config } = require('./wdio.shared.conf');

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

exports.config = config;
