import React from 'react';
import { Palette, Gem, Clock, Home, Shirt, Camera, Gift } from 'lucide-react';

const categories = [
  { name: 'Art', icon: Palette },
  { name: 'Jewelry', icon: Gem },
  { name: 'Vintage', icon: Clock },
  { name: 'Home & Living', icon: Home },
  { name: 'Clothing', icon: Shirt },
  { name: 'Photography', icon: Camera },
  { name: 'Gift Ideas', icon: Gift },
];

export function CategoryBar() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between space-x-8 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                className="flex flex-col items-center min-w-fit gap-1 text-gray-600 hover:text-teal-600 transition-colors"
                aria-label={`Browse ${category.name} category`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}