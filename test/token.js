var TokenExchange = artifacts.require("./TokenExchange.sol");

var contractSL;

contract('TokenExchange', (accounts) => {
    var owner = accounts[0]; // for test
    var decimal = Number(1e18)  ;

    var buyEthOne = Number(0.02*decimal);
    var buyEthTwo = Number(0.025*decimal);
    var buyEthThree = Number(0.5*decimal);
    var buyEthFor = Number(0.01*decimal);

    it('should deployed contract TokenExchange', async ()  => {
        assert.equal(undefined, contractSL);
        contractSL = await TokenExchange.deployed();
        assert.notEqual(undefined, contractSL);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contractSL.address);
    });


    /*
    it('check buy tickets', async ()  => {

        await contractSL.buyTicket(accounts[1], {from:accounts[1], value: buyEthOne});

        var uniquePlayer = await contractSL.uniquePlayer.call();
        assert.equal(1, Number(uniquePlayer));
        // console.log("uniquePlayer", Number(uniquePlayer));
        var totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(2, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        var totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.02, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        var balanceEth = await contractSL.balanceETH.call();
        assert.equal(0.02, Number(balanceEth/decimal));
        // console.log("balanceEth", Number(balanceEth/decimal));

        await contractSL.buyTicket(accounts[2], {from:accounts[2], value: buyEthTwo});
        uniquePlayer = await contractSL.uniquePlayer.call();
        assert.equal(2, Number(uniquePlayer));
        // console.log("uniquePlayer", Number(uniquePlayer));
        totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(4, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.04, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        // var info = await contractSL.getTicketInfo(1, 1);
        // console.log("info 1", JSON.stringify(info));

        var countTickets = await contractSL.getCountTickets(1);
        // console.log("countTickets", Number(countTickets));
        assert.equal(4, Number(countTickets));
    });

    /!*
        it('check random numbers', async ()  => {
            var round = 1;
            var randomNumber;
            // var typeLottery = 3;
            // for (var j=11; j<40; j++) {
            //     randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
            //     console.log(typeLottery, Number(randomNumber));
            //     await contractSL.findHappyNumber(round, typeLottery);
            // }

            var typeLottery = 2;
            for (var j=11; j<40; j++) {
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log(typeLottery, Number(randomNumber));
                await contractSL.findHappyNumber(round, typeLottery);
            }

            var typeLottery = 1;
            for (var j=11; j<40; j++) {
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log(typeLottery, Number(randomNumber));
                await contractSL.findHappyNumber(round, typeLottery);
            }

            var typeLottery = 0;
            for (var j=11; j<40; j++) {
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log(typeLottery, Number(randomNumber));
                await contractSL.findHappyNumber(round, typeLottery);
            }

    });
    *!/

    it('check make twist', async ()  => {
        var amountTickets = await contractSL.buyTicket.call(accounts[3], {from:accounts[3], value: buyEthThree});
        // console.log("amountTickets", Number(amountTickets));
        assert.equal(7, Number(amountTickets));
        await contractSL.buyTicket(accounts[3], {from:accounts[3], value: buyEthThree});

        var info = await contractSL.getTicketInfo(1, 5);
        //console.log("info 3", JSON.stringify(info));
        assert.equal(accounts[3], info[0]);

        totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.11, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

    });

    it('check happy tickets', async ()  => {
        for (var i=1; i<12;i++) {
            var isWinner = await contractSL.checkWinner(1, i);
            if (isWinner) {
                //console.log("number ticket = " + i);
                var info = await contractSL.getTicketInfo(1, i);
                var balance = await contractSL.getBalanceWinner(info[0], 1);
                // console.log("balance", Number(balance/decimal));
                assert.equal(0.1, Number(balance/decimal));
            }
        }

    });

    it('check new round', async ()  => {
    await contractSL.buyTicket(accounts[6], {from:accounts[6], value: buyEthTwo});
    await contractSL.buyTicket(accounts[7], {from:accounts[7], value: buyEthThree});

    for (var i=1; i<12;i++) {
        var isWinner = await contractSL.checkWinner(2, i);
        if (isWinner) {
            //console.log("number ticket = " + i);
            var info = await contractSL.getTicketInfo(2, i);
            var balance = await contractSL.getBalanceWinner(info[0], 2);
            // console.log("balance", Number(balance/decimal));
            assert.equal(0.1, Number(balance/decimal));
        }
    }

    });

    it('check type step 6', async ()  => {
        var round = await contractSL.currentRound.call();
        assert.equal(3, Number(round));
        var totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(22, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        var totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.22, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        await contractSL.setStepLottery(2);
        await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthTwo});
        totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(24, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.24, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        await contractSL.buyTicket(accounts[6], {from:accounts[6], value: buyEthTwo});
        await contractSL.buyTicket(accounts[7], {from:accounts[7], value: buyEthThree});

        totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(28, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.28, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        // var randomNumber;
        // for (var j=11; j<30; j++) {
        //     randomNumber = await contractSL.getRandomNumberTicketTest(j,round);
        //     console.log("randomNumber", Number(randomNumber));
        // }

        for (var i=1; i<7;i++) {
            var isWinner = await contractSL.checkWinner(round, i);
            // console.log("number ticket = " + i);
            info = await contractSL.getTicketInfo(round, i);
            // console.log("info", JSON.stringify(info));
            if (isWinner) {
                info = await contractSL.getTicketInfo(round, i);
                var balance = await contractSL.getBalanceWinner(info[0], round);
                // console.log("balance", Number(balance/decimal));
                console.log("number happy ticket = " + i);
                assert.equal(0.05, Number(balance/decimal));
            }
        }
    });

    it('check type step 3', async ()  => {
        var round = await contractSL.currentRound.call();
        assert.equal(4, Number(round));
        // console.log("round", round);

        await contractSL.setStepLottery(1);
        await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthTwo});
        await contractSL.buyTicket(accounts[6], {from:accounts[6], value: buyEthTwo});
        await contractSL.buyTicket(accounts[7], {from:accounts[7], value: buyEthThree});

        totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(31, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.34, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        for (var i=1; i<4;i++) {
            var isWinner = await contractSL.checkWinner(round, i);
            // console.log("number ticket = " + i);
            info = await contractSL.getTicketInfo(round, i);
            // console.log("info", JSON.stringify(info));
            if (isWinner) {
                info = await contractSL.getTicketInfo(round, i);
                var balance = await contractSL.getBalanceWinner(info[0], round);
                // console.log("balance", Number(balance/decimal));
                console.log("number happy ticket = " + i);
                assert.equal(0.05, Number(balance/decimal));
            }
        }
    });

    it('check type step 2', async ()  => {
        var round = await contractSL.currentRound.call();
        assert.equal(5, Number(round));
        // console.log("round", round);

        await contractSL.setStepLottery(0);
        await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthThree});

        await contractSL.buyTicket(accounts[6], {from:accounts[6], value: buyEthThree});
        await contractSL.buyTicket(accounts[7], {from:accounts[7], value: buyEthThree});

        totalTickets = await contractSL.totalTicketBuyed.call();
        assert.equal(37, Number(totalTickets));
        // console.log("totalTickets", Number(totalTickets));

        totalEthRaised = await contractSL.totalEthRaised.call();
        assert.equal(0.64, Number(totalEthRaised/decimal));
        // console.log("totalEthRaised", Number(totalEthRaised/decimal));

        var round = await contractSL.currentRound.call();
        round--;

        for (var i=1; i<3;i++) {
            var isWinner = await contractSL.checkWinner(round, i);
            // console.log("number ticket = " + i);
            info = await contractSL.getTicketInfo(round, i);
            //console.log("info", JSON.stringify(info));
            if (isWinner) {
                info = await contractSL.getTicketInfo(round, i);
                var balance = await contractSL.getBalanceWinner(info[0], round);
                // console.log("balance", Number(balance/decimal));
                console.log("number happy ticket = " + i);
                assert.equal(0.09, Number(balance/decimal));
            }
        }

        // await contractSL.khkhkhkhkh();
    });
    */

    /*
        it('check find happy number', async ()  => {
            var round = await contractSL.currentRound.call();
            var typeLottery = 3;
            await contractSL.setStepLottery(typeLottery);
            await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthThree});
            var randomNumber;
            console.log("check type 3");
            for (var j=11; j<31; j++) {
                await contractSL.findHappyNumber(round, typeLottery);
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log("randomNumber", Number(randomNumber));
            }

            round = await contractSL.currentRound.call();
            typeLottery = 2;
            await contractSL.setStepLottery(typeLottery);
            await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthThree});
            console.log("check type 2");
            for (var j=11; j<31; j++) {
                await contractSL.findHappyNumber(round, typeLottery);
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log("randomNumber", Number(randomNumber));
            }

            round = await contractSL.currentRound.call();
            typeLottery = 1;
            await contractSL.setStepLottery(typeLottery);
            await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthThree});
            console.log("check type 1");
            for (var j=11; j<31; j++) {
                await contractSL.findHappyNumber(round, typeLottery);
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log("randomNumber", Number(randomNumber));
            }

            round = await contractSL.currentRound.call();
            typeLottery = 0;
            await contractSL.setStepLottery(typeLottery);
            await contractSL.buyTicket(accounts[5], {from:accounts[5], value: buyEthThree});
            console.log("check type 0");
            for (var j=11; j<31; j++) {
                await contractSL.findHappyNumber(round, typeLottery);
                randomNumber = await contractSL.findHappyNumber.call(round, typeLottery);
                console.log("randomNumber", Number(randomNumber));
            }

        });
    */

});
