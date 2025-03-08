import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export function useOrders(storeId?: string) {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase.from('orders').select(`
          *,
          order_items (
            *,
            store_items (*)
          ),
          addresses!shipping_address_id (*)
        `);

        if (storeId) {
          // Fetch orders for a specific store
          query = query.eq('store_id', storeId);
        } else if (user) {
          // Fetch user's orders
          query = query.eq('buyer_id', user.id);
        } else {
          throw new Error('No user or store ID provided');
        }

        const { data, error: ordersError } = await query;

        if (ordersError) throw ordersError;

        if (isMounted) {
          setOrders(data || []);
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        if (isMounted) {
          setError('Failed to load orders. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [storeId, user]);

  const createOrder = async (orderData: any) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      setOrders(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const updateOrder = async (orderId: string, updates: any) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;

      setOrders(prev => prev.map(order => 
        order.id === orderId ? data : order
      ));

      return data;
    } catch (err) {
      console.error('Error updating order:', err);
      throw err;
    }
  };

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateOrder
  };
}