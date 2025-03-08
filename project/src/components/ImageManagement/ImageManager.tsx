import React, { useState } from 'react';
import { ImageGrid } from './ImageGrid';
import { ImageUploader } from './ImageUploader';
import { ImageEditor } from './ImageEditor';
import { ImageData } from '../../types/image';
import { Search, Filter } from 'lucide-react';

const MOCK_IMAGES: ImageData[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
    name: 'Ceramic Mug',
    alt: 'Handmade ceramic mug on wooden table',
    category: 'product',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  // Add more mock images as needed
];

export function ImageManager() {
  const [images, setImages] = useState<ImageData[]>(MOCK_IMAGES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);

  const handleUpload = async (file: File) => {
    // In a real app, this would upload to a server
    const newImage: ImageData = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      name: file.name,
      alt: file.name,
      category: 'product',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setImages([newImage, ...images]);
  };

  const handleEdit = async (imageData: Partial<ImageData>) => {
    if (!editingImage) return;
    
    const updatedImages = images.map(img => 
      img.id === editingImage.id 
        ? { ...img, ...imageData, updatedAt: Date.now() }
        : img
    );
    setImages(updatedImages);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    setImages(images.filter(img => img.id !== id));
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.alt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || image.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Management</h2>
        <ImageUploader onUpload={handleUpload} />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
        
        <div className="sm:w-48 flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">All Categories</option>
            <option value="product">Product</option>
            <option value="banner">Banner</option>
            <option value="gallery">Gallery</option>
            <option value="avatar">Avatar</option>
          </select>
        </div>
      </div>

      <ImageGrid
        images={filteredImages}
        onEdit={setEditingImage}
        onDelete={handleDelete}
      />

      {editingImage && (
        <ImageEditor
          image={editingImage}
          onSave={handleEdit}
          onClose={() => setEditingImage(null)}
        />
      )}
    </div>
  );
}