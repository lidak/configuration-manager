const yamljs = require('yamljs');
const path = require('path');
const pick = require('lodash.pick');
const merge = require('lodash.merge');
const cliArgs = require('cli-args');

module.exports = class ConfigurationManager {
  constructor({
    configDir = './config',
    configFilesExtension = 'yaml',
    env = 'development'
  }) {
    this.configDir = configDir;
    this.configFilesExtension = configFilesExtension;
    this.env = env;

    this.setConfig();
  }

  setConfig() {
    const envConfig = this.convertFileContentToJSON(`${this.env}.${this.configFilesExtension}`);
    const baseConfig = this.convertFileContentToJSON(`base.${this.configFilesExtension}`);
    const CLIArgs =  cliArgs(process.argv.slice(2));

    const notEnvConfigs = merge(baseConfig, envConfig, CLIArgs);
    const envConfigs = pick(process.env, Object.keys(notEnvConfigs));

    this.configuration = merge(notEnvConfigs, envConfigs);
  }

  convertFileContentToJSON(fileName) {
    try {
      return yamljs.load(path.resolve(this.configDir, fileName));
    } catch (e) {
      console.log(`Config file ${fileName} can't be read.`, e);
      return {};
    }
  }

  getConfig() {
    return this.configuration;
  }
};