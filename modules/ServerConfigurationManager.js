const _ = require('lodash');
const ConfigurionManager = require('./ConfigurationManager');


module.exports = class ServerConfigurationManager extends ConfigurionManager {
  getClientConfiguration() {
    return _.pick(this.config, this.get('clientProps'));
  }
};