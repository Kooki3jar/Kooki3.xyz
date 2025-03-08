import React, { createContext, useContext } from 'react';
import { useStore } from '../hooks/useStore';
import { Store } from '../types/store';

interface StoreContextType {
  store: Store | null;
  isLoading: boolean;
  error: string | null;
  updateStore: (data: Partial<Store>) => Promise<void>;
  updateStoreSettings: (settings: Partial<Store['settings']>) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = useStore();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
}