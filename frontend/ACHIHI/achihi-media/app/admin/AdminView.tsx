"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle, XCircle, Edit3, Clock, Users, FileText,
  TrendingUp, Star, Shield, MessageSquare, BarChart3,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { PENDING_ARTICLES, ARTICLES, AUTHORS } from "@/lib/mock-data";
import { timeAgo, categoryColor } from "@/lib/utils";
import type { Article } from "@/lib/mock-data";

type AdminTab = "queue" | "published" | "users" | "analytics";

/* shared field style */
const darkCard = "bg-white dark:bg-[#0d1117] border border-gray-100 dark:border-[#1a2744]";
const darkText = "text-gray-900 dark:text-[#c8ddf0]";
const mutedText = "text-gray-500 dark:text-[#3a5878]";
const tinyText = "text-gray-400 dark:text-[#2e4a68]";

export default function AdminView() {
  const { isLoggedIn, currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<AdminTab>("queue");
  const [pendingList, setPendingList] = useState(PENDING_ARTICLES);
  const [feedbackArticle, setFeedbackArticle] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  /* ── Access guard ── */
  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <Shield size={44} className="mx-auto mb-4 text-gray-300 dark:text-[#1a2744]" />
          <p className={`${mutedText} mb-4`}>Admin access required</p>
          <Link href="/login" className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
            bg-[#0F2A4A] hover:bg-[#1a3a5c]
            dark:bg-transparent dark:text-[#38bdf8] dark:border dark:border-[#38bdf8]/30
            dark:hover:bg-[#38bdf8]/8">Sign In</Link>
        </div>
      </div>
    );
  }

  if (currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <Shield size={44} className="mx-auto mb-4 text-gray-300 dark:text-[#1a2744]" />
          <h2 className={`text-lg font-bold mb-2 ${darkText}`}>Access Denied</h2>
          <p className={`text-sm ${mutedText}`}>You need admin privileges to access this panel.</p>
          <p className={`text-xs mt-1 ${tinyText}`}>Use the &ldquo;Login as Admin&rdquo; button on the sign-in page.</p>
        </div>
      </div>
    );
  }

  const handleApprove = (id: string) => setPendingList((l) => l.filter((a) => a.id !== id));
  const handleReject  = (id: string) => {
    if (!feedbackText.trim()) { alert("Add feedback before rejecting."); return; }
    setPendingList((l) => l.filter((a) => a.id !== id));
    setFeedbackArticle(null);
    setFeedbackText("");
  };

  const stats = [
    { label: "Published", value: ARTICLES.length, icon: <FileText size={18} />, glow: "text-[#38bdf8]", bg: "dark:bg-[#38bdf8]/8 dark:border-[#38bdf8]/15" },
    { label: "Pending Review", value: pendingList.length, icon: <Clock size={18} />, glow: "text-amber-400", bg: "dark:bg-amber-400/8 dark:border-amber-400/15" },
    { label: "Contributors", value: AUTHORS.filter(a => a.role === "contributor").length, icon: <Users size={18} />, glow: "text-[#34d399]", bg: "dark:bg-[#34d399]/8 dark:border-[#34d399]/15" },
    { label: "Engagement", value: "12.4k", icon: <TrendingUp size={18} />, glow: "text-purple-400", bg: "dark:bg-purple-400/8 dark:border-purple-400/15" },
  ];

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: "queue",     label: `Queue (${pendingList.length})`, icon: <Clock size={15} /> },
    { id: "published", label: "Published",                      icon: <FileText size={15} /> },
    { id: "users",     label: "Users",                          icon: <Users size={15} /> },
    { id: "analytics", label: "Analytics",                      icon: <BarChart3 size={15} /> },
  ];

  return (
    <div className="bg-[var(--background)] min-h-screen">

      {/* ── Admin header ── */}
      <div className="py-8 px-4
        bg-white border-b border-gray-100
        dark:bg-gradient-to-br dark:from-[#06090f] dark:to-[#060c16]
        dark:border-[#1a2744] dark:shadow-[inset_0_-1px_0_rgba(56,189,248,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Shield size={20} className="text-[#1E88C7] dark:text-[#38bdf8] dark:drop-shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
            <h1 className={`text-2xl font-black ${darkText}`}>Admin Panel</h1>
          </div>
          <p className={`text-sm ${tinyText}`}>Logged in as {currentUser.name} · Admin</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {stats.map((s) => (
              <div key={s.label} className={`rounded-xl p-4 flex items-center gap-3
                bg-gray-50 border border-gray-200 ${s.bg} dark:border`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.glow}
                  bg-gray-100/80 dark:bg-transparent`}>
                  {s.icon}
                </div>
                <div>
                  <p className={`text-2xl font-black ${darkText}`}>{s.value}</p>
                  <p className={`text-xs ${tinyText}`}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="border-b border-gray-100 dark:border-[#111c2e] bg-white dark:bg-[#060810] sticky top-[65px] z-40">
        <div className="max-w-7xl mx-auto px-4 flex gap-0.5 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === t.id
                  ? "border-[#1E88C7] text-[#1E88C7] dark:border-[#38bdf8] dark:text-[#38bdf8]"
                  : "border-transparent text-gray-500 dark:text-[#2e4a68] hover:text-gray-700 dark:hover:text-[#6888a8]"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Review Queue ── */}
        {activeTab === "queue" && (
          <div>
            <h2 className={`text-lg font-black mb-5 ${darkText}`}>Pending Review</h2>
            {pendingList.length === 0 ? (
              <div className="text-center py-20">
                <CheckCircle size={44} className="mx-auto mb-3 text-[#2E8B57] dark:text-[#34d399] opacity-60" />
                <p className={`font-medium ${mutedText}`}>All clear — no pending submissions</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingList.map((article) => (
                  <div key={article.id} className={`rounded-xl overflow-hidden ${darkCard}`}>
                    <div className="flex gap-4 p-4">
                      <img src={article.coverImage} alt="" className="w-28 h-20 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1.5 ${categoryColor(article.category)}`}>
                              {article.category}
                            </span>
                            <h3 className={`text-sm font-bold line-clamp-2 ${darkText}`}>{article.title}</h3>
                            <p className={`text-xs mt-1 line-clamp-1 ${mutedText}`}>{article.excerpt}</p>
                          </div>
                          <span className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
                            bg-amber-50 text-amber-600 border border-amber-200
                            dark:bg-amber-400/8 dark:text-amber-400 dark:border-amber-400/20">
                            <Clock size={10} /> Pending
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full" />
                          <span className={`text-xs ${mutedText}`}>{article.author.name}</span>
                          <span className={`text-xs ${tinyText}`}>{timeAgo(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action bar */}
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3
                      border-t border-gray-50 dark:border-[#111c2e]
                      bg-gray-50 dark:bg-[#090d16]">
                      <button onClick={() => handleApprove(article.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all
                          bg-[#2E8B57] hover:bg-[#3dae72]
                          dark:bg-transparent dark:text-[#34d399] dark:border dark:border-[#34d399]/30
                          dark:hover:bg-[#34d399]/8 dark:hover:border-[#34d399]/60
                          dark:hover:shadow-[0_0_10px_rgba(52,211,153,0.12)]">
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button onClick={() => setFeedbackArticle(feedbackArticle === article.id ? null : article.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                          border border-red-200 text-red-600 hover:bg-red-50
                          dark:border-red-800/40 dark:text-red-400/80 dark:hover:bg-red-900/10 dark:hover:text-red-400">
                        <XCircle size={14} /> Reject
                      </button>
                      <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all
                        border border-gray-200 text-gray-600 hover:bg-white
                        dark:border-[#1a2744] dark:text-[#5a7898] dark:hover:bg-[#0d1520] dark:hover:text-[#a8c8e8]">
                        <Edit3 size={14} /> Edit & Publish
                      </button>
                    </div>

                    {/* Reject feedback panel */}
                    {feedbackArticle === article.id && (
                      <div className="px-4 pb-4 pt-3 border-t border-gray-100 dark:border-[#111c2e]
                        bg-gray-50 dark:bg-[#060a10]">
                        <label className={`block text-xs font-bold mb-1.5 uppercase tracking-wider ${tinyText}`}>
                          Rejection feedback (required)
                        </label>
                        <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Explain why this article is being rejected…" rows={3}
                          className="w-full px-3 py-2 rounded-lg text-sm resize-none transition-all
                            border border-gray-200 bg-white text-gray-900
                            focus:outline-none focus:ring-2 focus:ring-red-400/30
                            dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec]
                            dark:placeholder-[#2e4a68] dark:focus:ring-red-500/20 dark:focus:border-red-700/40" />
                        <button onClick={() => handleReject(article.id)}
                          className="mt-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all
                            bg-red-500 hover:bg-red-600
                            dark:bg-transparent dark:text-red-400 dark:border dark:border-red-700/40
                            dark:hover:bg-red-900/20 dark:hover:border-red-600/60">
                          Confirm Rejection
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Published ── */}
        {activeTab === "published" && (
          <div>
            <h2 className={`text-lg font-black mb-5 ${darkText}`}>Published Articles ({ARTICLES.length})</h2>
            <div className={`rounded-xl overflow-hidden ${darkCard}`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-[#111c2e] bg-gray-50 dark:bg-[#090d16]">
                    {["Title", "Category", "Author", "Engagement", ""].map((h, i) => (
                      <th key={i} className={`px-4 py-3 text-left text-[11px] font-black uppercase tracking-widest ${tinyText}
                        ${i === 1 ? "hidden sm:table-cell" : i === 2 ? "hidden md:table-cell" : i === 3 ? "hidden lg:table-cell" : i === 4 ? "text-right" : ""}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ARTICLES.map((a, i) => (
                    <tr key={a.id} className={`border-b border-gray-50 dark:border-[#0d1520] last:border-0
                      ${i % 2 === 1 ? "bg-gray-50/60 dark:bg-[#090d16]/60" : ""}`}>
                      <td className="px-4 py-3">
                        <Link href={`/article/${a.slug}`}
                          className={`font-semibold line-clamp-1 block hover:text-[#1E88C7] dark:hover:text-[#38bdf8] transition-colors ${darkText}`}>
                          {a.title}
                        </Link>
                        <p className={`text-xs mt-0.5 ${tinyText}`}>{timeAgo(a.publishedAt)}</p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColor(a.category)}`}>{a.category}</span>
                      </td>
                      <td className={`px-4 py-3 hidden md:table-cell text-sm ${mutedText}`}>{a.author.name}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className={`flex items-center gap-3 text-xs ${tinyText}`}>
                          <span>♥ {a.likes}</span>
                          <span>💬 {a.comments}</span>
                          <span>↗ {a.shares}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {!a.featured && (
                            <button title="Feature this story"
                              className={`p-1.5 rounded-lg transition-colors ${tinyText}
                                hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-400/8`}>
                              <Star size={13} />
                            </button>
                          )}
                          <Link href={`/article/${a.slug}`} title="View article"
                            className={`p-1.5 rounded-lg transition-colors ${tinyText}
                              hover:text-[#1E88C7] hover:bg-[#1E88C7]/8 dark:hover:text-[#38bdf8] dark:hover:bg-[#38bdf8]/8`}>
                            <Edit3 size={13} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {activeTab === "users" && (
          <div>
            <h2 className={`text-lg font-black mb-5 ${darkText}`}>Users ({AUTHORS.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AUTHORS.map((author) => (
                <div key={author.id} className={`rounded-xl p-4 ${darkCard}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={author.avatar} alt={author.name}
                      className="w-12 h-12 rounded-full object-cover dark:ring-1 dark:ring-[#1a2744] dark:shadow-[0_0_8px_rgba(56,189,248,0.08)]" />
                    <div>
                      <p className={`font-bold ${darkText}`}>{author.name}</p>
                      <p className={`text-xs ${tinyText}`}>{author.articlesCount} articles</p>
                    </div>
                  </div>
                  <p className={`text-xs mb-3 line-clamp-2 leading-relaxed ${mutedText}`}>{author.bio}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      author.role === "admin"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-400/8 dark:text-purple-400 dark:border dark:border-purple-400/20"
                        : author.role === "contributor"
                        ? "bg-[#2E8B57]/10 text-[#2E8B57] dark:bg-[#34d399]/8 dark:text-[#34d399] dark:border dark:border-[#34d399]/20"
                        : "bg-gray-100 text-gray-600 dark:bg-[#0d1520] dark:text-[#3a5878] dark:border dark:border-[#1a2744]"
                    }`}>
                      {author.role}
                    </span>
                    <select defaultValue={author.role}
                      className="text-xs rounded-lg px-2 py-1 transition-all
                        border border-gray-200 bg-white text-gray-700
                        dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#5a7898]
                        focus:outline-none">
                      <option value="reader">Reader</option>
                      <option value="contributor">Contributor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Analytics ── */}
        {activeTab === "analytics" && (
          <div>
            <h2 className={`text-lg font-black mb-5 ${darkText}`}>Analytics Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Top by likes */}
              <div className={`rounded-xl p-5 ${darkCard}`}>
                <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkText}`}>
                  <TrendingUp size={15} className="text-[#1E88C7] dark:text-[#38bdf8]" /> Top by Likes
                </h3>
                <div className="space-y-3">
                  {[...ARTICLES].sort((a, b) => b.likes - a.likes).slice(0, 5).map((a, i) => {
                    const max = ARTICLES.reduce((m, x) => Math.max(m, x.likes), 0);
                    return (
                      <div key={a.id} className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center flex-shrink-0
                          bg-[#1E88C7]/10 text-[#1E88C7] dark:bg-[#38bdf8]/8 dark:text-[#38bdf8]`}>{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium line-clamp-1 ${darkText}`}>{a.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-[#111c2e]">
                              <div className="h-1.5 rounded-full bg-[#1E88C7] dark:bg-gradient-to-r dark:from-[#38bdf8] dark:to-[#1E88C7]
                                dark:shadow-[0_0_4px_rgba(56,189,248,0.3)]"
                                style={{ width: `${(a.likes / max) * 100}%` }} />
                            </div>
                            <span className={`text-[11px] flex-shrink-0 ${tinyText}`}>{a.likes}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top by comments */}
              <div className={`rounded-xl p-5 ${darkCard}`}>
                <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkText}`}>
                  <MessageSquare size={15} className="text-[#2E8B57] dark:text-[#34d399]" /> Top by Comments
                </h3>
                <div className="space-y-3">
                  {[...ARTICLES].sort((a, b) => b.comments - a.comments).slice(0, 5).map((a, i) => {
                    const max = ARTICLES.reduce((m, x) => Math.max(m, x.comments), 0);
                    return (
                      <div key={a.id} className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center flex-shrink-0
                          bg-[#2E8B57]/10 text-[#2E8B57] dark:bg-[#34d399]/8 dark:text-[#34d399]`}>{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium line-clamp-1 ${darkText}`}>{a.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-[#111c2e]">
                              <div className="h-1.5 rounded-full bg-[#2E8B57] dark:bg-gradient-to-r dark:from-[#34d399] dark:to-[#2E8B57]
                                dark:shadow-[0_0_4px_rgba(52,211,153,0.3)]"
                                style={{ width: `${(a.comments / max) * 100}%` }} />
                            </div>
                            <span className={`text-[11px] flex-shrink-0 ${tinyText}`}>{a.comments}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category breakdown */}
              <div className={`rounded-xl p-5 sm:col-span-2 ${darkCard}`}>
                <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkText}`}>
                  <BarChart3 size={15} className="text-gray-500 dark:text-[#3a5878]" /> Articles by Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["National","Politics","Entertainment","Metro","Sport","Opinion","Business"].map((cat) => {
                    const count = ARTICLES.filter((a) => a.category === cat).length;
                    return (
                      <div key={cat} className="text-center p-3 rounded-xl
                        bg-gray-50 dark:bg-[#090d16] dark:border dark:border-[#111c2e]">
                        <p className={`text-2xl font-black ${darkText}`}>{count}</p>
                        <p className={`text-[11px] mt-0.5 ${tinyText}`}>{cat}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
