require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan"); 
require('dotenv').config()

module.exports = {
  solidity: "0.8.20",
  networks:{
    mumbai:{
      url: 'https://polygon-mumbai.g.alchemy.com/v2/JVLV4xu3CjSUKUNEfXXJSuJ3xz6ZrCLe',
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: '2W3RWX4HKJITRBWKUQ58EKY3H1I68HXCMQ'
    }}
};