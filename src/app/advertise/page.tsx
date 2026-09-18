import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { TrendingUp, Users, Target, Mail, ArrowRight, BarChart3, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advertise & Partner | ACHICHI Media Limited',
  description: 'Reach high-value Nigerian decision makers, business executives, founders, and policymakers with ACHICHI Media advertising solutions.',
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-3 block">
            Commercial Partnerships
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Connect with Nigeria’s Most Influential Minds
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            ACHICHI Media delivers authoritative journalism to executives, investors, senior civil servants, and civic leaders. Position your brand in an environment of credibility and high attention.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#solutions" className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity">
              Explore Solutions
            </a>
            <a href="mailto:advertising@achichimedia.com" className="px-8 py-3.5 rounded-full border border-[var(--border)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--bg-hover)] transition-colors">
              Request Media Kit
            </a>
          </div>
        </div>
      </section>

      {/* Audience Demographics */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2">The Readership</h2>
          <p className="text-3xl font-black">Who Reads ACHICHI Media?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { metric: "68%", label: "Senior Decision Makers", desc: "C-suite, directors, founders, and government officials." },
            { metric: "2.4M+", label: "Monthly Unique Readers", desc: "Highly engaged readers across Nigeria, UK, US, and Canada." },
            { metric: "4.8m", label: "Average Dwell Time", desc: "Our readers read long-form analysis, not fleeting clickbait." },
            { metric: "42%", label: "Newsletter Open Rate", desc: "Industry-leading engagement on our daily morning briefings." }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center">
              <p className="text-3xl sm:text-4xl font-black text-[var(--accent)] mb-2">{item.metric}</p>
              <h3 className="text-sm font-bold mb-1">{item.label}</h3>
              <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="border-y border-[var(--border)] bg-[var(--bg-secondary)]/30 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2">Our Capabilities</h2>
            <p className="text-3xl font-black">Advertising & Partnership Formats</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Sponsored Intelligence & Native Essays",
                desc: "Work with our dedicated commercial studio to publish authoritative thought-leadership essays and industry whitepapers clearly demarcated to maintain editorial credibility.",
                bullets: ["Promoted placement across home feeds", "Permanent archiving & SEO indexing", "Dedicated reader feedback & engagement reporting"]
              },
              {
                title: "Morning Briefing Newsletter Sponsorship",
                desc: "Place your message at the very top of our daily 6:00 AM intelligence email sent directly to verified subscribers, business executives, and diplomats.",
                bullets: ["Single sponsor exclusivity per edition", "Direct click tracking and audience verification", "High-conversion CTA placement"]
              },
              {
                title: "Live Audio/Video Room Presenting Partner",
                desc: "Align your organization with our live interactive discussions featuring ministers, tech innovators, and institutional leaders.",
                bullets: ["Verbal host acknowledgment at opening and conclusion", "Interactive pinned link in the live audio player", "Recorded session permanent re-broadcast branding"]
              },
              {
                title: "Targeted High-Impact Display & Category Takeovers",
                desc: "Own primary visual real estate across specific verticals like Politics, Business, Technology, or Energy.",
                bullets: ["Zero network ad clutter", "High viewability responsive formats", "100% brand-safe editorial context"]
              }
            ].map((sol, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
                <h3 className="text-xl font-bold">{sol.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{sol.desc}</p>
                <div className="pt-2 border-t border-[var(--border)] space-y-2">
                  {sol.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="p-10 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg-secondary)] space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black">Ready to build your bespoke campaign?</h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            Contact our commercial partnerships director to request our full rate card, custom audience segments, and case studies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:advertising@achichimedia.com?subject=Advertising%20Inquiry%20-%20ACHICHI%20Media"
              className="px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Mail size={16} /> Contact Advertising Desk
            </a>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-full border border-[var(--border)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--bg-hover)] transition-colors"
            >
              General Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
