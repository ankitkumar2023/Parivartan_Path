import React from "react";
import { motion } from "framer-motion";

export default function SkeletonCard({ lines = 3, imageHeight = "h-40" }) {
  const lineVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="rounded-lg overflow-hidden bg-gradient-to-r from-gray-200 to-gray-100 dark:from-slate-700 dark:to-slate-600 p-4 space-y-3"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image skeleton */}
      <motion.div
        className={`${imageHeight} rounded-md bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-600 dark:to-slate-500`}
        variants={lineVariants}
        animate="animate"
      />

      {/* Title skeleton - wider */}
      <motion.div
        className="h-4 rounded bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-600 dark:to-slate-500 w-3/4"
        variants={lineVariants}
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />

      {/* Content skeleton lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-3 rounded bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-600 dark:to-slate-500 ${
            i === lines - 1 ? "w-2/3" : "w-full"
          }`}
          variants={lineVariants}
          animate="animate"
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1 * (i + 2),
          }}
        />
      ))}

      {/* Button skeleton */}
      <motion.div
        className="h-9 rounded-lg bg-gradient-to-r from-gray-300 to-gray-200 dark:from-slate-600 dark:to-slate-500 w-1/3 mt-4"
        variants={lineVariants}
        animate="animate"
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </motion.div>
  );
}
