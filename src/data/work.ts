import { projects } from './projects';
import { projectData } from './projectData';
import type { Project } from '../types/project';

/**
 * Optional depth, layered on top of a project.
 *
 * Every project gets a page. The ones with an entry here simply have more on
 * it — no separate tier and no badge, so length does the signalling rather
 * than a label promising something the page may not deliver.
 */
export interface WorkDetail {
  org?: string;
  period?: string;
  status?: string;
  domain?: string;
  /** The thing that made it hard — what separates it from a CRUD app. */
  constraint?: string;
  /** What you owned, as distinct from what the team owned. */
  owned?: string[];
}

/** Keyed by the project id in projects.tsx. */
const details: Record<string, WorkDetail> = {
  IExchange: {
    org: 'Hurisoft',
    period: 'Nov 2024 – Jul 2025',
    status: 'Live',
    domain: 'Fintech',
    constraint:
      'Strangers moving real money between each other. Every trade needs an identity check before it starts, an escrow-shaped flow while it runs, and an adjudication path when one side disputes it. None of those are features you can add later — they shape the data model from the first commit.',
    owned: [
      'Set up the project architecture for the trading application',
      'Built the core P2P trading flows — posting and responding to trade offers',
      'Built KYC verification and order management',
      'Built the dispute resolution flow',
      'Built the admin panel',
      'Built the marketing site — a separate surface focused on conversion',
    ],
  },
  CPG: {
    status: 'Live',
    domain: 'Fintech',
    constraint:
      'Money arriving on-chain, asynchronously, from addresses generated per invoice — and merchants who need the ledger to reconcile exactly. The failure mode is not a broken page, it is a payment that landed but was never credited.',
    owned: [
      'Built the merchant dashboard — transactions, payouts, commissions',
      'Built merchant configuration including API keys and webhooks',
      'Built the checkout flow — wallet connection and on-chain payment to generated deposit addresses',
      'Integrated against a Go backend handling wallets, reconciliation and payouts',
    ],
  },
  BisaDoctor: {
    status: 'Live',
    domain: 'Healthcare',
    constraint:
      'Clinical data and clinical identity. Vitals and medication records carry a different bar for correctness than most application data, and a platform that lets someone present as a doctor needs credential verification that a human actually reviews.',
    owned: [
      'Built the backend API in TypeScript and Express with Firebase Auth and Firestore',
      'API surface covering vitals, medications, chats, notes, notifications and statistics',
      'Built the doctor-facing portal for credential submission and verification',
      'Built the admin panel for reviewing doctor registrations and managing content',
      'Built the marketing site with lead capture and waitlist',
    ],
  },
  Soccersm: {
    org: 'Hurisoft',
    period: 'Nov 2024 – Jul 2025',
    status: 'Live',
    domain: 'Web3 / Consumer',
    constraint:
      'Two clocks that will not wait. Live fixtures arrive from external sports APIs on their own schedule, and on-chain pool settlement runs on the chain’s. The interface has to stay truthful while both are mid-flight, and fast enough that someone placing a prediction before kickoff does not lose the window.',
    owned: [
      'Resolved frontend defects and stabilised the platform’s key user flows',
      'Improved frontend performance, reducing load times across the app',
      'Worked across the prediction, challenge pool and leaderboard surfaces',
      'Web3 integration via Thirdweb, Wagmi and Viem for wallet connection and on-chain pools',
    ],
  },
  NCCRM: {
    status: 'Internal',
    domain: 'Government',
    constraint:
      'Government incident data, which makes the access model part of the product rather than a layer on top of it. Different user types see different slices of the same record, and the reporting has to hold up as a basis for decisions made under time pressure.',
    owned: [
      'Geospatial incident tracking with interactive Leaflet maps',
      'Event reporting with comprehensive data capture',
      'Situational analysis — risk assessment scoring and comparative reporting',
      'Role-based access across user types',
    ],
  },
};

export interface WorkEntry {
  slug: string;
  project: Project;
  detail: WorkDetail;
  images: string[];
}

/** Stable, readable URLs. Anything unlisted falls back to a kebab-cased id. */
const slugs: Record<string, string> = {
  IExchange: 'iexchange',
  CPG: 'crypto-payment-gateway',
  BisaDoctor: 'bisadoctor',
  Soccersm: 'soccersm',
  NCCRM: 'nccrm-datahub',
  Hurisoft: 'hurisoft',
  Braszy: 'braszy',
  VerseCatch: 'verse-catch',
  MoMoXpress: 'momoxpress',
  CampServe: 'campserve',
  BudgetBuddy: 'budgetbuddy',
  WeMoveManager: 'we-move-manager',
};

export function slugFor(id: string) {
  return slugs[id] ?? id.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/** Every project, in the order they are ranked in projects.tsx. */
export const workEntries: WorkEntry[] = projects.map((project) => ({
  slug: slugFor(project.id),
  project,
  detail: details[project.id] ?? {},
  images: projectData[project.id]?.images ?? [],
}));

/** The four that lead the homepage carousel. */
export const featuredWork = workEntries.slice(0, 4);

export function getWork(slug: string) {
  return workEntries.find((e) => e.slug === slug);
}
