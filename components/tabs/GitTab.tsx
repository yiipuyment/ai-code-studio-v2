'use client';

import React, { useState } from 'react';

interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: Date;
}

export default function GitTab() {
  const [commits] = useState<GitCommit[]>([
    {
      hash: 'a1b2c3d',
      message: 'Initial commit',
      author: 'Developer',
      date: new Date(),
    },
  ]);
  const [commitMessage, setCommitMessage] = useState('');

  const handleCommit = () => {
    if (commitMessage.trim()) {
      alert(`Committed: ${commitMessage}`);
      setCommitMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Git Integration</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
              Pull
            </button>
            <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors">
              Push
            </button>
            <button className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">
              Fetch
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">New Commit</h3>
          <textarea
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Commit message..."
            className="w-full h-24 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white resize-none"
          />
          <button
            onClick={handleCommit}
            className="mt-2 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Commit Changes
          </button>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Recent Commits
          </h3>
          <div className="space-y-3">
            {commits.map((commit) => (
              <div
                key={commit.hash}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                    {commit.hash}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {commit.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-900 dark:text-white mb-1">{commit.message}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">by {commit.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
