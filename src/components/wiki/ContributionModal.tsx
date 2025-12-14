import { X, Send, Github, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ContributionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContributionModal({ isOpen, onClose }: ContributionModalProps) {
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/contribute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, topic, description })
            });

            if (res.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    onClose();
                    setEmail('');
                    setTopic('');
                    setDescription('');
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting contribution:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-lg h-fit z-50 p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 text-neutral-400" />
                        </button>

                        {!isSubmitted ? (
                            <>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                                    Đóng góp chủ đề
                                </h2>
                                <p className="text-neutral-400 mb-6 text-sm">
                                    Bạn có ý tưởng thú vị? Hãy chia sẻ với cộng đồng. Chúng tôi sẽ review và publish bài viết của bạn.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-300 mb-1">Email của bạn</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="name@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-300 mb-1">Chủ đề đề xuất</label>
                                        <input
                                            type="text"
                                            required
                                            value={topic}
                                            onChange={(e) => setTopic(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                            placeholder="VD: System Design, AI Agents..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-neutral-300 mb-1">Mô tả ngắn</label>
                                        <textarea
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={3}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                            placeholder="Nội dung chính bạn muốn chia sẻ..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
                                    >
                                        <Send className="w-4 h-4" />
                                        Gửi Đóng Góp
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-10">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                                    <Send className="w-8 h-8 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Đã gửi thành công!</h3>
                                <p className="text-neutral-400">Cảm ơn bạn đã đóng góp. Chúng tôi sẽ liên hệ sớm nhất.</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
