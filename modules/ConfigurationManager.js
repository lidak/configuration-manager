const _ = require('lodash');

module.exports = class ConfigurationManager {
  constructor({config}) {
    this.config = config;
  }

  get(dotNotaion) {
    return _.get(this.config, dotNotaion, undefined);
  }
};