"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { PostType } from "@/types";
import { getMediaExpiry, extractMediaInfo } from "@/lib/utils/helpers";
import BottomNav from "@/components/layout/BottomNav";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CreatePage() {
  return (
    <ProtectedRoute>
      <CreateContent />
    </ProtectedRoute>
  );
}

function CreateContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedType, setSelectedType] = useState<PostType | null>(null);
  const [body, setBody] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postTypes = [
    { type: "help" as PostType, label: "Help Request", icon: "🆘", color: "bg-red-500" },
    { type: "meetup" as PostType, label: "Meetup", icon: "☕", color: "bg-blue-500" },
    { type: "media" as PostType, label: "Media Share", icon: "🎬", color: "bg-purple-500" },
    { type: "sports" as PostType, label: "Sports", icon: "⚽", color: "bg-green-500" },
    { type: "marketplace" as PostType, label: "Marketplace", icon: "🛒", color: "bg-yellow-500" },
    { type: "announcement" as PostType, label: "Announcement", icon: "📢", color: "bg-primary" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedType) return;

    setLoading(true);
    setError("");

    try {
      const postData: any = {
        author_id: user.id,
        type: selectedType,
        body: body.trim(),
        location: location.trim() || null,
      };

      // Handle media URL
      if (mediaUrl.trim()) {
        postData.media_url = mediaUrl.trim();
        const mediaInfo = extractMediaInfo(mediaUrl);
        postData.media_type = mediaInfo.type;

        // Set 12-hour expiry for media posts
        if (selectedType === "media") {
          postData.expires_at = getMediaExpiry(new Date().toISOString());
        }
      }

      const { error: insertError } = await supabase.from("posts").insert([postData]);

      if (insertError) throw insertError;

      router.push("/feed");
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/feed");
  };

  return (
    <div className="min-h-screen pb-24 bg-lightBg dark:bg-darkBg">
      <div className="max-w-md mx-auto px-4 pt-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Post
          </h1>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel
          </button>
        </header>

        {!selectedType ? (
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Select post type:
            </p>
            {postTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setSelectedType(type.type)}
                className="w-full glass-card p-4 hover:scale-[1.02] transition-transform flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center text-2xl`}
                >
                  {type.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {type.label}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Selected Type */}
            <div className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {postTypes.find((t) => t.type === selectedType)?.icon}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {postTypes.find((t) => t.type === selectedType)?.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedType(null);
                  setBody("");
                  setMediaUrl("");
                  setLocation("");
                }}
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Change
              </button>
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={4}
                placeholder="What's on your mind?"
                required
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{body.length}/500</p>
            </div>

            {/* Media URL (optional) */}
            {["media", "sports", "marketplace"].includes(selectedType) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {selectedType === "media"
                    ? "Media URL (YouTube, TikTok, Spotify, Instagram)"
                    : selectedType === "sports"
                    ? "Game/Event URL (optional)"
                    : "Item Photo URL (optional)"}
                </label>
                <input
                  type="url"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://..."
                />
                {selectedType === "media" && (
                  <p className="text-xs text-orange-500 mt-1">
                    Media posts expire after 12 hours
                  </p>
                )}
              </div>
            )}

            {/* Location (optional) */}
            {["help", "meetup", "marketplace"].includes(selectedType) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="City, Building, etc."
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !body.trim()}
              className="w-full bg-primary text-darkBg font-semibold py-4 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
