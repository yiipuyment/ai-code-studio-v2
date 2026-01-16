import { useEffect } from 'react';
import { useWorkspace } from '@/contexts/WorkspaceContext';

export function useKeyboardShortcuts() {
  const { tabs, activeTab, setActiveTab, addTab } = useWorkspace();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            console.log('Save triggered');
            break;
          case 'n':
            e.preventDefault();
            console.log('New file triggered');
            break;
          case 'w':
            e.preventDefault();
            console.log('Close tab triggered');
            break;
          case 'f':
            if (!e.shiftKey) {
              e.preventDefault();
              const searchTab = tabs.find((t) => t.type === 'search');
              if (searchTab) {
                setActiveTab(searchTab.id);
              } else {
                addTab({
                  type: 'search',
                  title: 'Search',
                  icon: '🔍',
                  closable: true,
                });
              }
            }
            break;
          case '`':
            e.preventDefault();
            const terminalTab = tabs.find((t) => t.type === 'terminal');
            if (terminalTab) {
              setActiveTab(terminalTab.id);
            } else {
              addTab({
                type: 'terminal',
                title: 'Terminal',
                icon: '⌨️',
                closable: true,
              });
            }
            break;
          case ',':
            e.preventDefault();
            const settingsTab = tabs.find((t) => t.type === 'settings');
            if (settingsTab) {
              setActiveTab(settingsTab.id);
            } else {
              addTab({
                type: 'settings',
                title: 'Settings',
                icon: '⚙️',
                closable: true,
              });
            }
            break;
          case 'Tab':
            e.preventDefault();
            const currentIndex = tabs.findIndex((t) => t.id === activeTab);
            if (e.shiftKey) {
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
              setActiveTab(tabs[prevIndex].id);
            } else {
              const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
              setActiveTab(tabs[nextIndex].id);
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [tabs, activeTab, setActiveTab, addTab]);
}
