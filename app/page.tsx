'use client';

import { WorkspaceProvider } from '@/contexts/WorkspaceContext';
import TabRenderer from '@/components/TabRenderer';
import BottomNav from '@/components/BottomNav';
import CommandPalette from '@/components/CommandPalette';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

function WorkspaceContent() {
  useKeyboardShortcuts();

  return (
    <main className="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 overflow-hidden pb-16">
        <TabRenderer />
      </div>
      <BottomNav />
      <CommandPalette />
    </main>
  );
}

export default function Home() {
  return (
    <WorkspaceProvider>
      <WorkspaceContent />
    </WorkspaceProvider>
  );
}
