import type { Variants, Transition } from "motion/react"

export const spring: Transition = { type: "spring", stiffness: 400, damping: 30 }

export const feedContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

export const feedItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
}
