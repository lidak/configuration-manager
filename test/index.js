const ConfigurationManager = require('../index');
const chai = require('chai');
const expect = chai.expect;

const managerInstance = new ConfigurationManager({configDir: './test/configs'});

process.env.NODE_ENV = 'qa1';

const qaManagerInstance = new ConfigurationManager({configDir: './test/configs'});

describe('config manager', () => {
  it('base config specific prop should remain after merge', () => {
     expect(managerInstance.get('baseConfigProp')).equal('baseConfigValue')
  });

  it('env config should have higher priority than base config', () => {
    expect(qaManagerInstance.get('obj.someShareProp')).equal('qa1');
    expect(managerInstance.get('obj.someShareProp')).equal('development');
  });

  it('cli params should have higher priority than base config', () => {
    expect(managerInstance.get('obj.cliParam')).equal('cliValue');
  });
});