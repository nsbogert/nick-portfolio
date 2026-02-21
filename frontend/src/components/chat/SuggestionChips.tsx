const SUGGESTIONS = [
  "What's Nick's leadership style?",
  'Tell me about Guardrail WA',
  "What's Nick's experience with AI?",
  'Why should I hire Nick?',
  "What did Nick build at Amazon?",
];

interface SuggestionChipsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export default function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          disabled={disabled}
          className="px-3.5 py-1.5 text-xs font-medium bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 disabled:opacity-50 transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
