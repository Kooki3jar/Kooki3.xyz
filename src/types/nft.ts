export interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  blockchain: 'ethereum' | 'solana';
  tokenId: string;
  contractAddress?: string;
  mintAddress?: string;
  verified: boolean;
  marketplace: 'opensea' | 'magiceden' | null;
}

export interface Collection {
  name: string;
  blockchain: 'ethereum' | 'solana';
  items: NFT[];
  floorPrice?: number;
  totalSupply?: number;
  verified: boolean;
  marketplace: 'opensea' | 'magiceden' | null;
}