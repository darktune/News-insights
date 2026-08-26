"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// We initialize a server-side client here. 
// For real auth, we'd use @supabase/ssr, but we are keeping it simple for the MVP backend integration.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Note: In production, use SERVICE_ROLE key for admin actions if bypassing RLS
const supabase = createClient(supabaseUrl, supabaseKey);

export async function createArticle(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const isBreaking = formData.get('isBreaking') === 'true';
  const status = formData.get('action') === 'publish' ? 'published' : 'draft';

  // Basic slug generation
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const { data, error } = await supabase
    .from('articles')
    .insert([
      {
        title,
        slug,
        excerpt,
        content: JSON.stringify(content), // storing raw HTML string inside JSONB for now, or just as text
        category_id: category || null,
        is_breaking: isBreaking,
        status,
        // author_id: "your-uuid-here" // Required if you enforced RLS / foreign keys in the SQL exactly as written.
      }
    ])
    .select()
    .single();

  if (error) {
    console.error("Error inserting article:", error);
    throw new Error(error.message);
  }

  revalidatePath('/');
  revalidatePath('/admin');
  
  redirect('/admin');
}

export async function getLatestArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories ( name, slug, color )
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return data;
}
