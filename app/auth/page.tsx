"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate join code
      if (joinCode.trim().toLowerCase() !== "flute2026") {
        setError("Invalid join code");
        setLoading(false);
        return;
      }

      if (!name.trim()) {
        setError("Name is required");
        setLoading(false);
        return;
      }

      if (!isLogin && !role.trim()) {
        setError("Role or Team is required");
        setLoading(false);
        return;
      }

      // Store user info in localStorage for now
      const userData = {
        name: name.trim(),
        role: role.trim() || "Member",
        joinCode: joinCode.trim(),
        id: Date.now().toString(),
      };
      localStorage.setItem("flute_user", JSON.stringify(userData));

      router.push("/feed");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundColor: "#0c0c14",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "radial-gradient(ellipse at center, rgba(94, 234, 212, 0.08) 0%, transparent 70%), #0c0c14"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full"
        style={{
          maxWidth: "420px",
          padding: "2.5rem",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(94, 234, 212, 0.2)",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(94, 234, 212, 0.1)"
        }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-bold mb-3"
            style={{
              fontSize: "3rem",
              color: "#5eead4",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Flute
          </h1>
          <p
            style={{
              color: "#8888aa",
              fontSize: "0.95rem",
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            Jump on the Flute!
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-3 mb-10">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className="flex-1 py-3 rounded-xl font-semibold transition-all"
            style={{
              background: isLogin ? "#5eead4" : "rgba(255, 255, 255, 0.05)",
              color: isLogin ? "#0c0c14" : "#9ca3af",
              border: isLogin ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.95rem"
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className="flex-1 py-3 rounded-xl font-semibold transition-all"
            style={{
              background: !isLogin ? "#5eead4" : "rgba(255, 255, 255, 0.05)",
              color: !isLogin ? "#0c0c14" : "#9ca3af",
              border: !isLogin ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.95rem"
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-2"
              style={{
                color: "#8888aa",
                fontSize: "0.875rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full transition-all"
              style={{
                background: "#1a1a2e",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "14px",
                color: "#ffffff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.95rem",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #5eead4";
                e.target.style.boxShadow = "0 0 0 4px rgba(94, 234, 212, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Role Field - Only for Sign Up */}
          {!isLogin && (
            <div>
              <label
                htmlFor="role"
                className="block font-medium mb-2"
                style={{
                  color: "#8888aa",
                  fontSize: "0.875rem",
                  fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}
              >
                Role or Team
              </label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Designer, Engineering, Marketing"
                required={!isLogin}
                className="w-full transition-all"
                style={{
                  background: "#1a1a2e",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "14px",
                  color: "#ffffff",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.95rem",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.border = "1px solid #5eead4";
                  e.target.style.boxShadow = "0 0 0 4px rgba(94, 234, 212, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          )}

          {/* Join Code Field */}
          <div>
            <label
              htmlFor="joinCode"
              className="block font-medium mb-2"
              style={{
                color: "#8888aa",
                fontSize: "0.875rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              Join Code
            </label>
            <input
              id="joinCode"
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter your organization's join code"
              required
              className="w-full transition-all"
              style={{
                background: "#1a1a2e",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "14px",
                color: "#ffffff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.95rem",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid #5eead4";
                e.target.style.boxShadow = "0 0 0 4px rgba(94, 234, 212, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="p-4 rounded-xl"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
                fontSize: "0.875rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold transition-all"
            style={{
              background: loading ? "rgba(94, 234, 212, 0.5)" : "#5eead4",
              color: "#0c0c14",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "1rem",
              padding: "14px",
              borderRadius: "12px",
              marginTop: "1.5rem"
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
