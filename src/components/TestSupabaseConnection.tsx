import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function TestSupabaseConnection() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [tableStatus, setTableStatus] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('count')
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw new Error('Failed to connect to Supabase');
        }

        // Test each required table
        const tables = [
          'stores',
          'store_settings',
          'store_items',
          'orders',
          'order_items',
          'reviews',
          'addresses',
          'notifications',
          'favorites'
        ];

        const tableResults: Record<string, boolean> = {};

        for (const table of tables) {
          const { error } = await supabase
            .from(table)
            .select('count')
            .single();

          tableResults[table] = !error || error.code === 'PGRST116';
        }

        setTableStatus(tableResults);
        setConnectionStatus('success');
      } catch (err) {
        console.error('Connection test error:', err);
        setConnectionStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to connect to database');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-dark-card rounded-lg shadow-lg p-4 max-w-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Database Connection Test</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">Connection Status</span>
          {connectionStatus === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
          ) : connectionStatus === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>

        {Object.entries(tableStatus).length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Table Status:</h3>
            <div className="space-y-1">
              {Object.entries(tableStatus).map(([table, exists]) => (
                <div key={table} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">{table}</span>
                  {exists ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}