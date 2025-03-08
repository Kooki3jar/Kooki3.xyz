import React from 'react';
import { Image as ImageIcon, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { ImageData } from '../../types/image';

interface ImageGridProps {
  images: ImageData[];
  onEdit: (image: ImageData) => void;
  onDelete: (id: string) => void;
}

export function ImageGrid({ images, onEdit, onDelete }: ImageGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="aspect-square relative">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <button
                  onClick={() => onEdit(image)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="Edit image"
                >
                  <Pencil className="w-4 h-4 text-gray-700" />
                </button>
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="View full size"
                >
                  <ExternalLink className="w-4 h-4 text-gray-700" />
                </a>
                <button
                  onClick={() => onDelete(image.id)}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  title="Delete image"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
            <p className="text-xs text-gray-500">{image.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}