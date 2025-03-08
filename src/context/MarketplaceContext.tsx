import React, { createContext, useContext, useState } from 'react';

interface Store {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'suspended';
  items: any[];
  createdAt: string;
}

interface MarketplaceContextType {
  stores: Store[];
  addStore: (store: Store) => Promise<void>;
  updateStore: (storeId: string, data: Partial<Store>) => Promise<void>;
  deleteStore: (storeId: string) => Promise<void>;
}

const MarketplaceContext = createContext<MarketplaceContextType | null>(null);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [stores, setStores] = useState<Store[]>([]);

  const addStore = async (store: Store) => {
    try {
      // In a real app, this would be an API call
      setStores(prev => [...prev, { ...store, id: `store_${Date.now()}` }]);
    } catch (error) {
      console.error('Error adding store:', error);
      throw error;
    }
  };

  const updateStore = async (storeId: string, data: Partial<Store>) => {
    try {
      setStores(prev =>
        prev.map(store =>
          store.id === storeId
            ? { ...store, ...data }
            : store
        )
      );
    } catch (error) {
      console.error('Error updating store:', error);
      throw error;
    }
  };

  const deleteStore = async (storeId: string) => {
    try {
      setStores(prev => prev.filter(store => store.id !== storeId));
    } catch (error) {
      console.error('Error deleting store:', error);
      throw error;
    }
  };

  return (
    <MarketplaceContext.Provider value={{
      stores,
      addStore,
      updateStore,
      deleteStore
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}