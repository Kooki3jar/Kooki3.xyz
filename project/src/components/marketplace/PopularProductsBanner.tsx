import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ChevronRight, ChevronLeft, Star } from 'lucide-react';

// Curated list of popular products with high-quality images
const popularProducts = [
  {
    id: 'featured-1',
    name: 'Handcrafted Ceramic Tea Set',
    description: 'Complete tea ceremony set including teapot, 4 cups, and serving tray',
    price: 285.00,
    storeId: 4,
    store: { 
      name: 'Earth & Fire Pottery',
      rating: 4.9,
      reviews: 34
    },
    views: 1847,
    image: 'https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=1200&q=80'
  },
  {
    id: 'featured-2',
    name: 'Desert Dawn Photography Print',
    description: 'Limited edition print of Namibian desert at sunrise (40x60 inches)',
    price: 850.00,
    storeId: 11,
    store: { 
      name: 'Light & Shadow Studio',
      rating: 5.0,
      reviews: 23
    },
    views: 1654,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80'
  },
  {
    id: 'featured-3',
    name: 'Moonstone Halo Ring',
    description: 'Rainbow moonstone surrounded by conflict-free diamonds in 14k gold',
    price: 1200.00,
    storeId: 7,
    store: { 
      name: 'Precious & Stone',
      rating: 5.0,
      reviews: 34
    },
    views: 1432,
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&q=80'
  },
  {
    id: 'featured-4',
    name: 'Vintage Leather Messenger Bag',
    description: 'Authentic 1970s leather messenger bag, professionally restored',
    price: 375.00,
    storeId: 8,
    store: { 
      name: 'Time Capsule Vintage',
      rating: 4.8,
      reviews: 24
    },
    views: 1298,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80'
  },
  {
    id: 'featured-5',
    name: 'Urban Geometry Art Print Set',
    description: 'Set of three architectural abstracts on fiber paper (16x20 inches each)',
    price: 450.00,
    storeId: 11,
    store: { 
      name: 'Light & Shadow Studio',
      rating: 4.8,
      reviews: 31
    },
    views: 1156,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80'
  }
];

export function PopularProductsBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((current) => (current + 1) % popularProducts.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((current) => (current + 1) % popularProducts.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const previousSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((current) => (current - 1 + popularProducts.length) % popularProducts.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className="relative bg-white border-b">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[200px]">
          <div 
            className="absolute inset-0 transition-transform duration-500 ease-out flex"
            style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${popularProducts.length * 100}%` }}
          >
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="relative w-full h-full"
                style={{ width: `${100 / popularProducts.length}%` }}
              >
                <div className="absolute inset-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>

                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-teal-300 text-xs">
                          <Eye className="w-3 h-3" />
                          <span>{product.views.toLocaleString()} views</span>
                        </div>
                        
                        <h2 className="text-lg font-bold text-white mt-1 mb-1">
                          {product.name}
                        </h2>

                        <div className="flex items-center gap-3 text-sm">
                          <span className="font-bold text-white">
                            ${product.price.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-medium">{product.store.rating}</span>
                          </div>
                          <span className="text-xs text-white/80">
                            by {product.store.name}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/store/${product.storeId}/product/${product.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        View
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={previousSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
            aria-label="Previous slide"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
            aria-label="Next slide"
            disabled={isAnimating}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {popularProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}