"use client";

import React, { useState, useEffect } from 'react';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import { MOCK_ARTICLES, Article } from '@/lib/mock-data';
import { useAppStore, getRecommendedFeed } from '@/lib/store';

interface FeedContainerProps {
  initialLatest: any[];
}

export default function FeedContainer({ initialLatest }: FeedContainerProps) {
  const [activeTab, setActiveTab] = useState<'FOR_YOU' | 'LATEST'>('FOR_YOU');
  const store = useAppStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const feedArticles = React.useMemo(() => {
    if (!mounted) return MOCK_ARTICLES.slice(3, 15);
    
    if (activeTab === 'FOR_YOU') {
      return getRecommendedFeed(MOCK_ARTICLES, store, 20);
    } else {
      return MOCK_ARTICLES.filter(a => !store.hiddenArticles.includes(a.id)).slice(0, 20);
    }
  }, [mounted, activeTab, store.eventLog, store.hiddenArticles]);

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-5 border-b border-[var(--border)]">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('FOR_YOU')}
            className={`pb-3 text-[15px] font-bold transition-all relative ${
              activeTab === 'FOR_YOU' ? 'text-[var(--text)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
          >
            For You
            {activeTab === 'FOR_YOU' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--accent)] rounded-t-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('LATEST')}
            className={`pb-3 text-[15px] font-bold transition-all relative ${
              activeTab === 'LATEST' ? 'text-[var(--text)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            }`}
          >
            Latest
            {activeTab === 'LATEST' && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[var(--accent)] rounded-t-full"></span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {feedArticles.map((article: any, idx: number) => (
          <React.Fragment key={article.id}>
            <ArticleCard article={article} />
            {(idx + 1) % 6 === 0 && idx + 1 < feedArticles.length && (
              <div className="sm:col-span-2">
                <AdSlot placement={`home-infeed-${idx}`} variant="feed" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {feedArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-semibold text-[var(--text-secondary)]">
            Nothing to show here. Try interacting with more stories!
          </p>
        </div>
      )}
    </div>
  );
}
