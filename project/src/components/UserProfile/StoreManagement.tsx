import React, { useState, useEffect } from 'react';
import { StorePreview } from './StorePreview';
import { StoreItemForm } from './StoreItemForm';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Eye, Settings, Save, X, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useUser } from '../../context/UserContext';

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

type EditMode = 'preview' | 'edit';

interface VacationMode {
  enabled: boolean;
  startDate?: Date;
  endDate?: Date;
}

export default function StoreManagement() {
  const { user } = useUser();
  const { addStore } = useMarketplace();
  const [view, setView] = useState<'preview' | 'item-form'>('preview');
  const [editMode, setEditMode] = useState<EditMode>('preview');
  const [showLocation, setShowLocation] = useState(true);
  const [showHours, setShowHours] = useState(true);
  const [showPolicies, setShowPolicies] = useState(true);
  const [items, setItems] = useState<StoreItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPhysicalStore, setIsPhysicalStore] = useState(true);
  const [vacationMode, setVacationMode] = useState<VacationMode>({
    enabled: false,
    startDate: undefined,
    endDate: undefined
  });
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch store data on component mount
  useEffect(() => {
    const fetchStoreData = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        const { data: store, error } = await supabase
          .from('stores')
          .select(`
            *,
            store_settings (*)
          `)
          .eq('owner_id', user.id)
          .single();

        if (error) throw error;

        if (store) {
          setStoreId(store.id);
          setIsStoreOpen(store.is_open);
          setIsPhysicalStore(store.is_physical);
          
          if (store.store_settings) {
            setShowLocation(store.store_settings.show_location);
            setShowHours(store.store_settings.show_hours);
            setShowPolicies(store.store_settings.show_policies);
            
            if (store.store_settings.vacation_start && store.store_settings.vacation_end) {
              setVacationMode({
                enabled: true,
                startDate: new Date(store.store_settings.vacation_start),
                endDate: new Date(store.store_settings.vacation_end)
              });
            }
          }

          // Fetch store items
          const { data: items, error: itemsError } = await supabase
            .from('store_items')
            .select('*')
            .eq('store_id', store.id);

          if (itemsError) throw itemsError;
          
          if (items) {
            setItems(items);
          }
        }
      } catch (error) {
        console.error('Error fetching store data:', error);
        setError('Failed to load store data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [user]);

  const handleStoreOpen = async (storeData: any) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      let store;
      if (storeId) {
        // Update existing store
        const { data, error } = await supabase
          .from('stores')
          .update({
            is_open: isStoreOpen,
            status: isStoreOpen ? 'active' : 'inactive',
            is_physical: isPhysicalStore,
            ...storeData
          })
          .eq('id', storeId)
          .select()
          .single();

        if (error) throw error;
        store = data;
      } else {
        // Create new store
        const { data, error } = await supabase
          .from('stores')
          .insert({
            owner_id: user.id,
            is_open: isStoreOpen,
            status: isStoreOpen ? 'active' : 'inactive',
            is_physical: isPhysicalStore,
            ...storeData
          })
          .select()
          .single();

        if (error) throw error;
        store = data;
        setStoreId(store.id);
      }

      // Update store settings
      const { error: settingsError } = await supabase
        .from('store_settings')
        .upsert({
          store_id: store.id,
          show_location: showLocation,
          show_hours: showHours,
          show_policies: showPolicies,
          vacation_start: vacationMode.enabled ? vacationMode.startDate : null,
          vacation_end: vacationMode.enabled ? vacationMode.endDate : null
        });

      if (settingsError) throw settingsError;

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving store:', error);
      setError('Failed to save store. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await handleStoreOpen({});
      setEditMode('preview');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCancelEdit = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        setEditMode('preview');
        setHasUnsavedChanges(false);
      }
    } else {
      setEditMode('preview');
    }
  };

  const handleCreateItem = () => {
    setEditingItem(null);
    setView('item-form');
  };

  const handleEditItem = (itemId: string) => {
    setEditingItem(itemId);
    setView('item-form');
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      if (storeId) {
        const { error } = await supabase
          .from('store_items')
          .delete()
          .eq('id', itemId)
          .eq('store_id', storeId);

        if (error) throw error;
      }

      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again.');
    }
  };

  const handleItemFormSubmit = async (data: Partial<StoreItem>) => {
    if (!storeId) {
      setError('Please save your store before adding items.');
      return;
    }

    try {
      setError(null);
      
      if (editingItem) {
        // Update existing item
        const { error } = await supabase
          .from('store_items')
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem)
          .eq('store_id', storeId);

        if (error) throw error;

        setItems(prevItems =>
          prevItems.map(item =>
            item.id === editingItem ? { ...item, ...data } : item
          )
        );
      } else {
        // Create new item
        const { data: newItem, error } = await supabase
          .from('store_items')
          .insert({
            store_id: storeId,
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;

        setItems(prevItems => [...prevItems, newItem]);
      }

      setHasUnsavedChanges(true);
      setView('preview');
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
      setError('Failed to save item. Please try again.');
      throw error;
    }
  };

  const handleVacationModeChange = (enabled: boolean) => {
    setVacationMode(prev => ({ ...prev, enabled }));
    setHasUnsavedChanges(true);
  };

  const handleVacationDatesChange = (startDate?: Date, endDate?: Date) => {
    setVacationMode(prev => ({ ...prev, startDate, endDate }));
    setHasUnsavedChanges(true);
  };

  const handleStoreStatusChange = async (isOpen: boolean) => {
    setIsStoreOpen(isOpen);
    setHasUnsavedChanges(true);
    
    try {
      await handleStoreOpen({
        status: isOpen ? 'active' : 'inactive'
      });
    } catch (error) {
      console.error('Error updating store status:', error);
      setIsStoreOpen(!isOpen); // Revert on error
      setError('Failed to update store status. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Store Controls */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm">
        <div className="flex items-center gap-4 p-4">
          {/* Edit Mode Toggle */}
          <div className="flex items-center gap-3">
            <Settings className={`w-5 h-5 ${isEditing ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400 dark:text-gray-500'}`} />
            <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer bg-gray-200 dark:bg-dark-active"
                 onClick={() => setIsEditing(!isEditing)}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEditing ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Edit Mode</span>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-dark-border" />

          {/* Store Type Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer"
                 onClick={() => setIsPhysicalStore(!isPhysicalStore)}
                 style={{ backgroundColor: isPhysicalStore ? '#2563eb' : '#9333ea' }}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPhysicalStore ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isPhysicalStore ? 'Physical Store' : 'Online Only'}
            </span>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-dark-border" />

          {/* Vacation Mode */}
          <div className="flex items-center gap-3">
            <Calendar className={`w-5 h-5 ${vacationMode.enabled ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500'}`} />
            <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer"
                 onClick={() => handleVacationModeChange(!vacationMode.enabled)}
                 style={{ backgroundColor: vacationMode.enabled ? '#ca8a04' : '#e5e7eb' }}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${vacationMode.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Vacation Mode</span>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-dark-border" />

          {/* Store Status */}
          <div className="flex items-center gap-3">
            <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer"
                 onClick={() => handleStoreStatusChange(!isStoreOpen)}
                 style={{ backgroundColor: isStoreOpen ? '#16a34a' : '#dc2626' }}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isStoreOpen ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {isStoreOpen ? 'Store Open' : 'Store Closed'}
            </span>
          </div>
        </div>

        {/* Vacation Mode Date Picker */}
        {vacationMode.enabled && (
          <div className="p-4 border-t dark:border-dark-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Vacation Start Date
                </label>
                <input
                  type="date"
                  value={vacationMode.startDate?.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined;
                    handleVacationDatesChange(date, vacationMode.endDate);
                  }}
                  className="w-full px-3 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Vacation End Date
                </label>
                <input
                  type="date"
                  value={vacationMode.endDate?.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : undefined;
                    handleVacationDatesChange(vacationMode.startDate, date);
                  }}
                  min={vacationMode.startDate?.toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border dark:border-dark-border rounded-lg focus:ring-1 focus:ring-teal-500 focus:border-teal-500 dark:bg-dark-hover dark:text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      {view === 'preview' && (
        <StorePreview 
          onStoreOpen={handleStoreOpen}
          editMode={editMode}
          items={items}
          showLocation={isPhysicalStore}
          showHours={isPhysicalStore}
          showPolicies={showPolicies}
          onStoreChange={(data) => {
            setHasUnsavedChanges(true);
          }}
          onCreateItem={handleCreateItem}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
          isEditing={isEditing}
        />
      )}

      {view === 'item-form' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('preview')}
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
            >
              ← Back to Store
            </button>
          </div>
          <StoreItemForm
            onSubmit={handleItemFormSubmit}
            onCancel={() => setView('preview')}
            editingItem={editingItem ? items.find(i => i.id === editingItem) : undefined}
          />
        </div>
      )}
    </div>
  );
}