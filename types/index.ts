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

export type PostType = 'help' | 'meetup' | 'media' | 'sports' | 'marketplace' | 'announcement';

export type Post = {
  id: string;
  author_id: string;
  type: PostType;
  body: string;
  media_url?: string;
  media_type?: string;
  location?: string;
  expires_at?: string;
  likes: number;
  pinned: boolean;
  is_broadcast: boolean;
  created_at: string;
  author?: Profile;
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
