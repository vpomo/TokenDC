const TokenExchange = artifacts.require('./TokenExchange.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    deployer.deploy(TokenExchange);
};
