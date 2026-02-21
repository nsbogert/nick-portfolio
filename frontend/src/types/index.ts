export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  period: string;
  highlights: string[];
  techStack?: string;
  askAiQuestion: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl?: string;
  logoUrl?: string;
  askAiQuestion: string;
}

export interface Principle {
  id: string;
  title: string;
  summary: string;
  details: string;
}

export interface RateLimitState {
  sessionCount: number;
  sessionLimit: number;
  warningShown: boolean;
  limitReached: boolean;
  dailyLimitReached: boolean;
}
