"use client";

import { motion } from "framer-motion";
import { Post } from "@/types";
import { timeAgo, formatExpiry } from "@/lib/utils/helpers";
import { useAuth } from "@/lib/contexts/AuthContext";
import MediaPreview from "./MediaPreview";

interface FeedCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

export default function FeedCard({ post, onLike, onDelete }: FeedCardProps) {
  const { user } = useAuth();
  const isOwner = user?.id === post.author_id;

  const getCardIcon = () => {
    switch (post.type) {
      case "help":
        return "🆘";
      case "meetup":
        return "☕";
      case "media":
        return "🎬";
      case "sports":
        return "⚽";
      case "marketplace":
        return "🛒";
      case "announcement":
        return "📢";
      default:
        return "📝";
    }
  };

  const getCardColor = () => {
    switch (post.type) {
      case "help":
        return "border-red-500/50";
      case "meetup":
        return "border-blue-500/50";
      case "media":
        return "border-purple-500/50";
      case "sports":
        return "border-green-500/50";
      case "marketplace":
        return "border-yellow-500/50";
      case "announcement":
        return "border-primary/50";
      default:
        return "border-gray-500/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`glass-card p-4 border-l-4 ${getCardColor()} ${
        post.pinned ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
            {post.author?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {post.author?.name || "Anonymous"}
              </h3>
              <span className="text-lg">{getCardIcon()}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {timeAgo(post.created_at)}
              {post.pinned && (
                <span className="ml-2 text-primary font-medium">📌 Pinned</span>
              )}
            </p>
          </div>
        </div>

        {isOwner && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-500 hover:text-red-600 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      {/* Body */}
      <p className="text-gray-800 dark:text-gray-200 mb-3 whitespace-pre-wrap">
        {post.body}
      </p>

      {/* Media URL Preview */}
      {post.media_url && (
        <div className="mb-3">
          <MediaPreview url={post.media_url} />
        </div>
      )}

      {/* Location */}
      {post.location && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <span>📍</span>
          <span>{post.location}</span>
        </div>
      )}

      {/* Expiry */}
      {post.expires_at && (
        <div className="text-xs text-orange-500 mb-3">
          {formatExpiry(post.expires_at)}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
        >
          <span className="text-lg">❤️</span>
          <span className="text-sm font-medium">{post.likes || 0}</span>
        </button>

        <div className="flex items-center gap-3">
          {post.type === "help" && (
            <button className="px-4 py-2 bg-primary text-darkBg text-sm font-semibold rounded-lg hover:bg-opacity-90 transition-all">
              Offer Help
            </button>
          )}
          {post.type === "meetup" && (
            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-all">
              Join
            </button>
          )}
          {post.type === "marketplace" && (
            <button className="px-4 py-2 bg-yellow-500 text-darkBg text-sm font-semibold rounded-lg hover:bg-yellow-600 transition-all">
              Message
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
