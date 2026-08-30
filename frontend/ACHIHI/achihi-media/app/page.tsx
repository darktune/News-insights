"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import AdSlot from "@/components/AdSlot";
import { ARTICLES, CATEGORIES, getFeaturedArticles } from "@/lib/mock-data";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

const PAGE_SIZE = 6;
const AD_EVERY = 6; // insert an in-feed ad every N articles

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const featured = getFeaturedArticles();

  const filteredArticles = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  const visibleArticles = filteredArticles.slice(0, page * PAGE_SIZE);
  const hasMore = visibleArticles.length < filteredArticles.length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setPage((p) => p + 1); setLoading(false); }, 600);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>

      {/* ── Hero featured ── */}
      {featured[0] && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4">
          <ArticleCard article={featured[0]} variant="featured" />
        </div>
      )}

      {/* ── Horizontal banner ad ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <AdSlot placement="home-banner-top" variant="banner" />
      </div>

      {/* ── Secondary features ── */}
      {featured.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.slice(1, 3).map((a) => (
              <ArticleCard key={a.id} article={a} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      {/* ── Category filter tabs ── */}
      <div className="sticky top-[57px] z-40 transition-all"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow-nav)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2.5">
            {["All", ...CATEGORIES].map((cat) => {
              const active = activeCategory === cat;
              return (
                <button key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    color: active ? "#fff" : "var(--text-secondary)",
                    background: active ? "var(--accent)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main feed + sidebar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-8">

          {/* Feed */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black" style={{ color: "var(--text)" }}>
                {activeCategory === "All" ? "Latest Stories" : activeCategory}
              </h2>
              {activeCategory !== "All" && (
                <Link href={`/category/${activeCategory.toLowerCase()}`}
                  className="flex items-center gap-1 text-sm font-semibold"
                  style={{ color: "var(--accent)" }}>
                  See all <ChevronRight size={14} />
                </Link>
              )}
            </div>

            {/* Feed grid — injects ad every AD_EVERY cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {visibleArticles.map((article, idx) => (
                <>
                  <ArticleCard key={article.id} article={article} />
                  {/* In-feed ad after every AD_EVERY articles */}
                  {(idx + 1) % AD_EVERY === 0 && idx + 1 < visibleArticles.length && (
                    <div key={`ad-${idx}`} className="sm:col-span-2">
                      <AdSlot placement={`home-infeed-${Math.floor(idx / AD_EVERY)}`} variant="feed" />
                    </div>
                  )}
                </>
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button onClick={loadMore} disabled={loading}
                  className="btn-primary px-8 py-2.5 text-sm disabled:opacity-60">
                  {loading ? <><Loader2 size={15} className="animate-spin" /> Loading…</> : "Load more stories"}
                </button>
              </div>
            )}

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-semibold" style={{ color: "var(--text-secondary)" }}>
                  No stories in this category yet.
                </p>
              </div>
            )}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden xl:block w-[340px] flex-shrink-0">
            <div className="sticky top-28">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
