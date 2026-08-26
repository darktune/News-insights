import React from 'react';
import Link from 'next/link';
import { BreakingTicker } from '@/components/home/BreakingTicker';
import { HeroGrid } from '@/components/home/HeroGrid';
import { getLatestArticles } from '@/app/actions/articleActions';

export default async function Home() {
  const latestArticles = await getLatestArticles();

  return (
    <>
      <BreakingTicker />
      <main className="min-h-screen bg-brand-light text-brand-dark">
        <HeroGrid />
        
        {/* Latest News & Sections will go here */}
        <section className="container mx-auto px-4 py-8">
          <div className="border-t-2 border-brand-dark pt-4 mb-8">
            <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">Latest News</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles && latestArticles.length > 0 ? (
              latestArticles.map((article: any) => (
                <Link href={`/article/${article.slug}`} key={article.id} className="flex flex-col group cursor-pointer">
                  <div className="aspect-[4/3] bg-brand-subtle/20 mb-4 overflow-hidden rounded-sm relative">
                     {article.featured_image_url ? (
                        <img src={article.featured_image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     ) : (
                        <div className="w-full h-full bg-brand-subtle/30 group-hover:scale-105 transition-transform duration-500" />
                     )}
                  </div>
                  <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                    {article.categories?.name || 'News'}
                  </span>
                  <h4 className="text-lg font-serif font-bold leading-tight group-hover:text-brand-subtle transition-colors">
                    {article.title}
                  </h4>
                  <span className="text-xs text-brand-subtle mt-2 font-sans">
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 col-span-4 py-8 text-center border-2 border-dashed border-gray-200">
                 No articles published yet. Publish an article from the CMS dashboard to see it here!
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
