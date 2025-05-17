import { useState, useEffect } from 'react';

interface SentimentStats {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
  processed: number;
}

interface LiveSentimentStatsProps {
  comments: string[];
}

export const LiveSentimentStats = ({ comments }: LiveSentimentStatsProps) => {
  const [stats, setStats] = useState<SentimentStats>({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
    processed: 0
  });

  // Listen to a custom event fired when a comment is processed
  useEffect(() => {
    const handleSentimentProcessed = (event: CustomEvent) => {
      const { sentiment } = event.detail;
      
      setStats(prev => {
        const newStats = { ...prev };
        newStats[sentiment.toLowerCase() as 'positive' | 'neutral' | 'negative']++;
        newStats.processed++;
        return newStats;
      });
    };

    // Create a type-safe event listener
    const typedEventListener = (e: Event) => {
      if (e instanceof CustomEvent) {
        handleSentimentProcessed(e);
      }
    };

    window.addEventListener('comment-sentiment-processed', typedEventListener);
    
    // Set total comments
    setStats(prev => ({
      ...prev,
      total: comments.length
    }));

    return () => {
      window.removeEventListener('comment-sentiment-processed', typedEventListener);
    };
  }, [comments.length]);

  const getProgressPercentage = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.processed / stats.total) * 100);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-sentiment-text dark:text-white mb-3">
        Live Sentiment Analysis
      </h3>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">Processing comments</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{stats.processed} of {stats.total}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-sentiment-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg text-center">
          <div className="text-green-800 dark:text-green-300 text-lg font-bold">{stats.positive}</div>
          <div className="text-sm text-green-700 dark:text-green-400">Positive</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-center">
          <div className="text-gray-800 dark:text-gray-300 text-lg font-bold">{stats.neutral}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Neutral</div>
        </div>
        <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-lg text-center">
          <div className="text-red-800 dark:text-red-300 text-lg font-bold">{stats.negative}</div>
          <div className="text-sm text-red-700 dark:text-red-400">Negative</div>
        </div>
      </div>
    </div>
  );
};
