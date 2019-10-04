const Web3 = require("web3");
const txs = require("./send_transactions");

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545/rpc")
);
let data = "[{\"constant\":true,\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"items\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"version\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"key\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"value\",\"type\":\"bytes32\"}],\"name\":\"setItem\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_version\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"key\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"bytes32\",\"name\":\"value\",\"type\":\"bytes32\"}],\"name\":\"ItemSet\",\"type\":\"event\"}]"

const ABI = JSON.parse(data);

const testContract = new web3.eth.Contract(ABI);

async function getCurrentAccount() {
  const currentAccounts = await web3.eth.getAccounts();
  console.log(
    `getCurrentAccount has resolved, returning a value of ${currentAccounts[0]}`
  );
  return currentAccounts[0];
}
function deployContract(account) {
  return testContract
    .deploy({
      arguments: ["1.0"],
      data:
        "0x608060405234801561001057600080fd5b506040516104483803806104488339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b8382019150602082018581111561006957600080fd5b825186600182028301116401000000008211171561008657600080fd5b8083526020830192505050908051906020019080838360005b838110156100ba57808201518184015260208101905061009f565b50505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b50604052505050806000908051906020019061010492919061010b565b50506101b0565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061014c57805160ff191683800117855561017a565b8280016001018555821561017a579182015b8281111561017957825182559160200191906001019061015e565b5b509050610187919061018b565b5090565b6101ad91905b808211156101a9576000816000905550600101610191565b5090565b90565b610289806101bf6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806348f343f31461004657806354fd4d5014610088578063f56256c71461010b575b600080fd5b6100726004803603602081101561005c57600080fd5b8101908080359060200190929190505050610143565b6040518082815260200191505060405180910390f35b61009061015b565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100d05780820151818401526020810190506100b5565b50505050905090810190601f1680156100fd5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101416004803603604081101561012157600080fd5b8101908080359060200190929190803590602001909291905050506101f9565b005b60016020528060005260406000206000915090505481565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101f15780601f106101c6576101008083540402835291602001916101f1565b820191906000526020600020905b8154815290600101906020018083116101d457829003601f168201915b505050505081565b8060016000848152602001908152602001600020819055507fe79e73da417710ae99aa2088575580a60415d359acfad9cdd3382d59c80281d48282604051808381526020018281526020019250505060405180910390a1505056fea265627a7a72315820bff832e964f8020996e8fb76ed931fb57fc48ad055257fcaee4817dbe8dcf52464736f6c634300050b0032"
    })
    .send({
      // Need to add manually
      from: account,
      gas: "470000",
      gasPrice: 20
    })
    .then(function(newContractInstance) {
      console.log("Contract Address:: ", newContractInstance.options.address);
      return newContractInstance;
    })
    .catch(err => console.log(err));
}

getCurrentAccount().then(function(account) {
  deployContract(account)
    .then(function(contract) {
      console.log(account, contract.options.address);
      interact(contract, account, "test1")
      interact(contract, account, "test2")
    //   txs.sendTransactionsToAccount(account, contractAddr);
    })
    .catch(err => console.log(err));
});

function interact(newContractInstance, account, name) {
    newContractInstance.methods.setItem(web3.utils.fromAscii(name).padEnd(66, '0'), web3.utils.fromAscii('Lick').padEnd(66, '0'))
        .send({
            // Need to add manually
            from: account,
            gas: '470000',
            gasPrice: '10'
        });
}
