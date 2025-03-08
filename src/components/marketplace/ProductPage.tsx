import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, AlertTriangle } from 'lucide-react';
import { stores } from '../../data/stores';
import { ClothingSize, ClothingGender } from '../../types/store';

export function ProductPage() {
  const { storeId, productId } = useParams();
  const store = stores.find(s => s.id === Number(storeId));
  const product = store?.products.find(p => p.id === productId);

  const [selectedSize, setSelectedSize] = useState<ClothingSize | ''>('');
  const [selectedGender, setSelectedGender] = useState<ClothingGender | ''>('');

  if (!store || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link
              to={`/store/${storeId}`}
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isClothing = store.category === 'Clothing';
  const variant = product.variants?.find(v => 
    (!v.size || v.size === selectedSize) && 
    (!v.gender || v.gender === selectedGender)
  );
  const isAvailable = variant?.inStock ?? product.inStock;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to={`/store/${storeId}`}
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {store.name}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square relative rounded-lg overflow-hidden bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {isClothing && (
              <>
                {/* Gender Selection */}
                {product.gender !== 'unisex' && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Gender</h2>
                    <div className="flex gap-3">
                      {['mens', 'womens'].map((gender) => (
                        <button
                          key={gender}
                          onClick={() => setSelectedGender(gender as ClothingGender)}
                          className={`px-4 py-2 rounded-lg border ${
                            selectedGender === gender
                              ? 'border-teal-600 bg-teal-50 text-teal-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {gender === 'mens' ? "Men's" : "Women's"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.availableSizes && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Size</h2>
                    <div className="flex flex-wrap gap-3">
                      {product.availableSizes.map((size) => {
                        const sizeVariant = product.variants?.find(v => v.size === size);
                        const isSizeAvailable = sizeVariant?.inStock ?? true;
                        
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            disabled={!isSizeAvailable}
                            className={`w-14 h-14 rounded-lg border font-medium flex items-center justify-center ${
                              selectedSize === size
                                ? 'border-teal-600 bg-teal-50 text-teal-600'
                                : isSizeAvailable
                                ? 'border-gray-300 hover:border-gray-400'
                                : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {product.ingredients && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Materials</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.allergens && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <h2 className="font-semibold">Allergen Information</h2>
                </div>
                <ul className="list-disc list-inside text-yellow-700">
                  {product.allergens.map((allergen, index) => (
                    <li key={index}>{allergen}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              disabled={!isAvailable || (isClothing && (!selectedSize || !selectedGender))}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              {!isAvailable ? 'Out of Stock' : 
               isClothing && (!selectedSize || !selectedGender) ? 'Select Options' : 
               'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}