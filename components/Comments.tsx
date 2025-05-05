import { useEffect, useState } from 'react';

interface CommentsProps {
  comments: string[];
}

export const Comments = ({ comments }: CommentsProps) => {
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
      <div className="space-y-2 h-[300px] overflow-y-auto pr-2">
        {visibleComments.map((comment, index) => (
          <div
            key={index}
            className="text-sentiment-text dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg animate-fade-in"
          >
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};