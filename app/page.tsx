'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeToggle } from '../components/ThemeToggle';
import { Header } from '../components/Header';
import { URLInput } from '../components/URLInput';
import { SentimentResults } from '../components/SentimentResults';
import { ProgressLogs } from '../components/ProgressLogs';
import { Comments } from '../components/Comments';
import type { SentimentResult } from '../utils/sentiment';

// Interface for the API response
interface CommentResponse {
  comments: string[];
  total_comments: number;
}

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
    
    try {
      // Start the analysis process with real API calls
      addLog('1. Fetching webpage content...');
      
      // Use local proxy to avoid CORS issues
      // No need for environment variable anymore as we're using the local proxy
      
      addLog('2. Extracting comments and reviews...');
      // Make the API call to get comments through our proxy
      const response = await axios.post<CommentResponse>(
        `/api/scrape-comments`, 
        { url }
      );
      
      // Set the comments from the API response
      setComments(response.data.comments);
      addLog(`Found ${response.data.total_comments} comments`);
      
      addLog('3. Processing text data...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addLog('4. Analyzing sentiment with AI model...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addLog('5. Generating summary...');
      
      // For now, we'll still use mock sentiment results
      // In a real app, you would get these from another API call
      setResult({
        positive: 45,
        negative: 20,
        neutral: 35,
        summary: "The comments show a generally positive sentiment with some concerns. Users appreciate the product's features but have noted some areas for improvement in the user interface."
      });
      
      addLog('✓ Analysis complete!');
    } catch (error) {
      console.error('Error analyzing URL:', error);
      addLog('❌ Error: Failed to analyze URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
