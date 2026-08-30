"use client";

import { useState } from "react";
import { Heart, Reply, MessageCircle } from "lucide-react";
import { Comment } from "@/lib/mock-data";
import { timeAgo, formatNumber } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const { isLoggedIn } = useAppStore();

  return (
    <div style={depth > 0 ? { marginLeft: "2.5rem", borderLeft: "2px solid var(--border)", paddingLeft: "1rem" } : {}}>
      <div className="flex gap-3 py-4">
        <img src={comment.author.avatar} alt={comment.author.name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold" style={{ color: "var(--text)" }}>
              {comment.author.name}
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {comment.content}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => { setLiked(!liked); setLikeCount((c) => liked ? c - 1 : c + 1); }}
              className="flex items-center gap-1 text-xs font-medium transition-colors"
              style={{ color: liked ? "#ef4444" : "var(--text-tertiary)" }}>
              <Heart size={12} strokeWidth={1.8} fill={liked ? "currentColor" : "none"} />
              {formatNumber(likeCount)}
            </button>
            {isLoggedIn && depth === 0 && (
              <button onClick={() => setShowReply(!showReply)}
                className="flex items-center gap-1 text-xs font-medium transition-colors"
                style={{ color: "var(--text-tertiary)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"; }}>
                <Reply size={12} strokeWidth={1.8} /> Reply
              </button>
            )}
          </div>
          {showReply && (
            <div className="mt-3 flex gap-2">
              <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply…"
                className="flex-1 px-3 py-2 text-sm rounded-full outline-none"
                style={{ background: "var(--bg-secondary)", border: "1.5px solid var(--border)", color: "var(--text)" }} />
              <button className="btn-primary text-xs py-1.5 px-4"
                onClick={() => { setReplyText(""); setShowReply(false); }}>
                Post
              </button>
            </div>
          )}
        </div>
      </div>
      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function CommentSection({ comments, articleId }: { comments: Comment[]; articleId: string }) {
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const { isLoggedIn, currentUser } = useAppStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;
    const comment: Comment = {
      id: `c${Date.now()}`,
      articleId,
      author: currentUser,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };
    setLocalComments([comment, ...localComments]);
    setNewComment("");
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={19} strokeWidth={1.8} style={{ color: "var(--accent)" }} />
        <h3 className="text-lg font-black" style={{ color: "var(--text)" }}>
          {localComments.length} Comment{localComments.length !== 1 && "s"}
        </h3>
      </div>

      {isLoggedIn && currentUser ? (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
          <img src={currentUser.avatar} alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1" />
          <div className="flex-1">
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts…" rows={3}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none transition-all"
              style={{
                background: "var(--bg-secondary)",
                border: "1.5px solid var(--border)",
                color: "var(--text)",
              }}
              onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "var(--border)"; }} />
            <div className="flex justify-end mt-2">
              <button type="submit" disabled={!newComment.trim()}
                className="btn-primary text-sm disabled:opacity-40">
                Post
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 rounded-2xl text-center"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <a href="/login" className="font-bold" style={{ color: "var(--accent)" }}>Sign in</a>
            {" "}to join the discussion.
          </p>
        </div>
      )}

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {localComments.map((comment) => (
          <div key={comment.id} style={{ borderBottom: "1px solid var(--border)" }}>
            <CommentItem comment={comment} />
          </div>
        ))}
        {localComments.length === 0 && (
          <p className="text-center py-10 text-sm" style={{ color: "var(--text-tertiary)" }}>
            No comments yet — be the first to share your thoughts.
          </p>
        )}
      </div>
    </div>
  );
}
