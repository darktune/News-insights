import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, MOCK_ARTICLES } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = CATEGORIES.find(c => c.toLowerCase() === params.slug);
  
  if (!categoryName) {
    return notFound();
  }

  const categoryArticles = MOCK_ARTICLES.filter(a => a.category.toLowerCase() === params.slug);
  const featured = categoryArticles.slice(0, 1)[0];
  const rest = categoryArticles.slice(1);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      
      {/* Category Header */}
      <div className="w-full bg-[var(--bg-secondary)] border-b border-[var(--border)] py-12 lg:py-20 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter text-[var(--text)] mb-4">
            {categoryName}
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-medium">
            The latest insights, breaking news, and in-depth analysis from the world of {categoryName}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex gap-8">
        <div className="flex-1 min-w-0">
          
          {featured ? (
            <div className="mb-10">
              <ArticleCard article={featured} variant="featured" />
            </div>
          ) : (
             <div className="py-12 text-center border-2 border-dashed border-[var(--border)] rounded-2xl">
               <p className="text-[var(--text-secondary)] font-bold text-lg">No articles published in this category yet.</p>
             </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map(article => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>

        </div>

        {/* Sidebar */}
        <div className="hidden xl:block w-[340px] flex-shrink-0">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
