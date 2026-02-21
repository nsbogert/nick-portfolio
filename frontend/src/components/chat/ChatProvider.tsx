import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useChat } from '../../hooks/useChat';
import type { ChatMessage, RateLimitState } from '../../types';

interface ChatContextValue {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  rateLimit: RateLimitState;
  sendMessage: (content: string) => Promise<void>;
  resetSession: () => void;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  openWithQuestion: (question: string) => void;
  pendingQuestion: string | null;
  clearPendingQuestion: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useChat();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);

  const openWithQuestion = useCallback((question: string) => {
    setPendingQuestion(question);
    setIsPanelOpen(true);
  }, []);

  const clearPendingQuestion = useCallback(() => setPendingQuestion(null), []);

  return (
    <ChatContext.Provider
      value={{
        ...chat,
        isPanelOpen,
        openPanel,
        closePanel,
        openWithQuestion,
        pendingQuestion,
        clearPendingQuestion,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
