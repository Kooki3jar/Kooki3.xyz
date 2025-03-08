import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/store';

interface ProductCardProps {
  storeId: number;
  product: Product;
}

export function ProductCard({ storeId, product }: ProductCardProps) {
  const isClothing = product.gender || product.availableSizes;
  const hasVariants = isClothing && product.variants && product.variants.length > 0;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <Link to={`/store/${storeId}/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {!product.inStock && !hasVariants && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Sold Out
              </span>
            </div>
          )}
          {product.gender && product.gender !== 'unisex' && (
            <div className="absolute top-2 left-2">
              <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                {product.gender === 'mens' ? "Men's" : "Women's"}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/store/${storeId}/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-teal-600">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
        </div>

        {isClothing ? (
          <Link
            to={`/store/${storeId}/product/${product.id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            View Options
          </Link>
        ) : (
          <button
            disabled={!product.inStock}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        )}
      </div>
    </div>
  );
}