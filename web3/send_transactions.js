const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545/rpc'));
for (let i = 0; i < 1; i++) {
    console.log('\t\t' + (i + 1) + ' - Transactions');
    web3.eth.sendTransaction({
        from: "0xd66cab063a77f91013cad2fd16553dd3909f5e9b", // Need to add manually
        to: "0x1f5b030f6e655d44f105ed1d0184268e1c6c469a", // Need to add manually
        value: 5,
        gas: 50000,
        gasPrice: 10
    }, function(e, hash){
        if (e) {
            console.log("err :: ", e);
        }
        console.log("tx hash:: ", hash);
    });
    web3.eth.sendTransaction({
        from: "0xd66cab063a77f91013cad2fd16553dd3909f5e9b", // Need to add manually
        to: "0x1f5b030f6e655d44f105ed1d0184268e1c6c469a", // Need to add manually
        value: 291,
        gas: 50000,
        gasPrice: 10
    }, function(e, hash){
        if (e) {
            console.log("err :: ", e);
        }
        console.log("tx hash:: ", hash);
    });
    web3.eth.sendTransaction({
        from: "0xd66cab063a77f91013cad2fd16553dd3909f5e9b", // Need to add manually
        to: "0x1f5b030f6e655d44f105ed1d0184268e1c6c469a", // Need to add manually
        value: 53039,
        gas: 50000,
        gasPrice: 10
    }, function(e, hash){
        if (e) {
            console.log("err :: ", e);
        }
        console.log("tx hash:: ", hash);
    });
}