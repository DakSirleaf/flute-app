# Flute Setup Guide

Complete step-by-step guide to set up and run Flute locally.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/DakSirleaf/flute-app.git
cd flute-app
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 19
- Supabase JS Client
- Framer Motion
- Tailwind CSS
- Leaflet
- And more...

## Step 3: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: `flute-app` (or any name you prefer)
   - Database Password: (choose a strong password)
   - Region: (select closest to your users)
4. Click "Create New Project"
5. Wait for project to be ready (2-3 minutes)

## Step 4: Get Supabase Credentials

1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Go to "API" section
3. Find and copy:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ...`)

## Step 5: Configure Environment Variables

1. Create a file named `.env.local` in the project root
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values you copied.

## Step 6: Set Up Database Schema

1. In your Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Open the `supabase-schema.sql` file from the project
4. Copy the entire contents
5. Paste into the SQL Editor
6. Click "Run" or press Ctrl+Enter

This creates all necessary tables, policies, functions, and triggers.

## Step 7: Enable Realtime

1. In Supabase dashboard, go to "Database" > "Replication"
2. Find and enable Realtime for these tables:
   - `posts`
   - `messages`
   - `likes`
3. Click "Save" for each table

## Step 8: Start Development Server

```bash
npm run dev
```

The app will start on [http://localhost:3000](http://localhost:3000)

## Step 9: Create Your First User

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. You'll see the animated splash screen
3. Wait for auto-redirect to the auth page
4. Click "Sign Up"
5. Enter:
   - Name: Your name
   - Email: Your email
   - Password: At least 6 characters
6. Click "Create Account"

## Step 10: Access Admin Panel (Optional)

1. Go back to the splash screen ([http://localhost:3000](http://localhost:3000))
2. Tap the "Flute" logo exactly 7 times within 2 seconds
3. You'll be redirected to the admin panel
4. First time setup:
   - Enter owner name: "A. Ace Sirleaf"
   - Set a PIN (4-6 digits)
   - Click "Set PIN"
5. You're now in the admin panel!

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Check that `.env.local` exists in the project root
- Verify the variable names match exactly:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart the dev server after creating/modifying `.env.local`

### Error: "relation 'posts' does not exist"

- Make sure you ran the entire `supabase-schema.sql` file
- Check for any SQL errors in the Supabase SQL Editor
- Verify the schema was created by going to "Database" > "Tables"

### Posts not updating in real-time

- Enable Realtime for the `posts` table in Supabase
- Go to Database > Replication
- Toggle on Realtime for `posts`, `messages`, and `likes`

### Webpack/Turbopack errors

- The app uses webpack mode for compatibility
- If you see PostCSS errors, make sure `@tailwindcss/postcss` is installed
- Try deleting `.next` folder and restarting: `rm -rf .next && npm run dev`

### Authentication issues

- Check Supabase Auth settings in dashboard
- Verify email confirmations are disabled for development (Settings > Auth > Email Auth)
- For production, configure email templates and SMTP

## Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## Next Steps

- Explore the feed and create your first post
- Try different post types (Help, Meetup, Media, etc.)
- Share YouTube or Spotify links in media posts
- Check out the Explore page for trending posts
- Customize your profile
- Access the admin panel to manage posts and users

## Need Help?

- Check the main [README.md](README.md) for feature documentation
- Review the PRD in [CLAUDE.md](CLAUDE.md) for detailed requirements
- Open an issue on GitHub for bugs or feature requests

---

**Happy Flute-ing!** 🎵
