const get = require('lodash.get');

module.exports = class ConfigurationManager {
  constructor({config}) {
    this.config = config;
  }

  get(dotNotaion) {
    return get(this.config, dotNotaion, undefined);
  }
};