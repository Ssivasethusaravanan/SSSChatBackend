const ethereumjsWallet = require('ethers');

async function createAccountFromIdToken(idToken) {
  try {
     const mnemonic = ethereumjsWallet.Wallet.createRandom();
    const accountInfo = {
      address: mnemonic.address,
      privateKey: mnemonic.privateKey, // Store securely!
    };
//  console.log(accountInfo);
    return accountInfo;
  } catch (error) {
    console.error('Error creating account from ID token:', error);
    throw error; // Re-throw to handle appropriately
  }
}
module.exports.createAccountFromIdToken = createAccountFromIdToken;
//createAccountFromIdToken("ioahdu");
