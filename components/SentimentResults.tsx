import type { SentimentResult } from '../utils/sentiment';

type Props = {
  result: SentimentResult;
};

export function SentimentResults({ result }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-sentiment-text dark:text-white">Analysis Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-sentiment-text dark:text-white font-medium">Positive</span>
            <span className="text-sentiment-positive font-bold">{result.positive}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sentiment-positive rounded-full h-2 transition-all duration-500" 
              style={{ width: `${result.positive}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-sentiment-text dark:text-white font-medium">Neutral</span>
            <span className="text-sentiment-neutral font-bold">{result.neutral}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sentiment-neutral rounded-full h-2 transition-all duration-500" 
              style={{ width: `${result.neutral}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-sentiment-text dark:text-white font-medium">Negative</span>
            <span className="text-sentiment-negative font-bold">{result.negative}%</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sentiment-negative rounded-full h-2 transition-all duration-500" 
              style={{ width: `${result.negative}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-sentiment-text dark:text-white mb-2">Summary</h3>
        <p className="text-sentiment-text dark:text-gray-300">{result.summary}</p>
      </div>
    </div>
  );
}