'use client';

import React, { useState } from 'react';

interface NetworkRequest {
  id: string;
  method: string;
  url: string;
  status: number;
  time: number;
  size: string;
  timestamp: Date;
}

export default function NetworkTab() {
  const [requests] = useState<NetworkRequest[]>([
    {
      id: '1',
      method: 'GET',
      url: '/api/user',
      status: 200,
      time: 145,
      size: '2.3 KB',
      timestamp: new Date(),
    },
    {
      id: '2',
      method: 'POST',
      url: '/api/projects',
      status: 201,
      time: 234,
      size: '1.1 KB',
      timestamp: new Date(),
    },
  ]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Network Monitor</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Method
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                URL
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Time
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req.id}
                className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {req.method}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{req.url}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      req.status >= 200 && req.status < 300
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {req.time}ms
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{req.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
