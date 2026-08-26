"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboarding } from '@/components/providers/OnboardingProvider';
import { X, ArrowRight, ArrowLeft, Mail, Newspaper, Zap, CheckCircle2 } from 'lucide-react';

export function OnboardingModal() {
  const { isOpen, closeOnboarding, step, nextStep, prevStep } = useOnboarding();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={closeOnboarding}
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <button 
            onClick={closeOnboarding}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center text-center space-y-6 pt-4"
                >
                  <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-2">Welcome to Oriental Times</h2>
                    <p className="text-gray-600 font-sans text-sm">Join the new era of Nigerian digital media. To interact with our stories—like, comment, or save—you need a free account.</p>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center text-center space-y-6 pt-4"
                >
                  <div className="w-16 h-16 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-2">Engage & Shape the News</h2>
                    <p className="text-gray-600 font-sans text-sm">Your interactions curate our trending section. Bookmark stories to read offline, and join the conversation in our moderated comments.</p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center text-center space-y-6 pt-4"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="w-full">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-2">Create Your Account</h2>
                    <p className="text-gray-600 font-sans text-sm mb-6">It only takes one click to join the newsroom.</p>
                    
                    <button className="w-full flex items-center justify-center space-x-3 bg-brand-dark text-white py-3 px-4 rounded-md hover:bg-black/80 transition-colors font-medium mb-3">
                       <Mail className="w-5 h-5" />
                       <span>Continue with Email</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-4">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[1, 2, 3].map((dot) => (
                <div key={dot} className={`h-1.5 rounded-full transition-all duration-300 ${step === dot ? 'w-4 bg-brand-accent' : 'w-1.5 bg-gray-300'}`} />
              ))}
            </div>
            
            <div className="flex space-x-2">
              {step > 1 && (
                <button onClick={prevStep} className="p-2 text-gray-500 hover:bg-gray-200 rounded-md transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              {step < 3 ? (
                <button onClick={nextStep} className="flex items-center space-x-2 bg-brand-dark text-white px-4 py-2 rounded-md hover:bg-black/80 transition-colors text-sm font-medium">
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={closeOnboarding} className="flex items-center space-x-2 bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-brand-accent/90 transition-colors text-sm font-medium">
                  <span>Done</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
