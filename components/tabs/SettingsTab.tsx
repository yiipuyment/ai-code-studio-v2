'use client';

import React from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { AI_PROVIDERS } from '@/lib/constants';

export default function SettingsTab() {
  const { settings, updateSettings } = useWorkspace();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Appearance</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                settings?.theme === 'light'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <span className="text-2xl mb-1 block">☀️</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
            </button>
            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                settings?.theme === 'dark'
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
            >
              <span className="text-2xl mb-1 block">🌙</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            AI Provider
          </h3>
          <select
            value={settings?.ai_provider}
            onChange={(e) => updateSettings({ ai_provider: e.target.value as any })}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
          >
            {AI_PROVIDERS.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">API Key</h3>
          <input
            type="password"
            value={settings?.ai_api_key || ''}
            onChange={(e) => updateSettings({ ai_api_key: e.target.value })}
            placeholder="Enter your API key..."
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
          />
          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Keyboard Shortcuts
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Command Palette</span>
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+K</code>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Search Files</span>
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+F</code>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Save File</span>
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+S</code>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
              <span className="text-gray-600 dark:text-gray-400">Terminal</span>
              <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">Ctrl+`</code>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">About</h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              AI Workspace Builder v1.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              A professional workspace for building AI-powered applications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
