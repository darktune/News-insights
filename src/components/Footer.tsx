"use client";

import Link from "next/link";
import AchihiLogo from "./AchihiLogo";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <AchihiLogo size={42} className="mb-4" />
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              ACHIHI Media Limited delivers credible, timely, and impactful news from across Nigeria.
              Rooted in truth, driven by the public interest.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {["𝕏", "f", "ig", "▶", <Mail key="mail" size={14} />].map((icon, i) => (
                <a key={i} href="#" aria-label={`Social ${i}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(29,155,240,0.15)"; (e.currentTarget as HTMLElement).style.color = "#1D9BF0"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4" style={{ color: "#1D9BF0" }}>Categories</h4>
            <ul className="space-y-2">
              {["National","Politics","Entertainment","Metro","Sport","Opinion","Business"].map((cat) => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase()}`}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-4" style={{ color: "#1D9BF0" }}>Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "#" },
                { label: "Contact", href: "#" },
                { label: "Advertise", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Write for Us", href: "/submit" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} ACHIHI Media Limited. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            RC: 1234567 · Lagos, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
