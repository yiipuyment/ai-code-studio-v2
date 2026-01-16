'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import { AVAILABLE_TABS } from '@/lib/constants';

export default function BottomNav() {
  const { tabs, activeTab, setActiveTab, addTab, removeTab } = useWorkspace();
  const [showMenu, setShowMenu] = useState(false);

  const visibleTabs = tabs.slice(0, 5);
  const hasMoreTabs = tabs.length > 5;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full relative group ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.title}</span>
              {activeTab === tab.id && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full" />
              )}
              {tab.closable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
            </button>
          ))}

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center justify-center flex-1 h-full text-gray-600 dark:text-gray-400"
          >
            <span className="text-2xl mb-1">☰</span>
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 max-h-96 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                All Tabs
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowMenu(false);
                    }}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-2xl mb-2">{tab.icon}</span>
                    <span className="text-xs font-medium text-center">{tab.title}</span>
                  </button>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Add New Tab
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {AVAILABLE_TABS.filter(
                  (availTab) => !tabs.some((t) => t.type === availTab.type)
                ).map((availTab) => (
                  <button
                    key={availTab.type}
                    onClick={() => {
                      addTab(availTab);
                      setShowMenu(false);
                    }}
                    className="flex flex-col items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-2xl mb-2">{availTab.icon}</span>
                    <span className="text-xs font-medium text-center">{availTab.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
