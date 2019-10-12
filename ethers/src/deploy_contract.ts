import { ethers } from "ethers";
import fs from "fs";

const provider = new ethers.providers.JsonRpcProvider(
  "http://localhost:8545/rpc"
);

const contract = fs.readFileSync("../contracts/logsContract/build/Logger.bin").toString();
const abiData = fs.readFileSync("../contracts/logsContract/build/Logger.abi").toString();

const ABI = JSON.parse(abiData);

async function getCurrentAccount(): Promise<string> {
  let currentAccounts;
  try {
    currentAccounts = await provider.listAccounts();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Unlocked account address: " + currentAccounts[0]);
  return currentAccounts[0];
}
async function deployContract(account: string): Promise<ethers.Contract> {
  const signer = provider.getSigner(account);
  const testContract = new ethers.ContractFactory(ABI, contract, signer);
  let ctr: ethers.Contract;
  try {
    ctr = await testContract.deploy({
      value: 0,
      gasLimit: 200000
    });
    await ctr.deployed();
  } catch (err) {
    console.warn(err);
  }
  return ctr;
}

async function interact(
  contract: ethers.Contract,
  account: string,
  name: boolean
): Promise<any> {
  return contract
    .emitTest(name)
    .send({
      from: account,
      gas: 470000,
      gasPrice: 10
    })
    .then(function(res: any) {
      console.log("Tx", res.transactionIndex, ":", res.logsBloom);
      return res.blockNumber;
    });
}

async function run(): Promise<void> {
  const account = await getCurrentAccount();
  // const deployed = await deployContract(account);
  // interact(deployed, account, true);
  // const blockNum = await interact(deployed, account, false);
  // console.log("block number: " + blockNum);
  console.log("Deploy not functional");
  //   web3.eth.getBlock(parseInt(blockNum)).then(console.log);
}

run().then(() => console.log("done"));
