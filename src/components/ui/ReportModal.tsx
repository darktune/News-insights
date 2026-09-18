"use client";

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { X, ShieldAlert, CheckCircle2, ChevronRight, AlertTriangle, Undo2 } from 'lucide-react';

const REPORT_REASONS = [
  { id: "misinformation", label: "False Information / Misinformation", desc: "Fabricated claims, altered facts, or misleading quotes" },
  { id: "hate_speech", label: "Hate Speech or Discrimination", desc: "Attacking ethnicity, religion, nationality, or identity" },
  { id: "violence", label: "Violence, Incitement, or Harm", desc: "Threats, encouraging unrest, or graphic content" },
  { id: "scam", label: "Financial Scam, Fraud, or Impersonation", desc: "Fake schemes, crypto fraud, or impersonating a public figure" },
  { id: "defamation", label: "Defamation or Personal Slander", desc: "Unverified attacks damaging reputations" },
  { id: "clickbait", label: "Spam, Clickbait, or Deceptive Headline", desc: "Exaggerated headlines with non-existent substance" },
  { id: "copyright", label: "Intellectual Property / Stolen Content", desc: "Uncredited imagery or pirated journalism" },
  { id: "other", label: "Something else", desc: "A different scenario not covered above" }
];

export default function ReportModal() {
  const { reportingArticle, closeReportModal, submitReport, undoHideArticle } = useAppStore();
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hasUndone, setHasUndone] = useState<boolean>(false);

  if (!reportingArticle) return null;

  const handleClose = () => {
    setIsSubmitted(false);
    setSelectedReason("");
    setDetails("");
    setHasUndone(false);
    closeReportModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    setSubmitting(true);
    setTimeout(() => {
      const reasonObj = REPORT_REASONS.find(r => r.id === selectedReason);
      submitReport(
        reportingArticle.id,
        reportingArticle.category,
        reasonObj?.label || selectedReason,
        details.trim() || undefined
      );
      setSubmitting(false);
      setIsSubmitted(true);
    }, 350);
  };

  const handleUndo = () => {
    undoHideArticle(reportingArticle.id);
    setHasUndone(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={handleClose} 
      />

      {/* Modal dialog box */}
      <div className="relative w-full max-w-lg glass-panel bg-[var(--bg)] rounded-3xl shadow-2xl overflow-hidden border border-[var(--border)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/50">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-500" />
            <h3 className="font-black text-sm uppercase tracking-wider text-[var(--text)]">Report News Story</h3>
          </div>
          <button 
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {!isSubmitted ? (
          /* Step 1: Instagram-style Reasons & Custom Scenario */
          <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="mb-5">
              <h4 className="text-lg font-black text-[var(--text)] mb-1">
                Why are you reporting this post?
              </h4>
              <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                Your report is anonymous. If you believe someone is in immediate physical danger, contact emergency services.
              </p>
            </div>

            {/* Target Article Snippet */}
            <div className="mb-4 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-start gap-2.5">
              <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                  Reporting Story
                </span>
                <p className="text-xs font-semibold text-[var(--text)] line-clamp-1">
                  {reportingArticle.title}
                </p>
              </div>
            </div>

            {/* Reasons List */}
            <div className="space-y-2 mb-5">
              {REPORT_REASONS.map((reason) => {
                const isSelected = selectedReason === reason.id;
                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-sm' 
                        : 'border-[var(--border)] hover:bg-[var(--bg-hover)]'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className={`text-sm font-bold leading-tight ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                        {reason.label}
                      </p>
                      <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                        {reason.desc}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border)]'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Scenario Explanation Box */}
            <div className="mb-6">
              <label htmlFor="report-details" className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                Provide additional details / explain scenario (optional):
              </label>
              <textarea
                id="report-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value.slice(0, 300))}
                placeholder="Tell our review desk what's wrong with this story..."
                className="w-full p-3.5 rounded-2xl text-sm bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] transition-all resize-none"
              />
              <div className="flex justify-end mt-1">
                <span className="text-[10px] font-medium text-[var(--text-tertiary)]">
                  {details.length}/300
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-full text-sm font-bold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedReason || submitting}
                className="flex-1 py-3 px-4 rounded-full text-sm font-black bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:hover:bg-red-600 text-white transition-all shadow-md shadow-red-600/20 text-center"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Instagram-style Confirmation & Action Screen */
          <div className="p-8 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-500/5">
              <CheckCircle2 size={36} strokeWidth={2.5} />
            </div>

            <h4 className="text-xl font-black text-[var(--text)] mb-2">
              Thanks for letting us know
            </h4>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6 leading-relaxed">
              Your report helps our newsroom uphold truth, credibility, and accuracy for millions of Nigerian readers.
            </p>

            <div className="bg-[var(--bg-secondary)] rounded-2xl p-4 mb-6 text-left border border-[var(--border)] space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{hasUndone ? "Story restored to your feed." : "This story has been removed from your feed."}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Forwarded to the Editorial Verification Desk for review.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Your recommendation feed will show less content of this type.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {!hasUndone ? (
                <button
                  type="button"
                  onClick={handleUndo}
                  className="w-full py-3 px-4 rounded-full text-sm font-bold border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg-hover)] transition-colors flex items-center justify-center gap-2"
                >
                  <Undo2 size={16} /> Undo (Unhide story)
                </button>
              ) : (
                <span className="text-xs text-emerald-500 font-bold">Story unhidden successfully</span>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-full text-sm font-black bg-[var(--accent)] text-[var(--bg)] hover:opacity-90 transition-opacity"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
