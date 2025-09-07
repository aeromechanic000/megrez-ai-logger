// static/script.js
const { useState, useEffect, useCallback, useRef } = React;

// Custom SVG Icon Components
const Icons = {
    BarChart3: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    Activity: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    Database: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="white" viewBox="0 0 24 24" {...props}>
            <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth="2"/>
            <ellipse cx="12" cy="12" rx="9" ry="3" strokeWidth="1.5" opacity="0.7"/>
            <ellipse cx="12" cy="19" rx="9" ry="3" strokeWidth="2"/>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeWidth="2"/>
            <path d="M3 12c0 1.66 4 3 9 3s-9-1.34 9-3" strokeWidth="1.5" opacity="0.8"/>
        </svg>
    ),
    Settings: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    ),
    MessageCircle: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    Bot: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    Send: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12l2-9 18 9-18 9 2-9zm8 0h8" />
        </svg>
    ),
    Minimize2: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6m0 0v6m0-6l-7 7M20 10h-6m0 0V4m0 6l7-7" />
        </svg>
    ),
    Maximize2: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
    ),
    LogOut: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
    ),
    User: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    Search: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Filter: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
    ),
    RefreshCw: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    Download: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    ),
    Plus: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    ),
    Play: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
        </svg>
    ),
    Pause: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    X: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    Clock: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
        </svg>
    ),
    TrendingUp: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    TrendingDown: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
    ),
    Server: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <rect x="2" y="3" width="20" height="4" rx="1"/>
            <rect x="2" y="9" width="20" height="4" rx="1"/>
            <rect x="2" y="15" width="20" height="4" rx="1"/>
            <path d="M6 6h.01M6 12h.01M6 18h.01"/>
        </svg>
    ),
    FileText: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    ),
    AlertTriangle: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    Shield: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    Info: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    CheckCircle: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    AlertCircle: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
        </svg>
    ),
    Eye: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
    List: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
    ),
    Calendar: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
    ),
    Tags: ({ className = "w-4 h-4", ...props }) => React.createElement('svg', {
        className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg',
        ...props
    }, [
        // Main tag shape
        React.createElement('path', {
            key: 'tag-main',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M7 7h.01M7 3h5l6.586 6.586a2 2 0 010 2.828l-4.586 4.586a2 2 0 01-2.828 0L5 11V5a2 2 0 012-2z'
        }),
        // Small tag indicator (hole in tag)
        React.createElement('circle', {
            key: 'tag-hole',
            cx: '7',
            cy: '7',
            r: '1',
            fill: 'currentColor'
        })
    ]),

    // Alternative: Multiple tags icon
    TagsMultiple: ({ className = "w-4 h-4", ...props }) => React.createElement('svg', {
        className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg',
        ...props
    }, [
        // First tag
        React.createElement('path', {
            key: 'tag1',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M5 5h.01M5 1h4l5.586 5.586a2 2 0 010 2.828L11 13a2 2 0 01-2.828 0L3 8V3a2 2 0 012-2z'
        }),
        // Second tag (offset)
        React.createElement('path', {
            key: 'tag2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M9 9h.01M9 5h4l5.586 5.586a2 2 0 010 2.828L15 17a2 2 0 01-2.828 0L7 12V7a2 2 0 012-2z',
            opacity: '0.7'
        })
    ]),

    // Alternative: Hash/pound symbol style
    TagsHash: ({ className = "w-4 h-4", ...props }) => React.createElement('svg', {
        className,
        fill: 'none',
        stroke: 'currentColor',
        viewBox: '0 0 24 24',
        xmlns: 'http://www.w3.org/2000/svg',
        ...props
    }, [
        React.createElement('path', {
            key: 'hash',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14'
        })
    ]),
    Trash: ({ className = "w-6 h-6", ...props }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    )
};

function useAutoScroll(dependency, enabled = true) {
    const scrollRef = useRef(null);
    
    const scrollToBottom = useCallback(() => {
        if (scrollRef.current && enabled) {
            const element = scrollRef.current;
            element.scrollTop = element.scrollHeight;
        }
    }, [enabled]);
    
    useEffect(() => {
        if (dependency && enabled) {
            // Small delay to ensure DOM is updated
            setTimeout(scrollToBottom, 100);
        }
    }, [dependency, scrollToBottom, enabled]);
    
    return { scrollRef, scrollToBottom };
}

// Local Storage Utility for Log Management
const LogStorage = {
    MAX_LOGS: 1000,
    STORAGE_KEY: 'megrez_logs',
    LAST_CHECK_KEY: 'megrez_last_check',
    
    getLogs() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (err) {
            console.error('Failed to get logs from storage:', err);
            return [];
        }
    },
    
    setLogs(logs) {
        try {
            // Keep only the latest MAX_LOGS entries
            const trimmedLogs = logs.slice(-this.MAX_LOGS);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(trimmedLogs));
        } catch (err) {
            console.error('Failed to save logs to storage:', err);
        }
    },
    
    addLogs(newLogs) {
        if (!newLogs || newLogs.length === 0) return this.getLogs();
        
        const existingLogs = this.getLogs();
        const allLogs = [...existingLogs, ...newLogs];
        
        // Sort by timestamp and remove duplicates by ID
        const uniqueLogs = allLogs.reduce((acc, log) => {
            if (!acc.find(existing => existing.id === log.id)) {
                acc.push(log);
            }
            return acc;
        }, []).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        console.log(`Added ${newLogs.length} new logs, total: ${uniqueLogs.length}`); // Debug
        
        this.setLogs(uniqueLogs);
        return uniqueLogs;
    },
    
    clearLogs() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.LAST_CHECK_KEY);
    },
    
    getLastCheckTime() {
        return localStorage.getItem(this.LAST_CHECK_KEY);
    },
    
    setLastCheckTime(time) {
        localStorage.setItem(this.LAST_CHECK_KEY, time);
    }
};

// Settings Management
// Settings Management

const SettingsManager = {
    SETTINGS_KEY: 'megrez_settings',
    
    getSettings() {
        try {
            const stored = localStorage.getItem(this.SETTINGS_KEY);
            return stored ? JSON.parse(stored) : {
                refreshInterval: 2000, // Default 2 seconds
                maxStoredLogs: 1000,
                maxMemoryMsgs: 10, // New: Maximum chat history messages to send
                maxContextLogs: 50  // New: Maximum log records to send as context
            };
        } catch (err) {
            console.error('Failed to get settings:', err);
            return { 
                refreshInterval: 2000, 
                maxStoredLogs: 1000,
                maxMemoryMsgs: 10,
                maxContextLogs: 50
            };
        }
    },
    
    saveSettings(settings) {
        try {
            localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
        } catch (err) {
            console.error('Failed to save settings:', err);
        }
    }
};

