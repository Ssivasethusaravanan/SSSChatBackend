
const { Alchemy, Network }=require( "alchemy-sdk");

const config = {
  apiKey: "JVLV4xu3CjSUKUNEfXXJSuJ3xz6ZrCLe",
  network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(config);
const tokenInfoMap = {};
const balanceAndSymbol = {};
const getBalances = async (ownerAddress) => {
  // Wallet address
  const address = ownerAddress;

  // Get token balances
  const balances = await alchemy.core.getTokenBalances(address);

  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== "0";
  });

  console.log(`Token balances of ${address} \n`);

  // Counter for SNo of final output
  let i = 1;

  // Loop through all tokens with non-zero balance
  for (let token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;

    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
     // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);
var combinedBalance = balance+' '+ metadata.symbol;
tokenInfoMap[metadata.name] = combinedBalance;

    // Print name, balance, and symbol of token
   
  }
  console.log("Token Information Map:", tokenInfoMap);

  return tokenInfoMap;
};

 
  
module.exports.getBalances = getBalances;