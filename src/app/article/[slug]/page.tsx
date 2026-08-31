import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_ARTICLES } from '@/lib/mock-data';
import { EngagementBar } from '@/components/article/EngagementBar';
import { DiscussionBoard } from '@/components/article/DiscussionBoard';

export async function generateStaticParams() {
  return MOCK_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = MOCK_ARTICLES.find(a => a.slug === params.slug);

  if (!article) {
    return notFound();
  }

  return (
    <article className="min-h-screen bg-[var(--bg)] pb-20">
      
      {/* Hero Image Full Width */}
      <div className="w-full h-[50vh] min-h-[400px] relative overflow-hidden bg-black group">
        <img 
          src={article.coverImage} 
          alt={article.title} 
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[20s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 lg:p-12 z-10">
          <div className="max-w-4xl mx-auto">
            <Link href={`/category/${article.category.toLowerCase()}`} className="inline-block bg-[var(--accent)] text-[var(--bg)] font-black text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              {article.category}
            </Link>
            <h1 className="text-3xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <img src={article.author.avatar} alt={article.author.name} className="w-8 h-8 rounded-full border border-white/20" />
                <span>{article.author.name}</span>
              </div>
              <span className="opacity-50">•</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="opacity-50">•</span>
              <span>{Math.ceil(article.content.length / 4000)} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Article Body */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none font-serif text-[var(--text)] leading-relaxed
              prose-headings:font-sans prose-headings:font-black prose-a:text-[var(--accent)] 
              prose-p:text-[18px] lg:prose-p:text-[20px] prose-p:leading-[1.7]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <Link key={tag} href={`/tag/${tag}`} className="px-3 py-1.5 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full text-xs font-bold hover:text-[var(--accent)] transition-colors">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-12 mb-8 h-px bg-[var(--border)]" />
          
          {/* Social Engagement */}
          <EngagementBar article={article} />

          <div className="mt-8 h-px bg-[var(--border)]" />

          {/* New Discussion UI (Phase 4) */}
          <div className="mt-12">
            <DiscussionBoard articleId={article.id} />
          </div>
        </div>

        {/* Sidebar / Sticky Info */}
        <div className="w-full lg:w-[320px] flex-shrink-0 space-y-8">
          <div className="sticky top-24 glass-panel rounded-2xl p-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-[var(--text-tertiary)] mb-4">About the Author</h4>
            <div className="flex items-center gap-3 mb-3">
              <img src={article.author.avatar} alt={article.author.name} className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-bold text-[var(--text)]">{article.author.name}</p>
                <button className="text-xs font-bold text-[var(--accent)] hover:underline">Follow</button>
              </div>
            </div>
            {article.author.bio && (
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {article.author.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
