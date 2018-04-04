const pick = require('lodash.pick');
const ConfigurionManager = require('./ConfigurationManager');


module.exports = class ServerConfigurationManager extends ConfigurionManager {
  getClientConfiguration() {
    return pick(this.config, this.get('clientProps'));
  }
};