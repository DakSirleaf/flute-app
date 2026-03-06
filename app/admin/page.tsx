"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { usePosts } from "@/lib/hooks/usePosts";

export default function AdminPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [adminName, setAdminName] = useState("");
  const [isSettingPin, setIsSettingPin] = useState(false);

  useEffect(() => {
    checkForStoredPin();
  }, []);

  const checkForStoredPin = async () => {
    try {
      const { data } = await supabase
        .from("admin_settings")
        .select("value")
        .eq("key", "admin_pin")
        .single();

      if (data) {
        setStoredPin(data.value);
      } else {
        setIsSettingPin(true);
      }
    } catch (error) {
      console.error("Error checking admin PIN:", error);
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSettingPin) {
      // Setting new PIN
      if (pin.length < 4) {
        alert("PIN must be at least 4 digits");
        return;
      }
      if (adminName.trim() !== "A. Ace Sirleaf") {
        alert("Invalid owner name");
        return;
      }

      try {
        await supabase.from("admin_settings").insert({
          key: "admin_pin",
          value: pin,
        });
        setStoredPin(pin);
        setIsAuthenticated(true);
        setIsSettingPin(false);
      } catch (error) {
        alert("Failed to set PIN");
      }
    } else {
      // Verifying existing PIN
      if (pin === storedPin) {
        setIsAuthenticated(true);
      } else {
        alert("Incorrect PIN");
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center px-4">
        <div className="glass-card p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Access
          </h1>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            {isSettingPin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  placeholder="A. Ace Sirleaf"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isSettingPin ? "Set PIN (4-6 digits)" : "Enter PIN"}
              </label>
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={6}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-darkBg font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-all"
            >
              {isSettingPin ? "Set PIN" : "Submit"}
            </button>
          </form>
          <button
            onClick={() => router.push("/feed")}
            className="w-full mt-4 text-gray-400 text-sm hover:text-white transition-colors"
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onExit={() => router.push("/feed")} />;
}

function AdminDashboard({ onExit }: { onExit: () => void }) {
  const { posts, deletePost } = usePosts();
  const [users, setUsers] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalLikes: 0,
  });
  const [activeTab, setActiveTab] = useState<"dashboard" | "posts" | "users" | "danger">("dashboard");

  useEffect(() => {
    fetchUsers();
    calculateMetrics();
  }, [posts]);

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*");
    if (data) setUsers(data);
  };

  const calculateMetrics = () => {
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0);
    setMetrics({
      totalPosts: posts.length,
      totalUsers: users.length,
      totalLikes,
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm("Delete this post?")) {
      try {
        await deletePost(postId);
        alert("Post deleted successfully");
      } catch (error) {
        alert("Failed to delete post");
      }
    }
  };

  const handlePinPost = async (postId: string, currentlyPinned: boolean) => {
    try {
      await supabase
        .from("posts")
        .update({ pinned: !currentlyPinned })
        .eq("id", postId);
      alert(currentlyPinned ? "Post unpinned" : "Post pinned");
    } catch (error) {
      alert("Failed to update post");
    }
  };

  const handleClearAllPosts = async () => {
    if (confirm("WARNING: This will delete ALL posts. This cannot be undone!")) {
      if (confirm("Are you absolutely sure?")) {
        try {
          await supabase.from("posts").delete().neq("id", "");
          alert("All posts cleared");
        } catch (error) {
          alert("Failed to clear posts");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-darkBg pb-24">
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
          <button onClick={onExit} className="text-gray-400 hover:text-white">
            Exit
          </button>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["dashboard", "posts", "users", "danger"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-primary text-darkBg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold text-primary">{metrics.totalPosts}</p>
                <p className="text-sm text-gray-400 mt-1">Posts</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold text-primary">{metrics.totalUsers}</p>
                <p className="text-sm text-gray-400 mt-1">Users</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-3xl font-bold text-primary">{metrics.totalLikes}</p>
                <p className="text-sm text-gray-400 mt-1">Likes</p>
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="glass-card p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-white">{post.author?.name}</p>
                    <p className="text-sm text-gray-400">{post.type}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePinPost(post.id, post.pinned)}
                      className={`px-3 py-1 text-xs rounded ${
                        post.pinned ? "bg-primary text-darkBg" : "bg-gray-700 text-white"
                      }`}
                    >
                      {post.pinned ? "Unpin" : "Pin"}
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{post.body.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="glass-card p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.location || "No location"}</p>
                </div>
                <div className={`px-3 py-1 rounded text-xs ${
                  user.available ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-400"
                }`}>
                  {user.available ? "Available" : "Offline"}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Danger Zone Tab */}
        {activeTab === "danger" && (
          <div className="space-y-4">
            <div className="glass-card p-6 border-2 border-red-500">
              <h3 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h3>
              <button
                onClick={handleClearAllPosts}
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-all"
              >
                Clear All Posts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
