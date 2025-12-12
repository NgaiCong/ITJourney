import React from 'react';

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white pt-24">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Hệ Sinh Thái Học Tập
                </h1>
                <p className="text-xl text-neutral-400 mb-12">
                    "Muốn đi nhanh hãy đi một mình. Muốn đi xa hãy đi cùng nhau."<br />
                    Bạn không đơn độc trên hành trình này.
                </p>

                <div className="space-y-6">
                    <a href="https://www.facebook.com/groups/719531714538364" className="block p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-all group">
                        <h2 className="text-2xl font-bold text-blue-400 mb-2 group-hover:text-blue-300">Facebook Group: Re-Engineer Path</h2>
                        <p className="text-neutral-400">Nơi thảo luận, khoe thành quả (Day 1, Day 100...) và hỏi đáp về lộ trình.</p>
                    </a>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">Stack Overflow</h3>
                            <p className="text-sm text-neutral-400">Dùng để ĐỌC và TÌM HIỂU LỖI. Đừng copy paste không não.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">Viblo Asia</h3>
                            <p className="text-sm text-neutral-400">Cộng đồng chia sẻ kiến thức CNTT chất lượng nhất Việt Nam.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">r/learnprogramming</h3>
                            <p className="text-sm text-neutral-400">Subreddit lớn nhất thế giới cho người mới bắt đầu.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="font-bold text-white mb-2">Discord: The Coding Den</h3>
                            <p className="text-sm text-neutral-400">Chat real-time với các dev thực thụ.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
