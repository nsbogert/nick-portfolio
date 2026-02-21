import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'refactor-fitness',
    name: 'Refactor Fitness',
    description:
      'A full-stack fitness tracking application for nutrition logging, workout management (cardio + strength), fasting/water tracking, and progress analytics.',
    features: [
      'Nutrition logging with macro tracking',
      'Workout management for cardio and strength training',
      'Fasting and water intake tracking',
      'Progress analytics and visualizations',
      'Cross-platform mobile app',
    ],
    techStack: ['Flutter/Dart', 'AWS Lambda', 'DynamoDB', 'S3', 'Cognito'],
    liveUrl: 'https://d24fd2bsaghv71.cloudfront.net',
    logoUrl: '/refactor_logo.png',
    askAiQuestion: 'Tell me about Refactor Fitness and how Nick built it.',
  },
];
