const Moralis = require("moralis").default;;
Moralis.start({
    apiKey: "IMFmAtjESeLWZAbGomt3yCQljvrtBep7kNQFtyOkJfvjek2LOWSBUnmxGWXeB42P"
  });
async function getNFT(address, chain) {
  try {
    // Initialize Moralis SDK with the API key
     

    // Fetch NFTs using Moralis SDK
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": chain, // Replace with the correct chain ID if needed
      "format": "decimal",
      "mediaItems": false,
      "address": address
    });
return response;
    // Log the raw response
    console.log(response.raw);
  } catch (e) {
    // Handle errors
    console.error(e);
  }
}
module.exports.getNFT = getNFT;
// Call the function to fetch NFTs
 
