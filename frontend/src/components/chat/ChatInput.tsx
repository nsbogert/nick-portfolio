import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export default function ChatInput({ onSend, disabled, placeholder, initialValue = '' }: ChatInputProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || 'Ask a question about Nick...'}
        disabled={disabled}
        maxLength={500}
        className="flex-1 px-4 py-2.5 bg-gray-50 border border-border rounded-full text-sm text-text-primary placeholder-text-muted outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 disabled:opacity-50 transition-all"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="shrink-0 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-30 transition-colors"
        aria-label="Send message"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
