import { useState } from 'react';

type Props = {
  logs: string[];
};

export function ProgressLogs({ logs }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Show only the latest log when minimized, or all logs when expanded
  const displayLogs = expanded ? logs : logs.length > 0 ? [logs[logs.length - 1]] : [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-sentiment-text dark:text-white">Progress</h3>
        {logs.length > 1 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm px-3 py-1 bg-sentiment-primary text-white rounded hover:bg-opacity-90 transition"
          >
            {expanded ? 'Minimize' : 'Expand All'}
          </button>
        )}
      </div>
      <div className="space-y-2">
        {displayLogs.map((log, index) => (
          <div
            key={index}
            className="text-sentiment-text dark:text-gray-300 py-1 animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {log}
          </div>
        ))}
        {!expanded && logs.length > 1 && (
          <div className="text-sm text-gray-500 italic">
            {logs.length - 1} more {logs.length - 1 === 1 ? 'step' : 'steps'} hidden
          </div>
        )}
      </div>
    </div>
  );
}
