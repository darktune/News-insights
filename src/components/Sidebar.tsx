"use client";

import Link from "next/link";
import { TrendingUp, Star, MessageSquare, Mic2 } from "lucide-react";
import { MOCK_ARTICLES } from "@/lib/mock-data";
import { categoryColor, formatNumber } from "@/lib/utils";
import ArticleCard from "./ArticleCard";
import AdSlot from "./AdSlot";
import { useAppStore } from "@/lib/store";

function Widget({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden glass-panel">
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <span className="text-[var(--accent)]">{icon}</span>
        <h3 className="text-[15px] font-black text-[var(--text)]">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Sidebar() {
  const { setPremiumModalOpen } = useAppStore();
  const trending = [...MOCK_ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);
  const mostCommented = [...MOCK_ARTICLES].sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 4);
  const editorsPicks = MOCK_ARTICLES.filter(a => a.isPremium).slice(0, 3); // using premium as proxy for editor pick

  return (
    <aside className="space-y-4">

      {/* Live Audio Rooms */}
      <div className="rounded-2xl p-5 text-[var(--bg)] bg-[var(--accent)] relative overflow-hidden group shadow-xl">
        <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:scale-125 transition-transform duration-500">
          <Mic2 size={64} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--bg)] animate-pulse shadow-[0_0_8px_var(--bg)]" />
            <span className="text-xs font-black uppercase tracking-widest text-[var(--bg)]">Live Room</span>
          </div>
          <h3 className="font-black text-lg mb-1 leading-tight text-[var(--bg)]">Q&A: The Future of FinTech in Nigeria</h3>
          <p className="text-[var(--bg)]/80 text-xs mb-4">Hosted by Aisha Bello + 3 others</p>
          
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?u=a${i}`} alt="avatar" className="w-6 h-6 rounded-full border-2 border-[var(--accent)]" />
              ))}
              <div className="w-6 h-6 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-hover)] text-[var(--text-secondary)] text-[8px] flex items-center justify-center font-bold">
                +42
              </div>
            </div>
            <button 
              onClick={() => setPremiumModalOpen(true)}
              className="bg-[var(--bg)] text-[var(--accent)] px-3 py-1.5 rounded-full text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>

      {/* Trending */}
      <Widget title="Trending" icon={<TrendingUp size={17} strokeWidth={2} />}>
        <div className="pb-2">
          {trending.map((article, i) => (
            <Link key={article.id} href={`/article/${article.slug}`}
              className="flex items-start gap-3 px-4 py-2.5 transition-all hover:bg-[var(--bg-hover)]"
            >
              <span className="text-xl font-black w-6 flex-shrink-0 text-right leading-tight text-[var(--text-tertiary)]">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--accent)]">
                  {article.category}
                </p>
                <p className="text-[13px] font-semibold line-clamp-2 leading-snug mt-0.5 text-[var(--text)]">
                  {article.title}
                </p>
                <p className="text-[11px] mt-0.5 text-[var(--text-tertiary)]">
                  {formatNumber(article.views)} views
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Widget>

      {/* Editor's Picks */}
      <Widget title="Premium Exclusives" icon={<Star size={17} strokeWidth={2} />}>
        <div className="px-2 pb-3">
          {editorsPicks.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
        </div>
      </Widget>

      {/* Most Discussed */}
      <Widget title="Most Discussed" icon={<MessageSquare size={17} strokeWidth={2} />}>
        <div className="px-2 pb-3">
          {mostCommented.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
        </div>
      </Widget>

      <AdSlot placement="sidebar-right" variant="sidebar" />

      {/* Newsletter */}
      <div className="rounded-2xl p-5 text-[var(--bg)] bg-gradient-to-br from-[var(--text)] to-[var(--text-secondary)] shadow-lg">
        <h3 className="font-black text-[15px] mb-1">Morning Briefing</h3>
        <p className="text-sm text-[var(--bg)]/70 mb-4 leading-relaxed">
          Nigeria's top stories — straight to your inbox every morning.
        </p>
        <input type="email" placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-full text-sm mb-2 outline-none bg-[var(--bg)]/10 border border-[var(--bg)]/20 text-[var(--bg)] placeholder:text-[var(--bg)]/50" />
        <button className="bg-[var(--accent-green)] text-[var(--bg)] font-bold w-full rounded-full py-2 text-sm hover:opacity-90 transition-opacity">
          Subscribe Free
        </button>
      </div>

    </aside>
  );
}
