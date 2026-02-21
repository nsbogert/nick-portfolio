import Section from '../layout/Section';
import TimelineEntry from './TimelineEntry';
import { experiences } from '../../data/experience';

export default function ExperienceTimeline() {
  return (
    <Section id="experience" title="Experience" subtitle="20 years of building teams and products">
      <div className="max-w-3xl mx-auto">
        {experiences.map((entry) => (
          <TimelineEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </Section>
  );
}
