"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, Sparkles, Check, Radio, Headphones, ShieldCheck, Zap, Lock, CreditCard } from 'lucide-react';
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
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Dimmed backdrop with deep ambient blur */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-opacity" 
        onClick={() => setPremiumModalOpen(false)}
      />

      {/* Obsidian & Gold Luxury Shell */}
      <div className="relative w-full max-w-xl my-8 bg-zinc-950 text-white rounded-[2.5rem] shadow-[0_20px_90px_-20px_rgba(234,179,8,0.3)] border border-amber-500/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Gold Radial Aurora Highlight */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(245,158,11,0.3),rgba(0,0,0,0))] pointer-events-none" />

        {/* Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={() => setPremiumModalOpen(false)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative z-10">
          
          {/* Header Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-yellow-500/20 border border-amber-400/40 text-amber-300 flex items-center gap-1.5 shadow-sm">
              <Sparkles size={11} className="text-amber-300" />
              ACHICHI PRIVÉ · TIER 01
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            The Executive Media Pass
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mb-6">
            Step beyond standard reporting. Experience uncompromised journalism, private intelligence rooms, and institutional-grade digests.
          </p>

          {/* Bespoke Digital VIP Membership Card Visual */}
          <div className="relative rounded-2xl p-5 mb-6 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-amber-500/30 shadow-xl">
            {/* Background Watermark Pattern */}
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
              <AchihiLogo size={180} showWordmark={false} />
            </div>

            <div className="flex items-start justify-between mb-8 relative z-10">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-amber-400 font-bold block mb-1">
                  ACHICHI PRIVÉ BLACK CARD
                </span>
                <p className="text-xs font-semibold text-zinc-300 tracking-wide">
                  Verified Executive Patron
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-mono font-bold">
                <CreditCard size={12} />
                <span>NFC LIVE</span>
              </div>
            </div>

            <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/5">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Member ID</p>
                <p className="text-xs font-mono font-bold text-zinc-300">ACH-2026-8842</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Status</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Active Access
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Billing Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-zinc-900/80 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`p-3.5 rounded-xl transition-all text-left relative ${
                billingCycle === 'annual' 
                  ? 'bg-zinc-800 border border-amber-500/40 text-white shadow-lg' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div className="absolute top-2.5 right-2.5">
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-zinc-950 tracking-wider">
                  Save 31%
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-0.5">Annual Pass</p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white">₦29,000</span>
                <span className="text-[11px] text-zinc-400">/year</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">~₦2,416/mo billed annually</p>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`p-3.5 rounded-xl transition-all text-left ${
                billingCycle === 'monthly' 
                  ? 'bg-zinc-800 border border-amber-500/40 text-white shadow-lg' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-0.5">Monthly Pass</p>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-black text-white">₦3,500</span>
                <span className="text-[11px] text-zinc-400">/month</span>
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Flexible monthly renewal</p>
            </button>
          </div>

          {/* Bespoke Privilege Matrix */}
          <div className="space-y-3 mb-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">
              Patron Privileges Included
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Radio size={16} className="text-amber-400" />, title: "Closed-Door Rooms", desc: "Private audio/video Q&As with policymakers & tech founders." },
                { icon: <Zap size={16} className="text-amber-400" />, title: "Daily AI Briefing", desc: "Institutional summaries of markets & political movements at 6 AM." },
                { icon: <ShieldCheck size={16} className="text-amber-400" />, title: "Ad-Free Ecosystem", desc: "Zero banner or sponsor interruptions across web & audio." },
                { icon: <Lock size={16} className="text-amber-400" />, title: "Direct Editorial Pitch", desc: "VIP contact line to authors & exclusive investigative drafts." },
              ].map((privilege, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-900/50 border border-white/5 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 flex-shrink-0 mt-0.5">
                    {privilege.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white mb-0.5">{privilege.title}</h5>
                    <p className="text-[11px] text-zinc-400 leading-snug">{privilege.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Trust Actions */}
          <div className="space-y-3">
            <button 
              type="button"
              disabled={isProcessing || subscribed}
              onClick={handleSubscribe}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-black text-sm uppercase tracking-widest shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Activating Privé Pass...</span>
              ) : subscribed ? (
                <span className="flex items-center gap-1.5"><Check size={18} strokeWidth={3} /> Activated Successfully!</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles size={16} />
                  Join ACHICHI Privé ({billingCycle === 'annual' ? '₦29,000 / Year' : '₦3,500 / Month'})
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 pt-1">
              <span>✓ Cancel anytime in 1 tap</span>
              <span>·</span>
              <span>✓ 14-day refund policy</span>
              <span>·</span>
              <span>✓ Instant access</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
