export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stores: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string | null
          banner_url: string | null
          logo_url: string | null
          status: 'active' | 'inactive' | 'vacation'
          is_open: boolean
          is_physical: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description?: string | null
          banner_url?: string | null
          logo_url?: string | null
          status?: 'active' | 'inactive' | 'vacation'
          is_open?: boolean
          is_physical?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string | null
          banner_url?: string | null
          logo_url?: string | null
          status?: 'active' | 'inactive' | 'vacation'
          is_open?: boolean
          is_physical?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      store_settings: {
        Row: {
          store_id: string
          vacation_start: string | null
          vacation_end: string | null
          show_location: boolean
          show_hours: boolean
          show_policies: boolean
          business_hours: Json
          shipping_policy: string
          return_policy: string
          payment_policy: string
          updated_at: string
        }
        Insert: {
          store_id: string
          vacation_start?: string | null
          vacation_end?: string | null
          show_location?: boolean
          show_hours?: boolean
          show_policies?: boolean
          business_hours?: Json
          shipping_policy?: string
          return_policy?: string
          payment_policy?: string
          updated_at?: string
        }
        Update: {
          store_id?: string
          vacation_start?: string | null
          vacation_end?: string | null
          show_location?: boolean
          show_hours?: boolean
          show_policies?: boolean
          business_hours?: Json
          shipping_policy?: string
          return_policy?: string
          payment_policy?: string
          updated_at?: string
        }
      }
      store_items: {
        Row: {
          id: string
          store_id: string
          name: string
          description: string | null
          price: number
          category: string
          images: string[]
          in_stock: boolean
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          description?: string | null
          price: number
          category: string
          images?: string[]
          in_stock?: boolean
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string
          images?: string[]
          in_stock?: boolean
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string | null
          store_id: string | null
          status: string
          total_amount: number
          shipping_address_id: string | null
          tracking_number: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          buyer_id?: string | null
          store_id?: string | null
          status?: string
          total_amount: number
          shipping_address_id?: string | null
          tracking_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          buyer_id?: string | null
          store_id?: string | null
          status?: string
          total_amount?: number
          shipping_address_id?: string | null
          tracking_number?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          item_id: string | null
          quantity: number
          price_at_time: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          item_id?: string | null
          quantity: number
          price_at_time: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          item_id?: string | null
          quantity?: number
          price_at_time?: number
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string | null
          store_id: string | null
          item_id: string | null
          rating: number
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          store_id?: string | null
          item_id?: string | null
          rating: number
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          store_id?: string | null
          item_id?: string | null
          rating?: number
          content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string | null
          store_id: string | null
          type: string
          street: string
          city: string
          state: string
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          store_id?: string | null
          type: string
          street: string
          city: string
          state: string
          postal_code: string
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          store_id?: string | null
          type?: string
          street?: string
          city?: string
          state?: string
          postal_code?: string
          country?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          content: string
          read: boolean
          data: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          content: string
          read?: boolean
          data?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          content?: string
          read?: boolean
          data?: Json
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          store_id: string | null
          item_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          store_id?: string | null
          item_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          store_id?: string | null
          item_id?: string | null
          created_at?: string
        }
      }
    }
  }
}