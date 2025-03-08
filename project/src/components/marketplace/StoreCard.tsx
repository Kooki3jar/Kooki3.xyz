import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoreCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  featured: string[];
}

export function StoreCard({ id, name, description, image, rating, priceRange, featured }: StoreCardProps) {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm font-medium dark:text-white">{rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>Price Range: {priceRange}</span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-dark-hover rounded-full">{rating} ★</span>
        </div>

        {featured.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Featured Items:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {featured.map((item, index) => (
                <span
                  key={index}
                  className="flex-shrink-0 px-3 py-1 bg-gray-100 dark:bg-dark-hover rounded-full text-sm text-gray-600 dark:text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          to={`/store/${id}`}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Visit Store
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}