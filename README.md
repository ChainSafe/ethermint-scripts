# Web3 Scripts

Web3 RPC calls for sending multiple transactions or deploying and interacting with smart contract.

## Installation

```
cd web3 && npm i
```

## Usage

Be sure to add an unlocked eth address in the From fields of both functions

> Send transactions x3
```
node send_transactions.js
```

> Deploy and interact with smart contract
```
npm run testDeploys
```

## Infomation about events emitted

The abi of the contract deployed is:
```
[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "name": "event1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "event2",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "_name",
        "type": "bool"
      }
    ],
    "name": "emitTest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
```

As you can see in the abi,  there are two events **event1** with a **count uint256** emitted and event2 with **owner address** indexed and emitted.

###  Signatures for each events

**event1**
event1(uint256 count ) signature will be keccak('event1(uint256)')
  * event-topic - 84e603adc6c5752ecafe165459551af7ba28bb2e6a2bfacc9ccb8f0ae12c76e6
  * data - The value of results is 256
  

**event2**
* event2(address owner ) signature will be keccak('event2(address)')
  * event-topic - 2b6c5ac5969ae7377b33deb52d22bfaa3b344e22cafec1358b3cd6a136a58269
  * indexed-topic - contains the owner's address 
  * data - Nothing is stored in the data since all fields in the event are indexed