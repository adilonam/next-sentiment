'use client';

type Props = {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
};

export function URLInput({ url, setUrl, onSubmit, isLoading }: Props) {

  const testUrl = "https://www.hespress.com/%d9%83%d8%b4%d9%81-%d9%82%d9%8a%d9%85%d8%a9-%d8%a7%d9%84%d8%af%d8%b9%d9%85-%d8%a7%d9%84%d8%a7%d8%b3%d8%aa%d8%ab%d9%86%d8%a7%d8%a6%d9%8a-%d9%84%d8%a7%d8%b3%d8%aa%d9%8a%d8%b1%d8%a7%d8%af-%d8%a7%d9%84-1538604.html";
  
  const handleTestClick = () => {
    setUrl(testUrl);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL..."
          required
          className="input flex-1"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze Sentiment'
          )}
        </button>
      </div>
      
  
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleTestClick}
          disabled={isLoading}
          className="btn btn-secondary text-sm"
        >
          Test with Example URL
        </button>
      </div>
    </form>
  );
}