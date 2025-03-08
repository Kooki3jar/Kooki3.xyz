import React from 'react';
import { FeaturedStores } from './marketplace/FeaturedStores';
import { PopularProductsBanner } from './marketplace/PopularProductsBanner';
import { CryptoTickerBanner } from './crypto/CryptoTickerBanner';

export function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-dark">
      <CryptoTickerBanner />
      <PopularProductsBanner />
      <FeaturedStores />
    </main>
  );
}