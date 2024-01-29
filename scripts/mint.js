const ethers = require("ethers");

const abi = require("./SSSTtoken.json");
require("dotenv").config();

let networkDetails = " ";
let mintTo = "0";
let metadataUrl = " ";
const contractAddress = "0x54C0f6905aFEE63f49c392937e41408223757198";
const mintNFT = async function mintNFT(toAddress, url) {
  try {
    console.log("Starting... event address is");
    mintTo =  toAddress;

    networkDetails =
      "https://polygon-mumbai.g.alchemy.com/v2/JVLV4xu3CjSUKUNEfXXJSuJ3xz6ZrCLe";

    metadataUrl =  url;
  } catch (err) {
    console.log("Starting... error with event processing ", err);
    return "error processing NFT mint";
  }

  const Address = contractAddress;
  const ABI = abi.abi;

  console.log("Contract ABIs loaded");

  const provider = new ethers.JsonRpcProvider(networkDetails);

  let privateKey = "2a2f207c5d3bf5ad46080cd67612871c0456a688aec56ad31fdaa9f6b0936420";
  let wallet = new ethers.Wallet(privateKey);

  wallet = wallet.connect(provider);
  console.log("Ethers wallet loaded");

  const contract = new ethers.Contract(Address, ABI, wallet);
  console.log("Contract loaded");

  console.log("Meta reference is...", metadataUrl);

  console.log("Mint NFT and transfer to address");
  try {
    const overrides = { gasPrice: 250000 };

    console.log("overrides ...", overrides);

    const tx = await contract.safeMint(mintTo, metadataUrl);

    console.log(tx);
  } catch (err) {
    const errorMessage = `:warning: Transaction failed: ${err.message}`;
    console.error(errorMessage);
    //  await postToSlack(errorMessage);
    return err;
  }

  console.log("Completed");
  return true;
};
module.exports.mintNFT = mintNFT;
