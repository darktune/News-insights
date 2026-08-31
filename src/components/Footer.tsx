"use client";

import Link from "next/link";
import AchihiLogo from "./AchihiLogo";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <AchihiLogo size={42} className="mb-4" />
            <p className="text-sm leading-relaxed max-w-sm text-[var(--text-secondary)]">
              ACHIHI Media Limited delivers credible, timely, and impactful news from across Nigeria.
              Rooted in truth, driven by the public interest.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: "𝕏", label: "Twitter", href: "/coming-soon" },
                { icon: "f", label: "Facebook", href: "/coming-soon" },
                { icon: "ig", label: "Instagram", href: "/coming-soon" },
                { icon: "▶", label: "YouTube", href: "/coming-soon" },
                { icon: <Mail key="mail" size={14} />, label: "Email", href: "mailto:contact@achihi.media" }
              ].map((item, i) => (
                <Link key={i} href={item.href} aria-label={item.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all bg-[var(--tag-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--accent)] hover:text-[var(--bg)]">
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4 text-[var(--text)]">Categories</h4>
            <ul className="space-y-2">
              {["National","Politics","Entertainment","Metro","Sport","Opinion","Business"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`}
                    className="text-sm transition-colors text-[var(--text-secondary)] hover:text-[var(--accent)]">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4 text-[var(--text)]">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/coming-soon" },
                { label: "Contact", href: "/coming-soon" },
                { label: "Advertise", href: "/coming-soon" },
                { label: "Careers", href: "/coming-soon" },
                { label: "Write for Us", href: "/coming-soon" },
                { label: "Privacy Policy", href: "/coming-soon" },
                { label: "Terms of Service", href: "/coming-soon" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm transition-colors text-[var(--text-secondary)] hover:text-[var(--accent)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} ACHIHI Media Limited. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-tertiary)]">
            RC: 1234567 · Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
