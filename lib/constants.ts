import { Tab } from './types';

export const DEFAULT_TABS: Tab[] = [
  {
    id: 'agent',
    type: 'agent',
    title: 'Agent',
    icon: '🤖',
    closable: false,
    order: 0,
  },
  {
    id: 'terminal',
    type: 'terminal',
    title: 'Terminal',
    icon: '⌨️',
    closable: true,
    order: 1,
  },
  {
    id: 'preview',
    type: 'preview',
    title: 'Preview',
    icon: '👁️',
    closable: true,
    order: 2,
  },
  {
    id: 'files',
    type: 'files',
    title: 'Files',
    icon: '📁',
    closable: true,
    order: 3,
  },
  {
    id: 'editor',
    type: 'editor',
    title: 'Editor',
    icon: '📝',
    closable: true,
    order: 4,
  },
];

export const AVAILABLE_TABS: Omit<Tab, 'id' | 'order'>[] = [
  { type: 'database', title: 'Database', icon: '🗄️', closable: true },
  { type: 'api-tester', title: 'API Tester', icon: '🔌', closable: true },
  { type: 'network', title: 'Network', icon: '🌐', closable: true },
  { type: 'packages', title: 'Packages', icon: '📦', closable: true },
  { type: 'env', title: 'Environment', icon: '🔐', closable: true },
  { type: 'git', title: 'Git', icon: '🔀', closable: true },
  { type: 'settings', title: 'Settings', icon: '⚙️', closable: true },
  { type: 'logs', title: 'Logs', icon: '📋', closable: true },
  { type: 'search', title: 'Search', icon: '🔍', closable: true },
];

export const AI_PROVIDERS = [
  {
    id: 'groq',
    name: 'Groq',
    requiresKey: true,
    models: ['llama-3.1-70b-versatile', 'mixtral-8x7b-32768'],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    requiresKey: true,
    models: ['gemini-pro', 'gemini-pro-vision'],
  },
  {
    id: 'huggingface',
    name: 'HuggingFace',
    requiresKey: true,
    models: ['mistralai/Mixtral-8x7B-Instruct-v0.1'],
  },
  {
    id: 'cohere',
    name: 'Cohere',
    requiresKey: true,
    models: ['command', 'command-light'],
  },
];

export const KEYBOARD_SHORTCUTS = {
  commandPalette: 'Ctrl+K',
  search: 'Ctrl+F',
  saveFile: 'Ctrl+S',
  newFile: 'Ctrl+N',
  closeTab: 'Ctrl+W',
  nextTab: 'Ctrl+Tab',
  prevTab: 'Ctrl+Shift+Tab',
  terminal: 'Ctrl+`',
  settings: 'Ctrl+,',
};
