'use client';

import React, { useState } from 'react';

interface SearchResult {
  file: string;
  line: number;
  content: string;
}

export default function SearchTab() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = () => {
    if (!query.trim()) return;

    const demoResults: SearchResult[] = [
      {
        file: 'app/page.tsx',
        line: 15,
        content: 'export default function Home() {',
      },
      {
        file: 'components/BottomNav.tsx',
        line: 42,
        content: 'export default function BottomNav() {',
      },
    ];

    setResults(demoResults);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Global Search
        </h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search in all files..."
            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {results.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found {results.length} results for &quot;{query}&quot;
            </p>
            {results.map((result, i) => (
              <div
                key={i}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {result.file}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Line {result.line}
                  </span>
                </div>
                <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {result.content}
                </pre>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-6xl mb-4">🔍</span>
            <p className="text-gray-600 dark:text-gray-400">
              {query ? 'No results found' : 'Enter a search query to find files and code'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
