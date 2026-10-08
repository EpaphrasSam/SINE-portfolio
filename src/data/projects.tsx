import { Project } from "../types/project";

export const projects: Project[] = [
  // {
  //   id: "CarexScholar",
  //   title: "Carex Scholar",
  //   preview:
  //     "Web platform for checking in youth scholars, recording session notes, and managing behavioral health assessments.",
  //   description: [
  //     "Carex Scholar is a web application used by organizations to check in scholars, track group sessions, and manage behavioral health documentation.",
  //     "Staff can log in to check scholars into sessions, complete assessments, and record group and individual notes from a unified interface.",
  //     "The system supports organizations with multiple locations, giving them dashboards to review scholar history, attendance, and risk indicators over time.",
  //     "Built with Next.js, React, TypeScript, and a typed API client to integrate with the Scholar backend for authentication, session data, and assessments.",
  //   ],
  //   type: "web",
  //   icon: (
  //     <svg
  //       className="w-6 h-6"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M12 14l9-5-9-5-9 5 9 5z"
  //       />
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M3 10v6l9 5 9-5v-6"
  //       />
  //     </svg>
  //   ),
  //   tech: ["Next.js", "TypeScript", "React Query", "TailwindCSS"],
  //   url: "https://checkin.carexbhs.com/",
  //   urlLabel: "Carex Scholar",
  // },
  {
    id: "WorkspaceGlobal",
    title: "Workspace Global Client, Talent & Operations Platform",
    preview:
      "Three connected dashboards for a creative-talent marketplace: clients request work, talent delivers it, and an operations team runs everything in between.",
    description: [
      "Workspace Global matches marketing teams with on-demand creative talent. The platform is three React apps in one monorepo: a client dashboard, a talent dashboard, and an internal operations dashboard.",
      "I owned the client app: request submission and approval, deliverables and file previews, checkout, campaigns, brand documents, meeting booking, and the help desk.",
      "I also built features used across all three apps, including real-time chat with channels and archived conversations, announcements and notifications, and auth flows with email verification and password rules, and worked in the operations and talent apps alongside two other frontend engineers.",
      "Built with React, TypeScript, TanStack Router, TanStack Query, Tailwind CSS, and HeroUI in a pnpm/Turborepo monorepo, through to MVP delivery.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
        />
      </svg>
    ),
    tech: ["React", "TypeScript", "TanStack Router", "TanStack Query", "Vite", "Turborepo"],
    links: [
      { label: "Client app", url: "https://client.theworkspaceglobal.com" },
      { label: "Talent app", url: "https://talent.theworkspaceglobal.com" },
      { label: "Operations app", url: "https://operations.theworkspaceglobal.com" },
    ],
  },
  {
    id: "PRS",
    title: "Pure Relief Spa Booking, Store & CRM Platform",
    preview:
      "Operating system for a spa business: online and walk-in bookings, Paystack payments, an online store, loyalty and gift cards, and a staff CRM.",
    description: [
      "Pure Relief Spa is a full platform for a spa and wellness business in Ghana, replacing bookings taken over WhatsApp and recorded in a notebook.",
      "The booking engine serves both online clients and the front desk. Availability is built from opening hours and existing bookings, and slot locks with Firestore transactions stop the same slot being sold twice.",
      "Payments run through Paystack with signed webhook verification, covering booking deposits, store orders, and digital gift cards that can be redeemed in part across several purchases.",
      "Clients earn loyalty points and referral rewards. Staff run the business from a CRM covering bookings, customers, inquiries, inventory, promotions, and SMS and email campaigns, with confirmations sent by SMS and email.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Express.js", "Firebase", "Paystack"],
    url: "https://prs-frontend--prs-site.us-east4.hosted.app/",
    urlLabel: "Platform",
  },
  {
    id: "IExchange",
    title: "IExchange P2P Trading Platform",
    preview:
      "On-chain P2P crypto trading platform with KYC, order management, dispute resolution, and a separate marketing site.",
    description: [
      "IExchange is a P2P cryptocurrency trading platform where strangers trade crypto for cash. The work covered two surfaces: the trading application and a marketing site.",
      "I set up the trading app's architecture and built its core flows: posting and responding to trade offers, KYC verification before a trade starts, order management while it runs, and dispute resolution when one side contests it.",
      "An admin panel gives the team oversight of users, verifications, trades, and disputes.",
      "The marketing site explains crypto-to-cash conversion through peer-to-peer trades, with animated sections and a layout focused on conversion. Both surfaces are built with Next.js, TypeScript, TailwindCSS, and Framer Motion.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    url: "https://app.iexchange.global/",
    urlLabel: "Trading app",
    secondaryUrl: "https://iexchange.global/",
    secondaryUrlLabel: "Marketing site",
  },
  {
    id: "NCCRM",
    title: "NCCRM DataHub",
    preview:
      "Government crisis response platform with geospatial incident tracking and situational analysis.",
    description: [
      "NCCRM DataHub is a crisis response platform built for a government agency, used to record and analyze incident data.",
      "The application features geospatial incident tracking with interactive Leaflet maps and event reporting with comprehensive data capture.",
      "Situational analysis tools provide risk assessment scoring and comparative reporting to support crisis management decisions.",
      "It integrates with a separate backend API and supports role-based access for different user types.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Leaflet", "NextAuth", "SWR"],
  },
  {
    id: "BisaDoctor",
    title: "BisaDoctor Chronic Care Platform",
    preview:
      "Marketing site and backend API for a chronic care platform that connects patients and doctors around vitals and medication management.",
    description: [
      "BisaDoctor is a digital health platform for chronic care management, helping patients track vitals, medications, and connect with doctors remotely.",
      "The marketing site is a Next.js application that explains the product, showcases benefits, and collects leads through forms and waitlists.",
      "The backend API, built with TypeScript, Express, Firebase Auth, and Firestore, powers the mobile app with endpoints for vitals, medications, chats, notes, notifications, and statistics.",
      "Built a doctor-facing web portal for credential submission and verification, and an admin panel for reviewing doctor registrations and managing platform content.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Express.js", "Firebase"],
    url: "https://bisadoctor.com/",
    urlLabel: "Marketing site",
  },
  {
    id: "CPG",
    title: "Crypto Payment Gateway",
    preview:
      "Dashboard and checkout experiences for processing crypto payments through a unified gateway.",
    description: [
      "Crypto Payment Gateway is a platform for merchants to accept and manage crypto payments across multiple chains.",
      "The merchant dashboard provides overviews of transactions, payouts, commissions, and configuration such as API keys and webhooks.",
      "The checkout experience lets customers pay invoices with crypto by connecting their wallets and sending on-chain payments to generated deposit addresses.",
      "Both dashboard and checkout are built with Vue 3, Naive UI, and TypeScript, talking to a Go backend that handles wallets, reconciliation, and payouts.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2h-3M5 20a2 2 0 01-2-2v-5a2 2 0 012-2h3m6-4h4"
        />
      </svg>
    ),
    tech: ["Vue 3", "TypeScript", "Vite", "Naive UI", "Wagmi", "Viem"],
    url: "https://cpg-checkout.web.app/",
    urlLabel: "Checkout",
    secondaryUrl: "https://cpg-dashboard.web.app/",
    secondaryUrlLabel: "Dashboard",
  },
  {
    id: "Hurisoft",
    title: "Hurisoft Website",
    preview:
      "Company website for Hurisoft, showcasing services, products, and thought-leadership content.",
    description: [
      "The Hurisoft website presents the company’s services across AI, blockchain, and software development.",
      "It includes sections for service offerings, product highlights, testimonials, and a blog generated from structured content.",
      "Contact and newsletter forms integrate with external form providers to capture leads without a custom backend.",
      "Built with Next.js, TailwindCSS, and Framer Motion.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7h18M3 12h18M3 17h18"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    url: "https://hurisoft.com/",
    urlLabel: "Website",
  },
  {
    id: "Braszy",
    title: "Braszy Clothing E-commerce",
    preview:
      "Live e-commerce store for a fashion brand, with a CMS-managed catalogue, guest and account checkout, Stripe payments, and an admin dashboard.",
    description: [
      "Braszy is a live e-commerce store for a fashion brand, covering the full path from browsing to checkout and order history.",
      "Products, categories, and banners are managed in Sanity, with the editor embedded in the store's own admin area. Shoppers can filter by apparel type, price, stock, and new releases, and see prices converted into their local currency.",
      "Checkout works for guests and signed-in customers, with each order saved in a single database transaction. Payments run through Stripe, with saved cards and coupon codes.",
      "Customers verify their email with a one-time code, view and cancel orders, and download PDF invoices. Admins get a dashboard with sales statistics, an orders table, and top products.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "MongoDB", "Sanity", "Stripe", "TailwindCSS"],
    url: "https://braszyclothing.com",
  },
  {
    id: "VerseCatch",
    title: "Verse Catch",
    preview:
      "App that detects Bible verses in sermon audio using AI (Whisper, Gemini) and real-time updates.",
    description: [
      "Verse Catch listens to a sermon or talk and shows the Bible verses being referenced as they are spoken.",
      "Audio is recorded in the browser in short chunks, transcribed with OpenAI Whisper, and stitched back into complete sentences before Google Gemini looks for explicit, implicit, and contextual verse references.",
      "Every reference Gemini returns is checked against a verse database across several translations, so a verse the model invents never reaches the screen.",
      "Detected verses are pushed to the browser in real time with Pusher. The database runs on SQLite in development and PostgreSQL in production.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI Whisper", "Gemini", "Pusher"],
    url: "https://verse-catch-pink.vercel.app",
  },
  {
    id: "MoMoXpress",
    title: "MoMoXpress Calculator",
    preview:
      "A modern web application for calculating mobile money transfer charges across different telecommunications networks in Ghana.",
    description: [
      "MoMoXpress calculates mobile money transfer fees across Ghana's telecom networks, so users know the full cost before they send.",
      "Fees are calculated in real time and include the E-levy automatically, across transfers within and between networks.",
      "Phone numbers are validated against each network's prefixes, so the right fee schedule is applied to the right provider.",
      "Users can subscribe to SMS updates when fees change. Built with Next.js, TypeScript, NextUI, and Framer Motion.",
    ],
    type: "web",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "NextUI", "Framer Motion"],
    url: "https://momoxpress.vercel.app",
  },
  {
    id: "CampServe",
    title: "Campserve Mobile Application",
    preview:
      "Mobile app connecting university students with campus service providers for bookings, payments, and real-time chat.",
    description: [
      "CampServe is a mobile app connecting university students with campus service providers for laundry, food, tutoring, and more.",
      "Service providers manage their listings and bookings through a dedicated dashboard. Students browse nearby services, book, and pay through an integrated payment flow.",
      "Real-time chat connects students with providers after booking. A rating system covers both sides of each transaction.",
      "Location-based discovery surfaces providers close to the student's current position. Built with React Native and Flask.",
    ],
    type: "mobile",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 012-2h.5a2 2 0 012 2v14a2 2 0 002 2h2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    tech: ["React Native", "Flask", "PostgreSQL", "TailwindCSS"],
  },

  {
    id: "BudgetBuddy",
    title: "BudgetBuddy Finance App",
    preview:
      "Personal finance mobile app for expense tracking, budget alerts, and savings goal management.",
    description: [
      "BudgetBuddy is a personal finance app for tracking expenses, managing budgets, and setting savings goals.",
      "Expenses are automatically categorized, with custom categories available. Budget caps trigger alerts when spending approaches the limit.",
      "Visual charts break down spending by category and time period. Savings goals track progress toward user-defined targets.",
      "Built with React Native, Expo, TypeScript, and Tamagui.",
    ],
    type: "mobile",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    tech: ["React Native", "Expo", "TypeScript", "Tamagui"],
  },
  {
    id: "WeMoveManager",
    title: "We Move Manager App",
    preview:
      "Mobile manager app for monitoring and managing We Move deliveries across ongoing, scheduled, and unconfirmed orders.",
    description: [
      "We Move Manager is an internal mobile app for operations staff to monitor and manage deliveries in real time.",
      "The home dashboard shows delivery statistics and separates ongoing, scheduled, and unconfirmed deliveries into focused views.",
      "Data fetching is powered by React Query and a token-based API client that stores sessions securely and automatically logs managers out on unauthorized responses.",
      "Built with Expo, React Native, Expo Router, Gluestack UI, NativeWind, and integrations for location, notifications, and maps to support day-to-day logistics workflows.",
    ],
    type: "mobile",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h10M7 12h6M7 17h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
        />
      </svg>
    ),
    tech: [
      "React Native",
      "Expo",
      "Expo Router",
      "React Query",
      "Gluestack UI",
    ],
  },
];
