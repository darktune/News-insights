"use client";

import Link from "next/link";
import { TrendingUp, Star, MessageSquare } from "lucide-react";
import { getTrendingArticles, ARTICLES } from "@/lib/mock-data";
import { categoryColor, formatNumber } from "@/lib/utils";
import ArticleCard from "./ArticleCard";
import AdSlot from "./AdSlot";

function Widget({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <span style={{ color: "var(--accent)" }}>{icon}</span>
        <h3 className="text-[15px] font-black" style={{ color: "var(--text)" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Sidebar() {
  const trending = getTrendingArticles();
  const mostCommented = [...ARTICLES].sort((a, b) => b.comments - a.comments).slice(0, 4);
  const editorsPicks = ARTICLES.filter((a) => a.featured).slice(0, 3);

  return (
    <aside className="space-y-4">

      {/* Trending */}
      <Widget title="Trending" icon={<TrendingUp size={17} strokeWidth={2} />}>
        <div className="pb-2">
          {trending.map((article, i) => (
            <Link key={article.id} href={`/article/${article.slug}`}
              className="flex items-start gap-3 px-4 py-2.5 transition-all"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
              <span className="text-xl font-black w-6 flex-shrink-0 text-right leading-tight"
                style={{ color: "var(--text-tertiary)" }}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
                  {article.category}
                </p>
                <p className="text-[13px] font-semibold line-clamp-2 leading-snug mt-0.5"
                  style={{ color: "var(--text)" }}>
                  {article.title}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                  {formatNumber(article.likes)} likes
                </p>
              </div>
            </Link>
          ))}
          <div className="px-4 pt-2 pb-3">
            <Link href="/category/national" className="text-sm font-semibold"
              style={{ color: "var(--accent)" }}>
              Show more →
            </Link>
          </div>
        </div>
      </Widget>

      {/* Editor's Picks */}
      <Widget title="Editor's Picks" icon={<Star size={17} strokeWidth={2} />}>
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

      {/* Ad slot */}
      <AdSlot placement="sidebar-right" variant="sidebar" />

      {/* Browse Topics */}
      <div className="rounded-2xl p-4" style={{ background: "var(--bg-secondary)", boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-[15px] font-black mb-3" style={{ color: "var(--text)" }}>Browse Topics</h3>
        <div className="flex flex-wrap gap-2">
          {["National", "Politics", "Entertainment", "Metro", "Sport", "Opinion", "Business"].map((cat) => (
            <Link key={cat} href={`/category/${cat.toLowerCase()}`}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 ${categoryColor(cat)}`}>
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="rounded-2xl p-5 text-white"
        style={{ background: "linear-gradient(135deg, #0F2A4A 0%, #1D9BF0 100%)" }}>
        <h3 className="font-black text-[15px] mb-1">Morning Briefing</h3>
        <p className="text-sm text-white/70 mb-4 leading-relaxed">
          Nigeria&apos;s top stories — straight to your inbox every morning.
        </p>
        <input type="email" placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-full text-sm mb-2 outline-none"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }} />
        <button className="btn-green w-full justify-center text-sm">
          Subscribe Free
        </button>
      </div>

    </aside>
  );
}
