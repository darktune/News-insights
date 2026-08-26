"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Create Article</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm">
            Save Draft
          </button>
          <button className="flex items-center space-x-2 bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-brand-accent/90 transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            <span className="font-medium text-sm">Publish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Headline</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging headline..."
              className="w-full px-4 py-3 text-lg font-serif border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea 
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary for the homepage and SEO..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent shadow-sm font-sans resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Article Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Publish Settings</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-sm">
                <option value="">Select a category</option>
                <option value="politics">Politics</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-sm">
                <option value="user_id">Adeola Omoniyi</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
               <input type="checkbox" id="is_breaking" className="rounded text-brand-accent focus:ring-brand-accent w-4 h-4" />
               <label htmlFor="is_breaking" className="text-sm text-gray-700 font-medium">Mark as Breaking News</label>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Featured Image</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
               <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
               <span className="text-sm font-medium text-brand-accent">Click to upload</span>
               <span className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
