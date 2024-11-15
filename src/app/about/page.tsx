'use client';

import { motion } from "framer-motion";
import { TextHighlight } from "../../components/TextHighlight";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const experiences = [
  {
    id: "experience-it",
    title: "IT Support Staff",
    company: "KNUST School of Business",
    period: "Nov 2023 - Present",
    responsibilities: [
      "Providing comprehensive IT support and infrastructure management",
      "Managing and maintaining computer labs and network infrastructure",
      "Assisting faculty and staff with technical issues",
      "Ensuring systems security and data backup"
    ]
  },
  {
    id: "experience-fullstack",
    title: "Fullstack Developer",
    company: "KNUST School of Business",
    period: "Nov 2023 - Present",
    responsibilities: [
      "Developed comprehensive exams attendance tracking application",
      "Created admin dashboard for managing exam schedules and staff assignments",
      "Implemented secure web-based Voting System with real-time updates",
      "Designed nomination platform with secure role-based authentication (RBAC)",
      "Built admin and reviewer dashboards with real-time notifications",
      "Integrated real-time updates using WebSocket technology",
      "Implemented data visualization for exam statistics"
    ]
  },
  {
    id: "experience-intern",
    title: "Software Engineer Intern, Frontend Developer",
    company: "BSystems Limited",
    period: "Oct 2022 - Jan 2023",
    responsibilities: [
      "Developed and enhanced features for the admin dashboard of the PeoplesPay app, improving user interface and experience",
      "Implemented user authentication, verification, and various admin functionalities including managing admins, customers, transactions, and e-levy records, ensuring data security and integrity",
      "Redesigned UI components to enhance usability and visual appeal, leading to a more intuitive and engaging user experience",
      "Created detailed technical documentation for the web application, facilitating better understanding and maintenance for future developers",
    ]
  }
];

const education = {
  id: "education",
  degree: "BSc Computer Engineering",
  school: "Kwame Nkrumah University of Science and Technology",
  period: "2019 - 2023",
  achievements: [
    "First Class Honours with CWA of 73.71 (GPA: 3.70)",
    "Best Student Award (2021)",
  ]
};

export default function About() {
  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Floating Icons */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Experience Icon */}
        <motion.div
          className="absolute top-40 right-[15%] text-violet-500/10 dark:text-violet-400/10"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2v10h14V7H5zm2 2h10v2H7V9zm0 4h10v2H7v-2z"/>
          </svg>
        </motion.div>

        {/* Education Icon */}
        <motion.div
          className="absolute bottom-40 left-[10%] text-violet-500/10 dark:text-violet-400/10"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-28 h-28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        </motion.div>

        {/* Skills Icon */}
        <motion.div
          className="absolute top-1/2 right-[5%] text-violet-500/10 dark:text-violet-400/10"
          animate={{ 
            x: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 5h2V3H7v2zm0 8h2v-2H7v2zm0 8h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm-4-8h2v-2H7v2zm8 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm4 0h2v-2h-2v2zm0-4h2V7h-2v2zm0-4h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm4 8h2v-2h-2v2z"/>
          </svg>
        </motion.div>
      </div>

      <motion.div 
        className="max-w-4xl mx-auto px-4 py-16 pt-32 relative"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold gradient-text mb-2"
            variants={item}
          >
            <TextHighlight text="About Me" />
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-violet-500 dark:bg-violet-600 rounded-full mb-12"
          />
        </motion.div>

        <motion.div variants={container} className="space-y-12">
          {/* Introduction */}
          <motion.section 
            variants={item}
            className="relative"
          >
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <TextHighlight text="I am a dedicated Software Developer with a Bachelor's Degree in Computer Engineering from Kwame Nkrumah University of Science and Technology (KNUST). With a First Class Honours and a CWA of 73.71 (GPA: 3.70), I have demonstrated strong academic excellence and technical aptitude." />
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none mt-4">
              <TextHighlight text="My expertise lies in frontend and fullstack development, where I excel at creating scalable and user-friendly applications. I am proficient in modern technologies such as React, React Native, Next.js, and Express.js, with a strong foundation in both mobile and web development." />
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none mt-4">
              <TextHighlight text="I am passionate about creating innovative solutions that solve real-world problems. My experience spans from developing mobile applications to implementing complex web systems, always focusing on delivering high-quality, maintainable code." />
            </div>
          </motion.section>

          {/* Work Experience Section */}
          <motion.section variants={item}>
            <h2 className="text-2xl font-bold text-violet-500 dark:text-violet-400 mb-6">
              <TextHighlight text="Work Experience" />
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  id={exp.id}
                  className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-150"
                  variants={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)"
                  }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    <TextHighlight text={exp.title} />
                  </h3>
                  <div className="text-violet-500 dark:text-violet-400 mb-2">
                    <TextHighlight text={exp.company} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    <TextHighlight text={exp.period} />
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start text-gray-700 dark:text-gray-300"
                        variants={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <motion.span 
                          className="text-violet-500 dark:text-violet-400 mr-2"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          •
                        </motion.span>
                        <TextHighlight text={resp} />
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section variants={item}>
            <h2 className="text-2xl font-bold text-violet-500 dark:text-violet-400 mb-6">
              <TextHighlight text="Education" />
            </h2>
            <motion.div
              id={education.id}
              className="p-6 rounded-lg bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-150"
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.1)"
              }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                <TextHighlight text={education.degree} />
              </h3>
              <div className="text-violet-500 dark:text-violet-400 mb-2">
                <TextHighlight text={education.school} />
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                <TextHighlight text={education.period} />
              </div>
              <ul className="space-y-2">
                {education.achievements.map((achievement, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                    variants={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.span 
                      className="text-violet-500 dark:text-violet-400 mr-2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      •
                    </motion.span>
                    <TextHighlight text={achievement} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
}
