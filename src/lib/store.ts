import { create } from "zustand";
import { Author } from "./mock-data";

interface AppState {
  // Auth
  currentUser: (Author & { email: string }) | null;
  isLoggedIn: boolean;
  login: (user: Author & { email: string }) => void;
  logout: () => void;

  // Liked / saved articles
  likedArticles: Set<string>;
  savedArticles: Set<string>;
  toggleLike: (articleId: string) => void;
  toggleSave: (articleId: string) => void;

  // UI state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  isLoggedIn: false,

  login: (user) => set({ currentUser: user, isLoggedIn: true }),
  logout: () => set({ currentUser: null, isLoggedIn: false }),

  likedArticles: new Set(),
  savedArticles: new Set(),

  toggleLike: (id) => {
    const liked = new Set(get().likedArticles);
    if (liked.has(id)) liked.delete(id);
    else liked.add(id);
    set({ likedArticles: liked });
  },

  toggleSave: (id) => {
    const saved = new Set(get().savedArticles);
    if (saved.has(id)) saved.delete(id);
    else saved.add(id);
    set({ savedArticles: saved });
  },

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
