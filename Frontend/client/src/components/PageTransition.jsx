import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: [0.21, 0.61, 0.35, 1] },
  },
  exit: { opacity: 0, y: -10, filter: "blur(6px)", transition: { duration: 0.2 } },
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.main
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.main>
  );
}

