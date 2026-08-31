"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Radio, Mic2 } from 'lucide-react';

export default function GlobalMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(35); // mock progress

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 glass-panel rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-[var(--border)] overflow-hidden transition-all duration-300">
      <div className="h-1 bg-[var(--bg-hover)] w-full relative cursor-pointer group">
        <div 
          className="absolute top-0 left-0 h-full bg-[var(--accent-green)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--accent-green)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>

      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-[var(--tag-bg)] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {isPlaying ? (
              <Radio size={20} className="text-[var(--accent)] animate-pulse" />
            ) : (
              <Mic2 size={20} className="text-[var(--text-tertiary)]" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[var(--text)] truncate">The Morning Briefing</span>
            <span className="text-xs text-[var(--text-secondary)] truncate">ACHIHI Radio (Live)</span>
          </div>
        </div>

        <div className="flex items-center gap-4 px-4">
          <button className="text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors">
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-[var(--text)] flex items-center justify-center text-[var(--bg)] hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
          <button className="text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors">
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>

        <div className="flex items-center border-l border-[var(--border)] pl-4">
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full text-[var(--text-tertiary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
