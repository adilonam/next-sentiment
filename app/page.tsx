'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Header } from '../components/Header';
import { URLInput } from '../components/URLInput';
import { SentimentResults } from '../components/SentimentResults';
import { ProgressLogs } from '../components/ProgressLogs';
import { Comments } from '../components/Comments';
import type { SentimentResult } from '../utils/sentiment';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setLogs([]);
    setComments([]);
    
    // Mock analysis process with simulated delays
    addLog('1. Fetching webpage content...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog('2. Extracting comments and reviews...');
    const mockComments = [
      "This product is amazing! The interface is so intuitive.",
      "I'm having some issues with the mobile version, but desktop works fine.",
      "Customer support was really helpful in resolving my issue.",
      "Not what I expected. The features are limited.",
      "Great improvement from the previous version!",
      "Would be better with dark mode support.",
      "Been using this for 6 months, very satisfied.",
      "The new update broke some functionality.",
      "Best tool I've used for this purpose.",
      "A bit expensive but worth the investment.",
      "The documentation could be clearer.",
      "Really impressed with the performance."
    ];
    setComments(mockComments);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addLog('3. Processing text data...');
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    addLog('4. Analyzing sentiment with AI model...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addLog('5. Generating summary...');
    await new Promise(resolve => setTimeout(resolve, 800));

    setResult({
      positive: 45,
      negative: 20,
      neutral: 35,
      summary: "The comments show a generally positive sentiment with some concerns. Users appreciate the product's features but have noted some areas for improvement in the user interface."
    });
    
    addLog('✓ Analysis complete!');
    setIsLoading(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sentiment-background dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>

        <Header />
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <URLInput 
            url={url}
            setUrl={setUrl}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <ProgressLogs logs={logs} />
          </div>

          {comments.length > 0 && (
            <Comments comments={comments} />
          )}
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <SentimentResults result={result} />
          </div>
        )}
      </div>
    </div>
  );
}
