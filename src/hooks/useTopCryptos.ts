import { useState, useEffect } from 'react';
import { CryptoCoin, fetchTopCryptos } from '../services/coingecko';

export function useTopCryptos(limit: number = 10) {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let refreshInterval: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchTopCryptos(limit);
        
        if (isMounted) {
          setCoins(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch cryptocurrency data. Please try again later.');
          console.error('Error fetching crypto data:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Refresh data every 2 minutes
    refreshInterval = setInterval(fetchData, 2 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(refreshInterval);
    };
  }, [limit]);

  return { coins, isLoading, error };
}