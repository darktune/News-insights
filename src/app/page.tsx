import React from 'react';
import { BreakingTicker } from '@/components/home/BreakingTicker';
import { HeroGrid } from '@/components/home/HeroGrid';

export default function Home() {
  return (
    <>
      <BreakingTicker />
      <main className="min-h-screen bg-brand-light text-brand-dark">
        <HeroGrid />
        
        {/* Latest News & Sections will go here */}
        <section className="container mx-auto px-4 py-8">
          <div className="border-t-2 border-brand-dark pt-4 mb-8">
            <h3 className="text-2xl font-serif font-bold uppercase tracking-tight">Latest News</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col group cursor-pointer">
                <div className="aspect-[4/3] bg-brand-subtle/20 mb-4 overflow-hidden rounded-sm">
                  <div className="w-full h-full bg-brand-subtle/30 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">Technology</span>
                <h4 className="text-lg font-serif font-bold leading-tight group-hover:text-brand-subtle transition-colors">
                  New Policy Shifts Digital Identity Registration Deadline
                </h4>
                <span className="text-xs text-brand-subtle mt-2 font-sans">3 hours ago</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
