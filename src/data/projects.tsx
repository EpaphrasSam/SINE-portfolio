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
    url: "https://agri-link.vercel.app" // Replace with actual URL
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    tech: ["React Native", "Flask", "PostgreSQL", "TailwindCSS"]
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
  }
];
