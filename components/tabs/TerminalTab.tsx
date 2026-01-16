'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function TerminalTab() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '0',
      type: 'output',
      content: 'Welcome to AI Workspace Terminal v1.0',
    },
    {
      id: '1',
      type: 'output',
      content: 'Type "help" for available commands',
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setLines((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'input', content: `$ ${trimmedCmd}` },
    ]);

    setHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const args = trimmedCmd.split(' ');
    const command = args[0].toLowerCase();

    let output = '';

    switch (command) {
      case 'help':
        output = `Available commands:
  help       - Show this help message
  clear      - Clear the terminal
  ls         - List files in current directory
  pwd        - Print working directory
  echo       - Echo text
  date       - Show current date and time
  whoami     - Show current user
  node -v    - Show Node.js version
  npm -v     - Show npm version`;
        break;
      case 'clear':
        setLines([]);
        return;
      case 'ls':
        output = 'app/  components/  contexts/  lib/  public/  node_modules/  package.json  tsconfig.json';
        break;
      case 'pwd':
        output = '/workspace/project';
        break;
      case 'echo':
        output = args.slice(1).join(' ');
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'workspace-user';
        break;
      case 'node':
        if (args[1] === '-v') {
          output = 'v20.6.2';
        } else {
          output = 'Use: node -v';
        }
        break;
      case 'npm':
        if (args[1] === '-v') {
          output = '10.2.4';
        } else {
          output = 'Use: npm -v or check Package Manager tab';
        }
        break;
      default:
        output = `Command not found: ${command}. Type "help" for available commands.`;
        break;
    }

    setLines((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        type: output.includes('not found') ? 'error' : 'output',
        content: output,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-green-400 font-mono">
      <div className="flex items-center justify-between p-3 bg-gray-900 border-b border-gray-800">
        <h2 className="text-sm font-semibold">Terminal</h2>
        <button
          onClick={() => setLines([])}
          className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
        >
          Clear
        </button>
      </div>

      <div
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 cursor-text"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            className={`mb-1 ${
              line.type === 'error'
                ? 'text-red-400'
                : line.type === 'input'
                ? 'text-green-400'
                : 'text-gray-300'
            }`}
          >
            {line.content}
          </div>
        ))}
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
