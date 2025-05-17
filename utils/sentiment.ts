

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