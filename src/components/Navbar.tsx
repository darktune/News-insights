"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun, Moon, Search, User, Menu, X, ChevronDown,
  PenSquare, LogOut, Settings, BookMarked,
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
  const { mobileMenuOpen, setMobileMenuOpen, isLoggedIn, currentUser, logout } = useAppStore();

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

  /* token shortcuts */
  const navBg = scrolled ? "backdrop-blur-xl" : "";

  return (
    <>
      {/* ── Breaking ticker ── */}
      <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
        className="text-xs py-1.5 overflow-hidden">
        <div className="flex items-center gap-3 max-w-7xl mx-auto px-4">
          <span className="flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
            style={{ background: "var(--accent)", color: "#fff" }}>
            LIVE
          </span>
          <div className="overflow-hidden flex-1">
            <span className="ticker-text inline-block" style={{ color: "var(--text-secondary)" }}>
              Senate passes ₦2.4 Trillion Infrastructure Bill &nbsp;·&nbsp;
              Super Eagles thrash Ghana 3-0 &nbsp;·&nbsp;
              Nigerian artist breaks Spotify streaming record &nbsp;·&nbsp;
              Naira strengthens to ₦1,450 per dollar &nbsp;·&nbsp;
              D&apos;Tigress retain AfroBasket title &nbsp;·&nbsp;
              Lagos flooding displaces 12,000 residents &nbsp;·&nbsp;
            </span>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <header
        className={`sticky top-0 z-50 ${navBg} transition-all duration-200`}
        style={{
          background: scrolled ? "rgba(var(--bg-rgb, 255,255,255), 0.92)" : "var(--bg)",
          boxShadow: "var(--shadow-nav)",
        }}
      >
        {/* actual bg for scroll blur */}
        <div className="absolute inset-0 -z-10" style={{ background: "var(--bg)" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-[57px] gap-3">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 mr-2">
              <AchihiLogo size={36} />
            </Link>

            {/* Category nav — desktop */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1">
              {CATEGORIES.map((cat) => {
                const active = pathname === `/category/${cat.toLowerCase()}`;
                return (
                  <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                    className="relative px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150"
                    style={{
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      background: active ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}>
                    {cat}
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                        style={{ background: "var(--accent)" }} />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1 ml-auto">

              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-1">
                  <input autoFocus type="text" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stories…"
                    className="w-44 sm:w-56 px-3 py-1.5 text-sm rounded-full outline-none transition-all"
                    style={{
                      background: "var(--bg-secondary)",
                      border: "1.5px solid var(--accent)",
                      color: "var(--text)",
                    }} />
                  <button type="button" onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-full transition-all"
                    style={{ color: "var(--text-secondary)" }}>
                    <X size={17} />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full transition-all"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  aria-label="Search">
                  <Search size={20} strokeWidth={1.8} />
                </button>
              )}

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full transition-all"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  aria-label="Toggle theme">
                  {theme === "dark" ? <Sun size={20} strokeWidth={1.8} /> : <Moon size={20} strokeWidth={1.8} />}
                </button>
              )}

              {/* Auth */}
              {isLoggedIn && currentUser ? (
                <div className="relative ml-1">
                  <button onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full transition-all"
                    style={{ border: "1.5px solid var(--border)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    <img src={currentUser.avatar} alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover" />
                    <ChevronDown size={13} style={{ color: "var(--text-secondary)" }} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                      style={{ background: "var(--bg)", boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 0 0 1px var(--border)" }}>
                      <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
                        <p className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{currentUser.name}</p>
                        <p className="text-xs capitalize" style={{ color: "var(--text-tertiary)" }}>{currentUser.role}</p>
                      </div>
                      <div className="py-1">
                        {[
                          { href: "/profile", Icon: User, label: "My Profile" },
                          { href: "/profile?tab=saved", Icon: BookMarked, label: "Saved Articles" },
                          ...(currentUser.role === "contributor" || currentUser.role === "admin"
                            ? [{ href: "/submit", Icon: PenSquare, label: "Write Article" }] : []),
                          ...(currentUser.role === "admin"
                            ? [{ href: "/admin", Icon: Settings, label: "Admin Panel" }] : []),
                        ].map(({ href, Icon, label }) => (
                          <Link key={label} href={href}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-all"
                            style={{ color: "var(--text)" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                            <Icon size={15} style={{ color: "var(--text-tertiary)" }} /> {label}
                          </Link>
                        ))}
                        <div style={{ borderTop: "1px solid var(--border)", margin: "4px 0" }} />
                        <button onClick={logout}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium text-red-500 transition-all"
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login"
                  className="btn-primary hidden sm:inline-flex text-sm ml-1 py-1.5 px-4">
                  Sign In
                </Link>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full transition-all ml-1"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                aria-label="Menu">
                {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-3" style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
            <nav className="px-4 pt-3 grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => {
                const active = pathname === `/category/${cat.toLowerCase()}`;
                return (
                  <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                    className="px-3 py-2.5 rounded-full text-sm font-semibold text-center transition-all"
                    style={{
                      color: active ? "var(--accent)" : "var(--text-secondary)",
                      background: active ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "var(--bg-secondary)",
                    }}>
                    {cat}
                  </Link>
                );
              })}
            </nav>
            {!isLoggedIn && (
              <div className="px-4 pt-3">
                <Link href="/login" className="btn-primary w-full justify-center text-sm">
                  Sign In / Register
                </Link>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}
