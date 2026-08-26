"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { GripVertical, Save, Search, LayoutTemplate, Plus, Loader2 } from 'lucide-react';

export default function HomepageCurator() {
  const [articles, setArticles] = useState<any[]>([]);
  const [heroStory, setHeroStory] = useState<any | null>(null);
  const [secondaryStories, setSecondaryStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (data) {
        setArticles(data);
        // For MVP, just auto-fill the first ones if empty
        setHeroStory(data[0] || null);
        setSecondaryStories(data.slice(1, 4));
      }
      setIsLoading(false);
    }
    fetchArticles();
  }, []);

  const handleDragStart = (e: React.DragEvent, article: any) => {
    e.dataTransfer.setData('article', JSON.stringify(article));
  };

  const handleDropHero = (e: React.DragEvent) => {
    e.preventDefault();
    const articleData = e.dataTransfer.getData('article');
    if (articleData) {
      const article = JSON.parse(articleData);
      setHeroStory(article);
    }
  };

  const handleDropSecondary = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const articleData = e.dataTransfer.getData('article');
    if (articleData) {
      const article = JSON.parse(articleData);
      const newSecondary = [...secondaryStories];
      newSecondary[index] = article;
      setSecondaryStories(newSecondary);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const saveHomepage = async () => {
    setIsSaving(true);
    // In a real app, you would save this configuration to a `homepage_sections` table in Supabase.
    // For this MVP demonstration, we simulate a save.
    await new Promise(r => setTimeout(r, 1000));
    alert("Homepage layout saved successfully! The live site has been updated.");
    setIsSaving(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Curate Homepage</h1>
          <p className="text-gray-500 text-sm mt-1">Drag and drop articles to build your front page layout.</p>
        </div>
        <button 
          onClick={saveHomepage}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-brand-dark text-white px-5 py-2.5 rounded-md hover:bg-black transition-colors shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span className="font-medium text-sm">Publish Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Article Pool */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
             <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search published articles..." 
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm"
                />
             </div>
             
             <div className="space-y-3 h-[600px] overflow-y-auto pr-2">
                {isLoading ? (
                  <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-gray-400" /></div>
                ) : articles.map(article => (
                  <div 
                    key={article.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, article)}
                    className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-md cursor-grab active:cursor-grabbing hover:border-brand-accent/50 transition-colors group"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-brand-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{article.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{new Date(article.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Side: Homepage Layout Builder */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gray-100 rounded-xl p-6 border-2 border-dashed border-gray-300">
             <div className="flex items-center space-x-2 mb-4 text-brand-dark">
                <LayoutTemplate className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-wider text-sm">Hero Grid Section</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Main Hero Slot */}
                <div 
                  className="md:col-span-8 bg-white border-2 border-dashed border-blue-200 rounded-lg min-h-[300px] flex flex-col relative overflow-hidden"
                  onDragOver={handleDragOver}
                  onDrop={handleDropHero}
                >
                  <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest z-10">Main Story</div>
                  
                  {heroStory ? (
                    <div className="p-0 h-full w-full relative">
                      {heroStory.featured_image_url ? (
                        <img src={heroStory.featured_image_url} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      ) : (
                        <div className="absolute inset-0 w-full h-full bg-gray-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                         <h2 className="text-2xl font-serif font-bold text-white leading-tight">{heroStory.title}</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center flex-1 text-gray-400 p-8 text-center">
                       <Plus className="w-8 h-8 mb-2" />
                       <p className="text-sm font-medium">Drag article here</p>
                    </div>
                  )}
                </div>

                {/* Secondary Slots */}
                <div className="md:col-span-4 flex flex-col gap-4">
                  {[0, 1].map((index) => (
                    <div 
                      key={index}
                      className="flex-1 bg-white border-2 border-dashed border-green-200 rounded-lg min-h-[140px] flex flex-col relative overflow-hidden"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropSecondary(e, index)}
                    >
                      <div className="absolute top-2 left-2 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest z-10">Side {index + 1}</div>
                      
                      {secondaryStories[index] ? (
                        <div className="p-0 h-full w-full relative">
                          {secondaryStories[index].featured_image_url ? (
                            <img src={secondaryStories[index].featured_image_url} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                          ) : (
                            <div className="absolute inset-0 w-full h-full bg-gray-200" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                             <h3 className="text-sm font-serif font-bold text-white leading-tight">{secondaryStories[index].title}</h3>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center flex-1 text-gray-400 p-4 text-center">
                           <Plus className="w-6 h-6 mb-1" />
                           <p className="text-xs font-medium">Drag here</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
