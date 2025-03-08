import React, { useState, useEffect } from 'react';
import { BreakingNewsBanner } from './BreakingNewsBanner';
import { NewsCard } from './NewsCard';
import { NewsCategory } from './NewsCategory';
import { TrendingSection } from './TrendingSection';
import { CryptoNewsSection } from './CryptoNewsSection';
import { CryptoTickerBanner } from '../crypto/CryptoTickerBanner';
import { ArrowUpRight, Newspaper, TrendingUp, Coins, Briefcase, Zap } from 'lucide-react';

// Mock data - In a real app, this would come from an API
const mockNews = {
  breaking: [
    {
      id: 1,
      title: "Bitcoin Surges Past $50,000 as Market Sentiment Improves",
      source: "CryptoNews",
      time: "2 minutes ago",
      url: "#",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80"
    },
    {
      id: 2,
      title: "Major Bank Announces Crypto Custody Service",
      source: "BlockchainDaily",
      time: "15 minutes ago",
      url: "#",
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=800&q=80"
    },
    {
      id: 3,
      title: "New DeFi Protocol Reaches $1B TVL in 24 Hours",
      source: "DeFiWatch",
      time: "45 minutes ago",
      url: "#",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
    }
  ],
  trending: [
    {
      id: 4,
      title: "Ethereum Layer 2 Solutions See Record Growth",
      description: "Transaction volumes on Ethereum L2 networks reach new all-time highs as adoption grows.",
      source: "CryptoInsider",
      time: "2 hours ago",
      url: "#",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80"
    },
    {
      id: 5,
      title: "NFT Market Shows Signs of Recovery",
      description: "Trading volumes increase as new collections and use cases emerge.",
      source: "NFTDaily",
      time: "3 hours ago",
      url: "#",
      image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80"
    }
  ],
  categories: {
    markets: [
      {
        id: 6,
        title: "Market Analysis: Top Altcoins to Watch",
        description: "Technical analysis of promising altcoins showing bullish patterns.",
        source: "CryptoAnalyst",
        time: "4 hours ago",
        url: "#",
        image: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=800&q=80"
      }
    ],
    technology: [
      {
        id: 7,
        title: "New Blockchain Protocol Promises 100k TPS",
        description: "Innovative consensus mechanism could solve scalability issues.",
        source: "TechCrypto",
        time: "5 hours ago",
        url: "#",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80"
      }
    ],
    regulation: [
      {
        id: 8,
        title: "SEC Commissioner Comments on Crypto Regulation",
        description: "New statements suggest potential shift in regulatory approach.",
        source: "CryptoLaw",
        time: "6 hours ago",
        url: "#",
        image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&q=80"
      }
    ]
  }
};

const categories = [
  { id: 'markets', name: 'Markets', icon: TrendingUp },
  { id: 'technology', name: 'Technology', icon: Zap },
  { id: 'regulation', name: 'Regulation', icon: Briefcase },
  { id: 'crypto', name: 'Crypto', icon: Coins }
];

export function NewsDashboard() {
  const [activeCategory, setActiveCategory] = useState('markets');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark">
      {/* Crypto Ticker Banner */}
      <CryptoTickerBanner />
      
      {/* Breaking News Banner */}
      <BreakingNewsBanner news={mockNews.breaking} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crypto News</h1>
          <a
            href="#"
            className="flex items-center gap-2 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
          >
            <Newspaper className="w-5 h-5" />
            <span className="font-medium">All News</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Trending Section */}
        <TrendingSection articles={mockNews.trending} />

        {/* Categories */}
        <div className="mt-12">
          <div className="flex items-center gap-6 border-b border-gray-200 dark:border-dark-border mb-6 overflow-x-auto pb-1">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 pb-4 px-2 font-medium transition-colors whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {activeCategory === 'crypto' ? (
            <CryptoNewsSection />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNews.categories[activeCategory]?.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}