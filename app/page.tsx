"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function SplashPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);

  useEffect(() => {
    if (loading) return;

    // Auto-redirect after animation completes
    const timer = setTimeout(() => {
      if (user) {
        router.push("/feed");
      } else {
        router.push("/auth");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, user, loading]);

  const handleLogoClick = () => {
    const now = Date.now();

    // Reset tap count if more than 2 seconds since last tap
    if (now - lastTapTime > 2000) {
      setTapCount(1);
    } else {
      setTapCount(prev => prev + 1);
    }

    setLastTapTime(now);

    // Check if tapped 7 times
    if (tapCount + 1 >= 7) {
      router.push("/admin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-darkBg to-gray-900">
      <motion.div
        onClick={handleLogoClick}
        className="cursor-pointer"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1.2,
        }}
      >
        <h1 className="text-7xl font-bold text-primary tracking-tight">
          Flute
        </h1>
      </motion.div>

      <motion.p
        className="text-xl text-gray-300 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Jump on the Flute!
      </motion.p>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
        </div>
      </motion.div>
    </div>
  );
}
