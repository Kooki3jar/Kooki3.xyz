import React, { useState, useEffect, useRef } from 'react';
import { useTopCryptos } from '../../hooks/useTopCryptos';
import { TrendingUp, TrendingDown, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';

export function CryptoTickerBanner() {
  const { coins, isLoading, error } = useTopCryptos(10);
  const [scrollPosition, setScrollPosition] = useState(0);
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Format price with appropriate precision
  const formatPrice = (price: number): string => {
    if (price < 0.01) return price.toFixed(6);
    if (price < 1) return price.toFixed(4);
    if (price < 10) return price.toFixed(3);
    if (price < 1000) return price.toFixed(2);
    return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  // Format market cap in billions/millions
  const formatMarketCap = (marketCap: number): string => {
    if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
    }
    return `$${(marketCap / 1_000_000).toFixed(2)}M`;
  };

  // Format percentage change
  const formatPercentage = (percentage: number | undefined): string => {
    if (percentage === undefined) return '0.00%';
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  // Scroll animation
  useEffect(() => {
    if (isLoading || error || !tickerRef.current || isPaused) return;

    const tickerWidth = tickerRef.current.scrollWidth;
    const viewportWidth = tickerRef.current.offsetWidth;
    
    if (tickerWidth <= viewportWidth) return;

    const animationFrame = requestAnimationFrame(() => {
      setScrollPosition(prev => {
        // Reset position when it's scrolled past the width
        if (prev <= -tickerWidth / 2) return 0;
        // Slow scroll speed
        return prev - 0.5;
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [scrollPosition, isLoading, error, isPaused]);

  // Update last updated timestamp
  useEffect(() => {
    if (!isLoading && coins.length > 0) {
      setLastUpdated(new Date());
    }
  }, [coins, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-gray-900 text-white py-2 px-4 flex items-center justify-center">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        <span className="text-sm">Loading cryptocurrency data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white py-2 px-4 flex items-center justify-center">
        <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div 
      className="bg-gray-900 text-white py-2 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center absolute left-0 top-0 bottom-0 bg-gray-900 z-10 px-2">
        <RefreshCw className="w-4 h-4 mr-1" />
        <span className="text-xs whitespace-nowrap">
          Updated: {lastUpdated.toLocaleTimeString()}
        </span>
      </div>
      
      <div 
        ref={tickerRef} 
        className="flex items-center pl-[120px]"
        style={{ transform: `translateX(${scrollPosition}px)` }}
      >
        {/* Duplicate the coins to create a seamless loop */}
        {[...coins, ...coins].map((coin, index) => (
          <div 
            key={`${coin.id}-${index}`} 
            className="flex items-center mx-4 whitespace-nowrap"
          >
            <img 
              src={coin.image} 
              alt={coin.name} 
              className="w-5 h-5 mr-2"
            />
            <span className="font-medium mr-1">{coin.name}</span>
            <span className="text-gray-300 mr-2">{coin.symbol.toUpperCase()}</span>
            <span className="font-medium mr-2">${formatPrice(coin.current_price)}</span>
            <span 
              className={`flex items-center ${
                coin.price_change_percentage_24h >= 0 
                  ? 'text-green-400' 
                  : 'text-red-400'
              }`}
            >
              {coin.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {formatPercentage(coin.price_change_percentage_24h)}
            </span>
            <span className="text-gray-400 ml-2 text-xs">
              MCap: {formatMarketCap(coin.market_cap)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}