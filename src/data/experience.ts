import { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'frontend-staking-rewards',
    company: 'Staking Rewards',
    role: 'Frontend Engineer',
    duration: '6 months',
    startDate: '2024-07',
    endDate: 'Present',
    description: 'Leading frontend development for Web3 staking platform, focusing on multi-chain integration and user experience optimization.',
    achievements: [
      'Integrated multiple crypto assets into the staking app by interfacing with internal Web3 SDK and smart contract methods, significantly expanding protocol coverage',
      'Successfully migrated entire frontend architecture from Next.js 13 to Next.js 15, improving performance and aligning with latest framework standards',
      'Took full ownership of core app sections including the Reward Options Table, improving user engagement and strengthening VSP value proposition',
      'Built and maintained comprehensive E2E test coverage using Cypress, leading frontend testing strategy and ensuring long-term stability',
      'Technologies: React, Next.js 15, GraphQL, Tailwind CSS, Google Cloud, Jest, Cypress'
    ],
    logo: '/images/companies/staking-rewards.png'
  },
  {
    id: 'software-engineer-fides',
    company: 'Fides Technology',
    role: 'Software Engineer',
    duration: '1 year',
    startDate: '2023-01',
    endDate: '2024-01',
    description: 'Full-stack development for corporate governance platform, delivering features that increased customer satisfaction and development efficiency.',
    achievements: [
      'Delivered key features including shareholder import, secret voting, and German commercial register integration, increasing customer satisfaction by 20%',
      'Designed and implemented maintainable, reusable components for in-house UI library, saving 100+ hours of development time across teams',
      'Created CI/CD pipelines and automation workflows, streamlining deployment processes and reducing manual intervention',
      'Led frontend testing initiatives, contributing 40% of company\'s total frontend and E2E test coverage',
      'Technologies: TypeScript, Redux, Node.js, TypeORM, PostgreSQL, AWS, Jest'
    ],
    logo: '/images/companies/fides.png'
  },
  {
    id: 'software-engineer-nuri',
    company: 'Nuri GmbH',
    role: 'Software Engineer',
    duration: '1 year',
    startDate: '2022-01',
    endDate: '2023-01',
    description: 'Full-stack development for fintech mobile and web applications, implementing new features and improving user experience.',
    achievements: [
      'Maintained and enhanced native mobile app and web application, delivering consistent feature updates and bug fixes',
      'Applied AGILE principles and provided solutions for customer-facing applications and internal tools',
      'Collaborated with marketing and design teams to redesign Crypto section in native app, increasing user experience metrics by 20%',
      'Implemented automated testing strategies and conducted manual testing to ensure application quality',
      'Technologies: TypeScript, React Native, GraphQL, Apollo Client, MongoDB, SQL, Jest, Redis, AWS'
    ],
    logo: '/images/companies/nuri.png'
  }
];
