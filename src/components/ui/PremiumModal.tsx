"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, ArrowRight, Check, Radio, FileText, Shield, CheckCircle2 } from 'lucide-react';
import AchihiLogo from '@/components/AchihiLogo';

export default function PremiumModal() {
  const { premiumModalOpen, setPremiumModalOpen } = useAppStore();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  if (!premiumModalOpen) return null;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setPremiumModalOpen(false);
      }, 1600);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Background Dimmed Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={() => setPremiumModalOpen(false)}
      />

      {/* Main Modal Window — Built on Editorial Design & HCI Hierarchy */}
      <div className="relative w-full max-w-xl my-6 bg-zinc-950 text-zinc-100 rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setPremiumModalOpen(false)}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={17} />
        </button>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          
          {/* Brand & Kicker */}
          <div className="flex items-center gap-3 mb-5">
            <AchihiLogo size={32} showWordmark={false} />
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-bold text-zinc-400">
                ACHICHI ALL-ACCESS
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Patron Membership
              </span>
            </div>
          </div>

          {/* Headline & Mission */}
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2 leading-tight">
            Independent Journalism. <br className="hidden sm:inline" />
            Zero Compromise.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mb-6">
            Support fearless, fact-driven Nigerian reporting. Unlock closed-door leadership briefings, executive research intelligence, and an ad-free reading experience.
          </p>

          {/* Plan Selector — HCI: Distinct choice architecture with purposeful accent for Recommended Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Annual Plan (Recommended) */}
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`p-4 rounded-2xl border transition-all text-left relative cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-zinc-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Annual Pass
                </span>
                {/* Intentional use of yellow accent for highest-value recommendation */}
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Save 31%
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-black text-white">₦2,416</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                ₦29,000 billed annually. Cancel anytime.
              </p>

              {/* Radio Indicator */}
              <div className="absolute bottom-4 right-4">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  billingCycle === 'annual' ? 'border-amber-400 bg-amber-400' : 'border-zinc-700'
                }`}>
                  {billingCycle === 'annual' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
                </div>
              </div>
            </button>

            {/* Monthly Plan */}
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`p-4 rounded-2xl border transition-all text-left relative cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-zinc-900 border-zinc-400 shadow-md'
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 text-zinc-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Monthly Pass
                </span>
                <span className="text-[10px] text-zinc-500 font-mono uppercase">
                  Flexible
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-black text-white">₦3,500</span>
                <span className="text-xs text-zinc-400">/ month</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Billed monthly. Auto-renews.
              </p>

              {/* Radio Indicator */}
              <div className="absolute bottom-4 right-4">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  billingCycle === 'monthly' ? 'border-zinc-300 bg-zinc-300' : 'border-zinc-700'
                }`}>
                  {billingCycle === 'monthly' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
                </div>
              </div>
            </button>
          </div>

          {/* Membership Privileges — Clean, scannable editorial list with neutral indicators */}
          <div className="mb-8 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
              Included in your patron access:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { 
                  icon: <Radio size={15} className="text-zinc-300" />,
                  title: "Closed-Door Leadership Briefings",
                  desc: "Join real-time audio and video sessions with editors, economists, and public leaders."
                },
                { 
                  icon: <FileText size={15} className="text-zinc-300" />,
                  title: "Daily Morning Intelligence",
                  desc: "Concise 6:00 AM dossiers breaking down markets, political developments, and policy."
                },
                { 
                  icon: <Shield size={15} className="text-zinc-300" />,
                  title: "Ad-Free Reading Experience",
                  desc: "Zero commercial ads across web articles, feeds, and live audio radio streams."
                },
                { 
                  icon: <Check size={15} className="text-zinc-300" />,
                  title: "Verified Reader Badge & Pitching",
                  desc: "Direct editorial submission queue for opinion columns and verified discussion standing."
                }
              ].map((privilege, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-zinc-800 text-zinc-300 flex-shrink-0 mt-0.5">
                    {privilege.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200 mb-0.5">{privilege.title}</h4>
                    <p className="text-[11px] text-zinc-400 leading-snug">{privilege.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Trust Actions — Purposeful focal point using ArrowRight instead of generic Sparkles */}
          <div className="space-y-3 pt-1">
            <button 
              type="button"
              disabled={isProcessing || subscribed}
              onClick={handleSubscribe}
              className="group w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Activating Your Access...</span>
              ) : subscribed ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={17} strokeWidth={2.5} className="text-zinc-950" />
                  Membership Active
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Continue with {billingCycle === 'annual' ? 'Annual Pass (₦29,000 / Year)' : 'Monthly Pass (₦3,500 / Month)'}</span>
                  <ArrowRight size={16} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-500 pt-2">
              <span>Instant activation</span>
              <span>·</span>
              <span>Cancel online in 1 click</span>
              <span>·</span>
              <span>14-day refund guarantee</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
