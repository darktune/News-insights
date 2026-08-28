"use client";

import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // In a full production app, you would save this to a "subscribers" table in Supabase
    // For this MVP, we will simulate a successful subscription network request
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing! You will receive our next edition.');
      setEmail('');
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="bg-brand-subtle/10 border border-brand-subtle/20 p-8 rounded-xl flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-900">You're on the list!</h3>
        <p className="text-gray-600 font-sans text-sm max-w-sm">
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark p-8 md:p-12 rounded-xl text-white shadow-2xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-accent opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
            The news that matters, <br/><span className="text-brand-accent">straight to your inbox.</span>
          </h3>
          <p className="text-gray-300 font-sans max-w-md text-sm md:text-base">
            Join 50,000+ readers who receive our award-winning journalism, exclusive interviews, and daily briefings.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex-1 max-w-md">
          <form onSubmit={subscribe} className="flex flex-col space-y-3">
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 font-sans focus:outline-none focus:ring-4 focus:ring-brand-accent/50 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-brand-accent hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span>Subscribe Now</span>
              )}
            </button>
            {status === 'error' && (
              <p className="text-red-300 text-xs text-center font-medium mt-2">{message}</p>
            )}
            <p className="text-xs text-gray-400 text-center font-sans mt-2">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
