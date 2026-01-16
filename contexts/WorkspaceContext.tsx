'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tab, Settings, Project, FileItem } from '@/lib/types';
import { DEFAULT_TABS } from '@/lib/constants';

interface WorkspaceContextType {
  tabs: Tab[];
  activeTab: string;
  settings: Settings | null;
  currentProject: Project | null;
  currentFile: FileItem | null;
  addTab: (tab: Omit<Tab, 'id' | 'order'>) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  reorderTabs: (tabs: Tab[]) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  setCurrentProject: (project: Project | null) => void;
  setCurrentFile: (file: FileItem | null) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeTab, setActiveTabState] = useState<string>('agent');
  const [settings, setSettings] = useState<Settings | null>({
    id: 'default',
    theme: 'dark',
    ai_provider: 'groq',
    preferences: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentFile, setCurrentFile] = useState<FileItem | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const addTab = (tab: Omit<Tab, 'id' | 'order'>) => {
    const existingTab = tabs.find(t => t.type === tab.type);
    if (existingTab) {
      setActiveTabState(existingTab.id);
      return;
    }

    const newTab: Tab = {
      ...tab,
      id: `${tab.type}-${Date.now()}`,
      order: tabs.length,
    };
    setTabs([...tabs, newTab]);
    setActiveTabState(newTab.id);
  };

  const removeTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || !tab.closable) return;

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTabState(newTabs[0].id);
    }
  };

  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
  };

  const reorderTabs = (newTabs: Tab[]) => {
    setTabs(newTabs);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...newSettings };

      if (newSettings.theme) {
        document.documentElement.classList.toggle('dark', newSettings.theme === 'dark');
        localStorage.setItem('theme', newSettings.theme);
      }

      return updated;
    });
  };

  return (
    <WorkspaceContext.Provider
      value={{
        tabs,
        activeTab,
        settings,
        currentProject,
        currentFile,
        addTab,
        removeTab,
        setActiveTab,
        reorderTabs,
        updateSettings,
        setCurrentProject,
        setCurrentFile,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
