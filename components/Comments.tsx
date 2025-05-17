import { useEffect, useState } from 'react';
import { CommentSentiment } from './CommentSentiment';
import { SentimentStats } from '@/utils/types';

interface CommentsProps {
  comments: string[];
  setStats: React.Dispatch<React.SetStateAction<SentimentStats>>;
}

export const Comments = ({ comments, setStats }: CommentsProps) => {
  const [visibleComments, setVisibleComments] = useState<string[]>([]);

  useEffect(() => {
    // Reset visible comments when new comments array is received
    setVisibleComments([]);

    // Add comments one by one with a delay
    comments.forEach((comment, index) => {
      setTimeout(() => {
        setVisibleComments(prev => [...prev, comment]);
      }, index * 800); // 800ms delay between each comment
    });
  }, [comments]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-sentiment-text dark:text-white mb-4">
        Scraped Comments
      </h3>
      <div className="space-y-4 h-[300px] overflow-y-auto pr-2">
        {visibleComments.map((comment, index) => (
          <div
            key={index}
            className="text-sentiment-text dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in transition-all duration-300"
          >
            <div className="mb-2 text-sm">{comment}</div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
              <CommentSentiment comment={comment} setStats={setStats} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
