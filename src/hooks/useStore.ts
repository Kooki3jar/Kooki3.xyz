import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Store } from '../types/store';
import { useUser } from '../context/UserContext';

export function useStore(storeId?: string) {
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;

    const fetchStore = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (storeId) {
          // Fetch specific store
          const { data: storeData, error: storeError } = await supabase
            .from('stores')
            .select('*')
            .eq('id', storeId)
            .single();

          if (storeError) throw storeError;

          if (storeData) {
            // Fetch store settings
            const { data: settingsData } = await supabase
              .from('store_settings')
              .select('*')
              .eq('store_id', storeData.id)
              .single();

            // Fetch store items
            const { data: itemsData } = await supabase
              .from('store_items')
              .select('*')
              .eq('store_id', storeData.id);

            if (isMounted) {
              setStore({
                ...storeData,
                settings: settingsData || undefined,
                items: itemsData || []
              });
            }
          }
        } else if (user) {
          // Fetch user's store
          const { data: storeData, error: storeError } = await supabase
            .from('stores')
            .select('*')
            .eq('owner_id', user.id)
            .single();

          if (storeError && storeError.code !== 'PGRST116') throw storeError;

          if (storeData) {
            // Fetch store settings
            const { data: settingsData } = await supabase
              .from('store_settings')
              .select('*')
              .eq('store_id', storeData.id)
              .single();

            // Fetch store items
            const { data: itemsData } = await supabase
              .from('store_items')
              .select('*')
              .eq('store_id', storeData.id);

            if (isMounted) {
              setStore({
                ...storeData,
                settings: settingsData || undefined,
                items: itemsData || []
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching store:', err);
        if (isMounted) {
          setError('Failed to load store data. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStore();

    return () => {
      isMounted = false;
    };
  }, [storeId, user]);

  const updateStore = async (data: Partial<Store>) => {
    try {
      setError(null);

      if (!store) {
        // Create new store
        const { data: newStore, error } = await supabase
          .from('stores')
          .insert([{ ...data, owner_id: user?.id }])
          .select()
          .single();

        if (error) throw error;
        setStore(newStore);
      } else {
        // Update existing store
        const { data: updatedStore, error } = await supabase
          .from('stores')
          .update(data)
          .eq('id', store.id)
          .select()
          .single();

        if (error) throw error;
        setStore(updatedStore);
      }
    } catch (err) {
      console.error('Error updating store:', err);
      throw err;
    }
  };

  const updateStoreSettings = async (settings: Partial<Store['settings']>) => {
    try {
      setError(null);

      if (!store?.id) throw new Error('No store found');

      const { error } = await supabase
        .from('store_settings')
        .upsert({
          store_id: store.id,
          ...settings
        });

      if (error) throw error;

      setStore(prev => prev ? {
        ...prev,
        settings: {
          ...prev.settings,
          ...settings
        }
      } : null);
    } catch (err) {
      console.error('Error updating store settings:', err);
      throw err;
    }
  };

  return {
    store,
    isLoading,
    error,
    updateStore,
    updateStoreSettings
  };
}