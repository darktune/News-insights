import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Eye, Award, Users, Globe2, ArrowRight } from 'lucide-react';
import AchihiLogo from '@/components/AchihiLogo';

export const metadata: Metadata = {
  title: 'About Us | ACHICHI Media Limited',
  description: 'Learn about ACHICHI Media Limited — our mission, editorial charter, newsroom leadership, and journalistic standards across Nigeria.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero Header */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[var(--accent)] text-[var(--bg)] mb-6">
            Editorial Charter
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Rooted in Truth. <br />
            Driven by the Public Interest.
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed font-normal">
            ACHICHI Media Limited is an independent Nigerian digital news and intelligence organization. We produce rigorous, non-partisan reporting that holds power accountable, illuminates complex realities, and empowers citizens.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2">Our Foundation</h2>
          <p className="text-2xl sm:text-3xl font-black">The Journalism We Stand For</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="w-6 h-6 text-amber-500" />,
              title: "Absolute Independence",
              desc: "Our editorial decisions are made solely by journalists. We accept no political funding, government subsidies, or sponsor influence that compromises our reporting."
            },
            {
              icon: <Eye className="w-6 h-6 text-blue-500" />,
              title: "Rigorous Verification",
              desc: "We verify claims with multi-source documentary evidence, on-the-ground reporting, and expert peer analysis before publishing any story."
            },
            {
              icon: <Award className="w-6 h-6 text-emerald-500" />,
              title: "Civic Accountability",
              desc: "Our primary constituency is the Nigerian public. We investigate public spending, governance failures, corporate conduct, and human rights violations."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsroom By The Numbers */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)]/30 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-[var(--accent)] mb-1">36 + FCT</p>
              <p className="text-xs uppercase tracking-wider font-bold text-[var(--text-secondary)]">States Covered</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[var(--accent)] mb-1">45+</p>
              <p className="text-xs uppercase tracking-wider font-bold text-[var(--text-secondary)]">Full-Time Reporters</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[var(--accent)] mb-1">2.4M</p>
              <p className="text-xs uppercase tracking-wider font-bold text-[var(--text-secondary)]">Monthly Readers</p>
            </div>
            <div>
              <p className="text-4xl font-black text-[var(--accent)] mb-1">100%</p>
              <p className="text-xs uppercase tracking-wider font-bold text-[var(--text-secondary)]">Independent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Process & Bureaus */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2">Our Presence</h2>
            <h3 className="text-3xl font-black mb-4">Lagos Headquarters & Abuja Bureau</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              With our central newsroom on Victoria Island in Lagos and an active political bureau in the Federal Capital Territory, Abuja, ACHICHI Media is positioned at the intersection of commerce, technology, and national policy.
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Our regional correspondents report from Kano, Port Harcourt, Enugu, Ibadan, Maiduguri, and Jos, delivering nuanced regional perspectives that reflect Nigeria’s rich diversity.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider">Our Standards at a Glance</h4>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] font-bold">✓</span>
                <span><strong>No Sensationalism:</strong> Headlines must accurately reflect article contents without deceptive clickbait.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Transparent Corrections:</strong> Any factual error is immediately corrected with a transparent editor note.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)] font-bold">✓</span>
                <span><strong>Source Protection:</strong> We defend the confidentiality of anonymous sources who provide vital public-interest leaks.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl p-8 bg-[var(--text)] text-[var(--bg)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-black mb-1">Want to join our mission?</h4>
            <p className="text-sm opacity-80">Explore open editorial and technical roles in our newsroom.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/careers" className="px-6 py-3 rounded-full bg-[var(--bg)] text-[var(--text)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity">
              View Careers
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-full border border-white/30 text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors">
              Contact Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
