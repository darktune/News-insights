"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { UploadCloud, Image as ImageIcon, Search, Trash2, X, Loader2 } from 'lucide-react';

export default function MediaLibrary() {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch images from Supabase Storage
  const fetchImages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from('media').list();
    
    if (error) {
      console.error('Error fetching images:', error);
    } else {
      // Filter out any hidden system files like .emptyFolderPlaceholder
      const validImages = data?.filter(file => file.name !== '.emptyFolderPlaceholder') || [];
      
      // Get public URLs for each image
      const imagesWithUrls = validImages.map(file => {
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(file.name);
        return {
          ...file,
          publicUrl
        };
      });
      setImages(imagesWithUrls.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) {
        alert(`Error uploading ${file.name}: ${uploadError.message}`);
      }
    }
    
    setIsUploading(false);
    fetchImages(); // Refresh gallery
  };

  const deleteImage = async (fileName: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    const { error } = await supabase.storage.from('media').remove([fileName]);
    
    if (error) {
      alert(`Error deleting image: ${error.message}`);
    } else {
      fetchImages();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and upload images for your articles.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search images..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent shadow-sm text-sm"
            />
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center relative hover:bg-gray-50 transition-colors">
        <input 
          type="file" 
          multiple 
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        {isUploading ? (
          <div className="flex flex-col items-center text-brand-accent">
             <Loader2 className="w-10 h-10 mb-4 animate-spin" />
             <p className="text-lg font-medium">Uploading images...</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Click or drag images to upload</h3>
            <p className="text-sm text-gray-500">Supports JPG, PNG, WEBP, AVIF (Max 5MB each)</p>
          </>
        )}
      </div>

      {/* Gallery */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">All Media</h3>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Your media library is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {images.map((img) => (
              <div key={img.name} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img 
                  src={img.publicUrl} 
                  alt={img.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <button 
                      onClick={() => deleteImage(img.name)}
                      className="p-1.5 bg-white/20 hover:bg-red-500 rounded-md text-white transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-white text-xs font-medium truncate w-full" title={img.name}>
                    {img.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
