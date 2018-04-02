const yamljs = require('yamljs');
const path = require('path');
const _ = require('lodash');
const cliArgs = require('cli-args');

module.exports = class ConfigurationManager {
  constructor({ configDir = './config' }) {
    this.configDir = configDir;
    this.setConfig();
  }

  setConfig() {
    const env = process.env.NODE_ENV || 'development';
    const envConfig = this.convertFileContentToJSON(`${env}.yaml`);
    const baseConfig = this.convertFileContentToJSON('base.yaml');
    const CLIArgs =  cliArgs(process.argv.slice(2));

    const notEnvConfigs = _.merge(baseConfig, envConfig, CLIArgs);
    const envConfigs = _.pick(process.env, _.keys(notEnvConfigs));

    this.configuration = _.merge(notEnvConfigs, envConfigs);
    console.log(this.configuration);
  }

  convertFileContentToJSON(fileName) {
    try {
      return yamljs.load(path.resolve(__dirname, this.configDir, fileName));
    } catch (e) {
      console.log(`Config file ${fileName} can't be read.`);
      return {};
    }
  }

  get(dotNotation) {
    try {
      return _.get(this.configuration, dotNotation);
    } catch (e) {
      throw new TypeError(`ConfigurationManager: key ${dotNotation} was not found in configuration`);
    }
  }
};