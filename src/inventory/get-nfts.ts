import axios from "axios";

export interface Nft {
  name: string;
  address: string;
  tokenId: string;
  balance: string;
  data: any;
}

const cache: {
  [key: string]: any
} = {};

async function getData(address: string): Promise<any> {
  const chainId: string = "137"; // Polygon Mainnet
  const req = axios({
    baseURL: "https://api.covalenthq.com/v1",
    method: "GET",
    url: `/${chainId}/address/${address}/balances_v2/`,
    params: {
      "quote-currency": "USD",
      format: "JSON",
      nft: true,
      key: process.env.COVALENT_API_KEY,
      "no-nft-fetch": false,
    },
  });

  if (cache[address]) {
    req.then((res) => {
      cache[address] = res.data;
    });
    return cache[address];
  } else {
    const res = await req;
    cache[address] = res.data;
    return cache[address];
  }
}

export default async function getNfts(address: string): Promise<Nft[]> {
  const items: any[] = (await getData(address)).data.items;
  const nfts = await Promise.all(
    items
      .filter(({ type }) => type === "nft")
      .filter(({ nft_data }) => nft_data !== null)
      .map(({ contract_name, nft_data, contract_address }) => {
        const nftData = nft_data as {
          token_id: string;
          token_balance: string;
          token_url: string;
        }[];
        return nftData.map(async ({ token_id, token_balance, token_url }) => ({
          name: contract_name as string,
          address: contract_address as string,
          tokenId: token_id,
          balance: token_balance,
          data: (await axios.get(token_url)).data,
        }));
      })
      .reduce((a, b) => a.concat(b), [])
  );
  return nfts;
}
