import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}

export default function Section({ id, title, subtitle, children, className = '', alt = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${alt ? 'bg-surface-alt' : 'bg-surface'} ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">{title}</h2>
            {subtitle && (
              <p className="mt-3 text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
