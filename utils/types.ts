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

// Interface for the API response
export interface CommentResponse {
  comments: string[];
  total_comments: number;
}
