import React, { useState } from 'react';
import { MapPin, Upload, Loader2, CheckCircle2, XCircle, Store, Package, Image, Globe, Clock } from 'lucide-react';

interface FormData {
  storeName: string;
  description: string;
  category: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    poBox?: string;
  };
  logo?: File;
  banner?: File;
  isOnlineOnly: boolean;
  isOpen: boolean;
}

interface StoreManagementFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
  editingStore?: {
    id: string;
    name: string;
    description: string;
    category: string;
    logo?: string;
    isOnlineOnly?: boolean;
    isOpen?: boolean;
  };
}

export default function StoreManagementForm({ onSubmit, onCancel, editingStore }: StoreManagementFormProps) {
  const [formData, setFormData] = useState<FormData>({
    storeName: editingStore?.name || '',
    description: editingStore?.description || '',
    category: editingStore?.category || '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      poBox: '',
    },
    isOnlineOnly: editingStore?.isOnlineOnly || false,
    isOpen: editingStore?.isOpen ?? true
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [usePoBox, setUsePoBox] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.storeName.trim()) {
      newErrors.storeName = 'Store name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Only validate address if not online-only
    if (!formData.isOnlineOnly) {
      if (!usePoBox) {
        if (!formData.address.street) {
          newErrors.address = { ...newErrors.address, street: 'Street address is required' };
        }
      } else {
        if (!formData.address.poBox) {
          newErrors.address = { ...newErrors.address, poBox: 'PO Box is required' };
        }
      }

      if (!formData.address.city) {
        newErrors.address = { ...newErrors.address, city: 'City is required' };
      }

      if (!formData.address.state) {
        newErrors.address = { ...newErrors.address, state: 'State is required' };
      }

      if (!formData.address.zip) {
        newErrors.address = { ...newErrors.address, zip: 'ZIP code is required' };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressChange = (field: keyof typeof formData.address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleFileChange = (type: 'logo' | 'banner', file: File) => {
    setFormData(prev => ({
      ...prev,
      [type]: file
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Store Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Configure your store's basic information and settings
        </p>
      </div>

      {/* Store Status Toggles */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-hover rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Store Status</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Control whether your store is open for business</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isOpen: !prev.isOpen }))}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              formData.isOpen
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
            }`}
          >
            {formData.isOpen ? 'Open' : 'Closed'}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-hover rounded-lg">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Store Type</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Choose between online-only or physical location</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, isOnlineOnly: !prev.isOnlineOnly }))}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              formData.isOnlineOnly
                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
            }`}
          >
            {formData.isOnlineOnly ? 'Online Only' : 'Physical Store'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Store Name
          </label>
          <div className="relative">
            <Store className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={formData.storeName}
              onChange={(e) => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                errors.storeName ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your store name"
            />
          </div>
          {errors.storeName && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.storeName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Store Category
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              <option value="art">Art</option>
              <option value="jewelry">Jewelry</option>
              <option value="vintage">Vintage</option>
              <option value="home">Home & Living</option>
              <option value="clothing">Clothing</option>
              <option value="photography">Photography</option>
            </select>
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Store Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className={`w-full px-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
              errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your store and what you sell..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        {/* Only show address fields if not online-only */}
        {!formData.isOnlineOnly && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">Store Address</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={usePoBox}
                  onChange={(e) => setUsePoBox(e.target.checked)}
                  className="w-4 h-4 text-teal-600 dark:text-teal-500 border-gray-300 dark:border-dark-border rounded focus:ring-teal-500 dark:focus:ring-teal-400 dark:bg-dark-hover"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">Use PO Box</span>
              </label>
            </div>

            {!usePoBox ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Street Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border dark:border-dark-border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                      placeholder="123 Main St"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  PO Box Number
                </label>
                <input
                  type="text"
                  value={formData.address.poBox}
                  onChange={(e) => handleAddressChange('poBox', e.target.value)}
                  className="w-full px-4 py-2 border dark:border-dark-border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                  placeholder="PO Box 12345"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="w-full px-4 py-2 border dark:border-dark-border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  State
                </label>
                <select
                  value={formData.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="w-full px-4 py-2 border dark:border-dark-border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                >
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  {/* Add all US states */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.address.zip}
                  onChange={(e) => handleAddressChange('zip', e.target.value)}
                  className="w-full px-4 py-2 border dark:border-dark-border border-gray-300 rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                  placeholder="12345"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white">Store Images</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Store Logo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 dark:border-dark-border border-gray-300 border-dashed rounded-lg dark:bg-dark-hover">
              <div className="space-y-1 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <div className="flex text-sm text-gray-600 dark:text-gray-300">
                  <label className="relative cursor-pointer rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 dark:focus-within:ring-teal-400 dark:focus-within:ring-offset-dark">
                    <span>Upload a logo</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileChange('logo', file);
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Store Banner
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 dark:border-dark-border border-gray-300 border-dashed rounded-lg dark:bg-dark-hover">
              <div className="space-y-1 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                <div className="flex text-sm text-gray-600 dark:text-gray-300">
                  <label className="relative cursor-pointer rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500 dark:focus-within:ring-teal-400 dark:focus-within:ring-offset-dark">
                    <span>Upload a banner</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileChange('banner', file);
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t dark:border-dark-border">
        <div className="flex items-center gap-2">
          {submitStatus === 'success' && (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
              <span className="text-sm text-green-600 dark:text-green-400">Store settings saved successfully</span>
            </>
          )}
          {submitStatus === 'error' && (
            <>
              <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">Failed to save store settings</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? 'Saving...' : 'Save Store Settings'}
          </button>
        </div>
      </div>
    </form>
  );
}