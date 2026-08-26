import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Share2, MessageSquare, Bookmark } from 'lucide-react';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { EngagementBar } from '@/components/article/EngagementBar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  if (!supabase) return notFound();

  const { data: article, error } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('slug', params.slug)
    .single();

  if (error || !article) {
    return notFound();
  }

  return (
    <article className="min-h-screen bg-brand-light">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
            <Link href={`/category/${article.categories?.slug || 'news'}`} className="text-brand-accent font-bold text-xs uppercase tracking-wider hover:underline">
              {article.categories?.name || 'News'}
            </Link>
            <span className="text-brand-subtle text-xs">•</span>
            <span className="text-brand-subtle text-xs font-sans">5 min read</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight text-brand-dark mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl lg:text-2xl font-serif text-gray-600 mb-8 leading-snug max-w-3xl">
            {article.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 border-y border-brand-subtle/20 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Author" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-brand-dark">Adeola Omoniyi</p>
                <p className="text-xs text-brand-subtle font-sans">Senior Correspondent</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-brand-subtle/20"></div>
            <div className="text-sm font-sans text-brand-subtle text-center sm:text-left">
              <p>Published: {new Date(article.published_at || article.created_at).toLocaleDateString()}</p>
              <p>Updated: {new Date(article.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {article.featured_image_url && (
          <figure className="max-w-5xl mx-auto mb-12">
            <div className="aspect-video w-full bg-gray-100 rounded-sm overflow-hidden">
              <img 
                src={article.featured_image_url} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </figure>
        )}

        <div className="max-w-3xl mx-auto flex flex-col relative">
          <EngagementBar />

          {/* Article Body */}
          <div 
            className="prose prose-lg md:prose-xl font-serif text-gray-800 leading-relaxed max-w-[65ch]"
            dangerouslySetInnerHTML={{ __html: article.content ? JSON.parse(article.content) : '' }}
          />
        </div>
      </div>
    </article>
  );
}
