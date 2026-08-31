import React from 'react';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import AdSlot from '@/components/AdSlot';
import { CATEGORIES, MOCK_ARTICLES } from '@/lib/mock-data';
import Link from 'next/link';
import FeedContainer from '@/components/home/FeedContainer';
import { BreakingTicker } from '@/components/home/BreakingTicker';

export const revalidate = 60;

export default async function Home() {
  const articles = MOCK_ARTICLES;
  const featured = articles.slice(0, 3);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <BreakingTicker />
      
      {featured[0] && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-4">
          <ArticleCard article={featured[0]} variant="featured" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <AdSlot placement="home-banner-top" variant="banner" />
      </div>

      {featured.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.slice(1, 3).map((a: any) => (
              <ArticleCard key={a.id} article={a} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      <div className="sticky top-[64px] z-40 transition-all glass-panel border-b-0 border-x-0"
        style={{ boxShadow: "var(--shadow-nav)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2.5">
            <Link href="/"
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all"
              style={{ color: "var(--bg)", background: "var(--text)" }}>
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all hover:bg-[var(--bg-hover)]"
                style={{ color: "var(--text-secondary)", background: "transparent" }}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-8">
          <FeedContainer initialLatest={articles.slice(3, 20)} />
          <div className="hidden xl:block w-[340px] flex-shrink-0">
            <div className="sticky top-32">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
