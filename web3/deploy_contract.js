const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const contract = fs
  .readFileSync("../contracts/logsContract/build/Logger.bin")
  .toString();
const abiData = fs
  .readFileSync("../contracts/logsContract/build/Logger.abi")
  .toString();

const ABI = JSON.parse(abiData);

const testContract = new web3.eth.Contract(ABI);

async function getCurrentAccount() {
  const currentAccounts = await web3.eth.getAccounts();
  console.log("Unlocked account address: " + currentAccounts[0]);
  return currentAccounts[0];
}
async function deployContract(account) {
  return testContract
    .deploy({
      arguments: ["1.0"],
      data: "0x" + contract
    })
    .send({
      from: account,
      gas: 470000,
      gasPrice: 20
    })
    .then(function (newContractInstance) {
      console.log("Contract Address: ", newContractInstance.options.address);
      return newContractInstance;
    })
    .catch(err => console.log(err));
}

async function interact(newContractInstance, account, name, nonce) {
  return newContractInstance.methods
    .emitTest(name)
    .send({
      from: account,
      gas: 470000,
      gasPrice: 10,
      nonce: nonce
    })
    .then(function (res) {
      console.log("Tx", res.transactionIndex, ":", res.logsBloom);
      return res.blockNumber;
    });
}

async function run() {
  const account = await getCurrentAccount();
  const contract = await deployContract(account);
  let nonce = await web3.eth.getTransactionCount(account);
  interact(contract, account, true, nonce);
  const blockNum = await interact(contract, account, false, nonce + 1);
  console.log("block number: " + blockNum);
  // web3.eth.getBlock(parseInt(blockNum)).then(console.log);
}

run().then(() => console.log("done"));
