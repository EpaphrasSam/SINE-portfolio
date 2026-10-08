import { projects } from './projects';
import { projectData } from './projectData';
import type { Project } from '../types/project';

/**
 * Optional depth, layered on top of a project.
 *
 * Every project gets a page. The ones with an entry here simply have more on
 * it. There is no separate tier and no badge, so length does the signalling rather
 * than a label promising something the page may not deliver.
 */
export interface WorkDetail {
  org?: string;
  period?: string;
  status?: string;
  domain?: string;
  /** The thing that made it hard: what separates it from a CRUD app. */
  constraint?: string;
  /** What you owned, as distinct from what the team owned. */
  owned?: string[];
}

/** Keyed by the project id in projects.tsx. */
const details: Record<string, WorkDetail> = {
  WorkspaceGlobal: {
    org: 'Workspace Global',
    period: 'May 2026 – Oct 2026',
    status: 'Live',
    domain: 'Marketplace / Operations',
    constraint:
      "One request, seen from three sides. A client raises it, the operations team scopes and assigns it, and talent delivers against it, each in their own app. Status, permissions, chat, and deliverables all have to agree across the three in real time, without any side seeing what it shouldn't.",
    owned: [
      'Owned the client app end to end: request submission and approval, deliverables and file previews, checkout, campaigns, brand documents, and meeting booking',
      'Built the client help desk with video guides and search',
      'Built real-time chat shared across all three apps, with channels, archived conversations, and markdown messages',
      'Built announcements and the notifications drawer used in the client, operations, and talent apps',
      'Built auth flows with email verification and password rules',
      "Built features in the operations and talent apps, including delivery settings and the talent dashboard's live stats and onboarding",
      'Worked in a three-person frontend team on a shared pnpm/Turborepo monorepo through to MVP delivery',
    ],
  },
  PRS: {
    status: 'Live',
    domain: 'Wellness / Commerce',
    constraint:
      "The same therapist's hour is sold in two places at once: online, at any time of day, and at the front desk to whoever walks in. Two people must never hold the same slot, so availability can't be a calculation shown on screen; it has to be enforced when the booking is written. On top of that, money arrives asynchronously through Paystack webhooks and has to land against the right booking, order, or gift card, including deposits and partial redemptions.",
    owned: [
      'Built the booking engine for online self-service and walk-in bookings, with availability built from opening hours, service durations, and existing bookings',
      'Prevented double bookings with short-lived slot locks and Firestore transactions that check for conflicts at write time',
      'Integrated Paystack for booking deposits, store checkout, and gift card purchases, verifying every webhook with an HMAC signature',
      'Built the online store with product options, stock tracking, and delivery or in-store pickup',
      'Built the loyalty programme: points earned across bookings, purchases, reviews, and tasks, redeemable at checkout, plus a referral programme with unique links',
      'Built digital gift cards with unique codes, email delivery, and partial redemption across multiple purchases',
      'Built the staff CRM covering bookings, customers, inquiries, products and orders, promotions, reviews, the blog, newsletters, and SMS campaigns, plus a therapist portal and team role management',
      'Sent booking, order, and gift card confirmations by SMS (Moolre) and email (Mailgun)',
      'Wrote end-to-end test scripts covering auth, bookings, payments, and role changes, and set up CI deploys to Firebase',
    ],
  },
  IExchange: {
    org: 'Hurisoft',
    period: 'Nov 2024 – Jul 2025',
    status: 'Live',
    domain: 'Fintech',
    constraint:
      "Strangers moving real money between each other. Every trade needs an identity check before it starts, an escrow-shaped flow while it runs, and an adjudication path when one side disputes it. None of those are features you can add later. They shape the data model from the first commit.",
    owned: [
      'Set up the project architecture for the trading application',
      'Built the core P2P trading flows: posting and responding to trade offers',
      'Built KYC verification and order management',
      'Built the dispute resolution flow',
      'Built the admin panel',
      'Built the marketing site, a separate surface focused on conversion',
    ],
  },
  CPG: {
    status: 'Live',
    domain: 'Fintech',
    constraint:
      'Money arriving on-chain, asynchronously, from addresses generated per invoice, and merchants who need the ledger to reconcile exactly. The failure mode is not a broken page. It is a payment that landed but was never credited.',
    owned: [
      'Built the merchant dashboard for transactions, payouts, and commissions',
      'Built merchant configuration including API keys and webhooks',
      'Built the checkout flow: wallet connection and on-chain payment to generated deposit addresses',
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
  VerseCatch: {
    status: 'Live',
    domain: 'AI / Audio',
    constraint:
      "Speech is continuous, but transcription works on separate chunks of audio, so a single verse reference can be split across two of them. And the verses shown have to be real, even though they are detected by a language model that can invent references.",
    owned: [
      'Recorded audio in the browser in short chunks and converted each one to WAV before upload',
      'Transcribed each chunk with OpenAI Whisper, tagged with a sequence number so the text stays in order',
      'Built an accumulator that buffers text until it forms complete sentences, and resets when a chunk arrives out of sequence',
      'Detected explicit, implicit, and contextual references ("the next verse") with Google Gemini, keeping only matches above a confidence threshold',
      'Checked every detected reference against a verse database, falling back to NIV when a translation is missing, so invented verses never reach the screen',
      'Pushed detected verses to the browser in real time with Pusher',
      'Ran SQLite in development and PostgreSQL on Neon in production, with a warmup endpoint that keeps the database ready',
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
      'Situational analysis: risk assessment scoring and comparative reporting',
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
  WorkspaceGlobal: 'workspace-global',
  PRS: 'pure-relief-spa',
  IExchange: 'iexchange',
  CPG: 'crypto-payment-gateway',
  BisaDoctor: 'bisadoctor',
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

/** The five that lead the homepage carousel. */
export const featuredWork = workEntries.slice(0, 5);

export function getWork(slug: string) {
  return workEntries.find((e) => e.slug === slug);
}
