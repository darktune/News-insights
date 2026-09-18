import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Author, Article } from "./mock-data";

export type EventType = 'LIKE' | 'DISLIKE' | 'SAVE' | 'REPOST' | 'SHARE' | 'READ' | 'NOT_INTERESTED' | 'REPORT';

export interface UserEvent {
  articleId: string;
  category: string;
  type: EventType;
  timestamp: number;
}

export interface ReportSubmission {
  articleId: string;
  articleTitle?: string;
  reason: string;
  details?: string;
  timestamp: number;
}

interface AppState {
  // Auth
  currentUser: (Author & { email: string; role?: string }) | null;
  isLoggedIn: boolean;
  login: (user: Author & { email: string; role?: string }) => void;
  logout: () => void;

  // Interactions & Recommendations Engine
  likedArticles: string[];
  dislikedArticles: string[];
  repostedArticles: string[];
  savedArticles: string[];
  hiddenArticles: string[]; // Not interested / Reported
  reportSubmissions: ReportSubmission[];
  eventLog: UserEvent[];

  // Reporting Modal UI State
  reportingArticle: { id: string; title: string; category: string } | null;
  openReportModal: (article: { id: string; title: string; category: string }) => void;
  closeReportModal: () => void;
  submitReport: (articleId: string, category: string, reason: string, details?: string) => void;
  undoHideArticle: (articleId: string) => void;
  
  // Actions
  toggleLike: (articleId: string, category: string) => void;
  toggleDislike: (articleId: string, category: string) => void;
  toggleRepost: (articleId: string, category: string) => void;
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
      dislikedArticles: [],
      repostedArticles: [],
      savedArticles: [],
      hiddenArticles: [],
      reportSubmissions: [],
      eventLog: [],

      reportingArticle: null,
      openReportModal: (article) => set({ reportingArticle: article }),
      closeReportModal: () => set({ reportingArticle: null }),

      submitReport: (articleId, category, reason, details) => {
        const { hiddenArticles, reportSubmissions, trackEvent, reportingArticle } = get();
        trackEvent(articleId, category, 'REPORT');
        
        const submission: ReportSubmission = {
          articleId,
          articleTitle: reportingArticle?.title,
          reason,
          details,
          timestamp: Date.now()
        };

        const updatedHidden = hiddenArticles.includes(articleId) 
          ? hiddenArticles 
          : [...hiddenArticles, articleId];

        set({
          hiddenArticles: updatedHidden,
          reportSubmissions: [...reportSubmissions, submission],
        });
      },

      undoHideArticle: (articleId) => {
        const { hiddenArticles, reportSubmissions } = get();
        set({
          hiddenArticles: hiddenArticles.filter(id => id !== articleId),
          reportSubmissions: reportSubmissions.filter(r => r.articleId !== articleId)
        });
      },

      trackEvent: (articleId, category, type) => {
        set((state) => ({
          eventLog: [...state.eventLog, { articleId, category, type, timestamp: Date.now() }].slice(-1000)
        }));
      },

      toggleLike: (id, category) => {
        const { likedArticles, dislikedArticles, trackEvent } = get();
        const isLiked = likedArticles.includes(id);
        
        if (!isLiked) {
          trackEvent(id, category, 'LIKE');
          set({
            likedArticles: [...likedArticles, id],
            dislikedArticles: dislikedArticles.filter(a => a !== id)
          });
        } else {
          set({
            likedArticles: likedArticles.filter(a => a !== id)
          });
        }
      },

      toggleDislike: (id, category) => {
        const { likedArticles, dislikedArticles, trackEvent } = get();
        const isDisliked = dislikedArticles.includes(id);

        if (!isDisliked) {
          trackEvent(id, category, 'DISLIKE');
          set({
            dislikedArticles: [...dislikedArticles, id],
            likedArticles: likedArticles.filter(a => a !== id)
          });
        } else {
          set({
            dislikedArticles: dislikedArticles.filter(a => a !== id)
          });
        }
      },

      toggleRepost: (id, category) => {
        const { repostedArticles, trackEvent } = get();
        const isReposted = repostedArticles.includes(id);

        if (!isReposted) {
          trackEvent(id, category, 'REPOST');
          set({
            repostedArticles: [...repostedArticles, id]
          });
        } else {
          set({
            repostedArticles: repostedArticles.filter(a => a !== id)
          });
        }
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

  // Build User Interest Profile based on events
  const categoryScores: Record<string, number> = {};
  
  eventLog.forEach(event => {
    const weight: Record<string, number> = {
      'LIKE': 3,
      'DISLIKE': -4,
      'REPOST': 6,
      'SAVE': 5,
      'SHARE': 4,
      'READ': 1,
      'NOT_INTERESTED': -5,
      'REPORT': -10
    };

    categoryScores[event.category] = (categoryScores[event.category] || 0) + (weight[event.type] || 0);
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
