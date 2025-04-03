'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface SentimentResult {
  positive: number;
  negative: number;
  neutral: number;
  summary: string;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock API call - in a real app, this would call your backend
    setTimeout(() => {
      setResult({
        positive: 45,
        negative: 20,
        neutral: 35,
        summary: "The comments show a generally positive sentiment with some concerns. Users appreciate the product's features but have noted some areas for improvement in the user interface."
      });
      setIsLoading(false);
    }, 1500);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sentiment Analysis</h1>
          <p className="text-gray-600 dark:text-gray-300">Enter a URL to analyze comments and reviews</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL with comments"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Comments'}
          </button>
        </form>

        {result && (
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
        )}
      </div>
    </div>
  );
}
