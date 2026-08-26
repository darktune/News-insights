"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_BREAKING_NEWS = [
  "CBN Announces New Foreign Exchange Policy Guidelines",
  "Tech Startup 'Flutterwave' Announces Expansion into East Africa",
  "Super Eagles Secure Qualification for Upcoming AFCON Tournament",
];

export function BreakingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_BREAKING_NEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-brand-dark text-white py-2 overflow-hidden border-b-4 border-brand-accent">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center space-x-2 mr-4 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
          <span className="text-xs font-bold tracking-widest uppercase">Breaking</span>
        </div>
        
        <div className="flex-1 relative h-6 overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full"
            >
              {MOCK_BREAKING_NEWS[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
