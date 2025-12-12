"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, User, Loader2, Download, Upload } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import AuthModal from "@/components/auth/AuthModal";

export default function AuthButton() {
  const { user, loading, logout, isAuthenticated, exportData, importData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportData();
    if (!data) return;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devjourney_backup_${user?.name?.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const res = importData(content);
      if (res.success) {
        alert('Khôi phục dữ liệu thành công!');
        window.location.reload();
      } else {
        alert(res.message || 'Lỗi khi khôi phục dữ liệu');
      }
    };
    reader.readAsText(file);
    setIsMenuOpen(false);
  };

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
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300"
        >
          {user.avatar && user.avatar.startsWith('http') ? (
            <Image
              src={user.avatar}
              alt={user.name || "User"}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white ${user.avatar || 'bg-indigo-500'}`}>
              {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
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
              className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-xl z-50"
            >
              <div className="border-b border-white/10 pb-4 mb-2">
                <p className="text-white font-medium truncate">
                  {user.name || "User"}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">Lv.{user.level}</span>
                  <span>🔥 {user.streak} ngày</span>
                </div>
              </div>

              <div className="space-y-1 mb-2">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Sao lưu dữ liệu
                </button>
                <button
                  onClick={handleImportClick}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Khôi phục dữ liệu
                </button>
              </div>

              <div className="border-t border-white/10 pt-2">
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-white/50 transition-all duration-300"
      >
        <LogIn className="w-4 h-4" />
        <span>Đăng nhập</span>
      </motion.button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
