'use client';

import React from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';
import AgentTab from './tabs/AgentTab';
import TerminalTab from './tabs/TerminalTab';
import PreviewTab from './tabs/PreviewTab';
import FilesTab from './tabs/FilesTab';
import EditorTab from './tabs/EditorTab';
import DatabaseTab from './tabs/DatabaseTab';
import APITesterTab from './tabs/APITesterTab';
import NetworkTab from './tabs/NetworkTab';
import PackagesTab from './tabs/PackagesTab';
import EnvTab from './tabs/EnvTab';
import GitTab from './tabs/GitTab';
import SettingsTab from './tabs/SettingsTab';
import LogsTab from './tabs/LogsTab';
import SearchTab from './tabs/SearchTab';

export default function TabRenderer() {
  const { tabs, activeTab } = useWorkspace();
  const currentTab = tabs.find((t) => t.id === activeTab);

  if (!currentTab) return null;

  return (
    <div className="flex-1 overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ease-in-out ${
          currentTab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {currentTab.type === 'agent' && <AgentTab />}
        {currentTab.type === 'terminal' && <TerminalTab />}
        {currentTab.type === 'preview' && <PreviewTab />}
        {currentTab.type === 'files' && <FilesTab />}
        {currentTab.type === 'editor' && <EditorTab />}
        {currentTab.type === 'database' && <DatabaseTab />}
        {currentTab.type === 'api-tester' && <APITesterTab />}
        {currentTab.type === 'network' && <NetworkTab />}
        {currentTab.type === 'packages' && <PackagesTab />}
        {currentTab.type === 'env' && <EnvTab />}
        {currentTab.type === 'git' && <GitTab />}
        {currentTab.type === 'settings' && <SettingsTab />}
        {currentTab.type === 'logs' && <LogsTab />}
        {currentTab.type === 'search' && <SearchTab />}
      </div>
    </div>
  );
}
