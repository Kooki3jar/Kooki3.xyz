import React, { useState } from 'react';
import { Image as ImageIcon, Plus, X, Store, Box, Tag, DollarSign, Loader2 } from 'lucide-react';

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

interface StoreItemFormProps {
  onSubmit: (data: Partial<StoreItem>) => Promise<void>;
  onCancel: () => void;
  editingItem?: StoreItem;
}

const DEFAULT_CATEGORIES = [
  'Art',
  'Jewelry',
  'Clothing',
  'Home & Living',
  'Vintage',
  'Craft Supplies',
];

export function StoreItemForm({ onSubmit, onCancel, editingItem }: StoreItemFormProps) {
  const [formData, setFormData] = useState<Partial<StoreItem>>({
    name: editingItem?.name || '',
    description: editingItem?.description || '',
    price: editingItem?.price || 0,
    category: editingItem?.category || '',
    inStock: editingItem?.inStock ?? true,
    quantity: editingItem?.quantity || 0,
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (typeof formData.price !== 'number' || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (showCustomCategory && !customCategory.trim()) {
      newErrors.category = 'Category is required';
    } else if (!showCustomCategory && !formData.category) {
      newErrors.category = 'Category is required';
    }

    if (typeof formData.quantity !== 'number' || formData.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const finalCategory = showCustomCategory ? customCategory : formData.category;
      await onSubmit({ ...formData, category: finalCategory });
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustomCategory(true);
      setFormData(prev => ({ ...prev, category: value }));
    } else {
      setShowCustomCategory(false);
      setCustomCategory('');
      setFormData(prev => ({ ...prev, category: value }));
    }
  };

  const handleCustomCategorySubmit = () => {
    if (customCategory.trim()) {
      setFormData(prev => ({ ...prev, category: customCategory }));
      setShowCustomCategory(false);
    }
  };

  const handleCustomCategoryKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomCategorySubmit();
    } else if (e.key === 'Escape') {
      setShowCustomCategory(false);
      setCustomCategory('');
      setFormData(prev => ({ ...prev, category: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-dark-card rounded-xl p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Item Name
          </label>
          <div className="relative">
            <Tag className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter item name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className={`w-full px-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your item..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price?.toString() || '0'}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                className={`w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Quantity
            </label>
            <div className="relative">
              <Box className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="number"
                min="0"
                value={formData.quantity?.toString() || '0'}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value, 10) || 0 }))}
                className={`w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                  errors.quantity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Category
          </label>
          <div className="space-y-2">
            <select
              value={showCustomCategory ? 'custom' : formData.category}
              onChange={handleCategoryChange}
              className={`w-full px-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                errors.category && !showCustomCategory ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {DEFAULT_CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
              <option value="custom">+ Add Custom Category</option>
            </select>

            {showCustomCategory && (
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Plus className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    onKeyDown={handleCustomCategoryKeyDown}
                    placeholder="Enter custom category"
                    className={`w-full pl-10 pr-4 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCustomCategorySubmit}
                  className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Item Images
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 dark:border-dark-border border-dashed rounded-lg dark:bg-dark-hover">
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <div className="flex text-sm text-gray-600 dark:text-gray-300">
                <label className="relative cursor-pointer rounded-md font-medium text-teal-600 dark:text-teal-400 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">
                  <span>Upload images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG up to 5MB each
              </p>
            </div>
          </div>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.inStock}
            onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
            className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
          />
          <label className="text-sm text-gray-700 dark:text-gray-200">
            Item is in stock
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t dark:border-dark-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? 'Saving...' : 'Save Item'}
        </button>
      </div>
    </form>
  );
}