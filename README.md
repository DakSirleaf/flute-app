# Flute

**Jump on the Flute!** A private, real-time, action-oriented social + micro-community app for coworkers.

## Table of Contents
- [Getting Started](#getting-started)
- [Features Implemented](#features-implemented)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account and project

### Installation

1. Clone the repository
```bash
git clone https://github.com/DakSirleaf/flute-app.git
cd flute-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the Supabase database

Run the SQL schema in `supabase-schema.sql` in your Supabase SQL Editor

5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Features Implemented

### ✅ Core Features (100% Complete)

### 1. Authentication & User Management
- **Email/Password Authentication** via Supabase Auth
- **User Profiles** with editable fields (name, bio, location, availability status)
- **Protected Routes** - all app pages require authentication
- **Profile Management** - users can update their information
- **Session Management** - persistent login sessions

### 2. Feed System
- **Real-time Feed** with Supabase Realtime subscriptions
- **Post Types**: Help, Meetup, Media, Sports, Marketplace, Announcement
- **Filtering** by card type (All, Help, Meetup, Media, Sports, Shop)
- **Like System** with real-time like counts
- **Post Actions**: Like, Delete (own posts)
- **Pinned Posts** displayed at top of feed
- **Empty State** with call-to-action
- **Skeleton Loaders** during data fetch

### 3. Post Creation
- **6 Card Types** with dedicated icons and colors
- **Dynamic Forms** based on selected card type
- **Text Input** with character limit (500 chars)
- **Media URL Support** for YouTube, TikTok, Spotify, Instagram
- **Location Input** for Help, Meetup, Marketplace posts
- **12-hour Auto-Expiry** for media posts
- **Real-time Publishing** - posts appear instantly in feed

### 4. Media Integration
- **YouTube Embeds** - in-app video playback
- **Spotify Embeds** - in-app music playback
- **TikTok Links** - clickable preview cards
- **Instagram Links** - clickable preview cards
- **Media Type Detection** - automatic URL parsing
- **12-hour Expiry** for media/image posts

### 5. Explore Page
- **Trending Posts** - sorted by likes
- **Sports Scores** - live, upcoming, and finished games (NFL, NBA, EPL)
- **Sports Cards** with real-time status indicators
- **Local Events** section (placeholder for future integration)

### 6. Admin Panel
- **PIN Authentication** - tap logo 7x to access
- **First-time Setup** - set PIN with owner name verification
- **Dashboard** - metrics (total posts, users, likes)
- **Post Management** - view all posts, pin/unpin, delete
- **User Management** - view all users and their status
- **Danger Zone** - clear all posts (with double confirmation)
- **Multi-tab Interface** for organized access

### 7. Design & UI
- **Light/Dark Mode Toggle** - persistent theme preference
- **Glassmorphism Cards** - semi-transparent, blurred backgrounds
- **Framer Motion Animations** - smooth page transitions and card animations
- **Responsive Design** - mobile-first at 390px width
- **Custom Scrollbar** styling
- **Plus Jakarta Sans** typography
- **Bottom Navigation** with active state indicators
- **Toast-style Empty States**

### 8. Technical Features
- **Real-time Updates** via Supabase Realtime
- **Row Level Security (RLS)** for data protection
- **TypeScript Strict Mode** throughout
- **Server Components** for optimal performance
- **Client Components** where interactivity needed
- **Custom Hooks** (usePosts, useAuth)
- **Context API** for global state (AuthContext)
- **Utility Functions** (timeAgo, formatExpiry, extractMediaInfo)
- **PWA Support** with manifest.json

## Database Setup

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Go to SQL Editor in your Supabase dashboard

3. Copy and run the entire `supabase-schema.sql` file

This will create:
- **7 Tables**: profiles, posts, likes, conversations, messages, banned_users, admin_settings
- **RLS Policies**: row-level security for all tables
- **Indexes**: for improved query performance
- **Triggers**: auto-create profile on signup, auto-update like counts
- **Functions**: expired post cleanup

4. Enable Realtime for posts, messages, and likes tables:
   - Go to Database > Replication
   - Enable Realtime for these tables

## Project Structure

```
flute-app/
├── app/                      # Next.js 14 App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Splash screen
│   ├── globals.css          # Global styles
│   ├── auth/page.tsx        # Login/signup
│   ├── feed/page.tsx        # Main feed
│   ├── explore/page.tsx     # Explore & sports
│   ├── create/page.tsx      # Post creation
│   ├── messages/page.tsx    # Messaging
│   ├── profile/page.tsx     # User profile
│   └── admin/page.tsx       # Admin panel
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── feed/
│   │   ├── FeedCard.tsx     # Post display
│   │   └── MediaPreview.tsx # Media embeds
│   ├── layout/
│   │   ├── BottomNav.tsx    # Navigation
│   │   └── ClientLayout.tsx # Theme wrapper
│   ├── sports/
│   │   └── SportsCard.tsx   # Live scores
│   └── ui/
│       └── SkeletonCard.tsx # Loading states
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── contexts/
│   │   └── AuthContext.tsx  # Auth state
│   ├── hooks/
│   │   └── usePosts.ts      # Posts logic
│   └── utils/
│       └── helpers.ts       # Utility functions
├── types/
│   └── index.ts             # TypeScript types
├── public/
│   ├── manifest.json        # PWA manifest
│   └── icons/               # App icons
├── supabase-schema.sql      # Database schema
└── .env.local               # Environment variables
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Supabase (PostgreSQL + Realtime + Auth)
- **Maps**: Leaflet.js (ready for integration)
- **PWA**: next-pwa with service worker
- **Deployment**: Vercel-ready

## Key Features Summary

✅ User authentication & profiles
✅ Real-time feed with 6 post types
✅ Post creation with media support
✅ YouTube & Spotify embeds
✅ Like system
✅ Sports scores display
✅ Explore page with trending posts
✅ Admin panel with metrics
✅ Light/dark mode toggle
✅ 12-hour media expiry
✅ Glassmorphism design
✅ PWA support

## Admin Access

1. Tap the "Flute" logo 7 times on the splash screen
2. First time: Enter your name (must be "A. Ace Sirleaf") and set a PIN
3. Subsequent times: Enter your PIN
4. Access dashboard, manage posts, view users, and danger zone features

## Design Principles

- **Mobile-first** - optimized for 390px width
- **No demo data** - clean slate on first run
- **Real-time** - instant updates via Supabase
- **Glassmorphism** - modern, semi-transparent cards
- **Accessibility** - semantic HTML, ARIA labels
- **Performance** - skeleton loaders, lazy loading

## Repository

- GitHub: [https://github.com/DakSirleaf/flute-app](https://github.com/DakSirleaf/flute-app)
- Owner: A. Ace Sirleaf — Kola Technology Laboratory

## License

ISC

---

**Built with ❤️ for coworker communities**