// API utility functions
const api = {
    async get(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },
    
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    },
    
    async delete(url) {
        const response = await fetch(url, { method: 'DELETE' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    }
};

function AIChatPanel({ isOpen, onToggle, currentLogs = [] }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: 'Hello! I\'m Megrez AI, your intelligent log monitoring assistant. I can help you analyze logs, identify issues, and provide insights. How can I assist you today?',
            timestamp: new Date().toISOString()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [settings, setSettings] = useState(SettingsManager.getSettings());
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const updateSettings = () => {
            setSettings(SettingsManager.getSettings());
        };
        
        window.addEventListener('settingsUpdated', updateSettings);
        return () => window.removeEventListener('settingsUpdated', updateSettings);
    }, []);

    // Helper function to truncate text to word limit
    const truncateToWords = (text, wordLimit) => {
        const words = text.split(/\s+/);
        if (words.length <= wordLimit) return text;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    // Helper function to truncate chat history to word limit
    const truncateChatHistory = (chatHistory, wordLimit) => {
        let totalWords = 0;
        const truncatedHistory = [];
        
        // Process in reverse order to keep most recent messages
        for (let i = chatHistory.length - 1; i >= 0; i--) {
            const message = chatHistory[i];
            const messageWords = message.content.split(/\s+/).length;
            
            if (totalWords + messageWords <= wordLimit) {
                truncatedHistory.unshift(message);
                totalWords += messageWords;
            } else {
                // If we can fit part of this message
                const remainingWords = wordLimit - totalWords;
                if (remainingWords > 10) { // Only truncate if we have at least 10 words left
                    const truncatedContent = truncateToWords(message.content, remainingWords);
                    truncatedHistory.unshift({
                        ...message,
                        content: truncatedContent
                    });
                }
                break;
            }
        }
        
        return truncatedHistory;
    };

    // Helper function to format and truncate logs
    const formatLogsForContext = (logs, wordLimit) => {
        if (!logs || logs.length === 0) return "No logs available for analysis.";
        
        let formattedLogs = [];
        let totalWords = 0;
        
        // Start with most recent logs
        const sortedLogs = [...logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        for (const log of sortedLogs) {
            const tagsStr = log.tags && log.tags.length > 0 ? ` [Tags: ${log.tags.join(', ')}]` : '';
            const logEntry = `[${log.timestamp}] ${log.level} - ${log.table_name} - ${log.sender}: ${log.message}${tagsStr}`;
            const logWords = logEntry.split(/\s+/).length;
            
            if (totalWords + logWords <= wordLimit) {
                formattedLogs.push(logEntry);
                totalWords += logWords;
            } else {
                // Try to fit a truncated version
                const remainingWords = wordLimit - totalWords;
                if (remainingWords > 15) { // Only if we have enough space for meaningful content
                    const truncatedMessage = truncateToWords(log.message, remainingWords - 10); // Reserve words for metadata
                    const truncatedEntry = `[${log.timestamp}] ${log.level} - ${log.table_name} - ${log.sender}: ${truncatedMessage}${tagsStr}`;
                    formattedLogs.push(truncatedEntry);
                }
                break;
            }
        }
        
        return formattedLogs.join('\n');
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Prepare chat history with word limit (400 words)
            const rawChatHistory = messages
                .filter(msg => msg.type === 'user' || msg.type === 'ai')
                .slice(-settings.maxMemoryMsgs)
                .map(msg => ({
                    role: msg.type === 'user' ? 'user' : 'assistant',
                    content: msg.content,
                    timestamp: msg.timestamp
                }));
            
            const chatHistory = truncateChatHistory(rawChatHistory, 400);

            // Prepare log context with word limit (800 words)
            const logContextText = formatLogsForContext(
                currentLogs.slice(-settings.maxContextLogs), 
                800
            );

            const response = await api.post('/api/chat', { 
                message: inputMessage,
                chatHistory: chatHistory,
                logContext: logContextText, // Send as formatted text
                settings: {
                    maxMemoryMsgs: settings.maxMemoryMsgs,
                    maxContextLogs: settings.maxContextLogs,
                    chatWordLimit: 400,
                    logWordLimit: 800
                }
            });
            
            if (response.success) {
                const aiMessage = {
                    id: Date.now() + 1,
                    type: 'ai',
                    content: response.response,
                    timestamp: new Date().toISOString(),
                    context: response.context
                };
                setMessages(prev => [...prev, aiMessage]);
            } else {
                throw new Error(response.error || 'AI service failed');
            }
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: 'Sorry, I\'m having trouble connecting to the AI service right now. Please try again later.',
                timestamp: new Date().toISOString(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const quickQuestions = [
        "Analyze recent error logs",
        "What's the system health status?",
        "Show me trending issues",
        "Recommend optimizations"
    ];

    if (!isOpen) return null;

    return (
        <div className="chat-sidebar-container">
            <div className="chat-header-improved">
                <div className="chat-header-content">
                    <div className="chat-avatar-container">
                        <Icons.Bot className="chat-avatar-icon" />
                    </div>
                    <div className="chat-header-info">
                        <h3 className="chat-title">Megrez AI</h3>
                        <div className="chat-status">
                            <div className="chat-status-dot"></div>
                            <span className="chat-status-text">Online • {currentLogs.length} logs</span>
                        </div>
                    </div>
                </div>
                <div className="chat-controls">
                    <button
                        onClick={onToggle}
                        className="chat-control-btn"
                    >
                        <Icons.X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    <div className="chat-messages-improved">
                        {messages.map((message) => (
                            <div key={message.id} className={`chat-message-wrapper ${message.type}`}>
                                <div className={`chat-message-bubble ${message.type} ${message.isError ? 'error' : ''}`}>
                                    {message.type === 'ai' && !message.isError && (
                                        <div className="chat-ai-header">
                                            <Icons.Bot className="chat-ai-icon" />
                                            <span className="chat-ai-label">AI Assistant</span>
                                        </div>
                                    )}
                                    <p className="chat-message-content">{message.content}</p>
                                    <p className="chat-message-time">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="chat-message-wrapper ai">
                                <div className="chat-message-bubble ai">
                                    <div className="chat-ai-header">
                                        <Icons.Bot className="chat-ai-icon" />
                                        <span className="chat-ai-label">AI Assistant</span>
                                    </div>
                                    <div className="chat-typing-indicator">
                                        <div className="chat-typing-dot"></div>
                                        <div className="chat-typing-dot"></div>
                                        <div className="chat-typing-dot"></div>
                                        <span className="chat-typing-text">Analyzing logs...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="chat-quick-questions-improved">
                            <p className="chat-quick-label">Quick questions:</p>
                            <div className="chat-quick-buttons">
                                {quickQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setInputMessage(question)}
                                        className="chat-quick-btn"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="chat-input-improved">
                        <div className="chat-input-container">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={`Ask about ${currentLogs.length} filtered logs...`}
                                className="chat-input-field"
                                disabled={isLoading}
                                rows={1}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="chat-send-btn"
                            >
                                <Icons.Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// Enhanced Login Component
function Login({ onLogin }) {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await api.post('/api/login', { token });
            if (result.success) {
                onLogin(result.username);
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <Icons.Database className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="login-title">Megrez AI Logger</h1>
                    <p className="login-subtitle">Advanced log management & analytics platform for AI agents.</p>
                </div>
                
                {error && (
                    <div className="error-message">
                        <Icons.AlertTriangle className="w-4 h-4" />
                        <span>{error}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            <Icons.Shield className="w-4 h-4" />
                            <span>Access Token</span>
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Enter your access token"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={loading}
                    >
                        {loading && <div className="loading-spinner" />}
                        <span>{loading ? 'Authenticating...' : 'Login'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

// Enhanced Sidebar Component  
function Sidebar({ currentPage, onPageChange, tables, username, onLogout }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Icons.BarChart3, color: 'text-blue-600' },
        { id: 'realtime', label: 'Real-time Track', icon: Icons.Activity, color: 'text-green-600' },
    ];

    return (
        <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-brand">
                    <div className="sidebar-logo">
                        <Icons.Database className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="sidebar-brand-text">
                            <h1 className="sidebar-title">Megrez AI Logger</h1>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="sidebar-nav">
                {sidebarItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => onPageChange(item.id)}
                        >
                            <Icon className={`w-5 h-5 ${item.color}`} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}
                
                {tables.length > 0 && (
                    <div className="nav-section">
                        <div className="nav-section-title">
                            <Icons.Server className="w-4 h-4" />
                            {!isCollapsed && <span>Log Tables</span>}
                        </div>
                        {tables.map(table => 
                            <button
                                key={table}
                                className={`table-item ${currentPage === `table-${table}` ? 'active' : ''}`}
                                onClick={() => onPageChange(`table-${table}`)}
                            >
                                <div className="table-indicator"></div>
                                {!isCollapsed && <span className="table-name">{table}</span>}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="sidebar-footer">
                <button
                    className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
                    onClick={() => onPageChange('settings')}
                >
                    <Icons.Settings className="w-5 h-5 text-gray-600" />
                    {!isCollapsed && <span>Settings</span>}
                </button>
                <div className="user-info">
                    <div className="user-avatar">
                        <Icons.User className="w-4 h-4 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="user-details">
                            <p className="user-name">{username}</p>
                        </div>
                    )}
                    <button
                        className="logout-btn"
                        onClick={onLogout}
                        title="Logout"
                    >
                        <Icons.LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const ActivityTracker = {
    ACTIVITY_KEY: 'megrez_activities',
    MAX_ACTIVITIES: 50,
    
    getActivities() {
        try {
            const stored = localStorage.getItem(this.ACTIVITY_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (err) {
            console.error('Failed to get activities:', err);
            return [];
        }
    },
    
    addActivity(type, message, icon = 'Info', metadata = {}) {
        const activities = this.getActivities();
        const newActivity = {
            id: Date.now(),
            type,
            message,
            icon,
            timestamp: new Date().toISOString(),
            metadata
        };
        
        activities.unshift(newActivity); // Add to beginning
        const trimmedActivities = activities.slice(0, this.MAX_ACTIVITIES);
        
        try {
            localStorage.setItem(this.ACTIVITY_KEY, JSON.stringify(trimmedActivities));
        } catch (err) {
            console.error('Failed to save activity:', err);
        }
        
        // Dispatch event for real-time updates
        window.dispatchEvent(new CustomEvent('activityAdded', { detail: newActivity }));
        
        return newActivity;
    },
    
    clearActivities() {
        localStorage.removeItem(this.ACTIVITY_KEY);
        window.dispatchEvent(new CustomEvent('activitiesCleared'));
    }
};

// Enhanced Dashboard with Recent Activities
function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeframe, setTimeframe] = useState('30d');
    const [activities, setActivities] = useState([]);
    const [realTimeStats, setRealTimeStats] = useState(null);

    useEffect(() => {
        loadDashboard();
        loadActivities();
        
        // Listen for activity updates
        const handleActivityAdded = (event) => {
            setActivities(prev => [event.detail, ...prev.slice(0, 49)]);
        };
        
        const handleActivitiesCleared = () => {
            setActivities([]);
        };
        
        window.addEventListener('activityAdded', handleActivityAdded);
        window.addEventListener('activitiesCleared', handleActivitiesCleared);
        
        return () => {
            window.removeEventListener('activityAdded', handleActivityAdded);
            window.removeEventListener('activitiesCleared', handleActivitiesCleared);
        };
    }, [timeframe]);

    // Calculate real-time statistics from stored logs
    useEffect(() => {
        const calculateRealTimeStats = () => {
            const storedLogs = LogStorage.getLogs();
            const activities = ActivityTracker.getActivities();
            
            if (storedLogs.length === 0) {
                setRealTimeStats({
                    errorRate: '0.0%',
                    uptime: '100.0%',
                    errorTrend: 'up',
                    uptimeTrend: 'up'
                });
                return;
            }

            // Calculate error rate
            const errorLogs = storedLogs.filter(log => log.level === 'ERROR' || log.level === 'CRITICAL');
            const errorRate = ((errorLogs.length / storedLogs.length) * 100).toFixed(1);
            
            // Calculate uptime based on recent errors and system activities
            const recentErrorActivities = activities.filter(activity => 
                activity.type === 'error' && 
                new Date(activity.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
            );
            
            // Simple uptime calculation: 100% - (recent_errors / total_activities * error_weight)
            const totalRecentActivities = activities.filter(activity => 
                new Date(activity.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
            );
            
            let uptime = 100;
            if (totalRecentActivities.length > 0) {
                const errorWeight = 5; // Each error reduces uptime by 5%
                const uptimeReduction = Math.min((recentErrorActivities.length * errorWeight), 30); // Max 30% reduction
                uptime = Math.max(70, 100 - uptimeReduction); // Minimum 70% uptime
            }
            
            // Determine trends (simplified)
            const previousErrorRate = parseFloat(realTimeStats?.errorRate || '0');
            const previousUptime = parseFloat(realTimeStats?.uptime || '100');
            
            setRealTimeStats({
                errorRate: `${errorRate}%`,
                uptime: `${uptime.toFixed(1)}%`,
                errorTrend: parseFloat(errorRate) < previousErrorRate ? 'down' : 'up',
                uptimeTrend: uptime > previousUptime ? 'up' : 'down'
            });
        };

        calculateRealTimeStats();
        
        // Recalculate every 30 seconds
        const interval = setInterval(calculateRealTimeStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadDashboard = async () => {
        setLoading(true);
        try {
            const data = await api.get('/api/dashboard');
            setStats(data);
        } catch (err) {
            console.error('Failed to load dashboard:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const loadActivities = () => {
        const storedActivities = ActivityTracker.getActivities();
        setActivities(storedActivities);
    };

    const getActivityIcon = (iconName) => {
        const iconMap = {
            'Plus': Icons.Plus,
            'CheckCircle': Icons.CheckCircle,
            'AlertTriangle': Icons.AlertTriangle,
            'AlertCircle': Icons.AlertCircle,
            'User': Icons.User,
            'Download': Icons.Download,
            'Settings': Icons.Settings,
            'Trash': Icons.Trash,
            'RefreshCw': Icons.RefreshCw,
            'Database': Icons.Database,
            'Bot': Icons.Bot,
            'Login': Icons.User,
            'Logout': Icons.LogOut,
            'Eye': Icons.Eye
        };
        return iconMap[iconName] || Icons.Info;
    };
    
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffMs = now - time;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffSecs < 60) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner-large"></div>
            </div>
        );
    }

    const kpiCards = [
        { 
            label: 'Total Logs', 
            value: LogStorage.getLogs().length, // Use real data
            change: '+12.5%', 
            trend: 'up',
            icon: Icons.FileText,
            color: 'text-blue-600'
        },
        { 
            label: 'Active Tables', 
            value: stats?.total_tables || 0, 
            change: '+3', 
            trend: 'up',
            icon: Icons.Server,
            color: 'text-green-600'
        },
        { 
            label: 'Error Rate', 
            value: realTimeStats?.errorRate || '0.0%', // Use real data
            change: realTimeStats?.errorTrend === 'down' ? '-0.8%' : '+0.3%', 
            trend: realTimeStats?.errorTrend || 'down',
            icon: Icons.AlertTriangle,
            color: 'text-red-600'
        },
        { 
            label: 'Uptime', 
            value: realTimeStats?.uptime || '100.0%', // Use real data
            change: realTimeStats?.uptimeTrend === 'up' ? '+0.1%' : '-0.2%', 
            trend: realTimeStats?.uptimeTrend || 'up',
            icon: Icons.Shield,
            color: 'text-purple-600'
        }
    ];

    return (
        <div className="page-container dashboard-container">
            <div className="dashboard-header">
                <div className="dashboard-header-content">
                    <div className="dashboard-title-section">
                        <h1 className="page-title">
                            <Icons.BarChart3 className="w-8 h-8 text-blue-600" />
                            <span>Analytics Dashboard</span>
                        </h1>
                        <p className="page-description">Real-time insights and system overview</p>
                    </div>
                    <div className="dashboard-controls">
                        <select
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="form-select-sm"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                        <button className="btn btn-secondary btn-sm" onClick={loadDashboard}>
                            <Icons.RefreshCw className="w-4 h-4" />
                            <span>Refresh</span>
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Icons.Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="kpi-grid">
                {kpiCards.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={index} className="kpi-card">
                            <div className="kpi-header">
                                <div className="kpi-label-section">
                                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                                    <span className="kpi-label">{kpi.label}</span>
                                </div>
                                <div className={`kpi-trend ${kpi.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                                    {kpi.trend === 'up' 
                                        ? <Icons.TrendingUp className="w-4 h-4" />
                                        : <Icons.TrendingDown className="w-4 h-4" />
                                    }
                                    <span>{kpi.change}</span>
                                </div>
                            </div>
                            <div className="kpi-value">{kpi.value}</div>
                        </div>
                    );
                })}
            </div>

            <div className="analytics-grid">
                <div className="analytics-panel activity-panel">
                    <div className="panel-header">
                        <h3 className="panel-title">
                            <Icons.Clock className="w-5 h-5 text-orange-600" />
                            <span>Recent Activity</span>
                        </h3>
                        <div className="panel-controls">
                            <button 
                                className="btn btn-ghost btn-sm"
                                onClick={() => ActivityTracker.clearActivities()}
                                title="Clear all activities"
                            >
                                <Icons.Trash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="panel-content">
                        <div className="activity-feed">
                            {activities.length > 0 ? (
                                activities.slice(0, 6).map((activity) => {
                                    const Icon = getActivityIcon(activity.icon);
                                    return (
                                        <div key={activity.id} className="activity-item">
                                            <div className={`activity-icon ${activity.type}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="activity-content">
                                                <p className="activity-message">{activity.message}</p>
                                                <p className="activity-time">{getTimeAgo(activity.timestamp)}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="empty-state-small">
                                    <Icons.Clock className="w-8 h-8 text-gray-400" />
                                    <p>No recent activity</p>
                                    <p className="text-sm text-gray-500">User actions will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="analytics-panel">
                    <div className="panel-header">
                        <h3 className="panel-title">
                            <Icons.Server className="w-5 h-5 text-purple-600" />
                            <span>Top Tables</span>
                        </h3>
                    </div>
                    <div className="panel-content">
                        {stats?.table_stats && Object.keys(stats.table_stats).length > 0 ? 
                            <div className="table-list">
                                {Object.entries(stats.table_stats).slice(0, 5).map(([tableName, tableStats]) =>
                                    <div key={tableName} className="table-item-detailed">
                                        <div className="table-item-header">
                                            <div className="table-item-name">
                                                <div className="table-indicator"></div>
                                                <span className="table-name">{tableName}</span>
                                            </div>
                                            <span className="table-count">{tableStats.count}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill"
                                                style={{ width: `${Math.min((tableStats.count / 100) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div> :
                            <div className="empty-state">
                                <Icons.Server className="w-12 h-12 text-gray-400" />
                                <p>No tables found</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

// Enhanced Real-time Track Component with Persistent Logs
function RealtimeTrack() {
    const [logs, setLogs] = useState([]);
    const [isTracking, setIsTracking] = useState(true);
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);
    const [viewMode, setViewMode] = useState('table');
    const [autoScroll, setAutoScroll] = useState(true);
    const [settings, setSettings] = useState(SettingsManager.getSettings());
    const [filters, setFilters] = useState({
        level: '',
        search: '',
        table: '', // New table filter
        tag: ''    // New tag filter
    });

    // Load logs from storage on component mount
    useEffect(() => {
        const storedLogs = LogStorage.getLogs();
        console.log(`Loaded ${storedLogs.length} logs from storage`);
        setLogs(storedLogs);
    }, []);

    useEffect(() => {
        let interval;
        if (isTracking) {
            loadRealtimeLogs();
            interval = setInterval(loadRealtimeLogs, settings.refreshInterval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTracking, settings.refreshInterval]);

    const loadRealtimeLogs = async () => {
        try {
            const lastCheck = LogStorage.getLastCheckTime();
            const currentTime = new Date().toISOString();
            
            const url = lastCheck 
                ? `/api/logs/realtime?since=${encodeURIComponent(lastCheck)}`
                : '/api/logs/realtime';
            
            console.log(`Fetching logs from: ${url}`);
            const data = await api.get(url);
            const newLogs = data.logs || [];
            
            console.log(`Received ${newLogs.length} new logs`);
            
            if (newLogs.length > 0) {
                const updatedLogs = LogStorage.addLogs(newLogs);
                setLogs(updatedLogs);
            }
            
            LogStorage.setLastCheckTime(currentTime);
            
        } catch (err) {
            console.error('Failed to load realtime logs:', err);
        }
    };

    // Handle manual log submission
    const handleLogSubmitted = (newLog) => {
        console.log('New log submitted manually:', newLog);
        setLogs(prevLogs => {
            const exists = prevLogs.some(log => log.id === newLog.id);
            if (exists) {
                return prevLogs;
            }
            
            const updatedLogs = [...prevLogs, newLog];
            return updatedLogs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        });
    };

    // Enhanced filtering logic
    const filteredLogs = logs.filter(log => {
        // Level filter
        if (filters.level && log.level !== filters.level) return false;
        
        // Search filter
        if (filters.search && !log.message.toLowerCase().includes(filters.search.toLowerCase())) return false;
        
        // Table filter
        if (filters.table && log.table_name !== filters.table) return false;
        
        // Tag filter
        if (filters.tag) {
            if (!log.tags || !log.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase()))) {
                return false;
            }
        }
        
        return true;
    });

    // Get unique tables and tags for filter options
    const availableTables = [...new Set(logs.map(log => log.table_name).filter(Boolean))];
    const availableTags = [...new Set(logs.flatMap(log => log.tags || []).filter(Boolean))];

    const clearLogs = () => {
        LogStorage.clearLogs();
        setLogs([]);
    };

    const forceRefresh = () => {
        LogStorage.setLastCheckTime(null);
        loadRealtimeLogs();
    };

    return (
        <div className="page-container">
            <div className="realtime-header">
                <div className="realtime-header-content">
                    <div className="realtime-title-section">
                        <h1 className="page-title">
                            <Icons.Activity className="w-8 h-8 text-green-600" />
                            <span>Real-time Monitoring</span>
                        </h1>
                        <p className="page-description">Live log stream and AI-powered monitoring</p>
                    </div>
                    <div className="realtime-controls">
                        <div className="status-indicator-large">
                            <div className={`status-dot-large ${isTracking ? 'tracking' : 'paused'}`}></div>
                            <span>{isTracking ? 'Live Tracking' : 'Paused'}</span>
                        </div>
                        <button
                            className={`btn ${showAIChat ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                            onClick={() => setShowAIChat(!showAIChat)}
                        >
                            <Icons.Bot className="w-4 h-4" />
                            <span>{showAIChat ? "Hide AI Chat" : "Show AI Chat"}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="control-panel">
                <div className="control-group">
                    <button
                        className={`btn ${isTracking ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => setIsTracking(!isTracking)}
                    >
                        {isTracking 
                            ? <Icons.Pause className="w-4 h-4" />
                            : <Icons.Play className="w-4 h-4" />
                        }
                        <span>{isTracking ? 'Pause Stream' : 'Resume Stream'}</span>
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowSubmitForm(!showSubmitForm)}
                    >
                        <Icons.Plus className="w-4 h-4" />
                        <span>Add Log</span>
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={clearLogs}
                    >
                        <Icons.Trash className="w-4 h-4" />
                        <span>Clear Logs</span>
                    </button>

                </div>

                <div className="control-group">

                    <button
                        className="btn btn-secondary"
                        onClick={forceRefresh}
                    >
                        <Icons.RefreshCw className="w-4 h-4" />
                        <span>Force Refresh</span>
                    </button>
                    <button
                        className={`btn ${autoScroll ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setAutoScroll(!autoScroll)}
                        title={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}
                    >
                        <Icons.TrendingDown className="w-4 h-4" />
                        <span>{autoScroll ? 'Auto-scroll ON' : 'Auto-scroll OFF'}</span>
                    </button>
                </div>

                <div className="filter-group-small">
                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.Eye className="w-4 h-4" />
                        </label>
                        <div className="view-mode-toggle">
                            <button
                                className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                <Icons.List className="w-4 h-4" />
                            </button>
                            <button
                                className={`view-mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                                onClick={() => setViewMode('timeline')}
                            >
                                <Icons.Calendar className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.Search className="w-4 h-4" />
                        </label>
                        <div className="filter-control">
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={filters.search}
                                onChange={(e) => setFilters({...filters, search: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {showSubmitForm && (
                <SubmitLogForm 
                    onSubmit={() => setShowSubmitForm(false)} 
                    onLogSubmitted={handleLogSubmitted}
                />
            )}

            <div className={`tracking-content ${showAIChat ? 'with-chat' : ''}`}>
                {showAIChat && (
                    <AIChatPanel
                        isOpen={showAIChat}
                        onToggle={() => setShowAIChat(!showAIChat)}
                        currentLogs={filteredLogs} // Pass filtered logs only
                    />
                )}
                <div className="log-stream-panel">
                    <div className="panel-header">
                        <h3 className="panel-title">
                            Logs ({filteredLogs.length})
                            <span className="text-sm font-normal text-gray-500">
                                • Auto-refresh: {settings.refreshInterval / 1000}s
                                • Stored: {logs.length}/{LogStorage.MAX_LOGS}
                                • Filtered: {filteredLogs.length}
                                • Auto-scroll: {autoScroll ? 'ON' : 'OFF'}
                            </span>
                        </h3>
                        <div className="filter-group-large">
                            <div className="filter-item">
                                <label className="filter-label">
                                    <Icons.Server className="w-4 h-4" />
                                </label>
                                <div className="filter-control">
                                    <select
                                        value={filters.table}
                                        onChange={(e) => setFilters({...filters, table: e.target.value})}
                                    >
                                        <option value="">All Tables</option>
                                        {availableTables.map(table => (
                                            <option key={table} value={table}>{table}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="filter-item">
                                <label className="filter-label">
                                    <Icons.Tags className="w-4 h-4" />
                                </label>
                                <div className="filter-control">
                                    <select
                                        value={filters.tag}
                                        onChange={(e) => setFilters({...filters, tag: e.target.value})}
                                    >
                                        <option value="">All Tags</option>
                                        {availableTags.map(tag => (
                                            <option key={tag} value={tag}>{tag}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="filter-item">
                                <label className="filter-label">
                                    <Icons.Filter className="w-4 h-4" />
                                </label>
                                <div className="filter-control">
                                    <select
                                        value={filters.level}
                                        onChange={(e) => setFilters({...filters, level: e.target.value})}
                                    >
                                        <option value="">All Levels</option>
                                        <option value="DEBUG">DEBUG</option>
                                        <option value="INFO">INFO</option>
                                        <option value="SUCCESS">SUCCESS</option>
                                        <option value="WARN">WARN</option>
                                        <option value="ERROR">ERROR</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="panel-controls">
                            <button className="btn btn-ghost btn-sm">
                                <Icons.Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                    <div className="log-stream">
                        {filteredLogs.length > 0 ? (
                            viewMode === 'table' ? (
                                <EnhancedLogTable logs={filteredLogs} autoScroll={autoScroll} />
                            ) : (
                                <TimelineView logs={filteredLogs} autoScroll={autoScroll} />
                            )
                        ) : (
                            <div className="empty-state">
                                <Icons.Activity className="w-12 h-12 text-gray-400" />
                                <p>No logs matching current filters</p>
                                <p className="text-sm text-gray-500">Logs will appear here in real-time</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Timeline View Component
function TimelineView({ logs, autoScroll = true }) {
    const { scrollRef, scrollToBottom } = useAutoScroll(logs.length, autoScroll);
    
    // Group logs by their first tag, or "untagged" if no tags
    const groupedLogs = logs.reduce((acc, log) => {
        const firstTag = log.tags && log.tags.length > 0 ? log.tags[0] : 'untagged';
        if (!acc[firstTag]) {
            acc[firstTag] = [];
        }
        acc[firstTag].push(log);
        return acc;
    }, {});

    // Sort logs within each group by timestamp
    Object.values(groupedLogs).forEach(group => {
        group.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });

    const formatLevel = (level) => {
        // Normalize level to uppercase for comparison
        const normalizedLevel = level?.toUpperCase();
        
        const configs = {
            'DEBUG': { className: 'log-level-debug' },
            'INFO': { className: 'log-level-info' },
            'SUCCESS': { className: 'log-level-success' },
            'WARN': { className: 'log-level-warn' },
            'ERROR': { className: 'log-level-error' }
        };
        
        const config = configs[normalizedLevel] || configs['INFO'];
        
        return (
            <div className={`log-level ${config.className}`}>
                <span>{level}</span>
            </div>
        );
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    return (
        <div className="timeline-view-container">
            <div className="timeline-view" ref={scrollRef}>
                {Object.entries(groupedLogs).map(([tag, tagLogs]) => (
                    <div key={tag} className="timeline-column">
                        <div className="timeline-column-header">
                            <h4 className="timeline-column-title">
                                <span className="tag" style={{ marginRight: '0.5rem' }}>{tag}</span>
                            </h4>
                            <span className="timeline-column-count">{tagLogs.length} logs</span>
                        </div>
                        <div className="timeline-logs">
                            {tagLogs.map(log => (
                                <div key={log.id} className="timeline-log-item">
                                    <div className="timeline-log-header">
                                        {formatLevel(log.level)}
                                        <span className="timeline-log-time">{formatTime(log.timestamp)}</span>
                                    </div>
                                    <div className="timeline-log-message">{log.message}</div>
                                    <div className="timeline-log-footer">
                                        <span className="timeline-log-table">{log.table_name}</span>
                                        <span className="timeline-log-sender">{log.sender}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Enhanced Log Table Component
function EnhancedLogTable({ logs, autoScroll = true }) {
    const { scrollRef, scrollToBottom } = useAutoScroll(logs.length, autoScroll);
    
    const formatLevel = (level) => {
        // Normalize level to uppercase for comparison
        const normalizedLevel = level?.toUpperCase();
        
        const configs = {
            'DEBUG': { icon: Icons.Settings, className: 'log-level-debug' },
            'INFO': { icon: Icons.Info, className: 'log-level-info' },
            'SUCCESS': { icon: Icons.CheckCircle, className: 'log-level-success' },
            'WARN': { icon: Icons.AlertTriangle, className: 'log-level-warn' },
            'ERROR': { icon: Icons.AlertCircle, className: 'log-level-error' }
        };
        
        const config = configs[normalizedLevel] || configs['INFO'];
        const Icon = config.icon;
        
        return (
            <div className={`log-level ${config.className}`}>
                <Icon className="w-3 h-3" />
                <span>{level}</span>
            </div>
        );
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    return (
        <div className="log-table-container" ref={scrollRef}>
            <table className="log-table">
                <thead>
                    <tr>
                        <th>
                            <div className="table-header">
                                <Icons.Clock className="w-4 h-4" />
                                <span>Time</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.Server className="w-4 h-4" />
                                <span>Table</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.AlertTriangle className="w-4 h-4" />
                                <span>Level</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.FileText className="w-4 h-4" />
                                <span>Message</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.User className="w-4 h-4" />
                                <span>Sender</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => 
                        <tr key={log.id} className="log-row">
                            <td className="timestamp-cell">{formatTime(log.timestamp)}</td>
                            <td>
                                <div className="table-badge">{log.table_name}</div>
                            </td>
                            <td>{formatLevel(log.level)}</td>
                            <td className="message-cell">
                                <div className="message-content">{log.message}</div>
                                {log.tags && log.tags.length > 0 && 
                                    <div className="tag-list">
                                        {log.tags.map(tag => 
                                            <span key={tag} className="tag">{tag}</span>
                                        )}
                                    </div>
                                }
                            </td>
                            <td>
                                <div className="sender-badge">{log.sender}</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function SubmitLogForm({ onSubmit, onLogSubmitted }) {
    const [formData, setFormData] = useState({
        table_name: '',
        level: 'INFO',
        message: '',
        tags: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
            const response = await api.post('/api/logs', { ...formData, tags });
            
            // Add the new log to local storage immediately
            if (response.success && response.log) {
                LogStorage.addLogs([response.log]);
                
                // Dispatch event to update tables
                window.dispatchEvent(new CustomEvent('logsUpdated'));
                
                // Track activity
                ActivityTracker.addActivity(
                    'success',
                    `New ${formData.level} log added to table "${formData.table_name}"`,
                    'Plus',
                    { table: formData.table_name, level: formData.level }
                );
                
                // Notify parent component about the new log if callback exists
                if (onLogSubmitted && typeof onLogSubmitted === 'function') {
                    onLogSubmitted(response.log);
                }
            }
            
            setFormData({ table_name: '', level: 'INFO', message: '', tags: '' });
            onSubmit();
        } catch (err) {
            console.error('Failed to submit log:', err);
            ActivityTracker.addActivity(
                'error',
                'Failed to submit log entry',
                'AlertCircle'
            );
            alert('Failed to submit log');
        }
    };

    return (
        <div className="submit-form-panel">
            <div className="panel-header">
                <h3 className="panel-title">
                    <Icons.Plus className="w-5 h-5 text-blue-600" />
                    <span>Submit New Log Entry</span>
                </h3>
                <button className="btn btn-ghost btn-sm" onClick={onSubmit}>
                    <Icons.X className="w-4 h-4" />
                </button>
            </div>
            <div className="panel-content">
                <form onSubmit={handleSubmit} className="log-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">
                                <Icons.Server className="w-4 h-4" />
                                <span>Table Name</span>
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.table_name}
                                onChange={(e) => setFormData({...formData, table_name: e.target.value})}
                                placeholder="e.g., frontend, backend, api"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">
                                <Icons.AlertTriangle className="w-4 h-4" />
                                <span>Level</span>
                            </label>
                            <select
                                className="form-select"
                                value={formData.level}
                                onChange={(e) => setFormData({...formData, level: e.target.value})}
                            >
                                <option value="DEBUG">🔍 DEBUG</option>
                                <option value="INFO">🔵 INFO</option>
                                <option value="SUCCESS">✅ SUCCESS</option>
                                <option value="WARN">🟡 WARN</option>
                                <option value="ERROR">🔴 ERROR</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">
                            <Icons.FileText className="w-4 h-4" />
                            <span>Message</span>
                        </label>
                        <textarea
                            className="form-textarea"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder="Enter log message..."
                            rows={3}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">
                            <Icons.Tags className="w-4 h-4" />
                            <span>Tags (comma-separated)</span>
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.tags}
                            onChange={(e) => setFormData({...formData, tags: e.target.value})}
                            placeholder="e.g., auth, database, critical"
                        />
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={onSubmit}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <Icons.Plus className="w-4 h-4" />
                            <span>Submit Log</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Table Management Component
function TableManagement({ tableName }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('table');
    const [selectedLogs, setSelectedLogs] = useState(new Set());
    const [filters, setFilters] = useState({
        level: '',
        search: '',
        sender: '',
        tag: ''  // Add tag filter
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    useEffect(() => {
        loadLogs();
    }, [tableName]);

    const loadLogs = async () => {
        setLoading(true);
        console.log(`Loading logs for table: ${tableName}`);
        
        try {
            // Always load from local storage first
            const storedLogs = LogStorage.getLogs();
            console.log(`Found ${storedLogs.length} total logs in storage`);
            
            const tableLogs = storedLogs.filter(log => log.table_name === tableName);
            console.log(`Found ${tableLogs.length} logs for table "${tableName}"`);
            
            setLogs(tableLogs);
            
            // Try to load from server as well (for potential server-only logs)
            try {
                console.log(`Attempting to fetch from server: /api/logs/${tableName}`);
                const data = await api.get(`/api/logs/${tableName}`);
                const serverLogs = data.logs || [];
                console.log(`Server returned ${serverLogs.length} logs`);
                
                if (serverLogs.length > 0) {
                    // Merge server logs with local logs, avoiding duplicates
                    const combinedLogs = [...tableLogs];
                    serverLogs.forEach(serverLog => {
                        if (!combinedLogs.find(localLog => localLog.id === serverLog.id)) {
                            combinedLogs.push(serverLog);
                        }
                    });
                    
                    console.log(`Combined logs: ${combinedLogs.length}`);
                    setLogs(combinedLogs);
                }
            } catch (serverError) {
                console.log('Server request failed, using only local storage:', serverError.message);
                // We already have local logs loaded, so this is fine
            }
        } catch (err) {
            console.error('Failed to load logs:', err);
            // Final fallback - ensure we at least try local storage
            try {
                const storedLogs = LogStorage.getLogs();
                const tableLogs = storedLogs.filter(log => log.table_name === tableName);
                setLogs(tableLogs);
                console.log(`Fallback: loaded ${tableLogs.length} logs from storage`);
            } catch (storageError) {
                console.error('Even local storage failed:', storageError);
                setLogs([]);
            }
        } finally {
            setLoading(false);
        }
    };

    // Listen for log updates
    useEffect(() => {
        const handleLogsUpdated = () => {
            console.log('Logs updated event received, reloading...');
            const storedLogs = LogStorage.getLogs();
            const tableLogs = storedLogs.filter(log => log.table_name === tableName);
            console.log(`Updated: ${tableLogs.length} logs for table "${tableName}"`);
            setLogs(tableLogs);
        };

        const handleStorageChange = (event) => {
            if (event.key === LogStorage.STORAGE_KEY) {
                console.log('Storage change detected');
                handleLogsUpdated();
            }
        };

        window.addEventListener('logsUpdated', handleLogsUpdated);
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('logsUpdated', handleLogsUpdated);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [tableName]);

    const filteredLogs = logs.filter(log => {
        // Level filter
        if (filters.level && log.level !== filters.level) return false;
        
        // Search filter
        if (filters.search && !log.message.toLowerCase().includes(filters.search.toLowerCase())) return false;
        
        // Sender filter
        if (filters.sender && log.sender !== filters.sender) return false;
        
        // Tag filter
        if (filters.tag) {
            if (!log.tags || !log.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase()))) {
                return false;
            }
        }
        
        return true;
    });

    const availableTags = [...new Set(logs.flatMap(log => log.tags || []).filter(Boolean))];

    const handleSelectLog = (logId) => {
        const newSelected = new Set(selectedLogs);
        if (newSelected.has(logId)) {
            newSelected.delete(logId);
        } else {
            newSelected.add(logId);
        }
        setSelectedLogs(newSelected);
    };

    const handleSelectAll = () => {
        if (selectedLogs.size === filteredLogs.length) {
            setSelectedLogs(new Set());
        } else {
            setSelectedLogs(new Set(filteredLogs.map(log => log.id)));
        }
    };

    const handleExport = () => {
        const exportData = filteredLogs.map(log => ({
            timestamp: log.timestamp,
            level: log.level,
            message: log.message,
            sender: log.sender,
            tags: log.tags?.join(', ') || ''
        }));

        const csv = [
            ['Timestamp', 'Level', 'Message', 'Sender', 'Tags'],
            ...exportData.map(row => [
                row.timestamp,
                row.level,
                row.message,
                row.sender,
                row.tags
            ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tableName}_logs_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDeleteTable = async () => {
        try {
            // Try to delete from server
            try {
                await api.delete(`/api/tables/${tableName}`);
                console.log('Table deleted from server');
            } catch (serverError) {
                console.log('Server deletion failed, removing from local storage only');
            }
            
            // Remove from local storage
            const storedLogs = LogStorage.getLogs();
            const remainingLogs = storedLogs.filter(log => log.table_name !== tableName);
            LogStorage.setLogs(remainingLogs);
            
            // Dispatch event to update sidebar
            window.dispatchEvent(new CustomEvent('logsUpdated'));
            
            alert('Table deleted successfully');
            window.location.hash = '#dashboard';
        } catch (err) {
            console.error('Failed to delete table:', err);
            alert('Failed to delete table');
        }
        setShowDeleteConfirm(false);
        setDeleteTarget(null);
    };

    const handleDeleteSelected = async () => {
        try {
            const selectedIds = Array.from(selectedLogs);
            
            // Remove from local storage
            const storedLogs = LogStorage.getLogs();
            const remainingLogs = storedLogs.filter(log => !selectedIds.includes(log.id));
            LogStorage.setLogs(remainingLogs);
            
            // Dispatch event to update other components
            window.dispatchEvent(new CustomEvent('logsUpdated'));
            
            // Update current view
            setLogs(prevLogs => prevLogs.filter(log => !selectedIds.includes(log.id)));
            setSelectedLogs(new Set());
            
            alert(`${selectedIds.length} logs deleted successfully`);
        } catch (err) {
            console.error('Failed to delete logs:', err);
            alert('Failed to delete selected logs');
        }
        setShowDeleteConfirm(false);
        setDeleteTarget(null);
    };

    const confirmDelete = (target) => {
        setDeleteTarget(target);
        setShowDeleteConfirm(true);
    };

    const executeDelete = () => {
        if (deleteTarget === 'table') {
            handleDeleteTable();
        } else if (deleteTarget === 'selected') {
            handleDeleteSelected();
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner-large"></div>
                <p>Loading table data...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="realtime-header">
                <div className="realtime-header-content">
                    <div className="realtime-title-section">
                        <h1 className="page-title">
                            <Icons.Server className="w-8 h-8 text-purple-600" />
                            <span>Table: {tableName}</span>
                        </h1>
                        <p className="page-description">
                            {filteredLogs.length} records • {selectedLogs.size} selected
                            {logs.length !== filteredLogs.length && ` • ${logs.length} total`}
                        </p>
                    </div>
                    <div className="realtime-controls">
                        <button className="btn btn-primary btn-sm" onClick={handleExport}>
                            <Icons.Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => confirmDelete('table')}
                        >
                            <Icons.Trash className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="control-panel">
                <div className="control-group">
                    <button
                        className="btn btn-secondary"
                        onClick={loadLogs}
                    >
                        <Icons.RefreshCw className="w-4 h-4" />
                        <span>Refresh</span>
                    </button>
                    {selectedLogs.size > 0 && (
                        <button
                            className="btn btn-danger"
                            onClick={() => confirmDelete('selected')}
                        >
                            <Icons.Trash className="w-4 h-4" />
                            <span>Delete Selected ({selectedLogs.size})</span>
                        </button>
                    )}
                </div>
                
                <div className="filter-group-large">
                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.Eye className="w-4 h-4" />
                        </label>
                        <div className="view-mode-toggle">
                            <button
                                className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                                onClick={() => setViewMode('table')}
                            >
                                <Icons.List className="w-4 h-4" />
                            </button>
                            <button
                                className={`view-mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                                onClick={() => setViewMode('timeline')}
                            >
                                <Icons.Calendar className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.Tags className="w-4 h-4" />
                        </label>
                        <div className="filter-control">
                            <select
                                value={filters.tag}
                                onChange={(e) => setFilters({...filters, tag: e.target.value})}
                            >
                                <option value="">All Tags</option>
                                {availableTags.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.Filter className="w-4 h-4" />
                        </label>
                        <div className="filter-control">
                            <select
                                value={filters.level}
                                onChange={(e) => setFilters({...filters, level: e.target.value})}
                            >
                                <option value="">All Levels</option>
                                <option value="DEBUG">DEBUG</option>
                                <option value="INFO">INFO</option>
                                <option value="SUCCESS">SUCCESS</option>
                                <option value="WARN">WARN</option>
                                <option value="ERROR">ERROR</option>
                            </select>
                        </div>
                    </div>

                    
                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.User className="w-4 h-4" />
                        </label>
                        <div className="filter-control">
                            <select
                                value={filters.sender}
                                onChange={(e) => setFilters({...filters, sender: e.target.value})}
                            >
                                <option value="">All Senders</option>
                                {[...new Set(logs.map(log => log.sender))].map(sender => (
                                    <option key={sender} value={sender}>{sender}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="filter-item">
                        <label className="filter-label">
                            <Icons.Search className="w-4 h-4" />
                        </label>
                        <div className="filter-control">
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={filters.search}
                                onChange={(e) => setFilters({...filters, search: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="log-stream-panel">
                <div className="panel-header">
                    <h3 className="panel-title">
                        Log Records ({filteredLogs.length})
                        <span className="text-sm font-normal text-gray-500">
                            • Table: {tableName} • Total: {logs.length}
                        </span>
                    </h3>
                    <div className="panel-controls">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedLogs.size === filteredLogs.length && filteredLogs.length > 0}
                                onChange={handleSelectAll}
                                className="checkbox-input"
                            />
                            <span className="text-sm">Select All</span>
                        </label>
                    </div>
                </div>
                <div className="log-stream">
                    {filteredLogs.length > 0 ? (
                        viewMode === 'table' ? (
                            <SelectableLogTable 
                                logs={filteredLogs} 
                                selectedLogs={selectedLogs}
                                onSelectLog={handleSelectLog}
                            />
                        ) : (
                            <TimelineView logs={filteredLogs} />
                        )
                    ) : (
                        <div className="empty-state">
                            <Icons.FileText className="w-12 h-12 text-gray-400" />
                            <p>No logs found in this table</p>
                            <p className="text-sm text-gray-500">
                                Total logs in storage: {LogStorage.getLogs().length}<br/>
                                Logs for table "{tableName}": {logs.length}<br/>
                                Try adjusting your filters or add some logs first
                            </p>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => window.location.hash = '#realtime'}
                                style={{ marginTop: '1rem' }}
                            >
                                Go to Real-time Track to add logs
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showDeleteConfirm && (
                <DeleteConfirmModal
                    target={deleteTarget}
                    tableName={tableName}
                    selectedCount={selectedLogs.size}
                    onConfirm={executeDelete}
                    onCancel={() => {
                        setShowDeleteConfirm(false);
                        setDeleteTarget(null);
                    }}
                />
            )}
        </div>
    );
}


function SelectableLogTable({ logs, selectedLogs, onSelectLog, autoScroll = true }) {
    const { scrollRef, scrollToBottom } = useAutoScroll(logs.length, autoScroll);
    
    const formatLevel = (level) => {
        // Normalize level to uppercase for comparison
        const normalizedLevel = level?.toUpperCase();
        
        const configs = {
            'DEBUG': { icon: Icons.Settings, className: 'log-level-debug' },
            'INFO': { icon: Icons.Info, className: 'log-level-info' },
            'SUCCESS': { icon: Icons.CheckCircle, className: 'log-level-success' },
            'WARN': { icon: Icons.AlertTriangle, className: 'log-level-warn' },
            'ERROR': { icon: Icons.AlertCircle, className: 'log-level-error' }
        };
        
        const config = configs[normalizedLevel] || configs['INFO'];
        const Icon = config.icon;
        
        return (
            <div className={`log-level ${config.className}`}>
                <Icon className="w-3 h-3" />
                <span>{level}</span>
            </div>
        );
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    return (
        <div className="log-table-container" ref={scrollRef}>
            <table className="log-table">
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>
                            <div className="table-header">
                                <span>Select</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.Clock className="w-4 h-4" />
                                <span>Timestamp</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.AlertTriangle className="w-4 h-4" />
                                <span>Level</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.FileText className="w-4 h-4" />
                                <span>Message</span>
                            </div>
                        </th>
                        <th>
                            <div className="table-header">
                                <Icons.User className="w-4 h-4" />
                                <span>Sender</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map(log => 
                        <tr 
                            key={log.id} 
                            className={`log-row ${selectedLogs.has(log.id) ? 'selected' : ''}`}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedLogs.has(log.id)}
                                    onChange={() => onSelectLog(log.id)}
                                    className="checkbox-input"
                                />
                            </td>
                            <td className="timestamp-cell">{formatTime(log.timestamp)}</td>
                            <td>{formatLevel(log.level)}</td>
                            <td className="message-cell">
                                <div className="message-content">{log.message}</div>
                                {log.tags && log.tags.length > 0 && 
                                    <div className="tag-list">
                                        {log.tags.map(tag => 
                                            <span key={tag} className="tag">{tag}</span>
                                        )}
                                    </div>
                                }
                            </td>
                            <td>
                                <div className="sender-badge">{log.sender}</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function DeleteConfirmModal({ target, tableName, selectedCount, onConfirm, onCancel }) {
    const isTableDelete = target === 'table';
    const title = isTableDelete ? 'Delete Table' : 'Delete Selected Logs';
    const message = isTableDelete 
        ? `Are you sure you want to delete the entire table "${tableName}"? This action cannot be undone.`
        : `Are you sure you want to delete ${selectedCount} selected log(s)? This action cannot be undone.`;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">
                        <Icons.AlertTriangle className="w-6 h-6 text-red-600" />
                        <span>{title}</span>
                    </h3>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm}>
                        <Icons.Trash className="w-4 h-4" />
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// Enhanced Settings Component
function Settings() {
    const [settings, setSettings] = useState(SettingsManager.getSettings());
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        SettingsManager.saveSettings(settings);
        setSaved(true);
        
        // Track settings update activity
        ActivityTracker.addActivity(
            'success',
            'Application settings updated',
            'Settings'
        );
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('settingsUpdated'));
        
        setTimeout(() => setSaved(false), 2000);
    };

    const handleClearLogs = () => {
        if (confirm('Are you sure you want to clear all stored logs?')) {
            LogStorage.clearLogs();
            
            // Track clear logs activity
            ActivityTracker.addActivity(
                'warning',
                'All stored logs cleared from browser storage',
                'Trash'
            );
            
            alert('All logs have been cleared from local storage.');
        }
    };

    const handleClearActivities = () => {
        if (confirm('Are you sure you want to clear all activity history?')) {
            ActivityTracker.clearActivities();
            alert('All activities have been cleared.');
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">
                    <Icons.Settings className="w-8 h-8 text-gray-600" />
                    <span>Settings</span>
                </h1>
                <p className="page-description">Configure application preferences and data management</p>
            </div>
            
            <div className="settings-container">
                <div className="settings-grid">
                    <div className="settings-panel">
                        <h3>
                            <Icons.Clock className="w-5 h-5 text-blue-600" />
                            Real-time Monitoring
                        </h3>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Refresh Interval</div>
                                <div className="settings-label-description">
                                    How often to check for new logs (in seconds)
                                </div>
                            </div>
                            <div className="settings-control">
                                <input
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={settings.refreshInterval / 1000}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        refreshInterval: parseInt(e.target.value) * 1000
                                    })}
                                    className="settings-input"
                                />
                            </div>
                        </div>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Max Stored Logs</div>
                                <div className="settings-label-description">
                                    Maximum number of logs to keep in browser storage
                                </div>
                            </div>
                            <div className="settings-control">
                                <input
                                    type="number"
                                    min="100"
                                    max="5000"
                                    step="100"
                                    value={settings.maxStoredLogs}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        maxStoredLogs: parseInt(e.target.value)
                                    })}
                                    className="settings-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="settings-panel">
                        <h3>
                            <Icons.Bot className="w-5 h-5 text-purple-600" />
                            AI Chat Configuration
                        </h3>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Max Memory Messages</div>
                                <div className="settings-label-description">
                                    Number of recent chat messages to send to AI for context
                                </div>
                            </div>
                            <div className="settings-control">
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={settings.maxMemoryMsgs}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        maxMemoryMsgs: parseInt(e.target.value)
                                    })}
                                    className="settings-input"
                                />
                            </div>
                        </div>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Max Context Logs</div>
                                <div className="settings-label-description">
                                    Number of recent log records to send to AI for analysis
                                </div>
                            </div>
                            <div className="settings-control">
                                <input
                                    type="number"
                                    min="10"
                                    max="200"
                                    step="10"
                                    value={settings.maxContextLogs}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        maxContextLogs: parseInt(e.target.value)
                                    })}
                                    className="settings-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="settings-panel">
                        <h3>
                            <Icons.Server className="w-5 h-5 text-green-600" />
                            Data Management
                        </h3>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Clear Stored Logs</div>
                                <div className="settings-label-description">
                                    Remove all logs from browser storage
                                </div>
                            </div>
                            <div className="settings-control">
                                <button
                                    onClick={handleClearLogs}
                                    className="btn btn-danger btn-sm"
                                >
                                    <Icons.Trash className="w-4 h-4" />
                                    <span>Clear Logs</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Clear Activity History</div>
                                <div className="settings-label-description">
                                    Remove all tracked activities from browser storage
                                </div>
                            </div>
                            <div className="settings-control">
                                <button
                                    onClick={handleClearActivities}
                                    className="btn btn-danger btn-sm"
                                >
                                    <Icons.Trash className="w-4 h-4" />
                                    <span>Clear Activities</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="settings-row">
                            <div className="settings-label">
                                <div className="settings-label-title">Storage Status</div>
                                <div className="settings-label-description">
                                    Current storage usage information
                                </div>
                            </div>
                            <div className="settings-control">
                                <div className="text-sm text-gray-600">
                                    <div>{LogStorage.getLogs().length} / {LogStorage.MAX_LOGS} logs stored</div>
                                    <div>{ActivityTracker.getActivities().length} / {ActivityTracker.MAX_ACTIVITIES} activities stored</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="form-actions" style={{ marginTop: '2rem' }}>
                    <button
                        onClick={handleSave}
                        className={`btn ${saved ? 'btn-secondary' : 'btn-primary'}`}
                        disabled={saved}
                    >
                        {saved ? (
                            <>
                                <Icons.CheckCircle className="w-4 h-4" />
                                <span>Saved!</span>
                            </>
                        ) : (
                            <>
                                <Icons.Settings className="w-4 h-4" />
                                <span>Save Settings</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Main App Component
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadTables();
            const interval = setInterval(loadTables, 5000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    // Also update tables when logs change
    useEffect(() => {
        if (isAuthenticated) {
            updateTablesFromLogs();
        }
    }, [isAuthenticated]);

    const checkAuth = async () => {
        try {
            const result = await api.get('/api/check-auth');
            if (result.authenticated) {
                setIsAuthenticated(true);
                setUsername(result.username);
                
                // Track login activity
                ActivityTracker.addActivity(
                    'info',
                    `User "${result.username}" logged in`,
                    'User'
                );
            }
        } catch (err) {
            console.error('Auth check failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadTables = async () => {
        try {
            const data = await api.get('/api/tables');
            const serverTables = data.tables || [];
            
            // Also get tables from local logs
            const localTables = getTablesFromLocalLogs();
            
            // Merge server tables with local tables
            const allTables = [...new Set([...serverTables, ...localTables])];
            
            // Check for new tables
            const previousTables = tables;
            if (previousTables.length > 0) {
                const addedTables = allTables.filter(table => !previousTables.includes(table));
                addedTables.forEach(table => {
                    ActivityTracker.addActivity(
                        'success',
                        `New table "${table}" detected`,
                        'Database',
                        { table }
                    );
                });
            }
            
            setTables(allTables);
        } catch (err) {
            console.error('Failed to load tables:', err);
            // Fallback to local tables if server fails
            const localTables = getTablesFromLocalLogs();
            setTables(localTables);
        }
    };

    const getTablesFromLocalLogs = () => {
        const logs = LogStorage.getLogs();
        const tableNames = [...new Set(logs.map(log => log.table_name))].filter(Boolean);
        return tableNames;
    };

    const updateTablesFromLogs = () => {
        const localTables = getTablesFromLocalLogs();
        setTables(prevTables => {
            const allTables = [...new Set([...prevTables, ...localTables])];
            return allTables;
        });
    };

    // Listen for new logs being added
    useEffect(() => {
        const handleStorageChange = () => {
            updateTablesFromLogs();
        };

        // Listen for log additions
        window.addEventListener('storage', handleStorageChange);
        
        // Custom event for when logs are added programmatically
        window.addEventListener('logsUpdated', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('logsUpdated', handleStorageChange);
        };
    }, []);

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUsername(username);
        
        // Track login activity
        ActivityTracker.addActivity(
            'success',
            `Successfully logged in as "${username}"`,
            'CheckCircle'
        );
    };

    const handleLogout = async () => {
        try {
            // Track logout activity before clearing
            ActivityTracker.addActivity(
                'info',
                `User "${username}" logged out`,
                'Logout'
            );
            
            await api.post('/api/logout');
            setIsAuthenticated(false);
            setUsername('');
            setCurrentPage('dashboard');
            // Clear stored logs on logout
            LogStorage.clearLogs();
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        
        // Track navigation activity
        const pageNames = {
            'dashboard': 'Dashboard',
            'realtime': 'Real-time Monitoring',
            'settings': 'Settings'
        };
        
        let pageName = pageNames[page];
        if (page.startsWith('table-')) {
            const tableName = page.replace('table-', '');
            pageName = `Table: ${tableName}`;
        }
        
        if (pageName) {
            ActivityTracker.addActivity(
                'info',
                `Navigated to ${pageName}`,
                'Eye',
                { page }
            );
        }
    };

    const renderPage = () => {
        if (currentPage === 'dashboard') {
            return <Dashboard />;
        } else if (currentPage === 'realtime') {
            return <RealtimeTrack />;
        } else if (currentPage === 'settings') {
            return <Settings />;
        } else if (currentPage.startsWith('table-')) {
            const tableName = currentPage.replace('table-', '');
            return <TableManagement tableName={tableName} />;
        }
        return <Dashboard />;
    };

    if (loading) {
        return (
            <div className="app-loading">
                <div className="loading-content">
                    <div className="loading-spinner-large"></div>
                    <p className="loading-text">Loading Megrez AI Logger...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="app-container">
            <Sidebar
                currentPage={currentPage}
                onPageChange={handlePageChange}
                tables={tables}
                username={username}
                onLogout={handleLogout}
            />
            <div className="main-content">
                {renderPage()}
            </div>
        </div>
    );
}

const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));