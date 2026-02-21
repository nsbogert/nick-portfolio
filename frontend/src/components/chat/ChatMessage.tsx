import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types';

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
          <Bot size={16} className="text-primary-600" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-md'
            : 'bg-gray-100 text-text-primary rounded-bl-md'
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
}
