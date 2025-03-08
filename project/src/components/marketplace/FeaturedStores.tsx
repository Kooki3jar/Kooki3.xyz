import React from 'react';
import { StoreCard } from './StoreCard';
import { stores } from '../../data/stores';

export function FeaturedStores() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Artisans</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Discover unique products from our flagship stores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.slice(0, 6).map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      </div>
    </section>
  );
}