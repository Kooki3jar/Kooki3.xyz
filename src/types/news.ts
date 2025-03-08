export interface Article {
  id: number;
  title: string;
  description: string;
  source: string;
  time: string;
  url: string;
  image: string;
  categories?: string[];
}

export interface CryptoPrice {
  USD: number;
  GBP: number;
  EUR: number;
  updated: string;
}