import Section from '../layout/Section';
import StatsGrid from './StatsGrid';
import PrincipleCard from './PrincipleCard';
import { principles } from '../../data/principles';

export default function About() {
  return (
    <Section id="about" title="About" alt>
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-lg text-text-secondary">
          <p>
            Nick Bogert is a seasoned people-first engineering and product leader with a 14.5-year
            career at <strong>Amazon</strong> (2011–2026). Based in Seattle, WA, he is the founder of{' '}
            <strong>Guardrail WA</strong>, a B2B AI compliance startup.
          </p>
          <p>
            His leadership style is defined by a dual-competency in product and engineering,
            underpinned by a deep mastery of A/B testing. As an{' '}
            <strong>Experimentation Bar Raiser</strong> at Amazon, he ran hundreds of tests and
            coached others on designing statistically valid experiments that drive real learning and
            high-judgment decision-making.
          </p>
          <p>
            He holds an MBA from Arizona State University, a BS in Industrial Systems Engineering
            from the University of Washington, and an Associate's degree in Physics obtained during
            high school via Washington's Running Start program.
          </p>
        </div>

        <StatsGrid />

        <div className="mt-12">
          <h3 className="text-xl font-bold text-text-primary mb-4">Leadership Principles</h3>
          <div className="space-y-3">
            {principles.map((p) => (
              <PrincipleCard key={p.id} principle={p} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
