'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { X, User, Lock, ArrowRight, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AVATAR_COLORS = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500',
    'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500',
    'bg-pink-500', 'bg-rose-500'
];

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [step, setStep] = useState(1); // 1: Credentials, 2: Profile (Register only)

    // Form States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [selectedColor, setSelectedColor] = useState(AVATAR_COLORS[8]); // Default indigo
    const [error, setError] = useState('');

    const { login, register, loading } = useAuth();

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setDisplayName('');
        setStep(1);
        setError('');
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (isLogin) {
            handleLogin();
        } else {
            setStep(2); // Go to Profile setup
        }
    };

    const handleLogin = async () => {
        const res = await login(username, password);
        if (res.success) {
            onClose();
            resetForm();
        } else {
            setError(res.message || 'Đăng nhập thất bại');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!displayName) {
            setError('Vui lòng nhập tên hiển thị');
            return;
        }

        const res = await register(username, password, displayName, selectedColor);
        if (res.success) {
            onClose();
            resetForm();
        } else {
            setError(res.message || 'Đăng ký thất bại');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-8 z-10 overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {isLogin ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
                                </h2>
                                <p className="text-neutral-400 text-sm">
                                    {isLogin
                                        ? 'Đăng nhập để tiếp tục'
                                        : 'Bước 1: Thông tin đăng nhập'}
                                </p>
                            </div>

                            {/* Tabs */}
                            <div className="flex bg-white/5 p-1 rounded-lg mb-6">
                                <button
                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                                    onClick={() => { setIsLogin(true); setError(''); }}
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
                                    onClick={() => { setIsLogin(false); setError(''); }}
                                >
                                    Đăng ký
                                </button>
                            </div>

                            <form onSubmit={handleNextStep} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Tên user</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="username"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Mật khẩu</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                                            placeholder="••••••"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 mt-6"
                                >
                                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isLogin ? 'Đăng nhập' : 'Tiếp tục'}
                                    {!loading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Hồ sơ của bạn
                                </h2>
                                <p className="text-neutral-400 text-sm">
                                    Bước 2: Tạo dấu ấn cá nhân
                                </p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Tên hiển thị</label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                                        placeholder="Ví dụ: Hoàng Code Dạo"
                                        autoFocus
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Chọn màu đại diện</label>
                                    <div className="grid grid-cols-7 gap-2">
                                        {AVATAR_COLORS.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full ${color} flex items-center justify-center transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`}
                                            >
                                                {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center mt-4">
                                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${selectedColor} shadow-lg transition-colors`}>
                                        {displayName ? displayName.charAt(0).toUpperCase() : '?'}
                                    </div>
                                </div>

                                {error && (
                                    <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-3 text-neutral-400 hover:text-white transition-colors"
                                    >
                                        Quay lại
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-[2] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? 'Đang tạo...' : 'Hoàn tất'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
