import React from 'react';
import { useCryptoNews } from '../../hooks/useCryptoNews';
import { NewsCard } from './NewsCard';
import { Bitcoin, DollarSign, TrendingUp, Loader2, AlertTriangle } from 'lucide-react';

export function CryptoNewsSection() {
  const { articles, bitcoinPrice, isLoading, error } = useCryptoNews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600 dark:text-teal-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-red-800 dark:text-red-300">Error Loading News</h3>
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Bitcoin Price Ticker */}
      {bitcoinPrice && (
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Bitcoin className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Bitcoin Price</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1 text-white/80">
                  <DollarSign className="w-4 h-4" />
                  <span>USD</span>
                </div>
                <div className="text-2xl font-bold">${bitcoinPrice.USD.toLocaleString()}</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1 text-white/80">
                  <span className="font-medium">£</span>
                  <span>GBP</span>
                </div>
                <div className="text-2xl font-bold">£{bitcoinPrice.GBP.toLocaleString()}</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1 text-white/80">
                  <span className="font-medium">€</span>
                  <span>EUR</span>
                </div>
                <div className="text-2xl font-bold">€{bitcoinPrice.EUR.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-white/80 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Last updated: {new Date(bitcoinPrice.updated).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* News Articles */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Bitcoin className="w-5 h-5 text-orange-500" />
          Latest Crypto News
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 6).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}