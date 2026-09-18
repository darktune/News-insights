import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { PenTool, CheckCircle2, XCircle, Mail, Send, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Write for Us & Pitch Guidelines | ACHICHI Media Limited',
  description: 'Guidelines for freelance journalists, policy experts, academics, and thought leaders looking to publish essays or investigative reporting with ACHICHI Media.',
};

export default function WriteForUsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-3 block">
            Guest Submissions & Op-Eds
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Share Your Voice with Nigeria and the World
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed">
            ACHICHI Media welcomes outside perspectives from economists, researchers, civic activists, technologists, and freelance journalists. Here is how to pitch your writing to our editorial board.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        
        {/* What We Look For / Do Not Look For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What We Want */}
          <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-bold text-base uppercase tracking-wider">What We Seek</h3>
            </div>
            <ul className="space-y-3 text-sm text-[var(--text)]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-500">·</span>
                <span><strong>Original Arguments:</strong> Fresh, provocative insights on politics, macroeconomics, tech policy, and Nigerian social dynamics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-500">·</span>
                <span><strong>Data & Documentary Evidence:</strong> Claims backed by credible primary data, legal documents, or field observations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-500">·</span>
                <span><strong>Nuance & Independence:</strong> Writing that refuses simple partisan talking points and tackles complex trade-offs honestly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-500">·</span>
                <span><strong>Length:</strong> 800 to 1,200 words for op-eds; up to 3,500 words for commissioned investigative features.</span>
              </li>
            </ul>
          </div>

          {/* What We Reject */}
          <div className="p-8 rounded-3xl border border-red-500/30 bg-red-500/5 space-y-4">
            <div className="flex items-center gap-2 text-red-500">
              <XCircle className="w-5 h-5" />
              <h3 className="font-bold text-base uppercase tracking-wider">What We Reject</h3>
            </div>
            <ul className="space-y-3 text-sm text-[var(--text)]">
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-500">·</span>
                <span><strong>Corporate PR & Self-Promotion:</strong> Pitches designed to market a specific product, investment scheme, or client.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-500">·</span>
                <span><strong>Unsubstantiated Smears:</strong> Character attacks or allegations lacking documentary evidence.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-500">·</span>
                <span><strong>Simultaneous Submissions:</strong> We require exclusive first-run digital publication rights in Nigeria.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-500">·</span>
                <span><strong>Undisclosed Conflicts:</strong> Failure to declare financial, advisory, or political ties to the subject matter.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* How to Pitch Guide */}
        <div className="p-8 sm:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
          <h2 className="text-2xl font-black">How to Pitch Us</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            Please do not send full manuscript attachments as unsolicited documents. Instead, send an email pitch containing:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-bold block mb-1">1. The One-Line Thesis</span>
              <p className="text-[var(--text-secondary)]">What exact counter-intuitive claim or argument does your essay make?</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-bold block mb-1">2. The Timeliness Anchor</span>
              <p className="text-[var(--text-secondary)]">Why must this story be published now? What news peg does it connect to?</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-bold block mb-1">3. The Reporting & Sources</span>
              <p className="text-[var(--text-secondary)]">What data, interview subjects, or primary documents support your argument?</p>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
              <span className="text-[var(--accent)] font-bold block mb-1">4. Your Bio & Disclosures</span>
              <p className="text-[var(--text-secondary)]">Your professional expertise and any affiliations related to the topic.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">
                Our opinion editor reviews pitches within <strong>48 business hours</strong>.
              </p>
            </div>
            <a 
              href="mailto:submissions@achichimedia.com?subject=Pitch:%20[Your%20Proposed%20Headline]"
              className="px-8 py-3.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Mail size={15} /> Send Pitch to submissions@achichimedia.com
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}
