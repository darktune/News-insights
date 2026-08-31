export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole?: string; // e.g. 'contributor', 'admin'
  content: string;
  timestamp: number;
  upvotes: number;
  downvotes: number;
  type: 'reply' | 'counterpoint';
  parentId: string | null;
  replies?: Comment[];
}

// Mock Insight Algorithm
// A comment gets a higher insight score if:
// 1. It is a 'counterpoint' (+20% weight)
// 2. The user is a contributor or admin (+30% weight)
// 3. It has a high upvote/downvote ratio
// 4. Content length is substantial (e.g. 100-500 chars) (+10% weight)
export function calculateInsightScore(comment: Comment): number {
  let score = comment.upvotes - comment.downvotes;
  
  if (score < 0) return 0; // Baseline

  // Role weighting
  if (comment.userRole === 'admin') score *= 1.5;
  else if (comment.userRole === 'contributor') score *= 1.3;

  // Type weighting
  if (comment.type === 'counterpoint') score *= 1.2;

  // Length weighting (ideal length 150-300 chars)
  const len = comment.content.length;
  if (len > 100 && len < 500) {
    score *= 1.1;
  }

  return Math.round(score);
}

export function sortCommentsByInsight(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => calculateInsightScore(b) - calculateInsightScore(a));
}
