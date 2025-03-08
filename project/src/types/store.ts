export interface StoreAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  showPublicly: boolean;
}

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
export type ClothingGender = 'mens' | 'womens' | 'unisex';

export interface ProductVariant {
  size?: ClothingSize;
  gender?: ClothingGender;
  inStock: boolean;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  allergens?: string[];
  dietaryInfo?: string[];
  ingredients?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  variants?: ProductVariant[];
  gender?: ClothingGender;
  availableSizes?: ClothingSize[];
}

export interface StoreSettings {
  vacation_start?: string;
  vacation_end?: string;
  show_location: boolean;
  show_hours: boolean;
  show_policies: boolean;
  business_hours: {
    [key: string]: string;
  };
  shipping_policy: string;
  return_policy: string;
  payment_policy: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  banner_url?: string;
  logo_url?: string;
  status: 'active' | 'inactive' | 'vacation';
  is_open: boolean;
  is_physical: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
  settings?: StoreSettings;
  items?: Product[];
}