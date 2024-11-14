import { motion } from "framer-motion";
import { TextHighlight } from "./TextHighlight";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-16 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        <TextHighlight text={title} />
      </h2>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-1 bg-violet-500 dark:bg-violet-600 rounded-full mx-auto mb-8"
      />
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-400">
          <TextHighlight text={subtitle} />
        </p>
      )}
    </motion.div>
  );
}
