import React from 'react';
import ArticlePage from '@/app/article/[slug]/page';
import { notFound } from 'next/navigation';

export default function SEOArticleRoute({ params }: { params: { year: string, month: string, day: string, slug: string } }) {
  // We can just render the same premium article layout and pass the slug.
  // In a real database scenario, we would use the year/month/day/slug to query the exact article.
  
  if (!params.slug) {
    return notFound();
  }

  return <ArticlePage params={{ slug: params.slug }} />;
}
