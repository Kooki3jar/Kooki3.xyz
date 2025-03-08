import React from 'react';
import { Plus, Package, Edit, Trash2, DollarSign } from 'lucide-react';

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

interface StoreItemListProps {
  items: StoreItem[];
  onCreateItem: () => void;
  onEditItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
}

export function StoreItemList({ items, onCreateItem, onEditItem, onDeleteItem }: StoreItemListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Store Items</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your store's inventory
          </p>
        </div>
        <button
          onClick={onCreateItem}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-dark-hover rounded-lg">
          <Package className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No items yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add your first item to start selling
          </p>
          <button
            onClick={onCreateItem}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-dark-hover rounded-lg border dark:border-dark-border overflow-hidden group"
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
                    <Package className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                )}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white truncate">{item.name}</h4>
                  <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-medium">{item.price.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-card rounded-full text-gray-600 dark:text-gray-300">
                      {item.category}
                    </span>
                    {item.inStock && (
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                        {item.quantity} in stock
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditItem(item.id)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}