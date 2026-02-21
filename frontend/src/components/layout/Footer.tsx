import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-bold text-lg">Nick Bogert</p>
            <p className="text-text-muted text-sm mt-1">
              Engineering Leader &middot; AI Builder &middot; Founder
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="mailto:nick.bogert@gmail.com"
              className="text-text-muted hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/nickbogert/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/njbogert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} Nick Bogert. Built with React, Tailwind CSS, and Claude.</p>
        </div>
      </div>
    </footer>
  );
}
