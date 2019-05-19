var TokenExchange = artifacts.require("./TokenExchange.sol");

var contractSL;

contract('TokenExchange', (accounts) => {
    var owner = accounts[0]; // for test
    var decimalEth = Number(1e18);
    var decimalToken = Number(1e4);
    var rate = 100;

    var balanceContractToken = 10000*decimalToken;

    var buyEthOne = Number(0.02*decimalEth);
    var buyEthTwo = Number(0.025*decimalEth);
    var buyEthThree = Number(0.5*decimalEth);
    var buyEthFor = Number(0.01*decimalEth);

    var sellTokenOne = Number(2*decimalToken);

    it('should deployed contract TokenExchange', async ()  => {
        assert.equal(undefined, contractSL);
        contractSL = await TokenExchange.deployed();
        assert.notEqual(undefined, contractSL);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contractSL.address);
    });

    it('verification balance of tokens contract', async ()  => {
        var totalSupply = await contractSL.totalSupply.call();
        assert.equal( balanceContractToken, Number(totalSupply));

        var balanceOwner = await contractSL.balanceOf(owner);
        //console.log("balanceOwner = " + Number(balanceOwner/decimalToken));
        assert.equal(balanceContractToken, Number(balanceOwner));
    });

    it('verification buy tokens', async ()  => {
        //await contractSL.setRateToken(priceToken);
        var totalTokenSoldBefore = await contractSL.totalTokenSold();
        var balanceAccountTwoBefore = await contractSL.balanceOf(accounts[2]);

        await contractSL.buyTokens(accounts[2],{from:accounts[2], value:buyEthOne});
        var totalTokenSoldAfter = await contractSL.totalTokenSold();
        //console.log(Number(totalTokenSoldBefore/decimalToken), Number(totalTokenSoldAfter/decimalToken));

        assert.isTrue(Number(totalTokenSoldBefore) < Number(totalTokenSoldAfter));
        assert.equal(0, Number(totalTokenSoldBefore));
        assert.equal(2, Number(totalTokenSoldAfter/decimalToken));

        var balanceAccountTwoAfter = await contractSL.balanceOf(accounts[2]);
        //console.log("balanceAccountTwoAfter", Number(balanceAccountTwoAfter/decimalToken));
        assert.equal(2, Number(balanceAccountTwoAfter/decimalToken));

        assert.equal(Number(rate*buyEthOne*decimalToken/decimalEth), Number(balanceAccountTwoAfter));

        var balanceContractEth = await contractSL.balanceContractEth.call();
        //console.log("balanceContractEth", Number(balanceContractEth/decimalEth));
        assert.equal(0.02, Number(balanceContractEth/decimalEth));

        var balanceContractEth = await contractSL.balanceContractEth.call();
        //console.log("balanceContractEth", Number(balanceContractEth/decimalEth));
        assert.equal(0.02, Number(balanceContractEth/decimalEth));

});

    it('verification sell tokens', async ()  => {
        var totalTokenSoldBefore = await contractSL.totalTokenSold();
        var balanceAccountTwoBefore = await contractSL.balanceOf(accounts[2]);

        await contractSL.sellTokens(sellTokenOne, {from:accounts[2]});
        var totalTokenSoldAfter = await contractSL.totalTokenSold();
        //console.log(Number(totalTokenSoldBefore/decimalToken), Number(totalTokenSoldAfter/decimalToken));

        var balanceAccountTwoAfter = await contractSL.balanceOf(accounts[2]);
        //console.log("balanceAccountTwoAfter", Number(balanceAccountTwoAfter/decimalToken));

        assert.isTrue(Number(totalTokenSoldBefore) > Number(totalTokenSoldAfter));
        assert.equal(2, Number(totalTokenSoldBefore/decimalToken));
        assert.equal(0, Number(totalTokenSoldAfter/decimalToken));

        var balanceContractEth = await contractSL.balanceContractEth.call();
        //console.log("balanceContractEth", Number(balanceContractEth/decimalEth));
        assert.equal(0, Number(balanceContractEth/decimalEth));

        assert.equal(Number((sellTokenOne/rate)*decimalEth/decimalToken), Number(buyEthOne));

        //await contractSL.sdsdsd();

    });

        it('verification claim tokens and eth', async ()  => {
            var balanceAccountBefore = await contractSL.balanceOf(accounts[6]);
            assert.equal(0, balanceAccountBefore);
            await contractSL.buyTokens(accounts[6],{from:accounts[6], value:buyEthOne});
            var balanceAccountAfter = await contractSL.balanceOf(accounts[6]);
            assert.equal(2, Number(balanceAccountAfter/decimalToken));

            await contractSL.transfer(contractSL.address, sellTokenOne, {from:accounts[6]});
            var balanceContractBefore = await contractSL.balanceOf(contractSL.address);
            assert.equal(2, Number(balanceContractBefore/decimalToken));

            assert.equal(Number(rate*buyEthOne*decimalToken/decimalEth), Number(balanceAccountAfter));

            var balanceAccountAfterTwo = await contractSL.balanceOf(accounts[6]);
            assert.equal(0, balanceAccountAfterTwo);

            await contractSL.claim(contractSL.address,{from:accounts[0]});
            var balanceContractAfter = await contractSL.balanceOf(contractSL.address);
            assert.equal(0, balanceContractAfter);

            var balanceContractEth = await contractSL.balanceContractEth.call();
            //console.log("balanceContractEth", Number(balanceContractEth/decimalEth));
            assert.equal(0.02, Number(balanceContractEth/decimalEth));

            await contractSL.claim("0x0000000000000000000000000000000000000000",{from:accounts[0]});
            balanceContractEth = await contractSL.balanceContractEth.call();
            //console.log("balanceContractEth", Number(balanceContractEth/decimalEth));
            assert.equal(0, Number(balanceContractEth/decimalEth));
        });

});
