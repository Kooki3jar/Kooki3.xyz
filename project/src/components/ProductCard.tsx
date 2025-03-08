import React from 'react';
import { Heart, Star } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  seller: string;
  rating: number;
  isFavorite?: boolean;
}

export function ProductCard({ image, title, price, seller, rating, isFavorite = false }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <button 
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">by {seller}</p>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
        <p className="text-xl font-semibold text-gray-900">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}