import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "CarexScholar",
    title: "Carex Scholar",
    preview:
      "Web platform for checking in youth scholars, recording session notes, and managing behavioral health assessments.",
    description: [
      "Carex Scholar is a web application used by organizations to check in scholars, track group sessions, and manage behavioral health documentation.",
      "Staff can log in to check scholars into sessions, complete assessments, and record group and individual notes from a unified interface.",
      "The system supports organizations with multiple locations, giving them dashboards to review scholar history, attendance, and risk indicators over time.",
      "Built with Next.js, React, TypeScript, and a typed API client to integrate with the Scholar backend for authentication, session data, and assessments.",
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
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10v6l9 5 9-5v-6"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "React Query", "TailwindCSS"],
    url: "https://checkin.carexbhs.com/",
    urlLabel: "Carex Scholar",
  },
  {
    id: "IExchange",
    title: "IExchange P2P Trading Platform",
    preview:
      "Onchain P2P trading platform with a marketing site and trading interface for seamless crypto–fiat exchange.",
    description: [
      "IExchange is an innovative platform that bridges the gap between traditional finance and cryptocurrency through a secure peer-to-peer trading system.",
      "The landing page features an engaging user interface that clearly communicates the platform's unique value proposition of easy crypto-to-cash conversions.",
      "Interactive sections showcase the platform's key features including P2P trading capabilities and secure transaction processing.",
      "The design incorporates smooth animations and transitions to create an engaging user experience while highlighting platform benefits.",
      "A detailed section provides in-depth information about the platform's technology and security measures.",
      "The responsive design ensures perfect presentation across all devices, with optimized performance and accessibility.",
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
    tech: ["Next.js", "Typescript", "TailwindCSS", "Framer Motion"],
    url: "https://app.iexchange.global/",
    urlLabel: "Trading app",
    secondaryUrl: "https://iexchange.global/",
    secondaryUrlLabel: "Marketing site",
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
    url: "https://checkout.nyadenk.com/",
    urlLabel: "Checkout",
    secondaryUrl: "https://dashboard.nyadenk.com/",
    secondaryUrlLabel: "Dashboard",
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
      "Subscription and billing flows integrate with a payment provider to manage plans, webhooks, and withdrawal flows for clinicians.",
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
    id: "Soccersm",
    title: "Soccersm Sports Prediction Platform",
    preview:
      "AI-assisted sports prediction platform with challenge pools, leaderboards, and on-chain staking.",
    description: [
      "Soccersm is a sports prediction platform where users can join challenge pools, view AI-generated prediction slips, and track leaderboards.",
      "The frontend is built with Next.js, TailwindCSS, and React Query, integrating external sports data APIs for live fixtures, stats, and standings.",
      "Web3 integrations with Thirdweb, Wagmi, and Viem allow users to connect wallets and participate in on-chain pools and reward flows.",
      "Authentication combines wallet-based login, Firebase Auth, and Telegram-based quests to drive engagement.",
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
          d="M9.75 3a3.75 3.75 0 107.5 0 3.75 3.75 0 00-7.5 0zM4.5 21a6.75 6.75 0 0113.5 0M4.5 21h13.5"
        />
      </svg>
    ),
    tech: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Thirdweb",
      "Wagmi",
      "Firebase",
    ],
    url: "https://soccersm.ai/",
    urlLabel: "Platform",
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
      "Built with a responsive interface and modern React patterns for maintainability and performance.",
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
    tech: ["Next.js", "TypeScript", "Leaflet", "Next-Auth", "SWR"],
    url: "https://ewdh.nccrm.gov.gh/",
  },
  {
    id: "Hurisoft",
    title: "Hurisoft Website",
    preview:
      "Company website for Hurisoft, showcasing services, products, and thought-leadership content.",
    description: [
      "The Hurisoft website presents the company’s services in AI, blockchain, and software development with a modern, animated UI.",
      "It includes sections for service offerings, product highlights, testimonials, and a blog generated from structured content.",
      "Contact and newsletter forms integrate with external form providers to capture leads without a custom backend.",
      "Built with Next.js, TailwindCSS, and Framer Motion to deliver a responsive, content-focused experience.",
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
      "A modern e-commerce platform offering a seamless shopping experience for fashion enthusiasts.",
    description: [
      "Braszy is a cutting-edge e-commerce platform that redefines online fashion shopping with its modern and intuitive interface.",
      "The platform features a dynamic product catalog with advanced filtering and search capabilities, making it easy for customers to find their perfect style.",
      "Each product page includes detailed information, size guides, and high-quality images with zoom functionality for a better shopping experience.",
      "The integrated cart and checkout system supports multiple payment methods through Stripe integration, ensuring secure transactions.",
      "A sophisticated inventory management system helps track stock levels and automatically updates product availability.",
      "The platform includes a customer account system where users can track orders, save favorite items, and manage their shopping preferences.",
      "Built with performance in mind, the application uses modern web technologies to ensure fast loading times and smooth navigation.",
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
    tech: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    url: "https://braszyclothing.com",
  },
  {
    id: "DigiTechEdge",
    title: "DigiTech Edge Website",
    preview:
      "A modern corporate website showcasing technology solutions and services with an engaging user interface.",
    description: [
      "DigiTech Edge is a professional technology solutions company website built with modern web technologies.",
      "Features an animated and responsive user interface using Framer Motion for smooth transitions and interactions.",
      "Implements comprehensive service showcase and project portfolio sections.",
      "Includes an integrated contact form with email functionality for client communications.",
      "Showcases company expertise, team information, and client testimonials.",
      "Utilizes modern design principles with attention to user experience and accessibility.",
      "Built with performance optimization and SEO best practices in mind.",
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
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    url: "https://digitechedge.com",
  },
  {
    id: "Sucoff",
    title: "Sucoff Ventures",
    preview:
      "Corporate website for Sucoff Ventures with an animated, responsive UI.",
    description: [
      "Sucoff Ventures is a corporate website built to showcase the company's presence and services with a modern, polished design.",
      "The site features an animated and responsive layout using Framer Motion and HeroUI for smooth transitions and clear visual hierarchy.",
      "Built with Next.js and React for fast performance and a strong developer experience.",
      "The design emphasizes clarity and professionalism while remaining engaging for visitors.",
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
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "HeroUI"],
    url: "https://sucoffventures.com/",
  },
  {
    id: "VerseCatch",
    title: "Verse Catch",
    preview:
      "App that detects Bible verses in sermon audio using AI (Whisper, Gemini) and real-time updates.",
    description: [
      "Verse Catch transcribes and detects Bible verse references in sermon or speech audio in real time.",
      "The app uses OpenAI Whisper for transcription and Google Gemini for verse detection, with audio processed via the browser and backend APIs.",
      "Real-time updates are delivered through Pusher so users see detected verses as the audio plays.",
      "A SQLite database manages a large library of verses across translations to match and display references accurately.",
      "Built with Next.js and TypeScript for a maintainable frontend and API, with a focus on clarity and performance.",
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
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "SQLite",
      "OpenAI",
      "Gemini",
      "Pusher",
    ],
    url: "https://verse-catch-pink.vercel.app",
  },
  {
    id: "AgriLink",
    title: "AgriLink Web Application",
    preview:
      "A revolutionary platform bridging the gap between farmers and consumers, enabling direct trade and communication.",
    description: [
      "AgriLink is an innovative web platform designed to transform agricultural commerce by creating a direct connection between farmers and consumers.",
      "The platform features a sophisticated marketplace where farmers can showcase their products, complete with detailed descriptions, pricing, and availability information.",
      "Consumers can browse through various agricultural products, place orders, and communicate directly with farmers through an integrated real-time messaging system.",
      "The application includes a robust review and rating system, helping build trust and transparency in the agricultural marketplace.",
      "A dedicated Farmer Portal enables agricultural producers to manage their product listings, track orders, and analyze their sales performance through intuitive dashboards.",
      "The Community Forum facilitates knowledge sharing and discussions about agricultural practices, market trends, and sustainable farming methods.",
      "Built with modern web technologies, the platform offers a responsive design that works seamlessly across all devices.",
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
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "Pusher"],
    url: "https://agri-link.vercel.app",
  },
  {
    id: "Threads",
    title: "Threads Social Platform",
    preview:
      "A modern social platform enabling users to share thoughts, engage in discussions, and build connections.",
    description: [
      "Threads is a social networking platform built with modern web technologies, focusing on user engagement and content sharing.",
      "Features a clean and intuitive user interface that makes it easy to create and interact with posts.",
      "Implements core social features including post creation, comments, and user interactions.",
      "Users can engage with content through likes and comments, fostering meaningful discussions.",
      "Built with responsive design principles ensuring a seamless experience across all devices.",
      "Incorporates user authentication for secure access and personalized experiences.",
      "Utilizes modern web technologies for efficient data management and real-time updates.",
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
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    url: "https://threads-khaki-eight.vercel.app",
  },
  {
    id: "BlogoSphere",
    title: "BlogoSphere",
    preview:
      "A modern blogging platform with rich text editing, category organization, and interactive features.",
    description: [
      "BlogoSphere is a feature-rich blogging platform built with modern web technologies.",
      "Implements a comprehensive content management system with category-based organization and rich text editing.",
      "Features user authentication and profile management for secure content creation and interaction.",
      "Includes an interactive comment system allowing users to engage with blog content.",
      "Incorporates view tracking to monitor post engagement and popularity.",
      "Supports dark/light theme modes for enhanced user experience.",
      "Built with responsive design principles for seamless viewing across all devices.",
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
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3L9 17"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    url: "https://blogosphere-umber.vercel.app",
  },
  {
    id: "VoteSphere",
    title: "VoteSphere",
    preview:
      "A voting platform for running secure, transparent polls and elections with real-time results.",
    description: [
      "VoteSphere is a web-based voting platform that enables organizations to run polls and elections with transparency and accountability.",
      "Users can create elections, define candidates or options, and share voting links with participants.",
      "The platform supports real-time result tracking and secure vote casting with validation to prevent duplicate votes.",
      "Built with a clear, responsive interface so voters and organizers can manage and monitor elections easily.",
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma"],
    url: "https://vote-sphere.vercel.app",
  },
  {
    id: "MoMoXpress",
    title: "MoMoXpress Calculator",
    preview:
      "A modern web application for calculating mobile money transfer charges across different telecommunications networks in Ghana.",
    description: [
      "MoMoXpress is a specialized calculator tool designed to help users calculate mobile money transfer fees across Ghanaian telecom networks.",
      "Features real-time fee calculations with automatic E-levy integration for accurate total cost estimation.",
      "Implements smart validation for network-specific phone numbers ensuring accurate inputs for different providers.",
      "Provides cross-network support allowing users to calculate fees across different mobile money providers.",
      "Includes a newsletter subscription system for SMS updates about fee changes and new features.",
      "Built with a modern, responsive interface that works seamlessly across all devices.",
      "Utilizes custom validation rules for Ghanaian phone numbers by network provider.",
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
      "A comprehensive mobile platform connecting university students with essential campus services and local businesses.",
    description: [
      "Campserve is a revolutionary mobile application designed to enhance campus life by connecting university students with various services and local businesses.",
      "The app features an intuitive interface where students can discover and book services ranging from laundry and food delivery to academic tutoring.",
      "Service providers can create profiles, list their services, and manage bookings through a dedicated business dashboard.",
      "The platform includes a sophisticated rating and review system to maintain service quality and build trust within the campus community.",
      "Real-time chat functionality enables smooth communication between service providers and students.",
      "Integrated payment system supports multiple payment methods for secure and convenient transactions.",
      "Location-based service discovery helps students find nearby service providers efficiently.",
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
      "A comprehensive personal finance management mobile app for expense tracking, budgeting, and financial goal setting.",
    description: [
      "BudgetBuddy is an intuitive mobile application designed to help users take control of their personal finances.",
      "Features an easy-to-use expense tracking system with automatic categorization and custom categories.",
      "Implements budget management tools with real-time monitoring and spending alerts.",
      "Provides visual analytics and reports to help users understand their spending patterns and financial health.",
      "Includes goal-setting features for savings targets and financial milestones.",
      "Offers secure user authentication and data storage for personal financial information.",
      "Built with a responsive UI that adapts to different mobile devices and screen sizes.",
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
