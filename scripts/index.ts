import {
    LightSmartContractAccount,
    getDefaultLightAccountFactoryAddress,
  } from "@alchemy/aa-accounts";
  import { AlchemyProvider } from "@alchemy/aa-alchemy";
  import { LocalAccountSigner, type Hex } from "@alchemy/aa-core";
  import { polygonMumbai } from "viem/chains";
  
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
    // Fund your account address with ETH to send for the user operations
    // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
    console.log("Smart Account Address: ", await provider.getAddress()); // Log the smart account address
  })();