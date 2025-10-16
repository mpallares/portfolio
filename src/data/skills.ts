import { Skill } from './types';

export const skills: Skill[] = [
  // Frontend
  { name: 'JavaScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Zustand', category: 'frontend' },
  { name: 'Wagmi', category: 'frontend' },
  { name: 'Ethers.js', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Viem', category: 'backend' },
  { name: 'Web3', category: 'backend' },

  // Database
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'MySQL', category: 'database' },

  // Tools & Others
  { name: 'Git', category: 'tools' },
  { name: 'AWS', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Vitest', category: 'tools' },
  { name: 'Jest', category: 'tools' },
  { name: 'Cypress', category: 'tools' },
  { name: 'Foundry', category: 'tools' },
  { name: 'Bun', category: 'tools' },
];

// Group skills by category for easy filtering
export const skillsByCategory = {
  frontend: skills.filter((s) => s.category === 'frontend'),
  backend: skills.filter((s) => s.category === 'backend'),
  database: skills.filter((s) => s.category === 'database'),
  tools: skills.filter((s) => s.category === 'tools'),
};
