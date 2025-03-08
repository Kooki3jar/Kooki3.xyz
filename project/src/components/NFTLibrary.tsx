import React from 'react';
import { useNFTs } from '../hooks/useNFTs';
import { Collection } from '../types/nft';
import { Loader2, Image as ImageIcon, ExternalLink, Link2, Shield, ShieldCheck } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export function NFTLibrary() {
  const { collections, isLoading, error } = useNFTs();
  const wallet = useWallet();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Error loading NFTs: {error}</p>
      </div>
    );
  }

  if (!wallet.isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white dark:bg-dark-card rounded-xl shadow-sm">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Connect Wallet to View Your Collection</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Connect your wallet to view and manage your digital art collection. Your NFTs will appear here automatically.
          </p>
          <button
            onClick={() => wallet.connectMetaMask()}
            disabled={wallet.isConnecting}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
          >
            {wallet.isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Art Collection</h2>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-medium">Verified Only</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400 dark:text-gray-500" />
        </div>
      ) : collections.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-card rounded-xl shadow-sm">
          <Shield className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Verified NFTs Found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            No verified NFTs found in your connected wallet
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {collections.map((collection) => (
            <CollectionGroup key={`${collection.name}-${collection.blockchain}`} collection={collection} />
          ))}
        </div>
      )}
    </div>
  );
}

function CollectionGroup({ collection }: { collection: Collection }) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{collection.name}</h3>
          <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm">
            <img 
              src="https://opensea.io/static/images/favicon/favicon.ico"
              alt="OpenSea"
              className="w-4 h-4"
            />
            <span className="font-medium">OpenSea</span>
          </div>
        </div>
        {collection.floorPrice && (
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Floor Price</p>
            <p className="font-medium dark:text-white">Ξ {collection.floorPrice}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {collection.items.map((nft) => (
          <div
            key={nft.id}
            className="group relative bg-white dark:bg-dark-hover rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="aspect-square relative">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-2 bg-white dark:bg-dark-card rounded-full">
                  <ExternalLink className="w-5 h-5 dark:text-white" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-medium text-gray-900 dark:text-white truncate">{nft.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                #{nft.tokenId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}