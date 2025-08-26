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
        };
      };
    };
  };
};