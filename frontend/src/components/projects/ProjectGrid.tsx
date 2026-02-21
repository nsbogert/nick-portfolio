import Section from '../layout/Section';
import ProjectCard from './ProjectCard';
import { projects } from '../../data/projects';

export default function ProjectGrid() {
  return (
    <Section id="projects" title="Projects" alt>
      <div className="max-w-3xl mx-auto grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
