"use client";

import BottomNav from "@/components/layout/BottomNav";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <MessagesContent />
    </ProtectedRoute>
  );
}

function MessagesContent() {
  return (
    <div className="min-h-screen pb-24 bg-lightBg dark:bg-darkBg">
      <div className="max-w-md mx-auto px-4 pt-6">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Messages
          </h1>
          <button className="p-2 bg-primary text-darkBg rounded-full hover:bg-opacity-90">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </header>

        <div className="space-y-4">
          <div className="glass-card p-8 text-center">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No messages yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start a conversation with your coworkers
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
