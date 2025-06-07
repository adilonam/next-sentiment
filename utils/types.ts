export interface SentimentClassificationResult {
  rank: number;
  label: string;
  score: number;
}

export interface CommentSentimentClassification {
  results: SentimentClassificationResult[];
  sentiment: string;
  execution_time: number;
}

export interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  processed: number;
}

// Interface for the new API response
export interface Comment {
  id: string;
  content: string;
  author: string;
  url: string;
  publishDate: string;
  scrapedAt: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  confidenceScore: number;
  isProcessed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  keycloakId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Article {
  id: string;
  title: string;
  url: string;
  totalComments: number;
  scrapedAt: string;
  user: User;
}

export interface CommentResponse {
  status: string;
  message: string;
  article: Article;
  comments: Comment[];
  totalComments: number;
  timestamp: string;
}

// New types for comment classification API
export interface SentimentAnalysisResult {
  id: string;
  modelName: string;
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  confidenceScore: number;
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
  processedAt: string;
  createdAt: string;
}

export interface CommentClassificationResponse {
  status: string;
  message: string;
  comment: Comment;
  sentimentAnalysisResult: SentimentAnalysisResult;
  timestamp: string;
}

export interface CommentClassificationRequest {
  commentId: string;
  modelName: string;
}
