"use client";

import { useState } from "react";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapLink from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";
import {
  Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3,
  Link as LinkIcon, ImageIcon, Undo, Redo, Eye, Save, Send, PenSquare,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CATEGORIES } from "@/lib/mock-data";

const fieldCls = `
  w-full px-4 py-3 rounded-xl text-sm transition-all
  border border-gray-200 bg-white text-gray-900 placeholder-gray-400
  focus:outline-none focus:ring-2 focus:ring-[#1E88C7]/30 focus:border-[#1E88C7]/40
  dark:border-[#1a2744] dark:bg-[#08101c] dark:text-[#b8d4ec] dark:placeholder-[#2e4a68]
  dark:focus:ring-[#38bdf8]/15 dark:focus:border-[#38bdf8]/30
`;

export default function SubmitView() {
  const { isLoggedIn, currentUser } = useAppStore();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "saving" | "submitting" | "success">("idle");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Tell your story..." }),
      TipTapLink.configure({ openOnClick: false }),
      TipTapImage,
    ],
    editorProps: { attributes: { class: "focus:outline-none" } },
  });

  const notAuth = !isLoggedIn || !currentUser;
  const noAccess = currentUser?.role === "reader";

  if (notAuth || noAccess) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center
            bg-gray-100 dark:bg-[#0d1520] dark:border dark:border-[#1a2744]">
            <PenSquare size={24} className="text-gray-400 dark:text-[#3a5878]" />
          </div>
          <h2 className="text-lg font-black text-gray-900 dark:text-[#c8ddf0] mb-2">
            {notAuth ? "Sign in required" : "Contributor access required"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-[#3a5878] mb-5">
            {notAuth ? "Sign in to write and submit articles." : "Your account needs contributor access. Contact the ACHIHI Media team."}
          </p>
          {notAuth && (
            <Link href="/login" className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold text-white
              bg-[#0F2A4A] hover:bg-[#1a3a5c]
              dark:bg-transparent dark:border dark:border-[#38bdf8]/30 dark:text-[#38bdf8]
              dark:hover:bg-[#38bdf8]/8 dark:hover:shadow-[0_0_12px_rgba(56,189,248,0.12)]">
              Sign In
            </Link>
          )}
        </div>
      </div>
    );
  }

  const handleSaveDraft = () => {
    setSubmitStatus("saving");
    setTimeout(() => setSubmitStatus("idle"), 1500);
  };

  const handleSubmit = () => {
    if (!title.trim() || !category || !editor?.getText().trim()) {
      alert("Please fill in the title, category, and article body.");
      return;
    }
    setSubmitStatus("submitting");
    setTimeout(() => setSubmitStatus("success"), 1500);
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center
            bg-[#2E8B57]/10 dark:bg-transparent dark:border dark:border-[#34d399]/30
            dark:shadow-[0_0_20px_rgba(52,211,153,0.1)]">
            <Send size={26} className="text-[#2E8B57] dark:text-[#34d399]" />
          </div>
          <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-[#c8ddf0]">Submitted!</h2>
          <p className="text-gray-500 dark:text-[#3a5878] mb-6 text-sm">
            &ldquo;{title}&rdquo; is in the review queue. An editor will publish it shortly.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setSubmitStatus("idle"); setTitle(""); setCategory(""); setTags(""); setCoverImage(""); setExcerpt(""); editor?.commands.clearContent(); }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
                border border-gray-200 text-gray-700 hover:bg-gray-50
                dark:border-[#1a2744] dark:text-[#5a7898] dark:hover:bg-[#0d1520] dark:hover:text-[#a8c8e8]">
              Write Another
            </button>
            <Link href="/profile?tab=posts"
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-white
                bg-[#0F2A4A] hover:bg-[#1a3a5c]
                dark:bg-transparent dark:text-[#38bdf8] dark:border dark:border-[#38bdf8]/30
                dark:hover:bg-[#38bdf8]/8 dark:hover:shadow-[0_0_12px_rgba(56,189,248,0.1)]">
              My Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ToolbarBtn = ({ onClick, active, title: tip, children }: { onClick: () => void; active?: boolean; title: string; children: React.ReactNode }) => (
    <button type="button" onClick={onClick} title={tip}
      className={`p-2 rounded-lg transition-all ${
        active
          ? "bg-[#1E88C7]/15 text-[#1E88C7] dark:bg-[#38bdf8]/12 dark:text-[#38bdf8] dark:shadow-[0_0_8px_rgba(56,189,248,0.1)]"
          : "text-gray-500 dark:text-[#3a5878] hover:bg-gray-100 dark:hover:bg-[#0d1520] hover:text-gray-700 dark:hover:text-[#a8c8e8]"
      }`}>
      {children}
    </button>
  );

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-[#c8ddf0]">Write an Article</h1>
            <p className="text-sm mt-0.5 text-gray-500 dark:text-[#3a5878]">
              Submitting as{" "}
              <span className="font-semibold text-gray-700 dark:text-[#6888a8]">{currentUser.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
                previewMode
                  ? "bg-[#1E88C7] text-white border-[#1E88C7] dark:bg-[#38bdf8]/15 dark:text-[#38bdf8] dark:border-[#38bdf8]/40"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-[#1a2744] dark:text-[#5a7898] dark:hover:bg-[#0d1520] dark:hover:text-[#a8c8e8]"
              }`}>
              <Eye size={14} /> Preview
            </button>
            <button onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border transition-all
                border-gray-200 text-gray-600 hover:bg-gray-50
                dark:border-[#1a2744] dark:text-[#5a7898] dark:hover:bg-[#0d1520] dark:hover:text-[#a8c8e8]">
              <Save size={14} /> {submitStatus === "saving" ? "Saving…" : "Draft"}
            </button>
            <button onClick={handleSubmit} disabled={submitStatus === "submitting"}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50
                bg-[#2E8B57] text-white hover:bg-[#3dae72]
                dark:bg-transparent dark:text-[#34d399] dark:border dark:border-[#34d399]/30
                dark:hover:bg-[#34d399]/8 dark:hover:border-[#34d399]/60
                dark:hover:shadow-[0_0_12px_rgba(52,211,153,0.12)]">
              <Send size={14} /> {submitStatus === "submitting" ? "Sending…" : "Submit"}
            </button>
          </div>
        </div>

        {previewMode ? (
          /* Preview */
          <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-[#1a2744]
            bg-white dark:bg-[#0d1117]">
            {coverImage && (
              <div className="relative h-64 sm:h-96">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4
                dark:bg-[#0a1628] dark:text-[#38bdf8] dark:border dark:border-[#38bdf8]/20">
                {category || "Uncategorized"}
              </span>
              <h1 className="text-3xl font-black mb-4 text-gray-900 dark:text-[#c8ddf0]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {title || "Your headline here"}
              </h1>
              {excerpt && <p className="text-lg text-gray-500 dark:text-[#3a5878] mb-6 font-medium">{excerpt}</p>}
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100 dark:border-[#111c2e]">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-[#b8d4ec]">{currentUser.name}</p>
                  <p className="text-xs text-gray-400 dark:text-[#2e4a68]">Draft preview</p>
                </div>
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "<p>Your article content will appear here.</p>" }} />
            </div>
          </div>
        ) : (
          /* Edit mode */
          <div className="space-y-5">
            {/* Cover image */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Cover Image URL</label>
              <input type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/…" className={fieldCls} />
              {coverImage && (
                <img src={coverImage} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-xl
                  border border-gray-100 dark:border-[#1a2744]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              )}
            </div>

            {/* Category + Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Category *</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={fieldCls}>
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Tags (comma-separated)</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
                  placeholder="Lagos, Politics, Economy" className={fieldCls} />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Headline *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Write a compelling headline…"
                className={`${fieldCls} text-lg font-bold dark:text-[#c8ddf0]`} />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-[#2e4a68]">Excerpt / Summary</label>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary shown in card previews…" rows={2}
                className={`${fieldCls} resize-none`} />
            </div>

            {/* Rich text editor */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-[#1a2744]
              bg-white dark:bg-[#0d1117]
              dark:shadow-[0_0_0_1px_rgba(56,189,248,0.04)]">

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-0.5 px-3 py-2
                border-b border-gray-100 dark:border-[#111c2e]
                bg-gray-50 dark:bg-[#0a1220]">
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")} title="Bold"><Bold size={15} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")} title="Italic"><Italic size={15} /></ToolbarBtn>
                <div className="w-px h-4 bg-gray-200 dark:bg-[#1a2744] mx-1" />
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive("heading", { level: 2 })} title="H2"><Heading2 size={15} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive("heading", { level: 3 })} title="H3"><Heading3 size={15} /></ToolbarBtn>
                <div className="w-px h-4 bg-gray-200 dark:bg-[#1a2744] mx-1" />
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")} title="Bullet list"><List size={15} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")} title="Numbered list"><ListOrdered size={15} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")} title="Quote"><Quote size={15} /></ToolbarBtn>
                <div className="w-px h-4 bg-gray-200 dark:bg-[#1a2744] mx-1" />
                <ToolbarBtn onClick={() => { const u = prompt("URL:"); if (u) editor?.chain().focus().setLink({ href: u }).run(); }} active={editor?.isActive("link")} title="Link"><LinkIcon size={15} /></ToolbarBtn>
                <ToolbarBtn onClick={() => { const u = prompt("Image URL:"); if (u) editor?.chain().focus().setImage({ src: u }).run(); }} active={false} title="Image"><ImageIcon size={15} /></ToolbarBtn>
                <div className="flex-1" />
                <ToolbarBtn onClick={() => editor?.chain().focus().undo().run()} active={false} title="Undo"><Undo size={15} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor?.chain().focus().redo().run()} active={false} title="Redo"><Redo size={15} /></ToolbarBtn>
              </div>

              {/* Editor area */}
              <EditorContent editor={editor}
                className="min-h-[400px] px-5 py-4 text-gray-900 dark:text-[#9ab8d4] text-base" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
