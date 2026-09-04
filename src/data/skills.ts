import { Skill, SkillCategory } from './types';

export const skills: Skill[] = [
  // Frontend
  { name: 'JavaScript', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'React Native', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Redux', category: 'frontend' },
  { name: 'Zustand', category: 'frontend' },
  { name: 'Wagmi', category: 'frontend' },
  { name: 'Ethers.js', category: 'frontend' },

  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'Express', category: 'backend' },
  { name: 'GraphQL', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Solidity', category: 'backend' },
  { name: 'Viem', category: 'backend' },
  { name: 'Web3', category: 'backend' },

  // Database
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Redis', category: 'database' },
  { name: 'MySQL', category: 'database' },

  // Tools & Others
  { name: 'Git', category: 'tools' },
  { name: 'CI/CD', category: 'tools' },
  { name: 'Vitest', category: 'tools' },
  { name: 'Jest', category: 'tools' },
  { name: 'Cypress', category: 'tools' },
  { name: 'Foundry', category: 'tools' },
];

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  /** Tailwind classes for the chips in this group. */
  chipClassName: string;
  skills: Skill[];
}

const groupMeta: { category: SkillCategory; label: string; chipClassName: string }[] = [
  {
    category: 'frontend',
    label: 'Frontend',
    chipClassName: 'bg-blue-500/10 text-blue-300 ring-blue-400/20',
  },
  {
    category: 'backend',
    label: 'Backend',
    chipClassName: 'bg-emerald-500/10 text-emerald-300 ring-emerald-400/20',
  },
  {
    category: 'database',
    label: 'Database',
    chipClassName: 'bg-purple-500/10 text-purple-300 ring-purple-400/20',
  },
  {
    category: 'tools',
    label: 'Tools & DevOps',
    chipClassName: 'bg-amber-500/10 text-amber-300 ring-amber-400/20',
  },
];

/** Skills grouped for display, in a single pass over the list. */
export const skillGroups: SkillGroup[] = groupMeta.map((meta) => ({
  ...meta,
  skills: skills.filter((skill) => skill.category === meta.category),
}));

export const totalSkills = skills.length;
