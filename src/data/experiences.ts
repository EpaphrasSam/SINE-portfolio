export const summary = [
  "I'm a full-stack software developer with over 4 years of experience building web applications and production systems. I studied Computer Engineering at KNUST, graduating with First Class Honours.",
  "Most of my work is in TypeScript, React, and Next.js, though I'm equally comfortable on the backend. I've shipped systems across healthcare, fintech, and crypto. More recently, I spent time at Bespoke Labs building AI agent evaluation environments on Kubernetes, which was a different kind of engineering challenge.",
  "I tend to gravitate toward work where the constraints are real: regulated environments, government systems, live financial infrastructure. Outside of client work, I build things on the side, mostly web tools and experiments.",
];

export const education = {
  id: "education",
  degree: "BSc Computer Engineering",
  school: "Kwame Nkrumah University of Science and Technology",
  period: "2019 - 2023",
  achievements: [
    "First Class Honours with CWA of 73.71 (GPA: 3.70)",
    "Best Student Award (2021)",
  ],
};

export const experiences = [
  {
    id: "experience-bespoke",
    title: "RL Environment Engineer",
    company: "Bespoke Labs",
    period: "Apr 2026 - Jul 2026",
    responsibilities: [
      "Developed AI agent evaluation tasks for Nebula Aurora, a Kubernetes-based benchmarking platform that tests frontier AI models on real-world DevOps and SRE scenarios",
      "Wrote setup scripts that inject controlled failures into K3s clusters, simulating infrastructure incidents across CI/CD pipelines, service mesh configurations, and observability stacks",
      "Built Python graders with partial scoring logic to assess AI agent responses against actual system state, covering incident response, platform engineering, and cloud operations tasks",
      "Authored solution scripts as ground-truth references; each task had to be fully verifiable from observable system state alone",
    ],
  },
  {
    id: "experience-carex",
    title: "Fullstack Developer",
    company: "Gigsama LLC",
    period: "Mar 2025 - Mar 2026",
    responsibilities: [
      "Led R&D initiatives, evaluating and implementing production tools (PostHog, Sentry, Zoho Desk) and building technical PoCs to validate EHR integrations before full implementation",
      "Architected the Carex Scholar frontend across two role-based portals: an organization portal covering schedule management, scholar check-ins, group notes, and assessments; and a staff portal for organization oversight, assessment scheduling, and review workflows",
      "Built automated scholar check-in, assessments, and group notes for scholar sessions, reducing administrative overhead",
      "Built a proof of concept for insurance billing integration and contributed backend fixes and features to the Scholar API in Express.js and PostgreSQL",
      "Maintained HIPAA compliance across the platform, including data access controls and audit logging for sensitive healthcare records",
    ],
  },
  {
    id: "experience-frontend",
    title: "Fullstack Developer",
    company: "Hurisoft",
    period: "Nov 2024 - July 2025",
    responsibilities: [
      "Developed the landing page for iExchange, a P2P cryptocurrency trading platform, with a responsive layout focused on user acquisition and conversion",
      "Built the iExchange trading application, setting up the project architecture and developing core P2P trading flows, KYC verification, order management, dispute resolution, and an admin panel",
      "Resolved bugs and improved frontend performance for Soccersm, a sports prediction platform, reducing load times and stabilizing key user flows",
    ],
  },
  {
    id: "experience-fullstack",
    title: "Fullstack Developer",
    company: "KNUST School of Business",
    period: "Nov 2023 - Nov 2024",
    responsibilities: [
      "Developed an exam attendance application and admin dashboard for recording and managing invigilator sign-ins across exam sessions",
      "Built a faculty election voting system with secure ballot submission, duplicate vote prevention, and real-time result tracking for university staff",
      "Developed a nomination platform with four-tier role-based access (public users, nominators, reviewers, admins), a two-stage submission and review workflow, conflict-of-interest checks for reviewers, CSV and PDF report generation, and real-time notifications via Pusher",
    ],
  },
  {
    id: "experience-intern",
    title: "Software Engineer Intern, Frontend Developer",
    company: "BSystems Limited",
    period: "Oct 2022 - Jan 2023",
    responsibilities: [
      "Built and integrated minor features into the admin dashboard of the PeoplesPay app",
      "Redesigned the platform's UI for responsiveness, addressing layout issues that affected usability across smaller screen sizes",
      "Wrote technical documentation for the web application to support future development and onboarding",
    ],
  },
];
