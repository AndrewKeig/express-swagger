var nconf = require('nconf')
  , _ = require('underscore');

function Config(){
  nconf.argv().env('_');
  nconf.use('memory');

  var localConfigPath = 'config/';
  var remoteConfigPath = '/usr/local/pearson/etc/gloss-config.json';

  if (nconf.get('NODE:ENV')) {
    nconf.set('environment', nconf.get('NODE:ENV'));
  } else {
    nconf.set('environment', 'development');
  }

  console.log('NODE:ENV', nconf.get('environment') );

  if (nconf.get('environment') == 'TEST' || nconf.get('environment') == 'development' || nconf.get('environment') == 'jenkins') {
    nconf.file(nconf.get('environment'), localConfigPath + nconf.get('environment') + '.json');
  } else {
    nconf.file(nconf.get('environment'), remoteConfigPath);
  }

  nconf.file('default', localConfigPath + 'default.json');
}

Config.prototype.get = function(key) {
  return nconf.get(key);
};

module.exports = new Config();