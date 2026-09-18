import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | ACHICHI Media Limited',
  description: 'Learn how ACHICHI Media Limited collects, protects, and handles user data in compliance with the Nigeria Data Protection Act (NDPA) and global privacy standards.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2 block">
            Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Effective Date: January 1, 2026 · Last Updated: August 2026 · Version 2.1
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-10 text-sm leading-relaxed text-[var(--text-secondary)]">
          
          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">1. Introduction</h2>
            <p className="mb-2">
              ACHICHI Media Limited ("ACHICHI", "we", "our", or "us") is dedicated to safeguarding the privacy and digital autonomy of our readers, subscribers, and contributors.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, and disclose information when you access our digital properties, website (<a href="https://news-insights-2026.vercel.app" className="text-[var(--accent)] underline">achichimedia.com</a>), mobile platforms, newsletters, and live audio/video discussion rooms, in compliance with the <strong>Nigeria Data Protection Act (NDPA 2023)</strong> and international data protection standards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">2. Information We Collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Information You Voluntarily Provide:</strong> Name, email address, profile biography, and preferences when registering an account, subscribing to our Morning Briefing, submitting guest op-eds, or entering live discussion rooms.</li>
              <li><strong>Authentication Data:</strong> When logging in via Google OAuth or Supabase Auth, we receive verified credentials and profile identifiers. We never store plain-text third-party passwords.</li>
              <li><strong>Usage & Telemetry Data:</strong> Reading interactions, dwell time, bookmark saves, topic likes/dislikes, and reporting submissions to dynamically tailor your personalized "For You" recommendation feed.</li>
              <li><strong>Technical Identifiers:</strong> IP addresses, browser types, device specifications, and cookie preferences used solely for platform security, anti-DDoS mitigation, and performance monitoring.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">3. How We Use Your Information</h2>
            <p className="mb-2">We process data under lawful bases (consent, legitimate interest, and contractual necessity) to:</p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Deliver verified news, breaking alert notifications, and morning executive briefings.</li>
              <li>Power our in-memory personalized recommendation engine (respecting down-ranks when you choose "Not interested").</li>
              <li>Protect the integrity of discussions by preventing spam, coordinated harassment, and bot manipulation.</li>
              <li>Verify patron memberships and enable closed-door audio/video room access.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">4. Zero Sale of Personal Data</h2>
            <p className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)]">
              <strong>Our Commitment:</strong> ACHICHI Media Limited does not sell, rent, or trade your personal data to third-party data brokers, political campaigns, or commercial advertisers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">5. Data Retention & Security</h2>
            <p className="mb-2">
              We employ strict industry-standard security protocols, including Row-Level Security (RLS) policies in PostgreSQL, TLS 1.3 encryption in transit, and role-based access control (RBAC). 
            </p>
            <p>
              Sensitive investigative source communications received via our whistleblower channels are handled under heightened operational security standards and isolated from general web analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">6. Your Rights Under NDPA</h2>
            <p className="mb-2">As an ACHICHI Media reader, you possess the legal right to:</p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Access and receive a portable copy of all data tied to your user profile.</li>
              <li>Request correction of inaccurate biographical or account information.</li>
              <li>Request total deletion of your profile, comment history, and account records ("Right to be Forgotten").</li>
              <li>Withdraw consent for marketing communications or personalized feed recommendations at any time.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">7. Contact the Data Protection Officer</h2>
            <p className="mb-3">
              For inquiries regarding this privacy charter or to execute your data rights, reach our Data Protection Officer:
            </p>
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-mono space-y-1">
              <p><strong>Officer:</strong> Office of the Data Protection Officer</p>
              <p><strong>Entity:</strong> ACHICHI Media Limited</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@achichimedia.com" className="text-[var(--accent)] underline">privacy@achichimedia.com</a></p>
              <p><strong>Address:</strong> Plot 14, Adeola Odeku Street, Victoria Island, Lagos, Nigeria</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
