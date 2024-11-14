'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../hooks/useToast';

export default function Toast() {
  const { toast, hideToast } = useToast();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="px-6 py-3 rounded-lg bg-gray-900 dark:bg-zinc-800 text-white shadow-lg border border-gray-800 dark:border-zinc-700 transition-colors duration-150">
            <div className="flex items-center gap-2">
              <span>{toast}</span>
              <button
                onClick={hideToast}
                className="text-gray-400 hover:text-white transition-colors duration-150"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
