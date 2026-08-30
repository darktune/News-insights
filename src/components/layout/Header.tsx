import React from 'react';
import Link from 'next/link';
import { Search, Menu, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-subtle/20 bg-brand-light/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Mobile Menu & Search */}
        <div className="flex items-center space-x-4 flex-1">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Menu">
            <Menu className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors hidden sm:block" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex-1 flex justify-center">
          <span className="font-serif font-bold text-2xl tracking-tighter uppercase whitespace-nowrap">
            Achihi Media
          </span>
        </Link>

        {/* Right: User / Sub */}
        <div className="flex items-center justify-end space-x-4 flex-1">
          <Link href="/admin" className="p-2 hover:bg-black/5 rounded-full transition-colors" aria-label="Account">
            <User className="w-5 h-5" />
          </Link>
          <button className="hidden sm:inline-flex bg-brand-dark text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
      
      {/* Categories Bar */}
      <div className="border-t border-brand-subtle/10 hidden md:block">
        <nav className="container mx-auto px-4 overflow-x-auto no-scrollbar py-3">
          <ul className="flex items-center space-x-8 text-sm font-semibold tracking-wide uppercase">
            {['Politics', 'Business', 'Technology', 'Money', 'Sports', 'Entertainment', 'Opinion', 'World'].map((cat) => (
              <li key={cat}>
                <Link href={`/category/${cat.toLowerCase()}`} className="hover:text-brand-accent transition-colors whitespace-nowrap">
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
