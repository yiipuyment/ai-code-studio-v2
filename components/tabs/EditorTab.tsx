'use client';

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';

export default function EditorTab() {
  const { currentFile } = useWorkspace();
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('typescript');

  useEffect(() => {
    if (currentFile) {
      setContent(currentFile.content || '// File loaded: ' + currentFile.path);
      const ext = currentFile.path.split('.').pop()?.toLowerCase();
      switch (ext) {
        case 'ts':
        case 'tsx':
          setLanguage('typescript');
          break;
        case 'js':
        case 'jsx':
          setLanguage('javascript');
          break;
        case 'css':
          setLanguage('css');
          break;
        case 'json':
          setLanguage('json');
          break;
        default:
          setLanguage('plaintext');
      }
    } else {
      setContent('// Select a file from the Files tab to edit');
    }
  }, [currentFile]);

  const handleSave = () => {
    alert('File saved! (Demo mode)');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            {currentFile ? currentFile.path : 'Code Editor'}
          </h2>
          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded">
            {language}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
          >
            💾 Save (Ctrl+S)
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
          style={{ tabSize: 2 }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
        <span>Lines: {content.split('\n').length}</span>
        <span>Characters: {content.length}</span>
      </div>
    </div>
  );
}
