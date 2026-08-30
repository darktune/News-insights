"use client";

import { useState } from "react";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import { Article, Category } from "@/lib/mock-data";
import { categoryColor } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const PAGE_SIZE = 6;

export default function CategoryFeed({ category, initialArticles }: { category: Category; initialArticles: Article[] }) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const visibleArticles = initialArticles.slice(0, page * PAGE_SIZE);
  const hasMore = visibleArticles.length < initialArticles.length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setPage((p) => p + 1); setLoading(false); }, 600);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Category header */}
      <div className="py-10 px-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto">
          <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-black mb-3 ${categoryColor(category)}`}>
            {category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mb-2"
            style={{ color: "var(--text)", fontFamily: "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif" }}>
            {category} News
          </h1>
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            {initialArticles.length} {initialArticles.length === 1 ? "story" : "stories"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {initialArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-semibold" style={{ color: "var(--text-secondary)" }}>
                  No stories in {category} yet.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {visibleArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
                {hasMore && (
                  <div className="flex justify-center mt-10">
                    <button onClick={loadMore} disabled={loading}
                      className="btn-primary px-8 py-2.5 text-sm disabled:opacity-60">
                      {loading ? <><Loader2 size={15} className="animate-spin" /> Loading…</> : "Load more"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="hidden xl:block w-[340px] flex-shrink-0">
            <div className="sticky top-28"><Sidebar /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
