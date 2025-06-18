'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeToggle } from '../components/ThemeToggle';
import { Header } from '../components/Header';
import { URLInput } from '../components/URLInput';
import { ProgressLogs } from '../components/ProgressLogs';
import { Comments } from '../components/Comments';
import { LiveSentimentStats } from '../components/LiveSentimentStats';
import { SentimentDashboard } from '../components/SentimentDashboard';
import AuthStatus from '../components/auth/AuthStatus';
import { CommentResponse, SentimentStats, Comment } from '@/utils/types';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const [activeView, setActiveView] = useState<'analyzer' | 'dashboard'>('dashboard');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<SentimentStats>({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
    processed: 0,
  });

  const { user, isAuthenticated, isLoading: authLoading, accessToken } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      addLog('❌ Please sign in to analyze URLs.');
      return;
    }

    if (!accessToken) {
      addLog('❌ Authentication token not available. Please sign in again.');
      return;
    }

    setIsLoading(true);
    setLogs([]);
    setComments([]);

    try {
      // Start the analysis process with real API calls
      addLog('1. Fetching webpage content...');

      addLog('2. Extracting comments and reviews...');

      // Prepare headers with bearer token
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
        addLog('🔐 Using authenticated request...');
      } else {
        addLog('⚠️ No authentication token available...');
      }

      // Make the API call to the new endpoint with title and url
      const response = await axios.post<CommentResponse>(
        `/api/gateway/fastapi/scrape-comments`,
        {
          title: title,
          url: url,
        },
        { headers }
      );

      // Set the full comment objects instead of just content
      setComments(response.data.comments);
      addLog(`Found ${response.data.totalComments} comments`);
      addLog(`✓ Article: "${response.data.article.title}"`);
      addLog(`📅 Scraped at: ${new Date(response.data.article.scrapedAt).toLocaleString()}`);

      // Set the total number of comments in stats
      setStats(prevStats => ({
        ...prevStats,
        total: response.data.totalComments,
        processed: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
      }));

      addLog('3. Processing text data...');

      // Display comments first, then process them individually in the CommentSentiment component

      addLog('4. Analyzing comment sentiment with AI model...');
      addLog('Individual comments are being analyzed in real-time...');

      addLog('5. Generating overall summary...');

      // We'll calculate the overall result after comments are processed individually
      // The LiveSentimentStats component will track individual results in real-time

      addLog('✓ Analysis complete!');
    } catch (error) {
      console.error('Error analyzing URL:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          addLog('❌ Error: Authentication failed. Please sign in again.');
        } else if (error.response?.status === 403) {
          addLog('❌ Error: Access denied. Please check your permissions.');
        } else {
          addLog(
            `❌ Error: ${error.response?.data?.message || 'Failed to analyze URL. Please try again.'}`
          );
        }
      } else {
        addLog('❌ Error: Failed to analyze URL. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="mb-6">
            <Header />
          </div>

          {/* Navigation and Auth Row */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeView === 'dashboard'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  📊 Dashboard
                </button>
                <button
                  onClick={() => setActiveView('analyzer')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeView === 'analyzer'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  🔍 Analyzer
                </button>
              </div>
              <ThemeToggle />
            </div>

            {/* Auth Status on the right */}
            <div className="flex items-center">
              <AuthStatus />
            </div>
          </div>

          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-6">
              {!isAuthenticated && !authLoading && (
                <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <p className="text-amber-800 dark:text-amber-200 font-medium">
                        Please sign in to view the sentiment dashboard
                      </p>
                      <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                        Authentication is required to access historical sentiment data and
                        analytics.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isAuthenticated && <SentimentDashboard />}
            </div>
          )}

          {/* Analyzer View */}
          {activeView === 'analyzer' && (
            <>
              {!isAuthenticated && !authLoading && (
                <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-amber-600 dark:text-amber-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <p className="text-amber-800 dark:text-amber-200 font-medium">
                        Please sign in to start analyzing website sentiment
                      </p>
                      <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                        You need to be authenticated to use the sentiment analysis tools.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Welcome back, {user?.name || user?.email}!
                      </p>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        You&apos;re ready to analyze website sentiment and comments.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <URLInput
                  url={url}
                  setUrl={setUrl}
                  title={title}
                  setTitle={setTitle}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                    <ProgressLogs logs={logs} />
                  </div>

                  {comments.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                      <Comments comments={comments} setStats={setStats} accessToken={accessToken} />
                    </div>
                  )}

                  {isLoading && comments.length === 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                          <svg
                            className="animate-spin h-8 w-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Analyzing Content
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Fetching and analyzing comments for sentiment insights...
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {comments.length > 0 && (
                  <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                      <LiveSentimentStats stats={stats} />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
