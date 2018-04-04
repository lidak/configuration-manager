const yamljs = require('yamljs');
const path = require('path');
const pick = require('lodash.pick');
const merge = require('lodash.merge');
const cliArgs = require('cli-args');

module.exports = class ConfigurationReader {
  constructor({
    baseConfigPath = './config/base.yaml',
    envConfigPath = './config/development.yaml'
  }) {
    this.CLIArgs =  cliArgs(process.argv.slice(2));
    this.baseConfigPath = this.CLIArgs.baseConfig || baseConfigPath;
    this.envConfigPath = this.CLIArgs.envConfig || envConfigPath;

    this.setConfig();
  }

  setConfig() {
    const envConfig = this.convertFileContentToJSON(this.envConfigPath);
    const baseConfig = this.convertFileContentToJSON(this.baseConfigPath);
    const CLIArgs =  cliArgs(process.argv.slice(2));

    const notEnvConfigs = merge(baseConfig, envConfig, CLIArgs);
    const envConfigs = pick(process.env, Object.keys(notEnvConfigs));

    this.configuration = merge(notEnvConfigs, envConfigs);
  }

  convertFileContentToJSON(configPath) {
    try {
      console.log(path.extname(configPath).toLowerCase())
      if (path.extname(configPath).toLowerCase() === '.yaml') {
        return yamljs.load(configPath);
      }
      //Try to load as JSON
      return require(path.resolve(process.env.NODE_PATH, configPath));
    } catch (e) {
      console.log(`Config file ${configPath} can't be read.`, e);
      return {};
    }
  }

  getConfig() {
    return this.configuration;
  }
};