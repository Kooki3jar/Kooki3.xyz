/**
 * CoinDesk API Service
 * 
 * This service handles fetching cryptocurrency news from CoinDesk's API.
 * CoinDesk provides cryptocurrency news, analysis, and market data.
 */

import { Article } from '../types/news';

// CoinDesk API endpoints
const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const COINDESK_NEWS_URL = 'https://www.coindesk.com/arc/outboundfeeds/rss/';

// Function to fetch current Bitcoin price
export async function fetchBitcoinPrice(): Promise<{
  USD: number;
  GBP: number;
  EUR: number;
  updated: string;
}> {
  try {
    // In WebContainer environment, return mock data
    if (window.location.hostname.includes('webcontainer')) {
      return {
        USD: 51234.56,
        GBP: 37890.12,
        EUR: 43567.89,
        updated: new Date().toISOString()
      };
    }

    const response = await fetch(COINDESK_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch Bitcoin price');
    }

    const data = await response.json();
    
    return {
      USD: parseFloat(data.bpi.USD.rate.replace(',', '')),
      GBP: parseFloat(data.bpi.GBP.rate.replace(',', '')),
      EUR: parseFloat(data.bpi.EUR.rate.replace(',', '')),
      updated: data.time.updated
    };
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    // Return fallback data in case of error
    return {
      USD: 50000.00,
      GBP: 37000.00,
      EUR: 43000.00,
      updated: new Date().toISOString()
    };
  }
}

// Function to parse RSS feed
async function parseRSSFeed(url: string): Promise<Article[]> {
  try {
    // In WebContainer environment, return mock data
    if (window.location.hostname.includes('webcontainer')) {
      return getMockNewsArticles();
    }

    // Use a CORS proxy for RSS feed
    const corsProxy = 'https://api.allorigins.win/raw?url=';
    const response = await fetch(`${corsProxy}${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const articles: Article[] = [];

    items.forEach((item, index) => {
      // Extract data from RSS item
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      
      // Extract image from media:content or enclosure
      let image = item.querySelector('media\\:content, content')?.getAttribute('url') || '';
      if (!image) {
        image = item.querySelector('enclosure')?.getAttribute('url') || '';
      }
      
      // Extract categories
      const categories: string[] = [];
      item.querySelectorAll('category').forEach(cat => {
        if (cat.textContent) categories.push(cat.textContent);
      });

      // Create article object
      articles.push({
        id: index + 1,
        title,
        description: cleanDescription(description),
        source: 'CoinDesk',
        time: formatDate(pubDate),
        url: link,
        image: image || getDefaultImage(index),
        categories
      });
    });

    return articles;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return getMockNewsArticles();
  }
}

// Function to clean HTML from description
function cleanDescription(html: string): string {
  // Create a temporary div to hold the HTML
  const temp = document.createElement('div');
  temp.innerHTML = html;
  // Return text content only
  return temp.textContent || temp.innerText || '';
}

// Function to format date
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return '1 hour ago';
    }
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    }
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffDays = Math.round(diffHours / 24);
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString();
  } catch (error) {
    return '1 hour ago';
  }
}

// Function to get default image
function getDefaultImage(index: number): string {
  const images = [
    'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80',
    'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&q=80',
    'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    'https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=800&q=80'
  ];
  
  return images[index % images.length];
}

// Function to fetch cryptocurrency news
export async function fetchCryptoNews(): Promise<Article[]> {
  try {
    return await parseRSSFeed(`${COINDESK_NEWS_URL}`);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    return getMockNewsArticles();
  }
}

// Function to get mock news articles for development/testing
function getMockNewsArticles(): Article[] {
  return [
    {
      id: 1,
      title: "Bitcoin Surges Past $50,000 as Market Sentiment Improves",
      description: "Bitcoin has broken through the psychological $50,000 barrier for the first time in weeks, as market sentiment improves following positive regulatory developments.",
      source: "CoinDesk",
      time: "2 hours ago",
      url: "https://www.coindesk.com/",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      categories: ["Bitcoin", "Markets"]
    },
    {
      id: 2,
      title: "Ethereum Layer 2 Solutions See Record Growth",
      description: "Transaction volumes on Ethereum L2 networks reach new all-time highs as adoption grows and gas fees on the main network remain high.",
      source: "CoinDesk",
      time: "4 hours ago",
      url: "https://www.coindesk.com/",
      image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&q=80",
      categories: ["Ethereum", "Layer 2", "Technology"]
    },
    {
      id: 3,
      title: "Major Bank Announces Crypto Custody Service",
      description: "One of the world's largest banks has announced plans to offer cryptocurrency custody services to institutional clients, marking another step toward mainstream adoption.",
      source: "CoinDesk",
      time: "6 hours ago",
      url: "https://www.coindesk.com/",
      image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&q=80",
      categories: ["Banking", "Custody", "Institutional"]
    },
    {
      id: 4,
      title: "NFT Market Shows Signs of Recovery",
      description: "Trading volumes increase as new collections and use cases emerge, suggesting the NFT market may be rebounding from its recent slump.",
      source: "CoinDesk",
      time: "8 hours ago",
      url: "https://www.coindesk.com/",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      categories: ["NFTs", "Markets"]
    },
    {
      id: 5,
      title: "New DeFi Protocol Reaches $1B TVL in 24 Hours",
      description: "A new decentralized finance protocol has reached $1 billion in total value locked within 24 hours of launch, highlighting continued interest in the DeFi space.",
      source: "CoinDesk",
      time: "10 hours ago",
      url: "https://www.coindesk.com/",
      image: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=800&q=80",
      categories: ["DeFi", "TVL"]
    }
  ];
}