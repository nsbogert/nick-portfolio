import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Ask AI', href: '#chat' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="font-bold text-lg text-primary-800">
            Nick Bogert
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  item.label === 'Ask AI'
                    ? 'bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 hover:text-white'
                    : 'text-text-secondary'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="block py-2 text-sm font-medium text-text-secondary hover:text-primary-600"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
