import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, Settings, LogOut, Image as ImageIcon, LayoutTemplate } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-serif font-bold text-xl uppercase tracking-wider block">
            Oriental Times
          </Link>
          <span className="text-xs text-brand-subtle uppercase tracking-widest mt-1 block">Newsroom</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium text-sm">Dashboard</span>
          </Link>
          <Link href="/admin/homepage" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors">
            <LayoutTemplate className="w-5 h-5" />
            <span className="font-medium text-sm">Homepage</span>
          </Link>
          <Link href="/admin/articles" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors">
            <FileText className="w-5 h-5" />
            <span className="font-medium text-sm">Articles</span>
          </Link>
          <Link href="/admin/media" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors">
            <ImageIcon className="w-5 h-5" />
            <span className="font-medium text-sm">Media Library</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-white/10 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-md hover:bg-red-500/20 text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
           <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Admin User</span>
              <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center text-sm font-bold">
                A
              </div>
           </div>
        </header>
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
