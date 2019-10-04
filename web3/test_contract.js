const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545/rpc")
);

const contract = fs.readFileSync("./logsContract/build/Logger.bin").toString();
const abiData = fs.readFileSync("./logsContract/build/Logger.abi").toString();

const ABI = JSON.parse(abiData);

const testContract = new web3.eth.Contract(ABI);

async function getCurrentAccount() {
  const currentAccounts = await web3.eth.getAccounts();
  console.log("Unlocked account address: " + currentAccounts[0]);
  return currentAccounts[0];
}
function deployContract(account) {
  return testContract
    .deploy({
      arguments: ["1.0"],
      data: "0x" + contract
    })
    .send({
      from: account,
      gas: "470000",
      gasPrice: 20
    })
    .then(function(newContractInstance) {
      console.log("Contract Address: ", newContractInstance.options.address);
      return newContractInstance;
    })
    .catch(err => console.log(err));
}

getCurrentAccount().then(function(account) {
  deployContract(account)
    .then(function(contract) {
      interact(contract, account, true);
      interact(contract, account, false);
    })
    .catch(err => console.log(err));
});

function interact(newContractInstance, account, name) {
  newContractInstance.methods
    .emitTest(name)
    .send({
      from: account,
      gas: "470000",
      gasPrice: "10"
    })
    .then(res => console.log("Tx", res.transactionIndex, ":", res.logsBloom));
}
