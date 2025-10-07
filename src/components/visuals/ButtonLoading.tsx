"use client";

import { motion } from "framer-motion";

const dotStyle = "bg-white h-3 w-3 rounded-full";

export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-1">
      <motion.span
        className={dotStyle}
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      />
      <motion.span
        className={dotStyle}
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />
      <motion.span
        className={dotStyle}
        animate={{ opacity: [0, 1] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </div>
  );
}
