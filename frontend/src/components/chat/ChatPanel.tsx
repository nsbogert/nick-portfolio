import { useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionChips from './SuggestionChips';
import { useChatContext } from './ChatProvider';

export default function ChatPanel() {
  const {
    messages,
    isLoading,
    error,
    rateLimit,
    sendMessage,
    isPanelOpen,
    openPanel,
    closePanel,
    pendingQuestion,
    clearPendingQuestion,
  } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-send pending question
  useEffect(() => {
    if (isPanelOpen && pendingQuestion) {
      sendMessage(pendingQuestion);
      clearPendingQuestion();
    }
  }, [isPanelOpen, pendingQuestion, sendMessage, clearPendingQuestion]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const isDisabled = rateLimit.limitReached || rateLimit.dailyLimitReached;

  return (
    <>
      {/* Floating button */}
      {!isPanelOpen && (
        <button
          onClick={openPanel}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 flex items-center justify-center transition-all hover:scale-105"
          aria-label="Open AI chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Panel overlay */}
      {isPanelOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={closePanel}
          />
          <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[420px] md:max-h-[600px] h-[85vh] md:h-auto bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden md:border md:border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-primary-600 text-white md:rounded-t-2xl">
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                <span className="font-semibold text-sm">Ask AI About Nick</span>
              </div>
              <button onClick={closePanel} className="p-1 hover:bg-white/20 rounded-lg transition-colors" aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <p className="text-sm text-text-secondary mb-4">Try one of these questions:</p>
                  <SuggestionChips onSelect={sendMessage} disabled={isDisabled} />
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
              <div className="px-4 py-1.5 bg-amber-50 text-amber-800 text-xs text-center">
                {rateLimit.sessionLimit - rateLimit.sessionCount} questions remaining
              </div>
            )}
            {rateLimit.limitReached && (
              <div className="px-4 py-2 bg-red-50 text-red-800 text-xs text-center">
                Session limit reached.{' '}
                <a href="mailto:nick.bogert@gmail.com" className="underline">Contact Nick</a>
              </div>
            )}
            {rateLimit.dailyLimitReached && (
              <div className="px-4 py-2 bg-red-50 text-red-800 text-xs text-center">
                Daily limit reached. Try again tomorrow.
              </div>
            )}

            {error && !rateLimit.limitReached && !rateLimit.dailyLimitReached && (
              <div className="px-4 py-1.5 bg-red-50 text-red-700 text-xs text-center">{error}</div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border">
              <ChatInput onSend={sendMessage} disabled={isDisabled || isLoading} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
