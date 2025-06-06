import AuthStatus from './auth/AuthStatus'

export function Header() {
  return (
    <header className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <AuthStatus />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-sentiment-text dark:text-white">Sentiment Analyzer</h1>
        <p className="text-lg text-sentiment-text/80 dark:text-gray-300 max-w-2xl mx-auto">
          Enter a website URL to analyze the overall sentiment of its content. Our AI-powered tool
          will process comments, reviews, and text to provide detailed sentiment insights.
        </p>
      </div>
    </header>
  );
}
