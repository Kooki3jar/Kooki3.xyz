import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export function useReviews(storeId?: string, itemId?: string) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let query = supabase
          .from('reviews')
          .select(`
            *,
            profiles:user_id (
              username,
              avatar_url
            )
          `);

        if (storeId) {
          query = query.eq('store_id', storeId);
        } else if (itemId) {
          query = query.eq('item_id', itemId);
        }

        const { data, error: reviewsError } = await query;

        if (reviewsError) throw reviewsError;

        if (isMounted) {
          setReviews(data || []);
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        if (isMounted) {
          setError('Failed to load reviews. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [storeId, itemId]);

  const createReview = async (reviewData: any) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ ...reviewData, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating review:', err);
      throw err;
    }
  };

  const updateReview = async (reviewId: string, updates: any) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => prev.map(review => 
        review.id === reviewId ? data : review
      ));

      return data;
    } catch (err) {
      console.error('Error updating review:', err);
      throw err;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      setError(null);

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(prev => prev.filter(review => review.id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  };

  return {
    reviews,
    isLoading,
    error,
    createReview,
    updateReview,
    deleteReview
  };
}