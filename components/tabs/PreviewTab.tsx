'use client';

import React, { useState } from 'react';

type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export default function PreviewTab() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [url, setUrl] = useState('http://localhost:3000');
  const [inputUrl, setInputUrl] = useState('http://localhost:3000');

  const deviceSizes = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '100%' },
  };

  const handleLoadUrl = () => {
    setUrl(inputUrl);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 flex-1">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLoadUrl()}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            placeholder="Enter URL..."
          />
          <button
            onClick={handleLoadUrl}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            Go
          </button>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-2 text-xs rounded-lg transition-colors ${
              deviceMode === 'mobile'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            📱 Mobile
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`px-3 py-2 text-xs rounded-lg transition-colors ${
              deviceMode === 'tablet'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            📱 Tablet
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-2 text-xs rounded-lg transition-colors ${
              deviceMode === 'desktop'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            🖥️ Desktop
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: deviceSizes[deviceMode].width,
            height: deviceSizes[deviceMode].height,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <iframe
            src={url}
            className="w-full h-full border-0"
            title="Preview"
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </div>
      </div>
    </div>
  );
}
