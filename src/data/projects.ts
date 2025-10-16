import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'erc1155-claim',
    title: 'ERC1155 NFT Claim App',
    description: 'Web3 application for claiming ERC1155 NFTs with wallet integration and real-time updates.',
    longDescription: 'Built a modern Web3 application enabling users to connect their wallets, view NFT collections, and claim tokens directly from smart contracts. Features server-side data fetching, client-side reactive updates with React Query, and optimized performance through code splitting and lazy loading.',
    image: '/images/projects/erc1155-claim.jpg',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'wagmi v2', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://erc1155-claim.vercel.app',
    githubUrl: 'https://github.com/mpallares/erc1155-claim',
    category: 'Frontend'
  },
  {
    id: 'erc4626-deposit',
    title: 'ERC-4626 Vault Deposit Library',
    description: 'TypeScript library for secure ERC-4626 vault deposit transactions with comprehensive validation.',
    longDescription: 'Developed a production-ready TypeScript library for interacting with ERC-4626 vault deposit mechanisms. Features include balance and allowance validation, deposit limit enforcement, gas estimation, and 100% test coverage using real smart contracts deployed on local Anvil blockchain. Leverages audited OpenZeppelin contracts for secure implementation.',
    image: '/images/projects/erc4626-deposit.jpg',
    technologies: ['TypeScript', 'Viem', 'Foundry', 'Bun', 'OpenZeppelin', 'Anvil'],
    githubUrl: 'https://github.com/mpallares/erc4626-deposit',
    category: 'Backend'
  },
  {
    id: 'staking-rewards',
    title: 'Staking Rewards Dashboard',
    description: 'Real-time dashboard for monitoring staking rewards and performance metrics across multiple protocols.',
    longDescription: 'Developed a comprehensive dashboard for users to track their staking rewards across multiple blockchain networks. Features include real-time analytics, performance comparisons, and personalized insights.',
    image: '/images/projects/staking.jpg',
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
    liveUrl: 'https://www.stakingrewards.com',
    category: 'Frontend'
  }
];
