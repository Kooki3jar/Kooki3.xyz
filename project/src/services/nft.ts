import { NFT } from '../types/nft';

const OPENSEA_API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;
const OPENSEA_API_URL = 'https://api.opensea.io/api/v2';

export async function fetchOpenseaNFTs(address: string): Promise<NFT[]> {
  try {
    const response = await fetch(
      `${OPENSEA_API_URL}/chain/ethereum/account/${address}/nfts`,
      {
        headers: {
          'X-API-KEY': OPENSEA_API_KEY,
          'Accept': 'application/json'
        },
      }
    );

    if (!response.ok) throw new Error('Failed to fetch OpenSea NFTs');

    const data = await response.json();
    
    return data.nfts.map((nft: any) => ({
      id: nft.identifier,
      name: nft.name || `${nft.collection} #${nft.identifier}`,
      image: nft.image_url,
      collection: nft.collection,
      blockchain: 'ethereum',
      tokenId: nft.identifier,
      contractAddress: nft.contract,
      verified: nft.collection_metadata?.safelist_request_status === 'verified',
      marketplace: 'opensea'
    }));
  } catch (error) {
    console.error('OpenSea API Error:', error);
    return [];
  }
}