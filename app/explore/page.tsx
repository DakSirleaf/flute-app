"use client";

import { usePosts } from "@/lib/hooks/usePosts";
import BottomNav from "@/components/layout/BottomNav";
import SportsCard from "@/components/sports/SportsCard";
import FeedCard from "@/components/feed/FeedCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function ExplorePage() {
  return (
    <ProtectedRoute>
      <ExploreContent />
    </ProtectedRoute>
  );
}

function ExploreContent() {
  const { user } = useAuth();
  const { posts, likePost, deletePost } = usePosts();

  const trendingPosts = posts
    .filter((p) => p.likes > 0)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const handleLike = async (postId: string) => {
    if (user) {
      await likePost(postId, user.id);
    }
  };

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
      } catch (error) {
        alert("Failed to delete post");
      }
    }
  };

  // Sample sports data - in production, this would come from TheSportsDB API
  const sportsGames = [
    {
      league: "NFL",
      homeTeam: "Chiefs",
      awayTeam: "Bills",
      homeScore: 28,
      awayScore: 24,
      status: "live" as const,
    },
    {
      league: "NBA",
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      homeScore: 112,
      awayScore: 108,
      status: "finished" as const,
    },
    {
      league: "EPL",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      homeScore: 0,
      awayScore: 0,
      status: "upcoming" as const,
      time: "8:00 PM",
    },
  ];

  return (
    <div className="min-h-screen pb-24 bg-lightBg dark:bg-darkBg">
      <div className="max-w-md mx-auto px-4 pt-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore
          </h1>
        </header>

        <div className="space-y-6">
          {/* Sports Scores */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>⚽</span>
              <span>Live Sports</span>
            </h2>
            <div className="space-y-3">
              {sportsGames.map((game, index) => (
                <SportsCard key={index} {...game} />
              ))}
            </div>
          </section>

          {/* Trending Posts */}
          {trendingPosts.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🔥</span>
                <span>Trending</span>
              </h2>
              <div className="space-y-4">
                {trendingPosts.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Local Events placeholder */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📍</span>
              <span>Local Events</span>
            </h2>
            <div className="glass-card p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Local events will appear here when available
              </p>
            </div>
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
