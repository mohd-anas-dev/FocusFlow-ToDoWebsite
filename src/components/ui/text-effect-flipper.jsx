import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.025

const FlipLink = ({ children }) => {
  return (
    <motion.h1
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-semibold uppercase dark:text-white/90 sm:text-7xl md:text-8xl "
      style={{
        lineHeight: 0.75,
      }}>
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </div>
    </motion.h1>
  );
}

export default FlipLink
