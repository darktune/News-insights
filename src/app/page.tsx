import React from 'react';
import { getLatestArticles } from '@/app/actions/articleActions';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import AdSlot from '@/components/AdSlot';
import { CATEGORIES } from '@/lib/mock-data'; // We can keep categories for the UI
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const revalidate = 60;

// Helper to transform Supabase article to what ArticleCard expects
function mapToCard(article: any) {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt || article.content?.substring(0, 150) || "Read more about this story...",
    content: article.content || "",
    body: article.content || "",
    category: article.categories?.name || 'National',
    coverImage: article.featured_image_url || '/placeholder.jpg',
    publishedAt: article.created_at,
    readTime: 5,
    author: {
      id: "admin",
      name: "Achihi Media",
      avatar: "https://i.pravatar.cc/150?u=achihi",
      bio: "Achihi Media Editorial",
      role: "admin",
      articlesCount: 1
    },
    likes: 0,
    comments: 0,
    shares: 0,
    isFeatured: false,
    featured: false,
    status: "published",
    tags: []
  } as any;
}

export default async function Home() {
  const latestArticlesRaw = await getLatestArticles();
  
  const articles = latestArticlesRaw && latestArticlesRaw.length > 0 
    ? latestArticlesRaw.map(mapToCard) 
    : [];

  const featured = articles.slice(0, 3);
  const feed = articles.slice(3);

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
            {featured.slice(1, 3).map((a: any) => (
              <ArticleCard key={a.id} article={a} variant="horizontal" />
            ))}
          </div>
        </div>
      )}

      {/* ── Category filter tabs (Static for Server Component) ── */}
      <div className="sticky top-[57px] z-40 transition-all"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow-nav)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2.5">
            <Link href="/"
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{ color: "#fff", background: "var(--accent)" }}>
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{ color: "var(--text-secondary)", background: "transparent" }}>
                {cat}
              </Link>
            ))}
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
                Latest Stories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {feed.map((article: any, idx: number) => (
                <React.Fragment key={article.id}>
                  <ArticleCard article={article} />
                  {(idx + 1) % 4 === 0 && idx + 1 < feed.length && (
                    <div className="sm:col-span-2">
                      <AdSlot placement={`home-infeed-${idx}`} variant="feed" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-semibold" style={{ color: "var(--text-secondary)" }}>
                  No stories published yet. Admin can publish from the dashboard!
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
