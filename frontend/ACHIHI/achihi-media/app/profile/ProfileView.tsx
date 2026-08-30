"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User, Settings, BookMarked, PenSquare, Bell, Lock,
  LogOut, Camera, ChevronRight, Eye, EyeOff,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ARTICLES } from "@/lib/mock-data";
import ArticleCard from "@/components/ArticleCard";
import { useTheme } from "next-themes";

type Tab = "profile" | "saved" | "posts" | "settings";

export default function ProfileView() {
  const router = useRouter();
  const { currentUser, isLoggedIn, logout, savedArticles } = useAppStore();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [showPassChange, setShowPassChange] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (!isLoggedIn || !currentUser) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <User size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">Sign in to view your profile</p>
          <Link href="/login" className="px-5 py-2.5 rounded-xl bg-[#0F2A4A] dark:bg-[#1E88C7] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const savedArticlesList = ARTICLES.filter((a) => savedArticles.has(a.id));
  const myArticles = ARTICLES.filter((a) => a.author.id === currentUser.id);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; show?: boolean }[] = [
    { id: "profile" as Tab, label: "Profile", icon: <User size={16} /> },
    { id: "saved" as Tab, label: "Saved", icon: <BookMarked size={16} /> },
    { id: "posts" as Tab, label: "My Posts", icon: <PenSquare size={16} />, show: currentUser.role === "contributor" || currentUser.role === "admin" },
    { id: "settings" as Tab, label: "Settings", icon: <Settings size={16} /> },
  ].filter((t) => t.show !== false);

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Profile header */}
      <div className="py-10 px-4
        bg-white border-b border-gray-100
        dark:bg-gradient-to-br dark:from-[#060810] dark:to-[#08101a]
        dark:border-[#1a2744] dark:shadow-[inset_0_-1px_0_rgba(56,189,248,0.08)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200/60 dark:border-[#1a2744] dark:shadow-[0_0_16px_rgba(56,189,248,0.15)]"
              />
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1E88C7] dark:bg-[#38bdf8]/20 dark:border dark:border-[#38bdf8]/40 flex items-center justify-center hover:bg-[#1a7ab5] transition-colors">
                <Camera size={12} className="text-white dark:text-[#38bdf8]" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-[#0F2A4A] dark:text-[#c8ddf0]">{currentUser.name}</h1>
              <p className="text-gray-500 dark:text-[#4a6880] text-sm mt-0.5 capitalize">{currentUser.role} · {currentUser.articlesCount} articles</p>
              <p className="text-gray-400 dark:text-[#3a5878] text-sm mt-1">{currentUser.bio}</p>
            </div>
            {(currentUser.role === "contributor" || currentUser.role === "admin") && (
              <Link
                href="/submit"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors
                  bg-[#2E8B57] text-white hover:bg-[#3dae72]
                  dark:bg-transparent dark:text-[#34d399] dark:border dark:border-[#34d399]/30
                  dark:hover:bg-[#34d399]/8 dark:hover:shadow-[0_0_12px_rgba(52,211,153,0.15)]"
              >
                <PenSquare size={15} /> Write Article
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-100 dark:border-[#111c2e] bg-white dark:bg-[#060810] sticky top-[65px] z-40">
        <div className="max-w-4xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-[#1E88C7] text-[#1E88C7] dark:border-[#38bdf8] dark:text-[#38bdf8]"
                  : "border-transparent text-gray-500 dark:text-[#3a5878] hover:text-gray-700 dark:hover:text-[#8ab0cc]"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0d1117] rounded-xl border border-gray-100 dark:border-[#1a2744] p-6">
              <h2 className="text-base font-bold text-gray-900 dark:text-[#c8ddf0] mb-5">Account Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Display Name</label>
                  <input defaultValue={currentUser.name}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:focus:ring-[#38bdf8]/15 dark:focus:border-[#38bdf8]/30" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Email Address</label>
                  <input defaultValue={currentUser.email}
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:focus:ring-[#38bdf8]/15 dark:focus:border-[#38bdf8]/30" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Bio</label>
                  <textarea defaultValue={currentUser.bio} rows={3}
                    className="w-full px-4 py-2.5 rounded-xl text-sm resize-none transition-all border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:focus:ring-[#38bdf8]/15 dark:focus:border-[#38bdf8]/30" />
                </div>
                <button className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-white bg-[#0F2A4A] hover:bg-[#1a3a5c] dark:bg-transparent dark:text-[#38bdf8] dark:border dark:border-[#38bdf8]/30 dark:hover:bg-[#38bdf8]/8 dark:hover:shadow-[0_0_12px_rgba(56,189,248,0.1)]">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="bg-white dark:bg-[#0d1117] rounded-xl border border-gray-100 dark:border-[#1a2744] p-6">
              <button onClick={() => setShowPassChange(!showPassChange)} className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Lock size={17} className="text-gray-400 dark:text-[#2e4a68]" />
                  <span className="text-sm font-bold text-gray-900 dark:text-[#c8ddf0]">Change Password</span>
                </div>
                <ChevronRight size={15} className={`text-gray-400 dark:text-[#2e4a68] transition-transform ${showPassChange ? "rotate-90" : ""}`} />
              </button>
              {showPassChange && (
                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} placeholder="Current password"
                      className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm transition-all border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:placeholder-[#2e4a68] dark:focus:ring-[#38bdf8]/15" />
                    <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#2e4a68] hover:text-gray-600">
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <input type="password" placeholder="New password"
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:placeholder-[#2e4a68]" />
                  <input type="password" placeholder="Confirm new password"
                    className="w-full px-4 py-2.5 rounded-xl text-sm transition-all border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:placeholder-[#2e4a68]" />
                  <button className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-white bg-[#0F2A4A] hover:bg-[#1a3a5c] dark:bg-transparent dark:text-[#38bdf8] dark:border dark:border-[#38bdf8]/30 dark:hover:bg-[#38bdf8]/8">
                    Update Password
                  </button>
                </div>
              )}
            </div>

            {/* Logout */}
            <button onClick={() => { logout(); router.push("/"); }}
              className="flex items-center gap-2 text-sm font-medium transition-colors text-red-500 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-400">
              <LogOut size={15} /> Sign Out
            </button>
          </div>
        )}

        {/* Saved tab */}
        {activeTab === "saved" && (
          <div>
            <h2 className="text-lg font-black text-gray-900 dark:text-[#c8ddf0] mb-5">
              Saved Articles ({savedArticlesList.length})
            </h2>
            {savedArticlesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {savedArticlesList.map((a) => <ArticleCard key={a.id} article={a} />)}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 dark:text-[#2e4a68]">
                <BookMarked size={40} className="mx-auto mb-3 opacity-40" />
                <p className="font-medium">No saved articles yet</p>
                <p className="text-sm mt-1">Tap the bookmark icon on any article to save it.</p>
              </div>
            )}
          </div>
        )}

        {/* Posts tab */}
        {activeTab === "posts" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-gray-900 dark:text-[#c8ddf0]">My Articles ({myArticles.length})</h2>
              <Link href="/submit" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all
                bg-[#2E8B57] text-white hover:bg-[#3dae72]
                dark:bg-transparent dark:text-[#34d399] dark:border dark:border-[#34d399]/30
                dark:hover:bg-[#34d399]/8 dark:hover:border-[#34d399]/60">
                <PenSquare size={14} /> New Article
              </Link>
            </div>
            {myArticles.length > 0 ? (
              <div className="space-y-3">
                {myArticles.map((a) => (
                  <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl border transition-colors
                    bg-white border-gray-100 dark:bg-[#0d1117] dark:border-[#1a2744]
                    dark:hover:border-[#1a2d44]">
                    <div className="flex-1 min-w-0">
                      <Link href={`/article/${a.slug}`} className="text-sm font-semibold line-clamp-1 transition-colors
                        text-gray-900 hover:text-[#1E88C7] dark:text-[#9ab8d4] dark:hover:text-[#38bdf8]">
                        {a.title}
                      </Link>
                      <p className="text-xs text-gray-400 dark:text-[#2e4a68] mt-0.5">{a.category} · Published</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold
                      bg-[#2E8B57]/10 text-[#2E8B57] dark:bg-[#34d399]/8 dark:text-[#34d399] dark:border dark:border-[#34d399]/20">
                      Published
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 dark:text-[#2e4a68]">
                <PenSquare size={40} className="mx-auto mb-3 opacity-40" />
                <p className="font-medium">No articles yet</p>
                <Link href="/submit" className="inline-block mt-3 text-sm text-[#1E88C7] dark:text-[#38bdf8]/70 hover:underline">Write your first article →</Link>
              </div>
            )}
          </div>
        )}

        {/* Settings tab */}
        {activeTab === "settings" && (
          <div className="space-y-5">
            {/* Theme */}
            <div className="bg-white dark:bg-[#0d1117] rounded-xl border border-gray-100 dark:border-[#1a2744] p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#c8ddf0] mb-4">Appearance</h3>
              <div className="flex gap-3">
                {[
                  { value: "light", label: "☀️ Light" },
                  { value: "dark", label: "🌙 Dark" },
                  { value: "system", label: "💻 System" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      theme === value
                        ? "bg-[#0F2A4A] text-white border-transparent dark:bg-transparent dark:text-[#38bdf8] dark:border-[#38bdf8]/40 dark:shadow-[0_0_12px_rgba(56,189,248,0.1)]"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-[#1a2744] dark:text-[#3a5878] dark:hover:bg-[#0d1520] dark:hover:text-[#8ab0cc]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-[#0d1117] rounded-xl border border-gray-100 dark:border-[#1a2744] p-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-[#c8ddf0] mb-4 flex items-center gap-2">
                <Bell size={16} className="text-[#1E88C7] dark:text-[#38bdf8]" /> Notifications
              </h3>
              <div className="space-y-3">
                {[
                  "Breaking news alerts",
                  "Comments on my articles",
                  "New articles from followed authors",
                  "Weekly digest email",
                ].map((label) => (
                  <label key={label} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700 dark:text-[#5a7898]">{label}</span>
                    <div className="relative">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-10 h-5 rounded-full transition-colors
                        bg-gray-200 peer-checked:bg-[#1E88C7]
                        dark:bg-[#1a2744] dark:peer-checked:bg-[#38bdf8]/70" />
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm" />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
