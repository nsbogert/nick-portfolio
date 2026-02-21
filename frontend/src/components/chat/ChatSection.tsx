import { useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Section from '../layout/Section';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import { useChatContext } from './ChatProvider';

export default function ChatSection() {
  const { messages, isLoading, error, rateLimit, sendMessage } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const isDisabled = rateLimit.limitReached || rateLimit.dailyLimitReached;

  return (
    <Section id="chat" title="Ask AI About Nick" subtitle="Chat with an AI trained on Nick's experience and background">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
          {/* Messages area */}
          <div ref={scrollRef} className="h-[400px] overflow-y-auto p-5 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                  <MessageCircle size={24} className="text-primary-600" />
                </div>
                <h3 className="font-semibold text-text-primary">Ask me anything</h3>
                <p className="text-sm text-text-secondary mt-1 max-w-sm">
                  I can tell you about Nick's experience, leadership style, projects, and more.
                </p>
                <div className="mt-6">
                  <SuggestionChips onSelect={sendMessage} disabled={isDisabled} />
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                      <MessageCircle size={16} className="text-primary-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Rate limit warnings */}
          {rateLimit.warningShown && !rateLimit.limitReached && (
            <div className="px-5 py-2 bg-amber-50 text-amber-800 text-xs text-center border-t border-amber-200">
              You have {rateLimit.sessionLimit - rateLimit.sessionCount} questions remaining in this session.
            </div>
          )}
          {rateLimit.limitReached && (
            <div className="px-5 py-3 bg-red-50 text-red-800 text-sm text-center border-t border-red-200">
              Session limit reached.{' '}
              <a href="mailto:nick.bogert@gmail.com" className="underline font-medium">
                Contact Nick directly
              </a>{' '}
              or refresh to start a new session.
            </div>
          )}
          {rateLimit.dailyLimitReached && (
            <div className="px-5 py-3 bg-red-50 text-red-800 text-sm text-center border-t border-red-200">
              Daily limit reached. Please try again tomorrow or{' '}
              <a href="mailto:nick.bogert@gmail.com" className="underline font-medium">
                contact Nick directly
              </a>.
            </div>
          )}

          {error && !rateLimit.limitReached && !rateLimit.dailyLimitReached && (
            <div className="px-5 py-2 bg-red-50 text-red-700 text-xs text-center border-t border-red-200">
              {error}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <ChatInput onSend={sendMessage} disabled={isDisabled || isLoading} />
          </div>
        </div>
      </div>
    </Section>
  );
}
