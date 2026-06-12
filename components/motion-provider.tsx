"use client"

import type * as React from "react"
import { LazyMotion, domMax, MotionConfig } from "motion/react"

// domMax (not domAnimation) because the feed uses layout/FLIP animations.
// reducedMotion="user" makes every m.* component respect prefers-reduced-motion.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
