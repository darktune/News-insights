"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Article } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export default function ArticleEngagement({ article }: { article: Article }) {
  const { likedArticles, savedArticles, toggleLike, toggleSave } = useAppStore();
  const [likeCount, setLikeCount] = useState(article.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  const [shareToast, setShareToast] = useState("");

  const isLiked = likedArticles.has(article.id);
  const isSaved = savedArticles.has(article.id);

  const handleLike = () => {
    const wasLiked = isLiked;
    toggleLike(article.id);
    setLikeCount((c) => wasLiked ? c - 1 : c + 1);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 300);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast("Link copied!");
    setTimeout(() => setShareToast(""), 2000);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`;
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`;

  return (
    <div className="my-8 p-4 rounded-2xl flex flex-wrap items-center gap-3"
      style={{ background: "var(--bg-secondary)", boxShadow: "var(--shadow-card)" }}>

      {/* Like */}
      <button onClick={handleLike}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
        style={isLiked
          ? { background: "#fef2f2", color: "#ef4444", border: "1.5px solid #fecaca" }
          : { background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}>
        <Heart size={16} strokeWidth={1.8} className={likeAnim ? "like-animate" : ""}
          fill={isLiked ? "currentColor" : "none"} />
        {formatNumber(likeCount)} Likes
      </button>

      {/* Comments */}
      <a href="#comments"
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
        style={{ background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
        <MessageCircle size={16} strokeWidth={1.8} />
        {formatNumber(article.comments)} Comments
      </a>

      {/* Save */}
      <button onClick={() => toggleSave(article.id)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
        style={isSaved
          ? { background: "var(--tag-bg)", color: "var(--accent)", border: "1.5px solid var(--accent)" }
          : { background: "var(--bg)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}>
        <Bookmark size={16} strokeWidth={1.8} fill={isSaved ? "currentColor" : "none"} />
        {isSaved ? "Saved" : "Save"}
      </button>

      {/* Share */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>Share</span>
        <a href={tweetUrl} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all"
          style={{ background: "var(--bg-secondary)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1D9BF0"; (e.currentTarget as HTMLElement).style.borderColor = "#1D9BF0"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          aria-label="Share on X">𝕏</a>
        <a href={fbUrl} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all"
          style={{ background: "var(--bg-secondary)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1877F2"; (e.currentTarget as HTMLElement).style.borderColor = "#1877F2"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          aria-label="Share on Facebook">f</a>
        <button onClick={handleCopyLink}
          className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: "var(--bg-secondary)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          aria-label="Copy link">
          <Share2 size={14} strokeWidth={1.8} />
          {shareToast && (
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
              style={{ background: "var(--accent)", color: "#fff" }}>
              {shareToast}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
