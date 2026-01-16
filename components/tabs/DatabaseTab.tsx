'use client';

import React, { useState } from 'react';

interface QueryResult {
  columns: string[];
  rows: any[];
  rowCount: number;
  executionTime: number;
}

export default function DatabaseTab() {
  const [query, setQuery] = useState('SELECT * FROM projects LIMIT 10;');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeQuery = async () => {
    setLoading(true);
    setError(null);

    try {
      const startTime = Date.now();

      await new Promise((resolve) => setTimeout(resolve, 500));

      const demoResult: QueryResult = {
        columns: ['id', 'name', 'description', 'created_at'],
        rows: [
          {
            id: '1',
            name: 'Demo Project',
            description: 'A sample project',
            created_at: new Date().toISOString(),
          },
        ],
        rowCount: 1,
        executionTime: Date.now() - startTime,
      };

      setResult(demoResult);
    } catch (err: any) {
      setError(err.message || 'Query execution failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Database SQL Editor
        </h2>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your SQL query..."
          />
          <div className="flex items-center justify-between mt-3">
            <button
              onClick={executeQuery}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              {loading ? 'Executing...' : '▶️ Execute Query'}
            </button>
            <button
              onClick={() => setQuery('')}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 font-semibold">Error:</p>
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">{error}</p>
            </div>
          )}

          {result && !error && (
            <div>
              <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                {result.rowCount} rows returned in {result.executionTime}ms
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      {result.columns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        {result.columns.map((col) => (
                          <td
                            key={col}
                            className="px-4 py-2 text-sm text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
                          >
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!result && !error && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">🗄️</span>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a SQL query and click Execute to see results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
