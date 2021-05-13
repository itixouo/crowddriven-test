require('dotenv').config()
const Tx = require('ethereumjs-tx').Transaction
const util = require('ethereumjs-util');
const Web3 = require('web3');
//const web3 = new Web3("http://localhost:8545")
//const url = "https://kovan.infura.io/v3/b604a9f79011494fa81fd230eb3035f5";
//const url = "https://ropsten.infura.io/v3/b604a9f79011494fa81fd230eb3035f5";
//const web3 = new Web3( new Web3.providers.HttpProvider(url)   );
//const web3 = new Web3(web3.currentProvider);
const web3 = new Web3(ethereum);

// window.addEventListener('load', function() {

//     // Modern dapp browsers...
//     if (window.ethereum) {
//         web3 = new Web3(ethereum);

//         try { 
//           // Request account access if needed
//           ethereum.enable().then(result => {
//             // Now you can start your app & access web3 freely:
//             startApp()
//           })
//         }
//         catch(err) {
//           console.log(err);
//         }
//     }
//     // Legacy dapp browsers, checking if Web3 has been injected by the browser (Mist/MetaMask)
//     else if (typeof web3 !== 'undefined') {
//       // Use Mist/MetaMask's provider
//       web3 = new Web3(web3.currentProvider);

//       // Now you can start your app & access web3 freely:
//       startApp();

//     } else {
//       console.log('No web3? You should consider trying MetaMask!')
//       // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
//       web3 = new Web3( new Web3.providers.HttpProvider( url ));
//       //web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:8545/" ));
//       // web3 = new Web3( new Web3.providers.HttpProvider( "https://rpc.tch.in.th" ));

//       // Now you can start your app & access web3 freely:
//       startApp();
//     }
//   })



const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "token",
                "type": "uint256"
            }
        ],
        "name": "exchange",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCoins",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "coins",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getSender",
        "outputs": [
            {
                "internalType": "address",
                "name": "adr",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "coins",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]


var contractAddress = "0xFed7ba411c218409367A98dd2E1F54aeFAA02296";
var userAccount = "0x6001377B66d26407543229b7Ee1A08b09c00BfC6";





function startApp() {

}


async function enableAccount() {
    await ethereum.enable();
}

async function getCoins() {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const call = await contract.methods.getCoins().call();
    return call;
}
async function getAccount() {
    await ethereum.enable();
    const accounts = window.ethereum.selectedAddress;
    web3.eth.defaultAccount = accounts;
    return accounts;
}

async function exchange(value) {
    const contract = new web3.eth.Contract(abi, contractAddress);

    let options = {
        from: userAccount
    }
    const call = await contract.methods.exchange(value).send(options);
    console.log(`result`, call)


    // let txCount = await web3.eth.getTransactionCount(userAccount);
    // if(txCount == 0){txCount = 1;}

    // let rawTx = {
    //     from: userAccount,
    //     to: contractAddress,
    //     gasLimit: web3.utils.toHex(175000),
    //     gasPrice: web3.utils.toHex(2 * 10 ** 9),
    //     value: '0x0',
    //     data: contract.methods.exchange(value).encodeABI(),
    //     nonce: web3.utils.toHex(txCount)

    // }


    // console.log(`raw tx `, rawTx)

    // const newNonce = web3.utils.toHex(txCount)
    // const tx = new Tx( rawTx ,{ chain: 'kovan' })


    // tx.sign(new Buffer.from("5728a7b6183104c7f35fb814d4c126a209270f37261f588be949cbb1ae97f4c7", 'hex'))

    // let serializedTx = tx.serialize()
    // const result = await web3.eth.sendSignedTransaction('0x' +
    //     serializedTx.toString('hex'))

    // console.log(`result`, result)



    // const resultTx = await web3.eth.sendRawTransaction(rawTx);
    // console.log(`result`, resultTx)
}


function getTransactionCoins() {
    getCoins().then(
        console.log("Coins : " + value)
    );

}

function sendTransactionExchange(value) {
    exchange(value).then(
        getTransactionCoins()

    );
}

function setTransactionAccount(value) {
    userAccount = value;
}

function test() {
    console.log("test")
}

export { test, getCoins, exchange, getAccount, setTransactionAccount, enableAccount };