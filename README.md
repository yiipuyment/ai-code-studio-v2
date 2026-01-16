# AI Workspace Builder

A professional Next.js application that provides a comprehensive AI-powered workspace similar to Replit Mobile, StackBlitz, and VS Code. Build and manage your projects with an intuitive tab-based interface, AI assistance, and powerful developer tools.

## Features

### Core Features
- **Dynamic Tab System** - Add, remove, and reorder tabs with smooth animations
- **Agent Tab (Fixed)** - AI chat assistant with multi-provider support
- **Mobile-First Design** - Responsive interface optimized for all devices
- **Dark/Light Theme** - Toggle between themes with persistent settings
- **Command Palette** - Quick access to all features with Ctrl+K
- **Keyboard Shortcuts** - Efficient navigation and actions

### Developer Tools

#### Agent (AI Assistant)
- Multi-AI provider support (Groq, Gemini, HuggingFace, Cohere)
- Real-time chat interface
- Configurable API keys
- Message history

#### Terminal
- Interactive command-line interface
- Command history with arrow key navigation
- Built-in commands (ls, pwd, echo, date, node, npm, etc.)
- Clear terminal support

#### Preview
- Live preview with iframe
- Device mode switcher (Mobile, Tablet, Desktop)
- Custom URL loading
- Responsive viewport simulation

#### Files
- Tree view file browser
- File upload/download support
- File size display
- Search functionality
- Click to open in editor

#### Code Editor
- Syntax highlighting support
- Multiple language detection (TypeScript, JavaScript, CSS, JSON)
- Auto-save capability
- Line and character count
- File path display

#### Database
- SQL query editor
- Query execution with timing
- Result table display
- Error handling
- Row count information

#### API Tester
- REST API testing (GET, POST, PUT, DELETE, PATCH)
- Custom headers configuration
- Request body editor
- Response viewer with status codes
- Execution time tracking

#### Network Monitor
- Network request logging
- Method, URL, status display
- Response time and size tracking
- Request history

#### Package Manager
- View installed packages
- Package version information
- Update and remove packages
- Search packages

#### Environment Variables
- .env file manager
- Add/remove variables
- Secure value display
- Key-value pair editing

#### Git Integration
- Quick actions (Pull, Push, Fetch)
- Commit message editor
- Commit history
- Author and date information

#### Settings
- Theme toggle (Dark/Light)
- AI provider selection
- API key management
- Keyboard shortcuts reference
- App information

#### Logs & Console
- Application logs viewer
- Log levels (Info, Warn, Error)
- Timestamp display
- Color-coded messages

#### Search
- Global file search
- Search results with file location
- Line number display
- Click to open in editor

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Keyboard Shortcuts

- `Ctrl+K` - Open Command Palette
- `Ctrl+F` - Open Search
- `Ctrl+S` - Save current file
- `Ctrl+N` - New file
- `Ctrl+W` - Close current tab
- `Ctrl+Tab` - Next tab
- `Ctrl+Shift+Tab` - Previous tab
- `Ctrl+\`` - Open Terminal
- `Ctrl+,` - Open Settings

## Technology Stack

- **Framework**: Next.js 13.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context API
- **UI Components**: Custom components with Tailwind

## Database Schema

The app uses Supabase with the following tables:
- `projects` - User projects
- `files` - Project files and content
- `settings` - User preferences and API keys
- `tab_config` - Tab configuration and layout

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main workspace page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── BottomNav.tsx      # Bottom navigation bar
│   ├── TabRenderer.tsx    # Tab content renderer
│   ├── CommandPalette.tsx # Command palette
│   └── tabs/              # Individual tab components
├── contexts/              # React contexts
│   └── WorkspaceContext.tsx # Workspace state management
├── hooks/                 # Custom React hooks
│   └── useKeyboardShortcuts.ts # Keyboard shortcuts handler
└── lib/                   # Utilities and constants
    ├── types.ts           # TypeScript types
    └── constants.ts       # App constants
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Inspired by Replit Mobile, StackBlitz, and VS Code
- Built with Next.js and Tailwind CSS
- Uses Supabase for data persistence
