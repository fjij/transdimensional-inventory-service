import axios from "axios";
import Dotenv from "dotenv";
Dotenv.config();

async function run() {

  const contractAddress = process.env.CONTRACT_ADDRESS;

  const assets = [
    {
      name: "Dog",
      description: "Arf arf.",
      assetId: 257489726,
    },
    {
      name: "Grapple Hook",
      description: "Reach new heights!",
      assetId: 4683228878,
    },
    {
      name: "Dragonite Auto Venerra GTR",
      description: "Vroom vroom.",
      assetId: 284055952,
    },
  ]

  for (const asset of assets) {
    console.log(asset.name);

    const imageUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${asset.assetId}&width=480&height=480&format=png`;
    
    const response = await axios.post('https://api.nftport.xyz/v0/metadata', {
      name: asset.name,
      description: asset.description,
      file_url: imageUrl,
      custom_fields: {
        roblox_asset_id: asset.assetId
      }
    }, { headers: { 'Authorization': process.env.NFTPORT_API_KEY } });

    console.log(response.data);

    const metadataUri = response.data.metadata_uri;

    const res2 = await axios.post('https://api.nftport.xyz/v0/mints/customizable', {
      chain: "polygon",
      contract_address: contractAddress,
      metadata_uri: metadataUri,
      mint_to_address: process.env.TO_ADDRESS
    }, { headers: { 'Authorization': process.env.NFTPORT_API_KEY } });

    console.log(res2.data);
  }
}

run();
