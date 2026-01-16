'use client';

import React, { useState } from 'react';
import { APIRequest, APIResponse } from '@/lib/types';

export default function APITesterTab() {
  const [request, setRequest] = useState<APIRequest>({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    headers: { 'Content-Type': 'application/json' },
    body: '',
  });
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const res = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.body ? request.body : undefined,
      });

      const responseHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const body = await res.text();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        body,
        time: Date.now() - startTime,
      });
    } catch (error: any) {
      setResponse({
        status: 0,
        statusText: 'Error',
        headers: {},
        body: error.message,
        time: Date.now() - startTime,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">API Tester</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <select
              value={request.method}
              onChange={(e) => setRequest({ ...request, method: e.target.value as any })}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
            <input
              type="text"
              value={request.url}
              onChange={(e) => setRequest({ ...request, url: e.target.value })}
              className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
              placeholder="Enter URL..."
            />
            <button
              onClick={sendRequest}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Headers</h3>
            <textarea
              value={JSON.stringify(request.headers, null, 2)}
              onChange={(e) => {
                try {
                  setRequest({ ...request, headers: JSON.parse(e.target.value) });
                } catch {}
              }}
              className="w-full h-24 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
          </div>

          {request.method !== 'GET' && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Body</h3>
              <textarea
                value={request.body}
                onChange={(e) => setRequest({ ...request, body: e.target.value })}
                className="w-full h-32 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-mono text-sm resize-none"
                placeholder="Request body (JSON)..."
              />
            </div>
          )}

          {response && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Response</h3>
                <div className="flex items-center space-x-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded ${
                      response.status >= 200 && response.status < 300
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}
                  >
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">{response.time}ms</span>
                </div>
              </div>
              <pre className="p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-mono text-xs overflow-x-auto">
                {response.body}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
