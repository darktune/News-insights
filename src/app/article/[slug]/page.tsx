import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Share2, MessageSquare, Bookmark } from 'lucide-react';

export default function ArticlePage({ params }: { params: { slug: string } }) {
  return (
    <article className="min-h-screen bg-brand-light">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
            <Link href="/category/politics" className="text-brand-accent font-bold text-xs uppercase tracking-wider hover:underline">
              Politics
            </Link>
            <span className="text-brand-subtle text-xs">•</span>
            <span className="text-brand-subtle text-xs font-sans">5 min read</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight text-brand-dark mb-6">
            New Economic Policies Unveiled as Government Aims to Curb Inflation
          </h1>
          
          <p className="text-xl lg:text-2xl font-serif text-gray-600 mb-8 leading-snug max-w-3xl">
            The Central Bank outlines a comprehensive strategy to stabilize the currency and boost domestic production in Q3.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 border-y border-brand-subtle/20 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Author" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-brand-dark">Adeola Omoniyi</p>
                <p className="text-xs text-brand-subtle font-sans">Senior Correspondent</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-brand-subtle/20"></div>
            <div className="text-sm font-sans text-brand-subtle text-center sm:text-left">
              <p>Published: August 26, 2026</p>
              <p>Updated: 2 hours ago</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="max-w-5xl mx-auto mb-12">
          <div className="aspect-video w-full bg-gray-100 rounded-sm overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1546422904-90eab23c3d7e?auto=format&fit=crop&q=80&w=1200" 
              alt="Central Bank building" 
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="text-sm font-sans text-brand-subtle mt-3 text-center lg:text-left">
            The Central Bank headquarters in Abuja. (Photo: Oriental Times / File)
          </figcaption>
        </figure>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 relative">
          {/* Sticky Social Share (Desktop) */}
          <aside className="hidden lg:flex flex-col space-y-4 w-12 sticky top-24 h-fit">
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors shadow-sm">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#4267B2] hover:border-[#4267B2] transition-colors shadow-sm">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors shadow-sm">
              <Linkedin className="w-4 h-4" />
            </button>
            <div className="w-10 h-px bg-gray-200 my-2"></div>
            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-dark hover:border-brand-dark transition-colors shadow-sm">
              <Bookmark className="w-4 h-4" />
            </button>
          </aside>

          {/* Article Body */}
          <div className="flex-1 prose prose-lg md:prose-xl font-serif text-gray-800 leading-relaxed max-w-[65ch] mx-auto lg:mx-0">
            <p>
              <strong>ABUJA</strong> — In a sweeping move aimed at stabilizing the nation's economy, the Federal Government today announced a series of new monetary and fiscal policies. The comprehensive framework, detailed by the Central Bank Governor, focuses on curbing rising inflation and encouraging local manufacturing.
            </p>
            
            <p>
              The announcement comes at a critical time for the administration, which has faced mounting pressure from labor unions and the private sector regarding the rising cost of living.
            </p>

            <h2>Focus on Domestic Production</h2>
            <p>
              At the core of the new policy is a significant intervention fund designed to provide single-digit interest loans to manufacturers in key sectors, notably agriculture, textiles, and technology. 
            </p>

            <blockquote className="border-l-4 border-brand-accent pl-6 italic text-gray-600 my-8">
              "We can no longer afford to outsource our consumption. A nation of our size must produce what it consumes. These policies are not just reactive; they are foundational to the new Nigerian economy."
            </blockquote>

            <p>
              Industry experts have cautiously welcomed the move. The Manufacturers Association has stated that while the intervention is timely, the structural challenges of power and infrastructure must be addressed concurrently to realize any meaningful gains.
            </p>
            
            <p>
              Market reaction was immediate, with the stock exchange seeing a slight bump in industrial goods equities within an hour of the announcement.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
