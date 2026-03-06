import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
import { RealtimeChannel } from "@supabase/supabase-js";

export function usePosts(filterType?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();

    // Set up realtime subscription
    const channel: RealtimeChannel = supabase
      .channel("posts_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            fetchPostWithAuthor(payload.new.id).then((post) => {
              if (post) {
                setPosts((prev) => [post, ...prev]);
              }
            });
          } else if (payload.eventType === "UPDATE") {
            setPosts((prev) =>
              prev.map((post) =>
                post.id === payload.new.id
                  ? { ...post, ...payload.new }
                  : post
              )
            );
          } else if (payload.eventType === "DELETE") {
            setPosts((prev) => prev.filter((post) => post.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filterType]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles(*)
        `
        )
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(50);

      if (filterType && filterType !== "all") {
        query = query.eq("type", filterType);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setPosts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostWithAuthor = async (postId: string): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles(*)
        `
        )
        .eq("id", postId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching post:", err);
      return null;
    }
  };

  const likePost = async (postId: string, userId: string) => {
    try {
      // Check if already liked
      const { data: existingLike } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .single();

      if (existingLike) {
        // Unlike
        await supabase.from("likes").delete().eq("id", existingLike.id);
      } else {
        // Like
        await supabase.from("likes").insert({
          post_id: postId,
          user_id: userId,
        });
      }
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
    } catch (err: any) {
      console.error("Error deleting post:", err);
      throw err;
    }
  };

  return { posts, loading, error, refetch: fetchPosts, likePost, deletePost };
}
