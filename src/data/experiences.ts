export const summary = [
  "I'm a full-stack software developer, building production software since 2022. I studied Computer Engineering at KNUST, graduating with First Class Honours.",
  "Most of my work is in TypeScript, React, and Next.js, with Node.js, Express, and PostgreSQL on the backend. I've shipped systems across healthcare, fintech, crypto, and AI, from multi-portal web apps and backend APIs to evaluation environments that test AI agents on real Kubernetes infrastructure.",
  "I tend to gravitate toward work where the constraints are real: regulated environments, government systems, live financial infrastructure. Outside of client work, I build things on the side, mostly web tools and experiments.",
];

export const education = {
  id: "education",
  degree: "BSc Computer Engineering",
  school: "Kwame Nkrumah University of Science and Technology",
  period: "2019 - 2023",
  achievements: ["First Class Honours with CWA of 73.71 (GPA: 3.70)"],
};

export const experiences = [
  {
    id: "experience-bespoke",
    title: "RL Environment Engineer",
    company: "Bespoke Labs",
    period: "Apr 2026 - Present",
    responsibilities: [
      "Developed AI agent evaluation tasks for Nebula Aurora, a Kubernetes-based benchmark that tests frontier AI models on real DevOps and SRE incidents",
      "Wrote setup scripts that inject controlled failures into K3s clusters, simulating incidents across CI/CD pipelines, service mesh configurations, and observability stacks",
      "Built Python graders with partial scoring that check agent responses against actual system state, plus ground-truth solution scripts; every task had to be verifiable from observable system state alone",
      "Annotated coding-agent trajectories to produce training data for agents' research and planning ability",
    ],
  },
  {
    id: "experience-workspace",
    title: "Frontend Engineer",
    company: "Workspace Global",
    period: "May 2026 - Oct 2026",
    responsibilities: [
      "Worked across all three apps of a client, operations, and talent platform through MVP delivery, and owned the client dashboard end to end",
      "Built the client dashboard's request submission and approval flow, deliverables and file previews, checkout, campaigns, brand documents, meeting booking, and help desk",
      "Built shared features used in all three apps, including real-time chat with channels and archived conversations, announcements and notifications, and auth flows with email verification and password rules",
      "Contributed to the shared UI and auth packages in a pnpm/Turborepo monorepo built on React, TanStack Router, and TanStack Query",
    ],
  },
  {
    id: "experience-carex",
    title: "Fullstack Developer",
    company: "Gigsama LLC",
    period: "Mar 2025 - Mar 2026",
    responsibilities: [
      "Built the Carex Scholar frontend across two role-based portals: an organization portal for schedules, scholar check-ins, group notes, and assessments, and a staff portal for organization oversight, assessment scheduling, and reviews",
      "Maintained HIPAA compliance across the platform, including data access controls and audit logging for sensitive healthcare records",
      "Led R&D on production tooling (PostHog, Sentry, Zoho Desk) and built proofs of concept for EHR and insurance billing integrations before full implementation",
      "Shipped backend features and fixes in the Scholar API with Express.js and PostgreSQL",
    ],
  },
  {
    id: "experience-hurisoft",
    title: "Fullstack Developer",
    company: "Hurisoft",
    period: "Nov 2024 - Jul 2025",
    responsibilities: [
      "Built the iExchange P2P crypto trading app from scratch, setting up the architecture and building trading flows, KYC verification, order management, dispute resolution, and the admin panel",
      "Built the iExchange marketing site, a separate surface focused on user acquisition and conversion",
    ],
  },
  {
    id: "experience-ksb",
    title: "Fullstack Developer",
    company: "KNUST School of Business",
    period: "Nov 2023 - Nov 2024",
    responsibilities: [
      "Built an exam attendance system with an admin dashboard for recording and managing invigilator sign-ins across exam sessions",
      "Built a staff election system with secure ballot submission, duplicate vote prevention, and real-time results",
      "Built a nomination platform with four-tier role-based access, a two-stage submission and review workflow, conflict-of-interest checks for reviewers, CSV and PDF reports, and real-time notifications",
    ],
  },
  {
    id: "experience-intern",
    title: "Software Engineer Intern",
    company: "BSystems Limited",
    period: "Oct 2022 - Jan 2023",
    responsibilities: [
      "Added features to the PeoplesPay admin dashboard and fixed responsive layout issues on smaller screens",
      "Wrote technical documentation for the web application to support onboarding and future development",
    ],
  },
];
