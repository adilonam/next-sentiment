import { SentimentStats } from '@/utils/types';

export const LiveSentimentStats = ({ stats }: { stats: SentimentStats }) => {
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
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {stats.processed} of {stats.total}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-sentiment-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-sky-100 dark:bg-sky-900/20 p-3 rounded-lg text-center">
          <div className="text-sky-800 dark:text-sky-300 text-lg font-bold">
            {stats.veryPositive}
          </div>
          <div className="text-sm text-sky-700 dark:text-sky-400">Very Positive</div>
        </div>
        <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg text-center">
          <div className="text-green-800 dark:text-green-300 text-lg font-bold">
            {stats.positive}
          </div>
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
        <div className="bg-rose-100 dark:bg-rose-900/20 p-3 rounded-lg text-center">
          <div className="text-rose-800 dark:text-rose-300 text-lg font-bold">
            {stats.veryNegative}
          </div>
          <div className="text-sm text-rose-700 dark:text-rose-400">Very Negative</div>
        </div>
      </div>
    </div>
  );
};
