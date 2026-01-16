'use client';

import React, { useState } from 'react';

interface EnvVar {
  key: string;
  value: string;
}

export default function EnvTab() {
  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { key: 'NEXT_PUBLIC_API_URL', value: 'https://api.example.com' },
    { key: 'DATABASE_URL', value: 'postgresql://...' },
  ]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const addEnvVar = () => {
    if (newKey && newValue) {
      setEnvVars([...envVars, { key: newKey, value: newValue }]);
      setNewKey('');
      setNewValue('');
    }
  };

  const removeEnvVar = (key: string) => {
    setEnvVars(envVars.filter((env) => env.key !== key));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Environment Variables
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3 mb-6">
          {envVars.map((env) => (
            <div
              key={env.key}
              className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <input
                type="text"
                value={env.key}
                readOnly
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-white text-sm"
              />
              <input
                type="password"
                value={env.value}
                readOnly
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={() => removeEnvVar(env.key)}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Add New Variable
          </h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="KEY"
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="value"
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            />
            <button
              onClick={addEnvVar}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
