export interface ImageData {
  id: string;
  url: string;
  name: string;
  alt: string;
  category: 'product' | 'banner' | 'gallery' | 'avatar';
  createdAt: number;
  updatedAt: number;
}