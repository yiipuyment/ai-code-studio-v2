export type TabType =
  | 'agent'
  | 'terminal'
  | 'preview'
  | 'files'
  | 'editor'
  | 'database'
  | 'api-tester'
  | 'network'
  | 'packages'
  | 'env'
  | 'git'
  | 'settings'
  | 'logs'
  | 'search';

export interface Tab {
  id: string;
  type: TabType;
  title: string;
  icon: string;
  closable: boolean;
  order: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface FileItem {
  id: string;
  project_id: string;
  path: string;
  content: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  id: string;
  user_id?: string;
  theme: 'dark' | 'light';
  ai_provider: 'groq' | 'gemini' | 'huggingface' | 'cohere';
  ai_api_key?: string;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface APIRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}
