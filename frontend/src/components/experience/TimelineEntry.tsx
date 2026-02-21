import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import type { ExperienceEntry } from '../../types';
import { useChatContext } from '../chat/ChatProvider';

export default function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  const [isOpen, setIsOpen] = useState(false);
  const { openWithQuestion } = useChatContext();

  return (
    <div className="relative pl-8 pb-10 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-primary-200" />
      {/* Timeline dot */}
      <div className="absolute left-[-5px] top-1.5 w-[11px] h-[11px] rounded-full bg-primary-500 border-2 border-white" />

      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-start justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full">
                {entry.period}
              </span>
              <span className="text-xs text-text-muted">{entry.company}</span>
            </div>
            <h3 className="mt-1.5 font-semibold text-text-primary">{entry.title}</h3>
            {!isOpen && (
              <p className="mt-1 text-sm text-text-secondary line-clamp-1">
                {entry.highlights[0]}
              </p>
            )}
          </div>
          <span className="shrink-0 ml-3 mt-1 text-text-muted">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </button>

        {isOpen && (
          <div className="px-5 pb-4 border-t border-border pt-3">
            <ul className="space-y-2">
              {entry.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-text-secondary">
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            {entry.techStack && (
              <p className="mt-3 text-xs text-text-muted">
                <span className="font-medium">Tech:</span> {entry.techStack}
              </p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                openWithQuestion(entry.askAiQuestion);
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <MessageCircle size={14} /> Ask AI about this
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
