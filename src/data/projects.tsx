import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "AgriLink",
    title: "AgriLink Web Application",
    preview: "A revolutionary platform bridging the gap between farmers and consumers, enabling direct trade and communication.",
    description: [
      "AgriLink is an innovative web platform designed to transform agricultural commerce by creating a direct connection between farmers and consumers.",
      "The platform features a sophisticated marketplace where farmers can showcase their products, complete with detailed descriptions, pricing, and availability information.",
      "Consumers can browse through various agricultural products, place orders, and communicate directly with farmers through an integrated real-time messaging system.",
      "The application includes a robust review and rating system, helping build trust and transparency in the agricultural marketplace.",
      "A dedicated Farmer Portal enables agricultural producers to manage their product listings, track orders, and analyze their sales performance through intuitive dashboards.",
      "The Community Forum facilitates knowledge sharing and discussions about agricultural practices, market trends, and sustainable farming methods.",
      "Built with modern web technologies, the platform offers a responsive design that works seamlessly across all devices."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "Pusher"],
    url: "https://agri-link.vercel.app" 
  },
  {
    id: "DigiTechEdge",
    title: "DigiTech Edge Website",
    preview: "A modern corporate website showcasing technology solutions and services with an engaging user interface.",
    description: [
      "DigiTech Edge is a professional technology solutions company website built with modern web technologies.",
      "Features an animated and responsive user interface using Framer Motion for smooth transitions and interactions.",
      "Implements comprehensive service showcase and project portfolio sections.",
      "Includes an integrated contact form with email functionality for client communications.",
      "Showcases company expertise, team information, and client testimonials.",
      "Utilizes modern design principles with attention to user experience and accessibility.",
      "Built with performance optimization and SEO best practices in mind."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    url: "https://digitechedge.com"
  },
  
  {
    id: "Braszy",
    title: "Braszy Clothing E-commerce",
    preview: "A modern e-commerce platform offering a seamless shopping experience for fashion enthusiasts.",
    description: [
      "Braszy is a cutting-edge e-commerce platform that redefines online fashion shopping with its modern and intuitive interface.",
      "The platform features a dynamic product catalog with advanced filtering and search capabilities, making it easy for customers to find their perfect style.",
      "Each product page includes detailed information, size guides, and high-quality images with zoom functionality for a better shopping experience.",
      "The integrated cart and checkout system supports multiple payment methods through Stripe integration, ensuring secure transactions.",
      "A sophisticated inventory management system helps track stock levels and automatically updates product availability.",
      "The platform includes a customer account system where users can track orders, save favorite items, and manage their shopping preferences.",
      "Built with performance in mind, the application uses modern web technologies to ensure fast loading times and smooth navigation."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    url: "https://braszyclothing.com" // Replace with actual URL
  },
  {
    id: "Threads",
    title: "Threads Social Platform",
    preview: "A modern social platform enabling users to share thoughts, engage in discussions, and build connections.",
    description: [
      "Threads is a social networking platform built with modern web technologies, focusing on user engagement and content sharing.",
      "Features a clean and intuitive user interface that makes it easy to create and interact with posts.",
      "Implements core social features including post creation, comments, and user interactions.",
      "Users can engage with content through likes and comments, fostering meaningful discussions.",
      "Built with responsive design principles ensuring a seamless experience across all devices.",
      "Incorporates user authentication for secure access and personalized experiences.",
      "Utilizes modern web technologies for efficient data management and real-time updates."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    url: "https://threads-khaki-eight.vercel.app"
  },
  {
    id: "BlogoSphere",
    title: "BlogoSphere",
    preview: "A modern blogging platform with rich text editing, category organization, and interactive features.",
    description: [
      "BlogoSphere is a feature-rich blogging platform built with modern web technologies.",
      "Implements a comprehensive content management system with category-based organization and rich text editing.",
      "Features user authentication and profile management for secure content creation and interaction.",
      "Includes an interactive comment system allowing users to engage with blog content.",
      "Incorporates view tracking to monitor post engagement and popularity.",
      "Supports dark/light theme modes for enhanced user experience.",
      "Built with responsive design principles for seamless viewing across all devices."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3L9 17" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "TailwindCSS"],
    url: "https://blogosphere-umber.vercel.app"
  },
  {
    id: "VoteSphere",
    title: "VoteSphere E-Voting Platform",
    preview: "A comprehensive electronic voting system with period management, real-time tracking, and result visualization.",
    description: [
      "VoteSphere is a secure and efficient electronic voting platform designed for managing multiple voting periods and elections.",
      "Features a robust role-based access control system with three levels: regular users, voting administrators, and supreme administrators.",
      "Implements position-based voting structure with candidate profiles, image management, and vote verification.",
      "Includes real-time vote tracking and result visualization using interactive charts and analytics.",
      "Provides administrative tools for managing voting periods, positions, and candidates.",
      "Incorporates data export functionality for generating detailed reports and analysis.",
      "Built with security-first approach including secure authentication and vote verification systems."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "Prisma", "Chart.js", "TailwindCSS"],
    url: "https://vote-sphere-chi.vercel.app"
  },
  {
    id: "MoMoXpress",
    title: "MoMoXpress Calculator",
    preview: "A modern web application for calculating mobile money transfer charges across different telecommunications networks in Ghana.",
    description: [
      "MoMoXpress is a specialized calculator tool designed to help users calculate mobile money transfer fees across Ghanaian telecom networks.",
      "Features real-time fee calculations with automatic E-levy integration for accurate total cost estimation.",
      "Implements smart validation for network-specific phone numbers ensuring accurate inputs for different providers.",
      "Provides cross-network support allowing users to calculate fees across different mobile money providers.",
      "Includes a newsletter subscription system for SMS updates about fee changes and new features.",
      "Built with a modern, responsive interface that works seamlessly across all devices.",
      "Utilizes custom validation rules for Ghanaian phone numbers by network provider."
    ],
    type: "web",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    tech: ["Next.js", "TypeScript", "TailwindCSS", "NextUI","Framer Motion"],
    url: "https://momoxpress.vercel.app"
  },
  {
    id: "CampServe",
    title: "Campserve Mobile Application",
    preview: "A comprehensive mobile platform connecting university students with essential campus services and local businesses.",
    description: [
      "Campserve is a revolutionary mobile application designed to enhance campus life by connecting university students with various services and local businesses.",
      "The app features an intuitive interface where students can discover and book services ranging from laundry and food delivery to academic tutoring.",
      "Service providers can create profiles, list their services, and manage bookings through a dedicated business dashboard.",
      "The platform includes a sophisticated rating and review system to maintain service quality and build trust within the campus community.",
      "Real-time chat functionality enables smooth communication between service providers and students.",
      "Integrated payment system supports multiple payment methods for secure and convenient transactions.",
      "Location-based service discovery helps students find nearby service providers efficiently."
    ],
    type: "mobile",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 012-2h.5a2 2 0 012 2v14a2 2 0 002 2h2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    tech: ["React Native", "Flask", "PostgreSQL", "TailwindCSS"]
  },
  {
    id: "BudgetBuddy",
    title: "BudgetBuddy Finance App",
    preview: "A comprehensive personal finance management mobile app for expense tracking, budgeting, and financial goal setting.",
    description: [
      "BudgetBuddy is an intuitive mobile application designed to help users take control of their personal finances.",
      "Features an easy-to-use expense tracking system with automatic categorization and custom categories.",
      "Implements budget management tools with real-time monitoring and spending alerts.",
      "Provides visual analytics and reports to help users understand their spending patterns and financial health.",
      "Includes goal-setting features for savings targets and financial milestones.",
      "Offers secure user authentication and data storage for personal financial information.",
      "Built with a responsive UI that adapts to different mobile devices and screen sizes."
    ],
    type: "mobile",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tech: ["React Native", "Expo", "TypeScript", "Node.js", "Drizzle"],
  }
];
