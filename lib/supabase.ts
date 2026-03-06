import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Profile = {
  id: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  role?: string;
  location?: string;
  available?: boolean;
  created_at: string;
};

export type Post = {
  id: string;
  author_id: string;
  type: 'help' | 'meetup' | 'media' | 'sports' | 'marketplace' | 'announcement';
  body: string;
  media_url?: string;
  media_type?: string;
  location?: string;
  expires_at?: string;
  likes: number;
  pinned: boolean;
  is_broadcast: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  media_url?: string;
  read: boolean;
  created_at: string;
};

export type Conversation = {
  id: string;
  participants: string[];
  created_at: string;
};
