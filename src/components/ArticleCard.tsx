"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Bookmark, Clock } from "lucide-react";
import { Article } from "@/lib/mock-data";
import { timeAgo, formatNumber, categoryColor } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact" | "horizontal";
}

/* Icon action button — X style */
function ActionBtn({
  onClick, active, activeColor = "#F4212E", count, icon, hoverColor,
}: {
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  activeColor?: string;
  count?: number | string;
  icon: React.ReactNode;
  hoverColor?: string;
}) {
  const [hover, setHover] = useState(false);
  const color = active ? activeColor : hover ? (hoverColor ?? "var(--accent)") : "var(--text-tertiary)";
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-1.5 text-xs font-medium transition-colors"
      style={{ color }}>
      {icon}
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const { likedArticles, savedArticles, toggleLike, toggleSave } = useAppStore();
  const [likeCount, setLikeCount] = useState(article.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  const isLiked = likedArticles.has(article.id);
  const isSaved = savedArticles.has(article.id);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const wasLiked = isLiked;
    toggleLike(article.id);
    setLikeCount((c) => wasLiked ? c - 1 : c + 1);
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 300);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    toggleSave(article.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (navigator.share) {
      navigator.share({ title: article.title, url: `/article/${article.slug}` });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/article/${article.slug}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2000);
    }
  };

  /* ── Featured hero ── */
  if (variant === "featured") {
    return (
      <Link href={`/article/${article.slug}`}
        className="group block relative overflow-hidden x-card x-card-lift">
        <div className="relative h-[420px] sm:h-[500px]">
          <Image src={article.coverImage} alt={article.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-103" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-3 ${categoryColor(article.category)}`}>
            {article.category}
          </span>
          <h2 className="text-white text-2xl sm:text-3xl font-black leading-tight mb-3 line-clamp-3"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            {article.title}
          </h2>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={article.author.avatar} alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20" />
              <div>
                <p className="text-white text-sm font-semibold">{article.author.name}</p>
                <p className="text-gray-400 text-xs">{timeAgo(article.publishedAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <span className="flex items-center gap-1"><Heart size={13} /> {formatNumber(article.likes)}</span>
              <span className="flex items-center gap-1"><MessageCircle size={13} /> {formatNumber(article.comments)}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  /* ── Compact (sidebar list item) ── */
  if (variant === "compact") {
    return (
      <Link href={`/article/${article.slug}`}
        className="group flex gap-3 px-3 py-3 rounded-xl transition-all"
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
        <div className="relative w-16 h-14 flex-shrink-0 rounded-xl overflow-hidden">
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold mb-0.5" style={{ color: "var(--accent)" }}>{article.category}</p>
          <h4 className="text-sm font-semibold line-clamp-2 leading-snug"
            style={{ color: "var(--text)" }}>
            {article.title}
          </h4>
          <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
            {timeAgo(article.publishedAt)}
          </p>
        </div>
      </Link>
    );
  }

  /* ── Horizontal (secondary feature) ── */
  if (variant === "horizontal") {
    return (
      <Link href={`/article/${article.slug}`}
        className="group flex gap-4 p-4 rounded-2xl x-card x-card-lift">
        <div className="relative w-28 h-20 sm:w-36 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image src={article.coverImage} alt={article.title} fill
            className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold mb-1.5 ${categoryColor(article.category)}`}>
            {article.category}
          </span>
          <h3 className="text-sm font-bold line-clamp-2 leading-snug"
            style={{ color: "var(--text)" }}>
            {article.title}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
            <span>{article.author.name}</span>
            <span>·</span>
            <span>{timeAgo(article.publishedAt)}</span>
            <Clock size={10} />
            <span>{article.readTime}m</span>
          </div>
        </div>
      </Link>
    );
  }

  /* ── Default feed card ── */
  return (
    <article className="group x-card x-card-lift relative">
      <Link href={`/article/${article.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden">
          <Image src={article.coverImage} alt={article.title} fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>

        <div className="px-4 pt-3 pb-2">
          {/* Headline */}
          <h3 className="text-[15px] font-bold leading-snug mb-1.5 line-clamp-2 transition-colors group-hover:opacity-80"
            style={{ color: "var(--text)" }}>
            {article.title}
          </h3>
          {/* Excerpt */}
          <p className="text-[13px] line-clamp-2 mb-3 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}>
            {article.excerpt}
          </p>
          {/* Byline */}
          <div className="flex items-center gap-2">
            <img src={article.author.avatar} alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover" />
            <span className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>
              {article.author.name}
            </span>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              · {timeAgo(article.publishedAt)} · {article.readTime}m
            </span>
          </div>
        </div>
      </Link>

      {/* Engagement bar */}
      <div className="flex items-center justify-between px-4 pb-3 pt-1"
        style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-4">
          <ActionBtn
            onClick={handleLike}
            active={isLiked}
            activeColor="#F4212E"
            hoverColor="#F4212E"
            count={formatNumber(likeCount)}
            icon={<Heart size={16} strokeWidth={1.8} className={likeAnim ? "like-animate" : ""}
              fill={isLiked ? "currentColor" : "none"} />}
          />
          <Link href={`/article/${article.slug}#comments`}>
            <ActionBtn
              count={formatNumber(article.comments)}
              hoverColor="var(--accent)"
              icon={<MessageCircle size={16} strokeWidth={1.8} />}
            />
          </Link>
          <ActionBtn
            onClick={handleShare}
            hoverColor="var(--accent-green)"
            count={formatNumber(article.shares)}
            icon={<Share2 size={16} strokeWidth={1.8} />}
          />
          {shareToast && (
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "var(--accent)", color: "#fff" }}>
              Copied!
            </span>
          )}
        </div>
        <ActionBtn
          onClick={handleSave}
          active={isSaved}
          activeColor="var(--accent)"
          hoverColor="var(--accent)"
          icon={<Bookmark size={16} strokeWidth={1.8} fill={isSaved ? "currentColor" : "none"} />}
        />
      </div>
    </article>
  );
}
