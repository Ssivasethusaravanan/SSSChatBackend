const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const runApp = async () => {
  await Moralis.start({
    apiKey: "IMFmAtjESeLWZAbGomt3yCQljvrtBep7kNQFtyOkJfvjek2LOWSBUnmxGWXeB42P",
    // ...and any other configuration
  });

  const address = "0x3215428C7eBCE6A47eb7BbEb36dcadFf6247bFd8";

  const chain = EvmChain.MUMBAI;

  const response = await Moralis.EvmApi.transaction.getWalletTransactions({
    address,
    chain,
  });

  console.log(response. toJSON());
};

runApp();