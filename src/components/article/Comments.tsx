"use client";

import React, { useState } from 'react';
import { useOnboarding } from '@/components/providers/OnboardingProvider';
import { User, MessageSquare } from 'lucide-react';

export function Comments({ articleId }: { articleId: string }) {
  const { openOnboarding } = useOnboarding();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'Chidi O.', text: 'This is a phenomenal breakdown of the current situation. I particularly appreciate the detail on the economic impact.', date: '2 hours ago' },
    { id: 2, author: 'Amina S.', text: 'Well researched, but I think the timeline presented might be a bit optimistic.', date: '5 hours ago' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // In MVP, we force the onboarding flow when trying to post a comment
    openOnboarding();
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-200">
      <div className="flex items-center space-x-2 mb-8">
        <MessageSquare className="w-6 h-6 text-brand-dark" />
        <h3 className="text-2xl font-serif font-bold text-gray-900">Discussion ({comments.length})</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full min-h-[100px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent resize-y font-sans text-sm"
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button 
                type="submit"
                className="bg-brand-dark text-white px-6 py-2 rounded-md hover:bg-black font-medium transition-colors text-sm"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <div className="w-10 h-10 bg-brand-subtle/20 text-brand-dark font-bold rounded-full flex items-center justify-center flex-shrink-0">
              {comment.author.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-1">
                <h4 className="font-bold text-gray-900">{comment.author}</h4>
                <span className="text-xs text-gray-500 font-sans">{comment.date}</span>
              </div>
              <p className="text-gray-700 font-serif leading-relaxed text-sm md:text-base">
                {comment.text}
              </p>
              <div className="mt-3 flex space-x-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <button className="hover:text-brand-accent transition-colors">Reply</button>
                <button className="hover:text-brand-accent transition-colors">Like</button>
                <button className="hover:text-brand-accent transition-colors">Report</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
