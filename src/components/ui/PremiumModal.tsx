"use client";

import React from 'react';
import { useAppStore } from '@/lib/store';
import { X, Crown, Check, Sparkles } from 'lucide-react';

export default function PremiumModal() {
  const { premiumModalOpen, setPremiumModalOpen } = useAppStore();

  if (!premiumModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setPremiumModalOpen(false)}
      />
      <div className="relative w-full max-w-lg glass-panel bg-[var(--bg)] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-8 text-center relative overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg)]">
          <div className="absolute top-0 right-0 p-4">
            <button 
              onClick={() => setPremiumModalOpen(false)}
              className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="mx-auto w-16 h-16 bg-[var(--accent)] rounded-2xl flex items-center justify-center text-[var(--bg)] mb-6 shadow-lg shadow-[var(--accent)]/20">
            <Crown size={32} />
          </div>
          
          <h2 className="text-3xl font-black mb-3 text-[var(--text)] tracking-tight">Unlock ACHIHI Premium</h2>
          <p className="text-[var(--text-secondary)] text-sm px-4">
            Get exclusive access to private video rooms, deep research briefings, and advanced algorithmic curation.
          </p>
        </div>

        {/* Features List */}
        <div className="px-8 py-6 space-y-4 border-t border-[var(--border)]">
          {[
            { title: "Exclusive Video Rooms", desc: "Join closed-door AMA sessions with industry leaders." },
            { title: "Personalized Research Briefings", desc: "Daily AI summaries of niche markets." },
            { title: "Ad-Free Ecosystem", desc: "Zero interruptions across articles, radio, and video." },
            { title: "Advanced Recommendation Control", desc: "Fine-tune your algorithm explicitly." }
          ].map((feat, i) => (
            <div key={i} className="flex gap-4">
              <div className="mt-0.5 w-6 h-6 rounded-full bg-[var(--accent-green)]/10 text-[var(--accent-green)] flex items-center justify-center flex-shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text)]">{feat.title}</h4>
                <p className="text-xs text-[var(--text-tertiary)]">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action */}
        <div className="p-8 pt-4">
          <button 
            className="w-full py-4 rounded-full bg-[var(--accent)] text-[var(--bg)] font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Upgrade Now
          </button>
          <p className="text-center text-[11px] text-[var(--text-tertiary)] mt-4">
            Cancel anytime. Subscription renews automatically.
          </p>
        </div>

      </div>
    </div>
  );
}
