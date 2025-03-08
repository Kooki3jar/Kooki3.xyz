import React, { useState } from 'react';
import { ImageData } from '../../types/image';
import { X } from 'lucide-react';

interface ImageEditorProps {
  image: ImageData | null;
  onSave: (imageData: Partial<ImageData>) => Promise<void>;
  onClose: () => void;
}

export function ImageEditor({ image, onSave, onClose }: ImageEditorProps) {
  const [formData, setFormData] = useState<Partial<ImageData>>(image || {});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Image</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={formData.alt || ''}
              onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
              required
            >
              <option value="">Select a category</option>
              <option value="product">Product</option>
              <option value="banner">Banner</option>
              <option value="gallery">Gallery</option>
              <option value="avatar">Avatar</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}