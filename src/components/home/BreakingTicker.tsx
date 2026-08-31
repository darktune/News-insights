"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const MOCK_BREAKING_NEWS = [
  "CBN Announces New Foreign Exchange Policy Guidelines",
  "Tech Startup 'Flutterwave' Announces Expansion into East Africa",
  "Super Eagles Secure Qualification for Upcoming AFCON Tournament",
];

export function BreakingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_BREAKING_NEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="w-full bg-[var(--bg-secondary)] border-b border-[var(--border)] py-2 overflow-hidden transition-colors">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center space-x-2 mr-4 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse shadow-[0_0_8px_var(--accent-green)]"></span>
          <span className="text-xs font-black tracking-widest uppercase text-[var(--accent-green)]">Live</span>
        </div>
        
        <div 
          className="flex-1 relative h-6 overflow-hidden flex items-center cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(!isPaused)}
          onClick={() => setIsPaused(!isPaused)}
          title="Click to pause/resume"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full text-[var(--text)] hover:underline"
            >
              <Link href="/coming-soon">
                {MOCK_BREAKING_NEWS[currentIndex]} {isPaused && <span className="ml-2 text-[var(--text-tertiary)] text-xs">(Paused)</span>}
              </Link>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
