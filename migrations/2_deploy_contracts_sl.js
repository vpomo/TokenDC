const Token = artifacts.require('./Token.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    deployer.deploy(Token);
};
