# Flute - Quick Start Guide

Get Flute running in 5 minutes!

## Prerequisites

- Node.js 18+
- A Supabase account

## Quick Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your **Project URL** and **anon key** from Settings > API

### 3. Configure Environment (30 sec)

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

### 4. Set Up Database (1 min)

1. Go to Supabase SQL Editor
2. Copy all content from `supabase-schema.sql`
3. Paste and run it
4. Go to Database > Replication
5. Enable Realtime for: `posts`, `messages`, `likes`

### 5. Start the App (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Sign Up**: Create your account
2. **Create a Post**: Try all 6 post types
3. **Share Media**: Paste a YouTube or Spotify link
4. **Admin Access**: Tap logo 7 times, enter "A. Ace Sirleaf" and set PIN

## That's It!

You're now running Flute locally. Check out:
- [README.md](README.md) for detailed features
- [SETUP-GUIDE.md](SETUP-GUIDE.md) for troubleshooting
- [BUILD-SUMMARY.md](BUILD-SUMMARY.md) for technical details

**Jump on the Flute!** 🎵
