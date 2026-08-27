import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  if (!supabase) return notFound();

  // Fetch the category details
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (categoryError || !category) {
    return notFound();
  }

  // Fetch articles belonging to this category
  const { data: articles, error: articlesError } = await supabase
    .from('articles')
    .select('*')
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="container mx-auto px-4 py-12">
        
        {/* Category Header */}
        <div className="mb-12 border-b-4 pb-6" style={{ borderColor: category.color || '#E63946' }}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-dark uppercase tracking-tighter">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-600 mt-4 max-w-2xl font-serif">
              {category.description}
            </p>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles && articles.length > 0 ? (
            articles.map((article: any) => (
              <Link href={`/article/${article.slug}`} key={article.id} className="flex flex-col group cursor-pointer">
                <div className="aspect-[4/3] bg-brand-subtle/20 mb-4 overflow-hidden rounded-sm relative">
                  {article.featured_image_url ? (
                    <img 
                      src={article.featured_image_url} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <span 
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: category.color || '#E63946' }}
                >
                  {category.name}
                </span>
                <h2 className="text-2xl font-serif font-bold leading-tight group-hover:text-brand-subtle transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 font-serif mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="text-xs text-brand-subtle mt-4 font-sans uppercase font-semibold">
                  {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500 font-serif text-lg">No articles published in this category yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
