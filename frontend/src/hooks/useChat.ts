import { useState, useCallback, useRef } from 'react';
import type { ChatMessage, RateLimitState } from '../types';
import { sendChatMessage } from '../services/api';

const SESSION_LIMIT = 10;
const WARNING_THRESHOLD = 8;

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef(generateId());
  const [rateLimit, setRateLimit] = useState<RateLimitState>({
    sessionCount: 0,
    sessionLimit: SESSION_LIMIT,
    warningShown: false,
    limitReached: false,
    dailyLimitReached: false,
  });

  const sendMessage = useCallback(
    async (content: string) => {
      if (rateLimit.limitReached || rateLimit.dailyLimitReached) return;

      const userMsg: ChatMessage = {
        id: generateId(),
        role: 'user',
        content,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      const newCount = rateLimit.sessionCount + 1;

      try {
        const history = messages.map((m) => ({ role: m.role, content: m.content }));
        const response = await sendChatMessage({
          message: content,
          session_id: sessionIdRef.current,
          history,
        });

        const assistantMsg: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: response.response,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setRateLimit((prev) => ({
          ...prev,
          sessionCount: newCount,
          warningShown: newCount >= WARNING_THRESHOLD,
          limitReached: newCount >= SESSION_LIMIT,
        }));
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        if (message.toLowerCase().includes('daily')) {
          setRateLimit((prev) => ({ ...prev, dailyLimitReached: true }));
        }
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, rateLimit]
  );

  const resetSession = useCallback(() => {
    sessionIdRef.current = generateId();
    setMessages([]);
    setRateLimit({
      sessionCount: 0,
      sessionLimit: SESSION_LIMIT,
      warningShown: false,
      limitReached: false,
      dailyLimitReached: false,
    });
    setError(null);
  }, []);

  return { messages, isLoading, error, rateLimit, sendMessage, resetSession };
}
