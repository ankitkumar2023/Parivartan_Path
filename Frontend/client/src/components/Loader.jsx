import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Loader({ size = "large", variant = "default" }) {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  if (variant === "pulse") {
    return (
      <motion.div
        className="flex items-center justify-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400`}
          variants={pulseVariants}
          animate="animate"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Outer rotating ring with gradient */}
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-border p-1`}
        variants={spinnerVariants}
        animate="animate"
      >
        {/* Inner white/dark background */}
        <div className="w-full h-full rounded-full bg-white dark:bg-slate-950" />
      </motion.div>

      {/* Center dot with glow */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 shadow-lg shadow-blue-500/50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
