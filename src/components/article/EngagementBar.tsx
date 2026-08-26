"use client";

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, Repeat } from 'lucide-react';
import { useOnboarding } from '@/components/providers/OnboardingProvider';

export function EngagementBar() {
  const { openOnboarding } = useOnboarding();
  const [hasEngaged, setHasEngaged] = useState(false);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    // If the user isn't logged in, pop the onboarding modal
    // In a real app, you'd check a user session state here.
    if (!hasEngaged) {
      openOnboarding();
    }
  };

  return (
    <div className="flex items-center justify-between border-y border-brand-subtle/20 py-3 my-8">
      <div className="flex items-center space-x-1 sm:space-x-4">
        <button onClick={handleAction} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors group">
          <ThumbsUp className="w-5 h-5 group-hover:text-brand-accent transition-colors" />
          <span className="text-xs font-semibold hidden sm:inline-block">245</span>
        </button>
        <button onClick={handleAction} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors group">
          <ThumbsDown className="w-5 h-5 group-hover:text-red-500 transition-colors" />
        </button>
        <button onClick={handleAction} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors group">
          <MessageSquare className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
          <span className="text-xs font-semibold hidden sm:inline-block">12</span>
        </button>
        <button onClick={handleAction} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors group">
          <Repeat className="w-5 h-5 group-hover:text-green-500 transition-colors" />
          <span className="text-xs font-semibold hidden sm:inline-block">Repost</span>
        </button>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-4">
        <button onClick={handleAction} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors group">
          <Share2 className="w-5 h-5 group-hover:text-brand-dark transition-colors" />
          <span className="text-xs font-semibold hidden sm:inline-block">Share</span>
        </button>
        <button onClick={handleAction} className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors group">
          <Bookmark className="w-5 h-5 group-hover:text-brand-accent transition-colors" />
          <span className="text-xs font-semibold hidden sm:inline-block">Save</span>
        </button>
      </div>
    </div>
  );
}
