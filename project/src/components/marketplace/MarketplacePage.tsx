import React from 'react';
import { StoreCard } from './StoreCard';
import { Search, Filter } from 'lucide-react';
import { stores } from '../../data/stores';

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [priceFilter, setPriceFilter] = React.useState('all');
  const [ratingFilter, setRatingFilter] = React.useState('all');

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = priceFilter === 'all' ? true :
      priceFilter === 'low' ? store.priceRange.includes('$') && !store.priceRange.includes('$$$') :
      priceFilter === 'medium' ? store.priceRange.includes('$$') :
      store.priceRange.includes('$$$');

    const matchesRating = ratingFilter === 'all' ? true :
      ratingFilter === '4.5+' ? store.rating >= 4.5 :
      ratingFilter === '4.8+' ? store.rating >= 4.8 :
      true;

    return matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Artisan Marketplace</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Discover unique products from independent artisans</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-card dark:border-dark-border dark:text-white"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-card dark:border-dark-border dark:text-white"
            >
              <option value="all">All Prices</option>
              <option value="low">$ Budget</option>
              <option value="medium">$$ Mid-Range</option>
              <option value="high">$$$ Premium</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-card dark:border-dark-border dark:text-white"
            >
              <option value="all">All Ratings</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4.8+">4.8+ Stars</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      </div>
    </div>
  );
}