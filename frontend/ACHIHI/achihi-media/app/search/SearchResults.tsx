"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { searchArticles, CATEGORIES } from "@/lib/mock-data";
import type { Article, Category } from "@/lib/mock-data";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Article[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [showFilters, setShowFilters] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) { setResults(searchArticles(initialQuery)); setSearched(true); }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setResults(searchArticles(query));
    setSearched(true);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const filteredResults = categoryFilter === "All" ? results : results.filter((a) => a.category === categoryFilter);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Header */}
      <div className="py-10 px-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-black mb-4" style={{ color: "var(--text)" }}>Search</h1>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1 relative">
              <Search size={17} strokeWidth={1.8} className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-tertiary)" }} />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for stories, topics…" autoFocus
                className="w-full pl-11 pr-4 py-3 rounded-full text-sm outline-none"
                style={{ background: "var(--bg-secondary)", border: "1.5px solid var(--border)", color: "var(--text)" }}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "var(--accent)"; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "var(--border)"; }} />
            </div>
            <button type="submit" className="btn-primary text-sm px-5">Search</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {searched && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                <span className="font-semibold" style={{ color: "var(--text)" }}>{filteredResults.length}</span> result{filteredResults.length !== 1 && "s"} for &ldquo;{initialQuery}&rdquo;
              </p>
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={showFilters
                  ? { background: "var(--accent)", color: "#fff" }
                  : { border: "1.5px solid var(--border)", color: "var(--text-secondary)", background: "transparent" }}>
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>

            {showFilters && (
              <div className="rounded-2xl p-4 mb-6 flex flex-wrap gap-2"
                style={{ background: "var(--bg-secondary)", boxShadow: "var(--shadow-card)" }}>
                <span className="text-sm font-semibold self-center mr-1" style={{ color: "var(--text-secondary)" }}>Category:</span>
                {(["All", ...CATEGORIES] as (Category | "All")[]).map((cat) => (
                  <button key={cat} onClick={() => setCategoryFilter(cat)}
                    className="px-3 py-1 rounded-full text-sm font-semibold transition-all"
                    style={categoryFilter === cat
                      ? { background: "var(--accent)", color: "#fff" }
                      : { background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredResults.map((article) => <ArticleCard key={article.id} article={article} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search size={44} strokeWidth={1.4} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text)" }} />
                <p className="text-lg font-semibold" style={{ color: "var(--text-secondary)" }}>
                  No results for &ldquo;{initialQuery}&rdquo;
                </p>
                <p className="text-sm mt-2" style={{ color: "var(--text-tertiary)" }}>Try different keywords or browse by category</p>
              </div>
            )}
          </>
        )}
        {!searched && (
          <div className="text-center py-20">
            <Search size={44} strokeWidth={1.4} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text)" }} />
            <p className="text-lg font-semibold" style={{ color: "var(--text-secondary)" }}>Enter a search term to find stories</p>
          </div>
        )}
      </div>
    </div>
  );
}
