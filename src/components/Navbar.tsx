"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun, Moon, Search, User, Menu, X, ChevronDown,
  PenSquare, LogOut, Settings, BookMarked, Monitor, Crown
} from "lucide-react";
import AchihiLogo from "./AchihiLogo";
import { CATEGORIES } from "@/lib/mock-data";
import { useAppStore } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen, isLoggedIn, currentUser, logout, setPremiumModalOpen } = useAppStore();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim())
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'glass-panel border-b-0' : 'bg-[var(--bg)] border-b border-[var(--border)]'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-3">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-4">
            <AchihiLogo size={36} />
          </Link>

          {/* Category nav — desktop */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {CATEGORIES.map((cat) => {
              const active = pathname === `/category/${cat.toLowerCase()}`;
              return (
                <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                  className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${active ? 'text-[var(--accent)] bg-[var(--bg-hover)]' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]'}`}>
                  {cat}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-1">
                <input autoFocus type="text" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-44 sm:w-56 px-4 py-2 text-sm rounded-full outline-none transition-all bg-[var(--bg-secondary)] border border-[var(--accent)] text-[var(--text)]"
                />
                <button type="button" onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)] transition-all">
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)] transition-all"
                aria-label="Search">
                <Search size={20} strokeWidth={1.8} />
              </button>
            )}

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={cycleTheme}
                className="p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)] transition-all"
                aria-label="Toggle theme">
                {theme === "light" && <Sun size={20} strokeWidth={1.8} />}
                {theme === "dark" && <Moon size={20} strokeWidth={1.8} />}
                {theme === "system" && <Monitor size={20} strokeWidth={1.8} />}
              </button>
            )}

            {/* Premium / Auth */}
            <button 
              onClick={() => setPremiumModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:opacity-80 transition-opacity ml-2"
            >
              <Crown size={14} /> Premium
            </button>

            {isLoggedIn && currentUser ? (
              <div className="relative ml-2">
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-all">
                  <img src={currentUser.avatar} alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover" />
                  <ChevronDown size={14} className="text-[var(--text-secondary)]" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden z-50 glass-panel">
                    <div className="px-4 py-4 border-b border-[var(--border)]">
                      <p className="text-sm font-bold truncate text-[var(--text)]">{currentUser.name}</p>
                      <p className="text-xs capitalize text-[var(--text-tertiary)] mt-1">{currentUser.role}</p>
                    </div>
                    <div className="py-2">
                      {[
                        { href: "/coming-soon", Icon: User, label: "My Profile" },
                        { href: "/coming-soon", Icon: BookMarked, label: "Saved Collections" },
                      ].map(({ href, Icon, label }) => (
                        <Link key={label} href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors">
                          <Icon size={16} className="text-[var(--text-tertiary)]" /> {label}
                        </Link>
                      ))}
                      <div className="my-2 border-t border-[var(--border)]" />
                      <button onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-[var(--bg-hover)] transition-colors">
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/coming-soon"
                className="hidden sm:inline-flex items-center justify-center text-sm font-bold text-[var(--text)] ml-2 py-2 px-4 rounded-full border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-all ml-1"
              aria-label="Menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pb-4 border-t border-[var(--border)] glass-panel rounded-b-2xl shadow-xl absolute w-full left-0">
          <nav className="px-4 pt-4 grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => {
              const active = pathname === `/category/${cat.toLowerCase()}`;
              return (
                <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all ${active ? 'text-[var(--accent)] bg-[var(--bg-hover)]' : 'text-[var(--text-secondary)] bg-[var(--bg-secondary)]'}`}>
                  {cat}
                </Link>
              );
            })}
          </nav>
          {!isLoggedIn && (
            <div className="px-4 pt-4 mt-2 border-t border-[var(--border)]">
              <Link href="/coming-soon" className="w-full flex items-center justify-center text-sm font-bold text-[var(--text)] py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
