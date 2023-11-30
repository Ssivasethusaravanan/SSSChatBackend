import {
    LightSmartContractAccount,
    getDefaultLightAccountFactoryAddress,
  } from "@alchemy/aa-accounts";
  import { AlchemyProvider } from "@alchemy/aa-alchemy";
  import { Address, LocalAccountSigner, type Hex } from "@alchemy/aa-core";
  import { polygonMumbai } from "viem/chains";
  var apcd;
  const chain = polygonMumbai;
  
  // The private key of your EOA that will be the owner of Light Account
  const PRIVATE_KEY = "0x44e061ac7d25d1327aebf30d8905df185623af5b0100203eecc68a6bd8b1e7a2" as Hex;
  const owner = LocalAccountSigner.privateKeyToAccountSigner(PRIVATE_KEY);
  
  // Create a provider to send user operations from your smart account
  const provider = new AlchemyProvider({
    // get your Alchemy API key at https://dashboard.alchemy.com
    apiKey: "JVLV4xu3CjSUKUNEfXXJSuJ3xz6ZrCLe",
    chain,
  }).connect(
    (rpcClient) =>
      new LightSmartContractAccount({
        rpcClient,
        owner,
        chain,
        factoryAddress: getDefaultLightAccountFactoryAddress(chain),
      })
  );
  
  
  (async () => {
    try{
    // Fund your account address with ETH to send for the user operations
    // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
    console.log("Smart Account Address: ", await provider.getAddress()); // Log the smart account address
  
    const vitalikAddress =
      "0xE845D53FEe04925aBF2c8C892fEA75867abcD387" as Address;
    // Send a user operation from your smart account to Vitalik that does nothing
    const { hash: uoHash } = await provider.sendUserOperation({
      target: vitalikAddress, // The desired target contract address
      data: "0x", // The desired call data
      value:  BigInt(100000000000000000)
      , // (Optional) value to send the target contract address
    });
  
    console.log("UserOperation Hash: ", uoHash); // Log the user operation hash
   
    // Wait for the user operation to be mined
    const txHash = await provider.waitForUserOperationTransaction(uoHash);
  apcd = uoHash;
    console.log("Transaction Hash: ", txHash); 
    // Log the transaction hash
}catch(ex){
    const txHash = await provider.waitForUserOperationTransaction(apcd);
  
    console.log("Transaction Hash: ", txHash); 
    console.log('the error was ' + ex);
}
  })();