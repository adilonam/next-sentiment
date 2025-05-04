type Props = {
  logs: string[];
};

export function ProgressLogs({ logs }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-sentiment-text dark:text-white">Progress</h3>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div
            key={index}
            className="text-sentiment-text dark:text-gray-300 py-1  animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}