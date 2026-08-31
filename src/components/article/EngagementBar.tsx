"use client";

import React from 'react';
import { Heart, MessageSquare, Share2, Bookmark, Repeat } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Article } from '@/lib/mock-data';

export function EngagementBar({ article }: { article: Article }) {
  const { likedArticles, savedArticles, toggleLike, toggleSave, trackEvent, setPremiumModalOpen } = useAppStore();

  const isLiked = likedArticles.includes(article.id);
  const isSaved = savedArticles.includes(article.id);

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
          onClick={() => toggleLike(article.id, article.category)} 
          className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${isLiked ? 'text-red-500 bg-red-500/10' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
        >
          <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
          <span className="text-xs font-bold hidden sm:inline-block">{article.likes + (isLiked ? 1 : 0)}</span>
        </button>
        
        <button className="flex items-center space-x-2 p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline-block">{article.commentsCount}</span>
        </button>
        
        <button 
          onClick={() => setPremiumModalOpen(true)}
          className="flex items-center space-x-2 p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <Repeat className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline-block">Repost</span>
        </button>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
          onClick={() => {
            trackEvent(article.id, article.category, 'SHARE');
            navigator.clipboard.writeText(window.location.href);
          }} 
          className="flex items-center space-x-2 p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          title="Copy Link"
        >
          <Share2 className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => toggleSave(article.id, article.category)} 
          className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${isSaved ? 'text-[var(--accent)] bg-[var(--accent)]/10' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'}`}
        >
          <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}
