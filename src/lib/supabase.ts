import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      mechanics: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          name: string;
          category: string;
          state: string;
          district: string;
          village: string;
          per_day_cost: number;
          contact_number: string;
          email: string;
          experience: number;
          description: string;
          availability: 'available' | 'busy' | 'unavailable';
          rating: number;
          completed_jobs: number;
          created_at: string;
          updated_at: string;
          profile_image_url: string;
          skills: string[];
          social_links: any;
          latitude: number;
          longitude: number;
          profile_completion_percentage: number;
          last_login: string;
          email_verified: boolean;
          phone_verified: boolean;
          is_featured: boolean;
          portfolio_images: string[];
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          name: string;
          category: string;
          state: string;
          district: string;
          village: string;
          per_day_cost: number;
          contact_number: string;
          email: string;
          experience?: number;
          description: string;
          availability?: 'available' | 'busy' | 'unavailable';
          rating?: number;
          completed_jobs?: number;
          created_at?: string;
          updated_at?: string;
          profile_image_url?: string;
          skills?: string[];
          social_links?: any;
          latitude?: number;
          longitude?: number;
          profile_completion_percentage?: number;
          last_login?: string;
          email_verified?: boolean;
          phone_verified?: boolean;
          is_featured?: boolean;
          portfolio_images?: string[];
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          name?: string;
          category?: string;
          state?: string;
          district?: string;
          village?: string;
          per_day_cost?: number;
          contact_number?: string;
          email?: string;
          experience?: number;
          description?: string;
          availability?: 'available' | 'busy' | 'unavailable';
          rating?: number;
          completed_jobs?: number;
          created_at?: string;
          updated_at?: string;
          profile_image_url?: string;
          skills?: string[];
          social_links?: any;
          latitude?: number;
          longitude?: number;
          profile_completion_percentage?: number;
          last_login?: string;
          email_verified?: boolean;
          phone_verified?: boolean;
          is_featured?: boolean;
          portfolio_images?: string[];
        };
      };
      mechanic_reviews: {
        Row: {
          id: string;
          mechanic_id: string;
          customer_name: string;
          customer_email: string;
          rating: number;
          review_text: string;
          work_category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          mechanic_id: string;
          customer_name: string;
          customer_email?: string;
          rating: number;
          review_text?: string;
          work_category?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          mechanic_id?: string;
          customer_name?: string;
          customer_email?: string;
          rating?: number;
          review_text?: string;
          work_category?: string;
          created_at?: string;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          user_email: string;
          mechanic_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_email: string;
          mechanic_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_email?: string;
          mechanic_id?: string;
          created_at?: string;
        };
      };
    };
  };
};