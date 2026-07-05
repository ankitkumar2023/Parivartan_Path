import React from "react";
import { motion } from "framer-motion";

export default function AnimatedCard({
  children,
  className = "",
  onClick,
  variant = "default",
  staggerIndex = 0,
  hover = true,
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: staggerIndex * 0.1,
        ease: [0.21, 0.61, 0.35, 1],
      },
    },
  };

  const hoverVariants = hover ? {
    initial: { y: 0, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  } : {};

  const variantClasses = {
    default: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
    elevated: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 shadow-xl",
    glass: "bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10",
  };

  return (
    <motion.div
      className={`rounded-xl p-6 transition-all duration-300 ${variantClasses[variant]} ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={hover ? "hover" : "initial"}
      variants={{ ...containerVariants, ...hoverVariants }}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  );
}
