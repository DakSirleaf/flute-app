"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { usePosts } from "@/lib/hooks/usePosts";
import BottomNav from "@/components/layout/BottomNav";
import FeedCard from "@/components/feed/FeedCard";
import SkeletonCard from "@/components/ui/SkeletonCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function FeedPage() {
  return (
    <ProtectedRoute>
      <FeedContent />
    </ProtectedRoute>
  );
}

function FeedContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const { posts, loading, likePost, deletePost } = usePosts(
    filter === "all" ? undefined : filter
  );

  const filters = [
    { value: "all", label: "All", icon: "📋" },
    { value: "help", label: "Help", icon: "🆘" },
    { value: "meetup", label: "Meetup", icon: "☕" },
    { value: "media", label: "Media", icon: "🎬" },
    { value: "sports", label: "Sports", icon: "⚽" },
    { value: "marketplace", label: "Shop", icon: "🛒" },
  ];

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

  return (
    <div className="min-h-screen pb-24 bg-lightBg dark:bg-darkBg">
      <div className="max-w-md mx-auto px-4 pt-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Flute
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Jump on the Flute!
          </p>
        </header>

        {/* Filters */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                filter === f.value
                  ? "bg-primary text-darkBg"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : posts.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Be the first to share something on Flute!
              </p>
              <button
                onClick={() => router.push("/create")}
                className="px-6 py-3 bg-primary text-darkBg font-semibold rounded-lg hover:bg-opacity-90 transition-all"
              >
                Create Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <FeedCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
