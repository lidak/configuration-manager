const ConfigurationManager = require('../modules/ConfigurationManager');
const ConfigurationReader = require('../modules/ConfigurationReader');
const ServerConfigurationManager = require('../modules/ServerConfigurationManager');
const path = require('path');

const chai = require('chai');
const expect = chai.expect;

const config = new ConfigurationReader({
  configDir: path.resolve(__dirname, './configs'),
  configFilesExtension: 'yaml',
  env: process.env.NODE_ENV
}).getConfig();

const serverConfig = new ServerConfigurationManager({config});
const clientConfig = new ConfigurationManager({config: serverConfig.getClientConfiguration()});


process.env.NODE_ENV = 'qa1';

const qaConfig = new ConfigurationReader({
  configDir: path.resolve(__dirname, './configs'),
  env: process.env.NODE_ENV
}).getConfig();


const qaServerConfig = new ServerConfigurationManager({config: qaConfig});


describe('config manager', () => {
  it('base config specific prop should remain after merge', () => {
     expect(serverConfig.get('baseConfigProp')).equal('baseConfigValue')
  });

  it('client config should contain client specific props only', () => {
    expect(clientConfig.get('some_array')).to.eql(['one', 'two', 'three']);
    expect(clientConfig.get('baseConfigProp')).be.undefined;
  });

  it('env config should have higher priority than base config', () => {
    expect(serverConfig.get('obj.someShareProp')).equal('development');
    expect(qaServerConfig.get('obj.someShareProp')).equal('qa1');
  });
});