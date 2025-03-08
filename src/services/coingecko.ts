/**
 * CoinGecko API Service
 * 
 * This service handles fetching cryptocurrency data from CoinGecko's API.
 * CoinGecko provides cryptocurrency prices, market data, and metadata.
 */

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d?: number;
  last_updated: string;
}

// CoinGecko API endpoint
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// Function to fetch top cryptocurrencies
export async function fetchTopCryptos(limit: number = 10): Promise<CryptoCoin[]> {
  try {
    // In WebContainer environment, return mock data
    if (window.location.hostname.includes('webcontainer')) {
      return getMockCryptoData(limit);
    }

    const response = await fetch(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h,7d`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    // Return mock data in case of error
    return getMockCryptoData(limit);
  }
}

// Function to get mock cryptocurrency data for development/testing
function getMockCryptoData(limit: number = 10): CryptoCoin[] {
  const mockCoins: CryptoCoin[] = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 51234.56,
      market_cap: 998765432100,
      market_cap_rank: 1,
      price_change_percentage_24h: 2.45,
      price_change_percentage_7d: 5.32,
      last_updated: new Date().toISOString()
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      current_price: 2765.43,
      market_cap: 332145678900,
      market_cap_rank: 2,
      price_change_percentage_24h: 1.23,
      price_change_percentage_7d: 3.45,
      last_updated: new Date().toISOString()
    },
    {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
      current_price: 567.89,
      market_cap: 87654321000,
      market_cap_rank: 3,
      price_change_percentage_24h: -0.75,
      price_change_percentage_7d: 1.98,
      last_updated: new Date().toISOString()
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      current_price: 123.45,
      market_cap: 45678912300,
      market_cap_rank: 4,
      price_change_percentage_24h: 3.21,
      price_change_percentage_7d: 7.65,
      last_updated: new Date().toISOString()
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
      current_price: 0.5678,
      market_cap: 28976543100,
      market_cap_rank: 5,
      price_change_percentage_24h: 0.98,
      price_change_percentage_7d: -1.23,
      last_updated: new Date().toISOString()
    },
    {
      id: "cardano",
      symbol: "ada",
      name: "Cardano",
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      current_price: 0.4321,
      market_cap: 15432198700,
      market_cap_rank: 6,
      price_change_percentage_24h: -1.45,
      price_change_percentage_7d: -0.87,
      last_updated: new Date().toISOString()
    },
    {
      id: "polkadot",
      symbol: "dot",
      name: "Polkadot",
      image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
      current_price: 6.78,
      market_cap: 8765432100,
      market_cap_rank: 7,
      price_change_percentage_24h: 2.34,
      price_change_percentage_7d: 4.56,
      last_updated: new Date().toISOString()
    },
    {
      id: "dogecoin",
      symbol: "doge",
      name: "Dogecoin",
      image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
      current_price: 0.1234,
      market_cap: 7654321000,
      market_cap_rank: 8,
      price_change_percentage_24h: 5.67,
      price_change_percentage_7d: 9.87,
      last_updated: new Date().toISOString()
    },
    {
      id: "avalanche",
      symbol: "avax",
      name: "Avalanche",
      image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
      current_price: 34.56,
      market_cap: 6543219800,
      market_cap_rank: 9,
      price_change_percentage_24h: -0.45,
      price_change_percentage_7d: 2.34,
      last_updated: new Date().toISOString()
    },
    {
      id: "chainlink",
      symbol: "link",
      name: "Chainlink",
      image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
      current_price: 12.34,
      market_cap: 5432198700,
      market_cap_rank: 10,
      price_change_percentage_24h: 1.23,
      price_change_percentage_7d: 3.45,
      last_updated: new Date().toISOString()
    }
  ];

  return mockCoins.slice(0, limit);
}