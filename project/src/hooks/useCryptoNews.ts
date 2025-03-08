import { useState, useEffect } from 'react';
import { Article, CryptoPrice } from '../types/news';
import { fetchCryptoNews, fetchBitcoinPrice } from '../services/coindesk';

export function useCryptoNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bitcoinPrice, setBitcoinPrice] = useState<CryptoPrice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch news articles and Bitcoin price in parallel
        const [newsData, priceData] = await Promise.all([
          fetchCryptoNews(),
          fetchBitcoinPrice()
        ]);

        if (isMounted) {
          setArticles(newsData);
          setBitcoinPrice(priceData);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch cryptocurrency news. Please try again later.');
          console.error('Error fetching crypto news:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Set up interval to refresh Bitcoin price every 5 minutes
    const priceInterval = setInterval(async () => {
      try {
        const priceData = await fetchBitcoinPrice();
        if (isMounted) {
          setBitcoinPrice(priceData);
        }
      } catch (err) {
        console.error('Error refreshing Bitcoin price:', err);
      }
    }, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(priceInterval);
    };
  }, []);

  return { articles, bitcoinPrice, isLoading, error };
}