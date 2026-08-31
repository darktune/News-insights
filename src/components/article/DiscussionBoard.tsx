"use client";

import React, { useState } from 'react';
import { calculateInsightScore, sortCommentsByInsight, Comment } from '@/lib/insight-score';
import { MessageSquare, Zap, ThumbsUp, ThumbsDown, User, ShieldAlert } from 'lucide-react';

const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    userId: 'u1',
    userName: 'Chinedu Eze',
    userAvatar: 'https://i.pravatar.cc/150?u=u1',
    content: 'This completely ignores the macroeconomic factors affecting the CBN policy. If you look at the inflation index, the monetary tightening was inevitable.',
    timestamp: Date.now() - 3600000,
    upvotes: 45,
    downvotes: 2,
    type: 'counterpoint',
    parentId: null,
    userRole: 'contributor'
  },
  {
    id: 'c2',
    userId: 'u2',
    userName: 'Aisha Bello',
    userAvatar: 'https://i.pravatar.cc/150?u=u2',
    content: 'I agree, this article is spot on. Hopefully we see better infrastructure soon.',
    timestamp: Date.now() - 7200000,
    upvotes: 12,
    downvotes: 1,
    type: 'reply',
    parentId: null
  }
];

export function DiscussionBoard({ articleId }: { articleId: string }) {
  const [comments, setComments] = useState<Comment[]>(sortCommentsByInsight(MOCK_COMMENTS));
  const [newComment, setNewComment] = useState("");
  const [isCounterpoint, setIsCounterpoint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newC: Comment = {
      id: Date.now().toString(),
      userId: 'me',
      userName: 'Current User',
      userAvatar: 'https://i.pravatar.cc/150?u=me',
      content: newComment,
      timestamp: Date.now(),
      upvotes: 1,
      downvotes: 0,
      type: isCounterpoint ? 'counterpoint' : 'reply',
      parentId: null
    };

    setComments(sortCommentsByInsight([newC, ...comments]));
    setNewComment("");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-[var(--text)]">Discussion</h3>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--tag-bg)] text-xs font-bold text-[var(--text-secondary)]">
          <Zap size={14} className="text-[var(--accent)]" /> Sorted by Insight Score
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mb-10 glass-panel p-4 rounded-2xl">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add to the discussion..."
          className="w-full bg-transparent border-none outline-none resize-none text-[var(--text)] placeholder-[var(--text-tertiary)] min-h-[80px]"
        />
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] mt-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCounterpoint(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${!isCounterpoint ? 'bg-[var(--text)] text-[var(--bg)]' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text)]'}`}
            >
              Reply
            </button>
            <button
              type="button"
              onClick={() => setIsCounterpoint(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${isCounterpoint ? 'bg-[var(--accent-red)] text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--accent-red)]'}`}
              title="Provide a structural counter-argument"
            >
              <ShieldAlert size={14} /> Counterpoint
            </button>
          </div>
          <button type="submit" disabled={!newComment.trim()} className="px-6 py-1.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-opacity">
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className={`p-5 rounded-2xl border ${comment.type === 'counterpoint' ? 'border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5' : 'border-[var(--border)] bg-[var(--bg)]'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={comment.userAvatar} alt={comment.userName} className="w-10 h-10 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text)]">{comment.userName}</span>
                    {comment.userRole === 'contributor' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[var(--accent)]/20 text-[var(--accent)]">Contributor</span>
                    )}
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--bg-secondary)] text-xs font-bold text-[var(--text-secondary)]">
                  <Zap size={12} className="text-[var(--accent)]" /> {calculateInsightScore(comment)}
                </div>
              </div>
            </div>

            {comment.type === 'counterpoint' && (
              <div className="flex items-center gap-1.5 mb-2 text-xs font-black uppercase text-[var(--accent-red)] tracking-widest">
                <ShieldAlert size={14} /> Counterpoint
              </div>
            )}

            <p className="text-[var(--text)] text-sm leading-relaxed mb-4">
              {comment.content}
            </p>

            <div className="flex items-center gap-4 text-xs font-bold text-[var(--text-secondary)]">
              <button className="flex items-center gap-1.5 hover:text-[var(--accent-green)] transition-colors">
                <ThumbsUp size={14} /> {comment.upvotes}
              </button>
              <button className="flex items-center gap-1.5 hover:text-[var(--accent-red)] transition-colors">
                <ThumbsDown size={14} /> {comment.downvotes}
              </button>
              <button className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors">
                <MessageSquare size={14} /> Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
