'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { AVAILABLE_TABS } from '@/lib/constants';

interface Command {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { tabs, addTab, setActiveTab, updateSettings, settings } = useWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    ...tabs.map((tab) => ({
      id: `open-${tab.id}`,
      title: `Open ${tab.title}`,
      description: `Switch to ${tab.title} tab`,
      icon: tab.icon,
      action: () => {
        setActiveTab(tab.id);
        setIsOpen(false);
      },
    })),
    ...AVAILABLE_TABS.filter(
      (availTab) => !tabs.some((t) => t.type === availTab.type)
    ).map((tab) => ({
      id: `add-${tab.type}`,
      title: `Add ${tab.title}`,
      description: `Create new ${tab.title} tab`,
      icon: tab.icon,
      action: () => {
        addTab(tab);
        setIsOpen(false);
      },
    })),
    {
      id: 'theme-toggle',
      title: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: settings?.theme === 'dark' ? '☀️' : '🌙',
      action: () => {
        updateSettings({ theme: settings?.theme === 'dark' ? 'light' : 'dark' });
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
          />
        </div>
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <span className="text-2xl">{cmd.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cmd.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cmd.description}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              No commands found
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Press Esc to close</span>
          <span>Ctrl+K to toggle</span>
        </div>
      </div>
    </div>
  );
}
