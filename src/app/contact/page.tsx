"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone, ShieldCheck, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'editorial',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <section className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-3 block">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Contact ACHICHI Media
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have a news tip, partnership inquiry, correction request, or question? Our editors and correspondents are ready to listen.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Direct Contacts & Bureaus */}
          <div className="space-y-8">
            
            {/* Whistleblower & Anonymous Tips */}
            <div className="p-6 rounded-3xl border-2 border-amber-500/30 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-3 text-amber-500">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-black text-sm uppercase tracking-wider">Confidential News Tip Line</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                We protect confidential sources. For sensitive government or corporate whistleblower leaks, reach out via our encrypted channels:
              </p>
              <div className="space-y-2 text-xs font-mono">
                <p><strong className="text-[var(--text)]">Signal:</strong> +234 814 000 7890</p>
                <p><strong className="text-[var(--text)]">Encrypted Email:</strong> tips@achichimedia.com</p>
                <p className="text-[10px] text-[var(--text-tertiary)] pt-1">PGP Fingerprint: 4B82 A0CF 485B B8DE 122F</p>
              </div>
            </div>

            {/* Bureaus */}
            <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest text-[var(--accent)] mb-2 flex items-center gap-1.5">
                  <MapPin size={14} /> Lagos Headquarters
                </h4>
                <p className="text-sm font-semibold text-[var(--text)]">ACHICHI Media Limited</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Plot 14, Adeola Odeku Street, Victoria Island,<br />
                  Lagos State, Nigeria
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <h4 className="font-black text-xs uppercase tracking-widest text-[var(--accent)] mb-2 flex items-center gap-1.5">
                  <MapPin size={14} /> Abuja Political Bureau
                </h4>
                <p className="text-sm font-semibold text-[var(--text)]">National Assembly & Policy Desk</p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  3rd Floor, Transcorp Hilton Complex, Maitama,<br />
                  Abuja, Federal Capital Territory
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-4 space-y-2 text-xs text-[var(--text-secondary)]">
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-[var(--accent)]" />
                  <span>General: <a href="mailto:contact@achichimedia.com" className="hover:underline text-[var(--text)]">contact@achichimedia.com</a></span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-[var(--accent)]" />
                  <span>Newsroom: +234 1 888 2400</span>
                </p>
              </div>
            </div>

          </div>

          {/* Right 2 Columns: Contact Form */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black mb-1">Send a Message</h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Our team typically responds within 24 business hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Ngozi Adeleke"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-all cursor-pointer"
                    >
                      <option value="editorial">Editorial Desk & Corrections</option>
                      <option value="tips">News Tip & Whistleblower</option>
                      <option value="advertising">Advertising & Partnerships</option>
                      <option value="press">Press & Media Inquiries</option>
                      <option value="careers">Careers & Submissions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief topic summary"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-[var(--text-secondary)]">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide detailed information regarding your inquiry..."
                    className="w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] text-sm outline-none focus:border-[var(--accent)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send size={15} /> Send Message
                </button>
              </form>
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black mb-2">Message Dispatched</h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
                  Thank you for contacting ACHICHI Media Limited. Your message has been routed to the <strong>{formData.department}</strong> desk.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-[var(--border)] text-xs font-bold uppercase tracking-wider hover:bg-[var(--bg-hover)] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
