const { Web3 } = require('web3');
var Web3HttpProvider = require('web3-providers-http');

const provider = new Web3.providers.HttpProvider('https://rpc.mumbai.polygon.technology/');
const web3 = new Web3(provider);
const address = '0x3215428C7eBCE6A47eb7BbEb36dcadFf6247bFd8';

web3.eth.getTransaction(address).then(console.log);
