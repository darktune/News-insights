import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | ACHICHI Media Limited',
  description: 'Terms of Service, community discussion guidelines, intellectual property rules, and reader agreements for ACHICHI Media Limited.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-2 block">
            Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Effective Date: January 1, 2026 · Last Updated: August 2026 · Version 2.1
          </p>
        </div>
      </section>

      {/* Terms Body */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-10 text-sm leading-relaxed text-[var(--text-secondary)]">
          
          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, reading, or creating an account on ACHICHI Media properties (<a href="https://news-insights-2026.vercel.app" className="text-[var(--accent)] underline">achichimedia.com</a>) or participating in live audio/video discussion rooms, you confirm your acceptance of and agreement to be bound by these Terms of Service. If you disagree with any portion of these terms, you must refrain from using the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">2. Intellectual Property & Fair Use</h2>
            <p className="mb-2">
              All reporting, original investigative dossiers, opinion essays, photography, brand identity, and software components appearing on ACHICHI Media are the exclusive intellectual property of ACHICHI Media Limited or licensed contributors.
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li><strong>Fair Use Quotations:</strong> Brief excerpts (up to 75 words) may be cited in academic, journalistic, or civic discourse, provided full visible attribution and a direct hyperlink to the original ACHICHI Media article are included.</li>
              <li><strong>Prohibited Scraping:</strong> Automated scraping, large language model training data ingestion without commercial licensing, or unauthorized republication of entire articles is strictly prohibited.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">3. Reader Discussions & Civic Conduct</h2>
            <p className="mb-2">
              ACHICHI Media fosters rigorous, intellectually honest debate through our nested discussion and counterpoint architecture. To maintain public trust:
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>You may not publish hate speech, ethnic discrimination, religious intolerance, or incitement to violence.</li>
              <li>Defamatory statements, unverified personal attacks, or doxxing of private citizens will result in immediate permanent banning.</li>
              <li>Our algorithm calculates an <em>Insight Score</em> that elevates constructive, evidence-based counterpoints while demoting bad-faith trolling.</li>
              <li>Readers can report violations through our multi-step reporting desk, which triggers human editorial inspection.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">4. Patron Subscriptions & Billing</h2>
            <p className="mb-2">
              Certain features (such as closed-door leadership rooms and daily AI executive digests) may require an <strong>ACHICHI Privé</strong> patron membership.
            </p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Memberships are billed in Nigerian Naira (₦) on either an annual or monthly renewal basis.</li>
              <li>You may cancel recurring subscriptions at any time through your profile settings or by notifying support. Cancellation takes effect at the end of the current paid billing cycle.</li>
              <li>Annual passes include a 14-day refund guarantee from the original date of purchase if requested in writing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">5. Disclaimer of Financial, Legal, and Medical Advice</h2>
            <p>
              All reporting, market analyses, and opinion columns published on ACHICHI Media are provided solely for journalistic and educational purposes. Nothing published constitutes professional investment, tax, legal, or medical advice. Readers must consult certified professional advisers before making major financial commitments.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>. Any legal dispute or claim arising out of these terms shall be submitted to the exclusive jurisdiction of the competent courts sitting in Lagos State, Nigeria.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)]">
            <h2 className="text-xl font-bold text-[var(--text)] mb-3">7. Contact the Legal Desk</h2>
            <p className="mb-2">
              For questions regarding intellectual property syndication or legal notices, contact:
            </p>
            <p className="text-xs font-mono text-[var(--text)]">
              Legal Department, ACHICHI Media Limited · <a href="mailto:legal@achichimedia.com" className="text-[var(--accent)] underline">legal@achichimedia.com</a>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
