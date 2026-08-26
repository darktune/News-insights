import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-light text-brand-dark flex flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-serif font-bold tracking-tight mb-4">
        Oriental Times
      </h1>
      <p className="text-xl font-sans text-brand-subtle max-w-2xl text-center">
        A premium Nigerian digital newsroom that feels like a modern editorial publication.
      </p>
      
      <div className="mt-12 flex items-center space-x-4 border-t border-brand-subtle/20 pt-8 w-full max-w-2xl">
         <span className="text-sm font-bold tracking-widest uppercase">Breaking</span>
         <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
         <p className="text-sm">Oriental Times Enters a New Digital Era.</p>
      </div>
    </main>
  );
}
