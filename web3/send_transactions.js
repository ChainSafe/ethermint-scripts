const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545/rpc")
);

module.exports = {
  sendTransactionsToAccount: function(account, contractAddress) {
    for (let i = 0; i < 1; i++) {
      console.log("\t\t" + (i + 1) + " - Transactions");
      web3.eth.sendTransaction(
        {
          from: account,
          to: contractAddress,
          value: 5,
          gas: 200000,
          gasPrice: 20
        },
        function(e, hash) {
          if (e) {
            console.log("err :: ", e);
          }
          console.log("tx hash:: ", hash);
        }
      );
      web3.eth.sendTransaction(
        {
          from: account,
          to: contractAddress,
          value: 291,
          gas: 200000,
          gasPrice: 20
        },
        function(e, hash) {
          if (e) {
            console.log("err :: ", e);
          }
          console.log("tx hash:: ", hash);
        }
      );
      web3.eth.sendTransaction(
        {
          from: account,
          to: contractAddress,
          value: 53039,
          gas: 200000,
          gasPrice: 20
        },
        function(e, hash) {
          if (e) {
            console.log("err :: ", e);
          }
          console.log("tx hash:: ", hash);
        }
      );
    }
  }
};
