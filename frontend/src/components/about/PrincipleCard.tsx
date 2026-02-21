import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Principle } from '../../types';

export default function PrincipleCard({ principle }: { principle: Principle }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <div>
          <h4 className="font-semibold text-text-primary">{principle.title}</h4>
          <p className="text-sm text-text-secondary mt-0.5">{principle.summary}</p>
        </div>
        <span className="shrink-0 ml-3 text-text-muted">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-sm text-text-secondary border-t border-border pt-3">
          {principle.details}
        </div>
      )}
    </div>
  );
}
