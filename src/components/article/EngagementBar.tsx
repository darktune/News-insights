"use client";

import React, { useState } from 'react';
import { Heart, ThumbsDown, MessageSquare, Share2, Bookmark, Repeat, Flag, Check } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Article } from '@/lib/mock-data';

export function EngagementBar({ article }: { article: Article }) {
  const { 
    likedArticles, dislikedArticles, repostedArticles, savedArticles, 
    toggleLike, toggleDislike, toggleRepost, toggleSave, trackEvent, openReportModal 
  } = useAppStore();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isLiked = likedArticles.includes(article.id);
  const isDisliked = dislikedArticles.includes(article.id);
  const isReposted = repostedArticles.includes(article.id);
  const isSaved = savedArticles.includes(article.id);

  const baseRepostCount = Math.max(1, Math.floor((article.views || 100) * 0.08));
  const currentRepostCount = baseRepostCount + (isReposted ? 1 : 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleRepost = () => {
    const wasReposted = isReposted;
    toggleRepost(article.id, article.category);
    showToast(wasReposted ? "Repost removed" : "Reposted to your profile & feed!");
  };

  const handleShare = () => {
    trackEvent(article.id, article.category, 'SHARE');
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: article.title, url: window.location.href }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative py-2 border-y border-[var(--border)] my-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-[var(--accent)] text-[var(--bg)] text-xs font-bold shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in-95">
          <Check size={14} strokeWidth={2.5} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Left Side Interactions: Like, Dislike, Comment, Repost */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
          {/* Like */}
          <button 
            type="button"
            onClick={() => toggleLike(article.id, article.category)} 
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-full transition-all cursor-pointer ${
              isLiked 
                ? 'text-red-500 bg-red-500/10 font-bold' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            }`}
            title="Like this article"
          >
            <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
            <span className="text-xs font-semibold">{article.likes + (isLiked ? 1 : 0)}</span>
          </button>

          {/* Dislike */}
          <button 
            type="button"
            onClick={() => toggleDislike(article.id, article.category)} 
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-full transition-all cursor-pointer ${
              isDisliked 
                ? 'text-blue-500 bg-blue-500/10 font-bold' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            }`}
            title="Dislike this article"
          >
            <ThumbsDown className="w-5 h-5" fill={isDisliked ? "currentColor" : "none"} />
            <span className="text-xs font-semibold hidden sm:inline-block">Dislike</span>
          </button>
          
          {/* Discussion */}
          <a 
            href="#comments"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            title="Jump to discussion"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-semibold">{article.commentsCount || 0}</span>
          </a>
          
          {/* Free Repost */}
          <button 
            type="button"
            onClick={handleRepost}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-full transition-all cursor-pointer ${
              isReposted 
                ? 'text-emerald-500 bg-emerald-500/10 font-bold' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            }`}
            title="Repost this article"
          >
            <Repeat className="w-5 h-5" />
            <span className="text-xs font-semibold hidden sm:inline-block">
              {currentRepostCount}
            </span>
          </button>
        </div>

        {/* Right Side: Share, Bookmark, Report */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Share */}
          <button 
            type="button"
            onClick={handleShare} 
            className="p-2.5 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors cursor-pointer"
            title="Share article"
          >
            <Share2 className="w-5 h-5" />
          </button>
          
          {/* Bookmark */}
          <button 
            type="button"
            onClick={() => toggleSave(article.id, article.category)} 
            className={`p-2.5 rounded-full transition-colors cursor-pointer ${
              isSaved 
                ? 'text-[var(--accent)] bg-[var(--accent)]/10' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            }`}
            title={isSaved ? "Remove from bookmarks" : "Save article"}
          >
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
          </button>

          {/* Report Story */}
          <button
            type="button"
            onClick={() => openReportModal({ id: article.id, title: article.title, category: article.category })}
            className="p-2.5 rounded-full text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            title="Report this story"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
