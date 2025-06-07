import { useState, useEffect } from 'react';
import axios from 'axios';
import { Comment, CommentClassificationResponse, SentimentStats } from '../utils/types';

interface CommentSentimentProps {
  comment: Comment;
  setStats: React.Dispatch<React.SetStateAction<SentimentStats>>;
  accessToken?: string;
}

export const CommentSentiment = ({ comment, setStats, accessToken }: CommentSentimentProps) => {
  const [sentiment, setSentiment] = useState<CommentClassificationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const classifyComment = async () => {
      try {
        setIsLoading(true);

        // Make API call to the new comment classification endpoint
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await axios.post<CommentClassificationResponse>(
          '/api/gateway/fastapi/comment-classification',
          { 
            commentId: comment.id,
            modelName: "default_model"
          },
          { headers }
        );

        const result = response.data;
        setSentiment(result);

        // Update the sentiment stats when we get a result
        setStats(prevStats => {
          // Increment the processed count
          const updatedStats = { ...prevStats, processed: prevStats.processed + 1 };

          // Increment the corresponding sentiment count based on the API response
          const sentimentValue = result.sentimentAnalysisResult.sentiment.toLowerCase();
          if (sentimentValue === 'positive') {
            updatedStats.positive += 1;
          } else if (sentimentValue === 'negative') {
            updatedStats.negative += 1;
          } else {
            updatedStats.neutral += 1;
          }

          return updatedStats;
        });
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
    if (comment && comment.id) {
      classifyComment();
    }
  }, [comment, setStats, accessToken]);

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
    return <div className="mt-2 text-sm text-red-500">{error}</div>;
  }

  if (!sentiment) return null;

  return (
    <div className="mt-2">
      <div className="flex flex-col items-center space-x-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(sentiment.sentimentAnalysisResult.sentiment.toLowerCase())}`}
        >
          {sentiment.sentimentAnalysisResult.sentiment.toUpperCase()}
        </span>
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <span className="font-medium mr-1">Confidence:</span>
            <span>{Math.round(sentiment.sentimentAnalysisResult.confidenceScore * 100)}%</span>
          </div>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <span className="font-medium mr-1">Positive:</span>
            <span>{Math.round(sentiment.sentimentAnalysisResult.positiveScore * 100)}%</span>
          </div>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <span className="font-medium mr-1">Negative:</span>
            <span>{Math.round(sentiment.sentimentAnalysisResult.negativeScore * 100)}%</span>
          </div>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            <span className="font-medium mr-1">Neutral:</span>
            <span>{Math.round(sentiment.sentimentAnalysisResult.neutralScore * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
