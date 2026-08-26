import React from 'react';
import Link from 'next/link';

export function HeroGrid() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Featured Story */}
        <div className="lg:col-span-8 flex flex-col group">
          <Link href="/article/main-story" className="relative w-full h-[400px] lg:h-[500px] bg-brand-subtle/20 overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1546422904-90eab23c3d7e?auto=format&fit=crop&q=80&w=1200" 
              alt="News" 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 p-6 lg:p-8 z-20 text-white w-full">
              <span className="inline-block px-2 py-1 bg-brand-accent text-xs font-bold uppercase tracking-wider mb-3">Politics</span>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight mb-4 group-hover:text-brand-light transition-colors">
                New Economic Policies Unveiled as Government Aims to Curb Inflation
              </h2>
              <div className="flex items-center text-sm text-gray-300 space-x-4 font-sans">
                <span>By Adeola Omoniyi</span>
                <span>•</span>
                <span>2 hours ago</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Secondary Stories */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {[1, 2].map((item) => (
            <Link key={item} href={`/article/side-story-${item}`} className="flex-1 group relative bg-brand-subtle/10 overflow-hidden rounded-sm min-h-[200px]">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
               <img 
                  src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&sig=${item}`} 
                  alt="News" 
                  className="object-cover w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                />
               <div className="absolute bottom-0 left-0 p-4 z-20 text-white w-full">
                 <span className="text-xs font-bold uppercase tracking-wider text-brand-accent mb-2 block">Business</span>
                 <h3 className="text-xl font-serif font-bold leading-snug group-hover:text-gray-200 transition-colors">
                   Tech Hub Expansion Brings 10,000 New Jobs to Lagos
                 </h3>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
