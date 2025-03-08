import React from 'react';
import { Filter, TrendingUp, Clock, Lock } from 'lucide-react';

interface FeedFiltersProps {
  activeFilter: 'all' | 'following' | 'nft';
  onFilterChange: (filter: 'all' | 'following' | 'nft') => void;
  sortBy: 'trending' | 'recent';
  onSortChange: (sort: 'trending' | 'recent') => void;
}

export function FeedFilters({ activeFilter, onFilterChange, sortBy, onSortChange }: FeedFiltersProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => onFilterChange('following')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'following'
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
              }`}
            >
              Following
            </button>
            <button
              onClick={() => onFilterChange('nft')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                activeFilter === 'nft'
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
              }`}
            >
              <Lock className="w-4 h-4" />
              NFT Only
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSortChange('trending')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'trending'
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
          <button
            onClick={() => onSortChange('recent')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'recent'
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-hover'
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent
          </button>
        </div>
      </div>
    </div>
  );
}