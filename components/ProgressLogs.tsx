interface ProgressLogsProps {
  logs: string[];
}

export const ProgressLogs = ({ logs }: ProgressLogsProps) => {
  if (logs.length === 0) return null;

  return (
    <div className="mt-4 mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Analysis Progress</h3>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="min-w-[24px] h-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{log}</p>
          </div>
        ))}
      </div>
    </div>
  );
};