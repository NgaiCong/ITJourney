// components/AuthButton.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, User, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function AuthButton() {
  const { user, loading, signIn, signOut, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
        <Loader2 className="w-4 h-4 text-white animate-spin" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300"
        >
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || "User"}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-xl"
            >
              <div className="border-b border-white/10 pb-4 mb-4">
                <p className="text-white font-medium truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-gray-500 text-sm truncate">
                  {user.email}
                </p>
              </div>

              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={signIn}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-white/50 transition-all duration-300"
    >
      <LogIn className="w-4 h-4" />
      <span>Đăng nhập</span>
    </motion.button>
  );
}
