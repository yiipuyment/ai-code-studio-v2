'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  size?: number;
}

const DEMO_FILES: FileNode[] = [
  {
    name: 'app',
    path: 'app',
    type: 'folder',
    children: [
      { name: 'page.tsx', path: 'app/page.tsx', type: 'file', size: 2048 },
      { name: 'layout.tsx', path: 'app/layout.tsx', type: 'file', size: 1024 },
      { name: 'globals.css', path: 'app/globals.css', type: 'file', size: 512 },
    ],
  },
  {
    name: 'components',
    path: 'components',
    type: 'folder',
    children: [
      { name: 'BottomNav.tsx', path: 'components/BottomNav.tsx', type: 'file', size: 3072 },
      { name: 'TabRenderer.tsx', path: 'components/TabRenderer.tsx', type: 'file', size: 2048 },
    ],
  },
  {
    name: 'lib',
    path: 'lib',
    type: 'folder',
    children: [
      { name: 'types.ts', path: 'lib/types.ts', type: 'file', size: 1024 },
      { name: 'constants.ts', path: 'lib/constants.ts', type: 'file', size: 2048 },
    ],
  },
  { name: 'package.json', path: 'package.json', type: 'file', size: 512 },
  { name: 'tsconfig.json', path: 'tsconfig.json', type: 'file', size: 256 },
];

function FileTreeNode({ node, level = 0 }: { node: FileNode; level?: number }) {
  const [expanded, setExpanded] = useState(level === 0);
  const { setCurrentFile } = useWorkspace();

  const handleClick = () => {
    if (node.type === 'folder') {
      setExpanded(!expanded);
    } else {
      setCurrentFile({
        id: node.path,
        project_id: 'demo',
        path: node.path,
        content: '',
        size: node.size || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <span className="mr-2">
          {node.type === 'folder' ? (expanded ? '📂' : '📁') : '📄'}
        </span>
        <span className="text-gray-900 dark:text-white">{node.name}</span>
        {node.type === 'file' && node.size && (
          <span className="ml-auto text-xs text-gray-500">
            {(node.size / 1024).toFixed(1)} KB
          </span>
        )}
      </div>
      {node.type === 'folder' && expanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode key={child.path} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilesTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpload = () => {
    alert('File upload coming soon!');
  };

  const handleDownload = () => {
    alert('File download coming soon!');
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Files</h2>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..."
            className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUpload}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
          >
            📤 Upload
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            📥 Download
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {DEMO_FILES.map((node) => (
          <FileTreeNode key={node.path} node={node} />
        ))}
      </div>
    </div>
  );
}
