import { Linkedin, Github, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useChatContext } from '../chat/ChatProvider';

export default function Hero() {
  const { openWithQuestion } = useChatContext();
  const [miniInput, setMiniInput] = useState('');

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (miniInput.trim()) {
      openWithQuestion(miniInput.trim());
      setMiniInput('');
    }
  };

  return (
    <section className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-primary-50 via-white to-accent-400/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Photo */}
          <div className="shrink-0">
            <img
              src="/NickSuit.jpg"
              alt="Nick Bogert"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl ring-4 ring-white"
            />
          </div>

          {/* Content */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
              Nick Bogert
            </h1>
            <p className="mt-3 text-lg md:text-xl text-primary-600 font-medium">
              Engineering Leader &middot; AI Builder &middot; Founder
            </p>
            <p className="mt-4 text-text-secondary max-w-lg text-lg">
              Product-minded engineering leader with 14.5 years at Amazon, building
              teams that ship at scale. Now building the future of AI compliance.
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/nickbogert/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/njbogert"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-secondary rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
            </div>

            {/* Mini chat input */}
            <form onSubmit={handleMiniSubmit} className="mt-8 max-w-md mx-auto md:mx-0">
              <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
                <MessageCircle size={18} className="text-primary-500 shrink-0" />
                <input
                  type="text"
                  value={miniInput}
                  onChange={(e) => setMiniInput(e.target.value)}
                  placeholder="Ask AI about Nick..."
                  className="flex-1 outline-none text-sm text-text-primary placeholder-text-muted bg-transparent"
                />
                <button
                  type="submit"
                  className="text-sm font-medium text-primary-600 hover:text-primary-700 shrink-0"
                >
                  Ask
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
