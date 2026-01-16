'use client';

import React, { useState } from 'react';

interface LogEntry {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: Date;
}

export default function LogsTab() {
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      level: 'info',
      message: 'Application started successfully',
      timestamp: new Date(),
    },
    {
      id: '2',
      level: 'warn',
      message: 'API rate limit approaching',
      timestamp: new Date(),
    },
    {
      id: '3',
      level: 'error',
      message: 'Failed to connect to database',
      timestamp: new Date(),
    },
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      case 'warn':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Logs & Console</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded border-l-4"
            style={{
              borderLeftColor:
                log.level === 'error' ? '#ef4444' : log.level === 'warn' ? '#f59e0b' : '#3b82f6',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`font-semibold uppercase text-xs ${getLevelColor(log.level)}`}>
                {log.level}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-900 dark:text-white">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
