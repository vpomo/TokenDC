var TokenExchange = artifacts.require("./TokenExchange.sol");

var contractSL;

contract('TokenExchange', (accounts) => {
    var owner = accounts[0]; // for test
    var decimalEth = Number(1e18);
    var decimalToken = Number(1e4);

    var priceToken = 0.01*decimalEth;

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

    // it('verification balance contracts', async ()  => {
    //     var totalSupply = await contractTimeToken.totalSupply.call();
    //     //console.log(JSON.stringify(totalSupply));
    //     assert.equal( 1e20, Number(totalSupply));
    //
    //     var balanceOwner = await contractTimeToken.balanceOf(owner);
    //     //console.log("balanceOwner = " + balanceOwner);
    //     assert.equal(Number(totalSupply), balanceOwner);
    // });

    it('verification buy tokens', async ()  => {
        //await contractSL.setRateToken(priceToken);
        var totalTokenSoldBefore = await contractSL.totalTokenSold();
        var balanceAccountTwoBefore = await contractSL.balanceOf(accounts[2]);

        await contractSL.buyTokens(accounts[2],{from:accounts[2], value:buyEthOne});
        var totalTokenSoldAfter = await contractSL.totalTokenSold();
        console.log(Number(totalTokenSoldBefore/decimalToken), Number(totalTokenSoldAfter/decimalToken));

        // assert.isTrue(tokenAllocatedBefore < tokenAllocatedAfter);
        // assert.equal(0, tokenAllocatedBefore);

        var balanceAccountTwoAfter = await contractSL.balanceOf(accounts[2]);
        console.log("balanceAccountTwoAfter", Number(balanceAccountTwoAfter/decimalToken));

        // assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        // assert.equal(0, balanceAccountTwoBefore);
        // assert.equal(rate*buyWei, balanceAccountTwoAfter);

        // var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        // await contract.buyTokens(accounts[3],{from:accounts[3], value:buyWeiNew});
        // var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        // assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        // assert.equal(0, balanceAccountThreeBefore);
        // assert.equal(rateNew*buyWeiNew, balanceAccountThreeAfter);

    });

    it('verification sell tokens', async ()  => {
        //await contractSL.setRateToken(priceToken);
        var totalTokenSoldBefore = await contractSL.totalTokenSold();
        var balanceAccountTwoBefore = await contractSL.balanceOf(accounts[2]);

        await contractSL.sellTokens(sellTokenOne, {from:accounts[2]});
        var totalTokenSoldAfter = await contractSL.totalTokenSold();
        console.log(Number(totalTokenSoldBefore/decimalToken), Number(totalTokenSoldAfter/decimalToken));

        // assert.isTrue(tokenAllocatedBefore < tokenAllocatedAfter);
        // assert.equal(0, tokenAllocatedBefore);

        var balanceAccountTwoAfter = await contractSL.balanceOf(accounts[2]);
        console.log("balanceAccountTwoAfter", Number(balanceAccountTwoAfter/decimalToken));

        // assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        // assert.equal(0, balanceAccountTwoBefore);
        // assert.equal(rate*buyWei, balanceAccountTwoAfter);

        // var balanceAccountThreeBefore = await contract.balanceOf(accounts[3]);
        // await contract.buyTokens(accounts[3],{from:accounts[3], value:buyWeiNew});
        // var balanceAccountThreeAfter = await contract.balanceOf(accounts[3]);
        // assert.isTrue(balanceAccountThreeBefore < balanceAccountThreeAfter);
        // assert.equal(0, balanceAccountThreeBefore);
        // assert.equal(rateNew*buyWeiNew, balanceAccountThreeAfter);
        await contractSL.sdsdsd();

    });

    /*

        it('verification claim tokens', async ()  => {
            var balanceAccountBefore = await contract.balanceOf(accounts[6]);
            assert.equal(0, balanceAccountBefore);
            await contract.buyTokens(accounts[6],{from:accounts[6], value:buyWei});
            var balanceAccountAfter = await contract.balanceOf(accounts[6]);

            await contract.addToWhitelist(accounts[6]);
            await contract.addToWhitelist(contract.address);
            await contract.addToWhitelist(accounts[0]);

            await contract.transfer(contract.address,balanceAccountAfter,{from:accounts[6]});
            var balanceContractBefore = await contract.balanceOf(contract.address);
            assert.equal(buyWei*rate, balanceContractBefore);
            var balanceAccountAfterTwo = await contract.balanceOf(accounts[1]);
            assert.equal(0, balanceAccountAfterTwo);
            var balanceOwnerBefore = await contract.balanceOf(owner);
            await contract.claimTokens(contract.address,{from:accounts[0]});
            var balanceContractAfter = await contract.balanceOf(contract.address);
            assert.equal(0, balanceContractAfter);
            var balanceOwnerAfter = await contract.balanceOf(owner);
            assert.equal(true, balanceOwnerBefore<balanceOwnerAfter);
        });

    */
});
