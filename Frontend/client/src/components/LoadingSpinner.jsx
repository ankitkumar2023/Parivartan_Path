import React from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";

/**
 * Full-screen loading overlay with centered spinner
 * Used during API calls, data fetching, etc.
 */
export default function LoadingSpinner({ isLoading = true, text = "Loading..." }) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Loader size="large" />
        {text && (
          <motion.p
            className="text-slate-600 dark:text-slate-400 font-medium text-center"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
