"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";
import BottomNav from "@/components/layout/BottomNav";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { profile, user, signOut, updateProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [available, setAvailable] = useState(profile?.available || false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await updateProfile({
      name,
      bio,
      location,
      available,
    });

    if (!error) {
      setIsEditing(false);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen pb-24 bg-lightBg dark:bg-darkBg">
      <div className="max-w-md mx-auto px-4 pt-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </header>

        <div className="space-y-4">
          {/* Profile Card */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                {profile?.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {profile?.name || "Anonymous"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </>
                ) : (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                )}
              </div>
            </div>

            {!isEditing ? (
              <>
                {profile?.bio && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {profile.bio}
                  </p>
                )}

                {profile?.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>📍</span>
                    <span>{profile.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-300">
                    Available
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      profile?.available
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {profile?.available ? "Online" : "Offline"}
                  </div>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-3 bg-primary text-darkBg font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="City, Country"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-600 dark:text-gray-300">
                    Set as Available
                  </label>
                  <button
                    onClick={() => setAvailable(!available)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      available ? "bg-primary" : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        available ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-primary text-darkBg font-semibold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-xs text-gray-400">
          <p>Flute by A. Ace Sirleaf</p>
          <p className="mt-1">Kola Technology Laboratory</p>
        </footer>
      </div>

      <BottomNav />
    </div>
  );
}
