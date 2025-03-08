import React from 'react';
import { Plus, Store, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserStore {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  logo?: string;
}

interface StoreListProps {
  stores: UserStore[];
  onCreateStore: () => void;
  onEditStore: (storeId: string) => void;
  onDeleteStore: (storeId: string) => void;
}

export function StoreList({ stores, onCreateStore, onEditStore, onDeleteStore }: StoreListProps) {
  const MAX_STORES = 3;
  const canCreateStore = stores.length < MAX_STORES;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Stores</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your storefronts ({stores.length}/{MAX_STORES})
          </p>
        </div>
        <button
          onClick={onCreateStore}
          disabled={!canCreateStore}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Create Store
        </button>
      </div>

      {!canCreateStore && (
        <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-lg">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">
            You've reached the maximum limit of {MAX_STORES} stores. To create a new store, you'll need to delete an existing one.
          </p>
        </div>
      )}

      {stores.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-dark-hover rounded-lg">
          <Store className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No stores yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Create your first store to start selling your products
          </p>
          <button
            onClick={onCreateStore}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Store
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex items-center gap-4 p-4 bg-white dark:bg-dark-hover rounded-lg border dark:border-dark-border"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-dark-card rounded-lg flex items-center justify-center">
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={store.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Store className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{store.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{store.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-dark-card rounded-full text-gray-600 dark:text-gray-300">
                    {store.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    store.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : store.status === 'pending'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  }`}>
                    {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/store/${store.id}`}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  View Store
                </Link>
                <button
                  onClick={() => onEditStore(store.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDeleteStore(store.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}