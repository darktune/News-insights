import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticleBySlug, ARTICLES, MOCK_COMMENTS } from "@/lib/mock-data";
import { formatDate, categoryColor } from "@/lib/utils";
import ArticleEngagement from "./ArticleEngagement";
import ArticleCard from "@/components/ArticleCard";
import CommentSection from "./CommentSection";
import AdSlot from "@/components/AdSlot";
import { Clock, Calendar, ChevronLeft } from "lucide-react";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title, description: article.excerpt,
      images: [{ url: article.coverImage }], type: "article",
      publishedTime: article.publishedAt, authors: [article.author.name],
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt, images: [article.coverImage] },
  };
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

/* Split body HTML at ~40% for mid-article ad */
function splitBodyAt40(html: string): [string, string] {
  const paragraphs = html.split("</p>");
  const cut = Math.max(1, Math.floor(paragraphs.length * 0.4));
  return [paragraphs.slice(0, cut).join("</p>") + "</p>", paragraphs.slice(cut).join("</p>")];
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const comments = MOCK_COMMENTS.filter((c) => c.articleId === article.id);
  const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
  const [bodyPart1, bodyPart2] = splitBodyAt40(article.body);

  const proseBase = `
    prose prose-lg max-w-none
    prose-headings:font-black prose-headings:leading-tight
    prose-p:leading-relaxed
    prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
    prose-blockquote:not-italic
    prose-img:rounded-2xl
  `;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Back */}
        <Link href={`/category/${article.category.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}>
          <ChevronLeft size={16} /> {article.category}
        </Link>

        <div className="flex gap-10">
          {/* ── Main article column ── */}
          <article className="flex-1 min-w-0 max-w-[680px]">
            {/* Category pill */}
            <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-black mb-4 ${categoryColor(article.category)}`}>
              {article.category}
            </span>

            {/* Headline */}
            <h1 className="text-2xl sm:text-[2rem] font-black leading-tight mb-4"
              style={{ color: "var(--text)", fontFamily: "-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif" }}>
              {article.title}
            </h1>

            {/* Lead */}
            <p className="text-lg font-medium leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}>
              {article.excerpt}
            </p>

            {/* Byline */}
            <div className="flex items-center justify-between gap-4 py-4 mb-6"
              style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3">
                <img src={article.author.avatar} alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <Link href="/profile"
                    className="text-sm font-bold transition-opacity hover:opacity-70"
                    style={{ color: "var(--text)" }}>
                    {article.author.name}
                  </Link>
                  <p className="text-xs capitalize" style={{ color: "var(--text-tertiary)" }}>
                    {article.author.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
                <span className="flex items-center gap-1">
                  <Calendar size={12} strokeWidth={1.8} /> {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} strokeWidth={1.8} /> {article.readTime} min
                </span>
              </div>
            </div>

            {/* ── Ad slot: under header, before body ── */}
            <AdSlot placement="article-header" variant="banner" className="mb-6" />

            {/* Hero image */}
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
              <Image src={article.coverImage} alt={article.title} fill className="object-cover" priority />
            </div>

            {/* Body part 1 */}
            <div className={proseBase}
              style={{
                "--tw-prose-body": "var(--text)",
                "--tw-prose-headings": "var(--text)",
                "--tw-prose-lead": "var(--text-secondary)",
                "--tw-prose-links": "var(--accent)",
                "--tw-prose-bold": "var(--text)",
                "--tw-prose-counters": "var(--text-secondary)",
                "--tw-prose-bullets": "var(--text-tertiary)",
                "--tw-prose-hr": "var(--border)",
                "--tw-prose-quotes": "var(--text-secondary)",
                "--tw-prose-quote-borders": "var(--accent)",
                "--tw-prose-captions": "var(--text-tertiary)",
                "--tw-prose-code": "var(--accent)",
                "--tw-prose-pre-code": "var(--text)",
                "--tw-prose-pre-bg": "var(--bg-secondary)",
                "--tw-prose-th-borders": "var(--border)",
                "--tw-prose-td-borders": "var(--border)",
              } as React.CSSProperties}
              dangerouslySetInnerHTML={{ __html: bodyPart1 }}
            />

            {/* ── Ad slot: mid-article ── */}
            <AdSlot placement="article-mid" variant="feed" className="my-8" />

            {/* Body part 2 */}
            {bodyPart2 && (
              <div className={proseBase}
                style={{
                  "--tw-prose-body": "var(--text)",
                  "--tw-prose-headings": "var(--text)",
                  "--tw-prose-lead": "var(--text-secondary)",
                  "--tw-prose-links": "var(--accent)",
                  "--tw-prose-bold": "var(--text)",
                  "--tw-prose-counters": "var(--text-secondary)",
                  "--tw-prose-bullets": "var(--text-tertiary)",
                  "--tw-prose-hr": "var(--border)",
                  "--tw-prose-quotes": "var(--text-secondary)",
                  "--tw-prose-quote-borders": "var(--accent)",
                  "--tw-prose-captions": "var(--text-tertiary)",
                  "--tw-prose-code": "var(--accent)",
                  "--tw-prose-pre-code": "var(--text)",
                  "--tw-prose-pre-bg": "var(--bg-secondary)",
                  "--tw-prose-th-borders": "var(--border)",
                  "--tw-prose-td-borders": "var(--border)",
                } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: bodyPart2 }}
              />
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
              {article.tags.map((tag) => (
                <span key={tag}
                  className="px-3 py-1 rounded-full text-sm font-semibold cursor-pointer transition-all hover:scale-105"
                  style={{ background: "var(--tag-bg)", color: "var(--tag-text)" }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Engagement */}
            <ArticleEngagement article={article} />

            {/* Comments */}
            <div id="comments">
              <CommentSection comments={comments} articleId={article.id} />
            </div>
          </article>

          {/* ── Sidebar ── */}
          <div className="hidden xl:block w-[340px] flex-shrink-0">
            <div className="sticky top-28 space-y-4">
              {/* Author widget */}
              <div className="rounded-2xl p-4" style={{ background: "var(--bg-secondary)", boxShadow: "var(--shadow-card)" }}>
                <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>
                  About the Author
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <img src={article.author.avatar} alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[15px]" style={{ color: "var(--text)" }}>{article.author.name}</p>
                    <p className="text-xs capitalize" style={{ color: "var(--text-tertiary)" }}>
                      {article.author.role} · {article.author.articlesCount} articles
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {article.author.bio}
                </p>
              </div>

              {/* Ad slot below author */}
              <AdSlot placement="article-sidebar" variant="sidebar" />

              {/* Related stories widget */}
              {related.length > 0 && (
                <div className="rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", boxShadow: "var(--shadow-card)" }}>
                  <div className="px-4 pt-4 pb-2">
                    <p className="text-[15px] font-black" style={{ color: "var(--text)" }}>
                      More in {article.category}
                    </p>
                  </div>
                  <div className="px-2 pb-3">
                    {related.map((a) => <ArticleCard key={a.id} article={a} variant="compact" />)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related — mobile/below */}
        {related.length > 0 && (
          <div className="mt-12 xl:hidden">
            <h2 className="text-xl font-black mb-5" style={{ color: "var(--text)" }}>
              More in {article.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
