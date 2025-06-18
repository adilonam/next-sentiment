'use client';

type Props = {
  url: string;
  setUrl: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export function URLInput({ url, setUrl, title, setTitle, onSubmit, isLoading }: Props) {
  const testUrl =
    'https://www.hespress.com/%d9%83%d8%b4%d9%81-%d9%82%d9%8a%d9%85%d8%a9-%d8%a7%d9%84%d8%af%d8%b9%d9%85-%d8%a7%d9%84%d8%a7%d8%b3%d8%aa%d8%ab%d9%86%d8%a7%d8%a6%d9%8a-%d9%84%d8%a7%d8%b3%d8%aa%d9%8a%d8%b1%d8%a7%d8%af-%d8%a7%d9%84-1538604.html';
  const testTitle = 'Sample Article Title';

  const handleTestClick = () => {
    setUrl(testUrl);
    setTitle(testTitle);
  };

  return (
    <div className="form-card max-w-2xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Sentiment Analysis Tool
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze sentiment from article comments and reviews
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Article Title
            </label>
            <div className="relative">
              <input
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter article title..."
                required
                className="input pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Website URL
            </label>
            <div className="relative">
              <input
                id="url"
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                required
                className="input pl-10"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !title.trim() || !url.trim()}
          className="btn btn-primary w-full py-4 text-lg font-semibold"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
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
              Analyzing Sentiment...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Analyze Sentiment
            </span>
          )}
        </button>

        {/* Test Button */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestClick}
          disabled={isLoading}
          className="btn btn-secondary w-full"
        >
          <span className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Try with Example Article
          </span>
        </button>
      </form>

      {/* Footer Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          We analyze comments and reviews to provide sentiment insights
        </p>
      </div>
    </div>
  );
}
