import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Author, Article } from "./mock-data";

export type EventType = 'LIKE' | 'SAVE' | 'SHARE' | 'READ' | 'NOT_INTERESTED' | 'REPORT';

export interface UserEvent {
  articleId: string;
  category: string;
  type: EventType;
  timestamp: number;
}

interface AppState {
  // Auth
  currentUser: (Author & { email: string; role?: string }) | null;
  isLoggedIn: boolean;
  login: (user: Author & { email: string; role?: string }) => void;
  logout: () => void;

  // Interactions & Recommendations Engine
  likedArticles: string[]; // persisted as array
  savedArticles: string[];
  hiddenArticles: string[]; // Not interested / Reported
  eventLog: UserEvent[];
  
  // Actions
  toggleLike: (articleId: string, category: string) => void;
  toggleSave: (articleId: string, category: string) => void;
  trackEvent: (articleId: string, category: string, type: EventType) => void;
  hideArticle: (articleId: string, category: string, type: 'NOT_INTERESTED' | 'REPORT') => void;

  // UI state
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  premiumModalOpen: boolean;
  setPremiumModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isLoggedIn: false,

      login: (user) => set({ currentUser: user, isLoggedIn: true }),
      logout: () => set({ currentUser: null, isLoggedIn: false }),

      likedArticles: [],
      savedArticles: [],
      hiddenArticles: [],
      eventLog: [],

      trackEvent: (articleId, category, type) => {
        set((state) => ({
          eventLog: [...state.eventLog, { articleId, category, type, timestamp: Date.now() }].slice(-1000) // Keep last 1000 events
        }));
      },

      toggleLike: (id, category) => {
        const { likedArticles, trackEvent } = get();
        const isLiked = likedArticles.includes(id);
        
        if (!isLiked) trackEvent(id, category, 'LIKE');

        set({
          likedArticles: isLiked ? likedArticles.filter(a => a !== id) : [...likedArticles, id]
        });
      },

      toggleSave: (id, category) => {
        const { savedArticles, trackEvent } = get();
        const isSaved = savedArticles.includes(id);
        
        if (!isSaved) trackEvent(id, category, 'SAVE');

        set({
          savedArticles: isSaved ? savedArticles.filter(a => a !== id) : [...savedArticles, id]
        });
      },

      hideArticle: (id, category, type) => {
        const { hiddenArticles, trackEvent } = get();
        trackEvent(id, category, type);
        if (!hiddenArticles.includes(id)) {
          set({ hiddenArticles: [...hiddenArticles, id] });
        }
      },

      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      premiumModalOpen: false,
      setPremiumModalOpen: (open) => set({ premiumModalOpen: open }),
    }),
    {
      name: 'achihi-storage',
    }
  )
);

// High-Performance In-Memory Recommendation Engine
export function getRecommendedFeed(allArticles: Article[], store: AppState, limit: number = 20): Article[] {
  const { eventLog, hiddenArticles } = store;
  
  // Filter out hidden/reported
  let candidates = allArticles.filter(a => !hiddenArticles.includes(a.id));

  // Build User Interest Profile based on events (decay could be added here)
  const categoryScores: Record<string, number> = {};
  
  eventLog.forEach(event => {
    const weight = {
      'LIKE': 3,
      'SAVE': 5,
      'SHARE': 4,
      'READ': 1,
      'NOT_INTERESTED': -5,
      'REPORT': -10
    }[event.type] || 0;

    categoryScores[event.category] = (categoryScores[event.category] || 0) + weight;
  });

  // Score articles
  const scoredArticles = candidates.map(article => {
    let score = 0;
    
    // Base freshness score (newer is better)
    const hoursOld = (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60);
    const freshnessScore = Math.max(0, 100 - hoursOld); 
    score += freshnessScore * 0.1;

    // Personalization score
    const userCategoryAffinity = categoryScores[article.category] || 0;
    score += userCategoryAffinity * 2;

    // Popularity score
    score += Math.log10(article.views + 1) * 0.5;

    return { article, score };
  });

  // Sort by final score descending
  scoredArticles.sort((a, b) => b.score - a.score);

  return scoredArticles.slice(0, limit).map(s => s.article);
}
