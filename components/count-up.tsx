"use client"

import { useEffect, useRef } from "react"
import { animate, useReducedMotion } from "motion/react"

// Animates a number by mutating the span's text via ref — no re-render storm.
// Renders the final value under prefers-reduced-motion.
export function CountUp({ value, duration = 0.9 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced) {
      node.textContent = value.toLocaleString()
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = Math.round(v).toLocaleString()
      },
    })
    return () => controls.stop()
  }, [value, duration, reduced])

  return <span ref={ref}>{value.toLocaleString()}</span>
}
