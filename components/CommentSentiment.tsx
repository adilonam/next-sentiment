import { useState, useEffect } from 'react';
import axios from 'axios';
import { CommentSentimentClassification } from '../utils/sentiment';

interface CommentSentimentProps {
  comment: string;
}

export const CommentSentiment = ({ comment }: CommentSentimentProps) => {
  const [sentiment, setSentiment] = useState<CommentSentimentClassification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const classifyComment = async () => {
      try {
        setIsLoading(true);
        
        // Make a direct API call to the comment classification endpoint
        const response = await axios.post<CommentSentimentClassification>(
          '/fast-api/comment-classification',
          { comment }
        );
        
        const result = response.data;
        setSentiment(result);
        
        // Dispatch a custom event when sentiment is processed
        const event = new CustomEvent('comment-sentiment-processed', {
          detail: {
            sentiment: result.sentiment,
            results: result.results,
            comment
          }
        });
        window.dispatchEvent(event);
      } catch (err) {
        console.error('Error classifying comment:', err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError('API endpoint not found');
          } else if (err.response?.status === 429) {
            setError('Too many requests, please try again later');
          } else {
            setError(`Error (${err.response?.status || 'unknown'}): Failed to analyze comment`);
          }
        } else {
          setError('Failed to analyze this comment');
        }
      } finally {
        setIsLoading(false);
      }
    };

    classifyComment();
  }, [comment]);

  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'neutral':
      default:
        return 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="mt-2 flex items-center space-x-2">
        <div className="animate-pulse h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 text-sm text-red-500">{error}</div>
    );
  }

  if (!sentiment) return null;

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(sentiment.sentiment)}`}>
          {sentiment.sentiment.toUpperCase()}
        </span>
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          {sentiment.results.map((result) => (
            <div key={result.label} className="flex items-center">
              <span className="font-medium mr-1">{result.label}:</span>
              <span>{Math.round(result.score * 100)}%</span>
              {result.rank < sentiment.results.length && <span className="mx-1">•</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
