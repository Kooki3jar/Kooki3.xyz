import { useState, useEffect } from 'react';
import { NFT, Collection } from '../types/nft';
import { useWallet } from './useWallet';
import { useUser } from '../context/UserContext';
import { fetchOpenseaNFTs } from '../services/nft';

export function useNFTs() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wallet = useWallet();
  const { user } = useUser();

  const isWalletLinked = () => {
    if (!user || !wallet.type || !wallet.address) return false;
    return user.linkedWallets && user.linkedWallets[wallet.type] === wallet.address;
  };

  const groupNFTsByCollection = (nfts: NFT[]): Collection[] => {
    const grouped = nfts.reduce((acc, nft) => {
      const key = `${nft.collection}-${nft.blockchain}`;
      if (!acc[key]) {
        acc[key] = {
          name: nft.collection,
          blockchain: nft.blockchain,
          items: [],
          verified: nft.verified,
          marketplace: nft.marketplace
        };
      }
      acc[key].items.push(nft);
      return acc;
    }, {} as Record<string, Collection>);

    return Object.values(grouped);
  };

  const fetchAllNFTs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!isWalletLinked()) {
        setCollections([]);
        return;
      }

      const nfts: NFT[] = [];
      
      // Fetch Ethereum NFTs if MetaMask is connected
      if (wallet.type === 'metamask' && wallet.address) {
        const ethNFTs = await fetchOpenseaNFTs(wallet.address);
        nfts.push(...ethNFTs);
      }

      // Fetch Solana NFTs if Phantom is connected
      if (wallet.type === 'phantom' && wallet.address) {
        // Add Solana NFT fetching logic here when implemented
        // const solNFTs = await fetchSolanaNFTs(wallet.address);
        // nfts.push(...solNFTs);
      }

      const groupedCollections = groupNFTsByCollection(nfts);
      setCollections(groupedCollections);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (wallet.isConnected) {
      fetchAllNFTs();
    } else {
      setCollections([]);
    }
  }, [wallet.isConnected, wallet.address, wallet.type, user]);

  return { collections, isLoading, error, refetch: fetchAllNFTs };
}