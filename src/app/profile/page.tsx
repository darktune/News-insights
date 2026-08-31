import React from 'react';
import { MOCK_ARTICLES } from '@/lib/mock-data';
import ArticleCard from '@/components/ArticleCard';
import { Settings, Users, BookMarked, Edit3 } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  // Static mock user for Server Component
  const user = {
    name: "Adeola Omoniyi",
    role: "contributor",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    bio: "Senior Technology Correspondent analyzing the intersection of fintech, regulatory policy, and emerging markets in sub-Saharan Africa. Ex-Bloomberg.",
    followers: 12400,
    following: 342,
    location: "Lagos, Nigeria"
  };

  const userArticles = MOCK_ARTICLES.filter(a => a.category === 'Technology').slice(0, 4);
  const savedArticles = MOCK_ARTICLES.slice(10, 12);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-[var(--text)] to-[var(--text-secondary)] opacity-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative -mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-6 pb-6">
            <div className="relative group">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-32 h-32 rounded-full border-4 border-[var(--bg)] object-cover shadow-xl"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                <Edit3 size={16} />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-black text-[var(--text)] flex items-center justify-center sm:justify-start gap-3">
                {user.name}
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[var(--accent)]/20 text-[var(--accent)]">
                  {user.role}
                </span>
              </h1>
              <p className="text-[var(--text-secondary)] text-sm font-medium mt-1">{user.location}</p>
              
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm font-bold text-[var(--text)]">
                <div className="flex items-center gap-1.5 hover:text-[var(--accent)] cursor-pointer transition-colors">
                  <Users size={16} className="text-[var(--text-tertiary)]" />
                  {user.followers.toLocaleString()} <span className="text-[var(--text-tertiary)] font-normal">Followers</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-[var(--accent)] cursor-pointer transition-colors">
                  {user.following.toLocaleString()} <span className="text-[var(--text-tertiary)] font-normal">Following</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-6 py-2 rounded-full bg-[var(--text)] text-[var(--bg)] font-bold text-sm hover:opacity-90 transition-opacity">
                Share Profile
              </button>
              <button className="p-2 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>

          <p className="max-w-2xl text-center sm:text-left text-[var(--text)] leading-relaxed pb-8">
            {user.bio}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[64px] z-40 bg-[var(--bg)]/80 backdrop-blur-xl border-y border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-8">
          {['Articles', 'Saved Collections', 'Activity'].map((tab, i) => (
            <button key={tab} className={`py-4 text-sm font-bold border-b-2 transition-colors ${i === 0 ? 'border-[var(--accent)] text-[var(--text)]' : 'border-transparent text-[var(--text-tertiary)] hover:text-[var(--text)]'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-black text-lg text-[var(--text)] mb-4">Authored Articles</h3>
            {userArticles.map(article => (
              <ArticleCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-lg text-[var(--text)] flex items-center gap-2">
              <BookMarked size={18} className="text-[var(--accent)]" /> 
              Saved Collections
            </h3>
            
            <div className="glass-panel p-5 rounded-2xl">
              <h4 className="font-bold text-[var(--text)] mb-3">Read Later</h4>
              <div className="space-y-3">
                {savedArticles.map(article => (
                  <Link key={article.id} href={`/article/${article.slug}`} className="block group">
                    <p className="text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--accent)] line-clamp-2 transition-colors">
                      {article.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
