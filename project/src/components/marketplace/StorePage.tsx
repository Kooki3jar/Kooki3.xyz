import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, MapPin, Clock, Phone, Globe, Mail, Shield, Truck, CreditCard } from 'lucide-react';
import { stores } from '../../data/stores';
import { storeAddresses } from '../../data/storeAddresses';
import { ProductCard } from './ProductCard';

export function StorePage() {
  const { id } = useParams();
  const store = stores.find(s => s.id === Number(id));
  const address = storeAddresses[Number(id)];

  if (!store || !address) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Store Not Found</h1>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const businessHours = {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed'
  };

  const policies = {
    shipping: 'Free shipping on orders over $50',
    returns: '30-day return policy',
    payment: 'Secure payment via Stripe',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <div className="relative">
        <div className="h-64 relative">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{store.name}</h1>
                <div className="flex items-center gap-4 text-white/90 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-medium">{store.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{store.priceRange}</span>
                  {store.featured.map((category, index) => (
                    <React.Fragment key={category}>
                      <span>•</span>
                      <span>{category}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:+1234567890`}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Contact
                </a>
                <a
                  href={`https://maps.google.com/?q=${address.street},${address.city},${address.state}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Info Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 py-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-gray-600 min-w-fit">
              <MapPin className="w-5 h-5" />
              <span>{address.street}, {address.city}, {address.state}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 min-w-fit">
              <Clock className="w-5 h-5" />
              <span>Open Today: {businessHours.monday}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 min-w-fit">
              <Shield className="w-5 h-5" />
              <span>{policies.returns}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 min-w-fit">
              <Truck className="w-5 h-5" />
              <span>{policies.shipping}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 min-w-fit">
              <CreditCard className="w-5 h-5" />
              <span>{policies.payment}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">About {store.name}</h3>
                <p className="text-gray-600">{store.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-2">
                  {Object.entries(businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-gray-600 capitalize">{day}</span>
                      <span className="text-gray-900">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {store.featured.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Store Policies</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Shipping</div>
                    <p className="text-sm text-gray-600">{policies.shipping}</p>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Returns</div>
                    <p className="text-sm text-gray-600">{policies.returns}</p>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Payment</div>
                    <p className="text-sm text-gray-600">{policies.payment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Products</h2>
            {store.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {store.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    storeId={store.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No products available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}