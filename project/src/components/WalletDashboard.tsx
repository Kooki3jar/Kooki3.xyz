import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { useNFTs } from '../hooks/useNFTs';
import { 
  Wallet, 
  Activity, 
  Coins, 
  Image as ImageIcon, 
  ExternalLink,
  Network,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';

export function WalletDashboard() {
  const { isConnected, address, type, balance, network, transactions, tokens } = useWallet();
  const { collections, isLoading: nftsLoading } = useNFTs();

  if (!isConnected) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Wallet className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Wallet Connected</h3>
          <p className="text-gray-500">Connect your wallet to view your assets and activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Account Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Wallet Overview</h2>
                <p className="text-sm text-gray-500 font-mono">{address}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Network</p>
                <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                  <Network className="w-4 h-4" />
                  <span className="font-medium">{network?.name || 'Ethereum'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                <p className="text-2xl font-bold text-gray-900">{balance} ETH</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Token Types</p>
                <p className="text-2xl font-bold text-gray-900">{tokens?.length || 0}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">NFT Collections</p>
                <p className="text-2xl font-bold text-gray-900">{collections.length}</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-500" />
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {transactions?.length ? (
                transactions.map((tx) => (
                  <div key={tx.hash} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {tx.type === 'incoming' ? (
                        <ArrowDownRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {tx.type === 'incoming' ? 'Received' : 'Sent'} {tx.value} ETH
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Token Holdings */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-gray-500" />
              Token Holdings
            </h3>

            {tokens?.length ? (
              <div className="space-y-3">
                {tokens.map((token, index) => (
                  <div key={`${token.address}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={token.logo}
                        alt={token.symbol}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{token.symbol}</p>
                        <p className="text-sm text-gray-500">{token.balance}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">
                      ${token.value.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No tokens found
              </div>
            )}
          </div>

          {/* NFT Preview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-500" />
              NFT Collections
            </h3>

            {nftsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : collections.length ? (
              <div className="space-y-3">
                {collections.map((collection) => (
                  <div key={`${collection.name}-${collection.blockchain}`} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{collection.name}</h4>
                      <span className="text-sm text-gray-500">
                        {collection.items.length} items
                      </span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {collection.items.slice(0, 4).map((nft) => (
                        <img
                          key={nft.id}
                          src={nft.image}
                          alt={nft.name}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No NFTs found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}