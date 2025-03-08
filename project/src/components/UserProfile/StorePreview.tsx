import React, { useState } from 'react';
import { Store, MapPin, Star, ChevronRight, Eye, EyeOff, Loader2, AlertCircle, Image as ImageIcon, X, Clock, Phone, Globe, Shield, Truck, CreditCard, Pencil as Pencil2, Save, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { US_STATES } from '../../data/states';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
  quantity: number;
}

interface StorePreviewProps {
  onStoreOpen: (storeData: any) => Promise<void>;
  editMode: 'preview' | 'edit';
  items: StoreItem[];
  showLocation: boolean;
  showHours: boolean;
  showPolicies: boolean;
  onStoreChange: (data: any) => void;
  onCreateItem: () => void;
  onEditItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  isEditing: boolean; // New prop for edit mode
}

export function StorePreview({ 
  onStoreOpen, 
  editMode, 
  items, 
  showLocation, 
  showHours, 
  showPolicies, 
  onStoreChange,
  onCreateItem,
  onEditItem,
  onDeleteItem,
  isEditing
}: StorePreviewProps) {
  const [store, setStore] = useState({
    name: '',
    description: '',
    category: '',
    rating: 0,
    priceRange: '$',
    featured: [] as string[],
    banner: '',
    bannerFile: null as File | null,
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      isOnlineOnly: false,
      showLocation: true
    },
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    policies: {
      shipping: 'Free shipping on orders over $50',
      returns: '30-day return policy',
      payment: 'Secure payment via Stripe'
    }
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setStore(prev => ({
        ...prev,
        banner: previewUrl,
        bannerFile: file
      }));
      handleSaveField('banner');
    }
  };

  const removeBanner = () => {
    if (store.banner) {
      URL.revokeObjectURL(store.banner);
    }
    setStore(prev => ({
      ...prev,
      banner: '',
      bannerFile: null
    }));
    handleSaveField('banner');
  };

  const handleSaveField = async (field: string) => {
    setIsSaving(true);
    try {
      await onStoreChange({ [field]: store[field as keyof typeof store] });
      setEditingField(null);
    } catch (error) {
      console.error('Error saving field:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const EditButton = ({ field, label }: { field: string; label: string }) => {
    if (!isEditing) return null;
    
    return (
      <button
        onClick={() => setEditingField(field)}
        className="flex items-center gap-1 px-2 py-1 text-sm text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
      >
        <Pencil2 className="w-4 h-4" />
        {label}
      </button>
    );
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm overflow-hidden">
      {/* Store Header */}
      <div className="relative">
        <div className="h-64 relative">
          {store.banner ? (
            <img
              src={store.banner}
              alt={store.name || "Store banner"}
              className="w-full h-full object-cover"
            />
          ) : (
            isEditing ? (
              <label className="block w-full h-full cursor-pointer bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-dark-active transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="sr-only"
                />
                <div className="h-full flex flex-col items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Upload banner image</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Recommended: 1920x820px</p>
                </div>
              </label>
            ) : (
              <div className="w-full h-full bg-gray-100 dark:bg-dark-hover" />
            )
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {store.banner && isEditing && (
            <button
              onClick={removeBanner}
              className="absolute top-4 right-4 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                {editingField === 'name' && isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={store.name}
                      onChange={(e) => setStore(prev => ({ ...prev, name: e.target.value }))}
                      className="text-3xl font-bold text-white bg-black/30 border border-white/30 rounded px-2 py-1 focus:outline-none focus:border-white"
                      placeholder="Enter store name"
                    />
                    <button
                      onClick={() => handleSaveField('name')}
                      disabled={isSaving}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                      {isSaving ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      ) : (
                        <Save className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {store.name || 'Store Name'}
                    </h1>
                    <EditButton field="name" label="Edit Name" />
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                    <span className="font-medium">New</span>
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
                <button className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact
                </button>
                {showLocation && (
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Info Bar */}
      <div className="border-b dark:border-dark-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 py-4 overflow-x-auto px-8">
            {showLocation && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 min-w-fit">
                <MapPin className="w-5 h-5" />
                {editingField === 'address' && isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={store.address.street}
                      onChange={(e) => setStore(prev => ({
                        ...prev,
                        address: { ...prev.address, street: e.target.value }
                      }))}
                      className="px-2 py-1 border rounded"
                      placeholder="Street address"
                    />
                    <button
                      onClick={() => handleSaveField('address')}
                      disabled={isSaving}
                      className="p-1 bg-teal-50 dark:bg-teal-900/20 rounded"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>
                      {store.address.street && store.address.city
                        ? `${store.address.street}, ${store.address.city}, ${store.address.state}`
                        : 'Store location'}
                    </span>
                    <EditButton field="address" label="Edit" />
                  </div>
                )}
              </div>
            )}

            {showHours && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 min-w-fit">
                <Clock className="w-5 h-5" />
                {editingField === 'hours' && isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={store.businessHours.monday}
                      onChange={(e) => setStore(prev => ({
                        ...prev,
                        businessHours: { ...prev.businessHours, monday: e.target.value }
                      }))}
                      className="px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleSaveField('businessHours')}
                      disabled={isSaving}
                      className="p-1 bg-teal-50 dark:bg-teal-900/20 rounded"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Open Today: {store.businessHours.monday}</span>
                    <EditButton field="hours" label="Edit" />
                  </div>
                )}
              </div>
            )}

            {showPolicies && (
              <>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 min-w-fit">
                  <Shield className="w-5 h-5" />
                  {editingField === 'returns' && isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={store.policies.returns}
                        onChange={(e) => setStore(prev => ({
                          ...prev,
                          policies: { ...prev.policies, returns: e.target.value }
                        }))}
                        className="px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleSaveField('policies')}
                        disabled={isSaving}
                        className="p-1 bg-teal-50 dark:bg-teal-900/20 rounded"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{store.policies.returns}</span>
                      <EditButton field="returns" label="Edit" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 min-w-fit">
                  <Truck className="w-5 h-5" />
                  {editingField === 'shipping' && isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={store.policies.shipping}
                        onChange={(e) => setStore(prev => ({
                          ...prev,
                          policies: { ...prev.policies, shipping: e.target.value }
                        }))}
                        className="px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleSaveField('policies')}
                        disabled={isSaving}
                        className="p-1 bg-teal-50 dark:bg-teal-900/20 rounded"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{store.policies.shipping}</span>
                      <EditButton field="shipping" label="Edit" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 min-w-fit">
                  <CreditCard className="w-5 h-5" />
                  {editingField === 'payment' && isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={store.policies.payment}
                        onChange={(e) => setStore(prev => ({
                          ...prev,
                          policies: { ...prev.policies, payment: e.target.value }
                        }))}
                        className="px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => handleSaveField('policies')}
                        disabled={isSaving}
                        className="p-1 bg-teal-50 dark:bg-teal-900/20 rounded"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{store.policies.payment}</span>
                      <EditButton field="payment" label="Edit" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-dark-hover rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  About {store.name || 'Store'}
                </h3>
                {editingField === 'description' && isEditing ? (
                  <div className="space-y-2">
                    <textarea
                      value={store.description}
                      onChange={(e) => setStore(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-card dark:text-white resize-none"
                      rows={4}
                      placeholder="Enter store description"
                    />
                    <button
                      onClick={() => handleSaveField('description')}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      {store.description || 'Store description will appear here'}
                    </p>
                    <EditButton field="description" label="Edit Description" />
                  </div>
                )}
              </div>

              {showHours && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Business Hours</h3>
                    <EditButton field="businessHours" label="Edit Hours" />
                  </div>
                  <div className="space-y-2">
                    {Object.entries(store.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300 capitalize">{day}</span>
                        <span className="text-gray-900 dark:text-white">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showPolicies && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Store Policies</h3>
                    <EditButton field="policies" label="Edit Policies" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white mb-1">Shipping</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{store.policies.shipping}</p>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white mb-1">Returns</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{store.policies.returns}</p>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white mb-1">Payment</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{store.policies.payment}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Products</h2>
              {isEditing && (
                <button
                  onClick={onCreateItem}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              )}
            </div>
            {items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-dark-hover rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      {item.images[0] ? (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-dark-card flex items-center justify-center">
                          <Store className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                            Sold Out
                          </span>
                        </div>
                      )}
                      {isEditing && (
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            <button
                              onClick={() => onEditItem(item.id)}
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            >
                              <Pencil2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => onDeleteItem(item.id)}
                              className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                          <span className="text-sm font-medium">New</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-dark-hover rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">No products available at this time.</p>
                {isEditing && (
                  <button
                    onClick={onCreateItem}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Item
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}