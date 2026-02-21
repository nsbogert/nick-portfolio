import { ExternalLink, MessageCircle } from 'lucide-react';
import type { Project } from '../../types';
import { useChatContext } from '../chat/ChatProvider';

export default function ProjectCard({ project }: { project: Project }) {
  const { openWithQuestion } = useChatContext();

  return (
    <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4">
          {project.logoUrl && (
            <img
              src={project.logoUrl}
              alt={`${project.name} logo`}
              className="w-14 h-14 rounded-xl object-contain shrink-0"
            />
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-text-primary">{project.name}</h3>
            <p className="mt-1 text-sm text-text-secondary">{project.description}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-1.5">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-2 text-sm text-text-secondary">
              <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-400" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs font-medium bg-primary-50 text-primary-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ExternalLink size={14} /> View Live
            </a>
          )}
          <button
            onClick={() => openWithQuestion(project.askAiQuestion)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            <MessageCircle size={14} /> Ask AI about this
          </button>
        </div>
      </div>
    </div>
  );
}
