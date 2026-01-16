'use client';

import React, { useState } from 'react';

interface Package {
  name: string;
  version: string;
  description: string;
}

export default function PackagesTab() {
  const [packages] = useState<Package[]>([
    { name: 'react', version: '18.2.0', description: 'React library' },
    { name: 'next', version: '13.5.1', description: 'Next.js framework' },
    { name: 'typescript', version: '5.2.2', description: 'TypeScript language' },
    { name: 'tailwindcss', version: '3.3.3', description: 'Utility-first CSS framework' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Package Manager
        </h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search packages..."
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{pkg.name}</h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">{pkg.version}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pkg.description}</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                Update
              </button>
              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
