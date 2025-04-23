import { SentimentResult } from '../utils/sentiment';

interface SentimentResultsProps {
  result: SentimentResult;
}

export const SentimentResults = ({ result }: SentimentResultsProps) => {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-700/50">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sentiment Analysis Results</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{result.positive}%</div>
            <div className="text-sm text-green-700 dark:text-green-300">Positive</div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{result.negative}%</div>
            <div className="text-sm text-red-700 dark:text-red-300">Negative</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{result.neutral}%</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">Neutral</div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Summary</h3>
          <p className="text-gray-700 dark:text-gray-300">{result.summary}</p>
        </div>
      </div>
    </div>
  );
};