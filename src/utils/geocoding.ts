import { useState, useEffect } from 'react';

interface GeocodeResult {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  showPublicly: boolean;
}

// Cache for geocoding results
const geocodeCache = new Map<string, Promise<GeocodeResult>>();

// Using OpenStreetMap's Nominatim service for geocoding
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

// Default coordinates (center of US) for fallback
const DEFAULT_COORDS: GeocodeResult = {
  lat: 39.8283,
  lng: -98.5795
};

export async function geocodeAddress(address: Address): Promise<GeocodeResult> {
  const query = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, USA`;
  
  // Check cache first
  if (geocodeCache.has(query)) {
    return geocodeCache.get(query)!;
  }

  // Create new geocoding promise
  const geocodePromise = (async () => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(
        `${NOMINATIM_BASE_URL}?q=${encodedQuery}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'Kooki3 Marketplace'
          }
        }
      );

      const data = await response.json();

      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }

      console.warn(`No results found for address: ${query}`);
      return DEFAULT_COORDS;
    } catch (error) {
      console.error('Geocoding error:', error);
      return DEFAULT_COORDS;
    }
  })();

  // Store in cache
  geocodeCache.set(query, geocodePromise);

  // Return result
  return geocodePromise;
}

// Hook for managing geocoding state
export function useGeocoding(address: Address) {
  const [result, setResult] = useState<GeocodeResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getCoordinates() {
      try {
        setLoading(true);
        const coords = await geocodeAddress(address);
        if (mounted) {
          setResult(coords);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Geocoding failed'));
          setResult(DEFAULT_COORDS);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    getCoordinates();

    return () => {
      mounted = false;
    };
  }, [address.street, address.city, address.state, address.zipCode]);

  return { result, loading, error };
}

// Clear cache after 1 hour
setInterval(() => {
  geocodeCache.clear();
}, 60 * 60 * 1000);