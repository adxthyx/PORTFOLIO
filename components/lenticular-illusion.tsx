"use client"

import Image from "next/image"
import { type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type MotionPermissionState = "unknown" | "required" | "granted" | "denied" | "unsupported"
type InteractionMode = "tilt" | "mouse" | "static"

interface LenticularIllusionProps {
  imageA: string
  imageB: string
  altA?: string
  altB?: string
  caption?: string
  className?: string
  priority?: boolean
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export function LenticularIllusion({
  imageA,
  imageB,
  altA = "Lenticular image A",
  altB = "Lenticular image B",
  caption = "Tilt your device",
  className,
  priority = true,
}: LenticularIllusionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupOrientationListenerRef = useRef<(() => void) | null>(null)

  const [permissionState, setPermissionState] = useState<MotionPermissionState>("unknown")
  const [interactionMode, setInteractionMode] = useState<InteractionMode>("static")
  const [tilt, setTilt] = useState({ beta: 0, gamma: 0 })

  const updateTilt = (beta: number, gamma: number, nextMode: InteractionMode) => {
    setTilt({
      beta: clamp(beta, -32, 32),
      gamma: clamp(gamma, -32, 32),
    })
    setInteractionMode(nextMode)
  }

  const startOrientationTracking = () => {
    if (typeof window === "undefined") {
      return
    }

    cleanupOrientationListenerRef.current?.()

    let hasReceivedMotion = false

    const onOrientation = (event: DeviceOrientationEvent) => {
      hasReceivedMotion = true
      updateTilt(event.beta ?? 0, event.gamma ?? 0, "tilt")
    }

    window.addEventListener("deviceorientation", onOrientation, true)

    const timeoutId = window.setTimeout(() => {
      if (!hasReceivedMotion) {
        const canUseMouse = window.matchMedia("(pointer: fine)").matches
        setInteractionMode(canUseMouse ? "mouse" : "static")
      }
    }, 1200)

    cleanupOrientationListenerRef.current = () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener("deviceorientation", onOrientation, true)
    }

    setPermissionState("granted")
  }

  const requestMotionPermission = async () => {
    if (typeof window === "undefined") {
      return
    }

    const DeviceOrientationConstructor =
      window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">
      }

    if (typeof DeviceOrientationConstructor.requestPermission !== "function") {
      startOrientationTracking()
      return
    }

    try {
      const permission = await DeviceOrientationConstructor.requestPermission()

      if (permission === "granted") {
        startOrientationTracking()
        return
      }
    } catch {
      // Falls through to the shared denied state below.
    }

    const canUseMouse = window.matchMedia("(pointer: fine)").matches
    setPermissionState("denied")
    setInteractionMode(canUseMouse ? "mouse" : "static")
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const canUseMouse = window.matchMedia("(pointer: fine)").matches
    const supportsOrientation = "DeviceOrientationEvent" in window

    if (!supportsOrientation) {
      setPermissionState("unsupported")
      setInteractionMode(canUseMouse ? "mouse" : "static")
      return
    }

    const DeviceOrientationConstructor =
      window.DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">
      }

    if (typeof DeviceOrientationConstructor.requestPermission === "function") {
      setPermissionState("required")
      setInteractionMode(canUseMouse ? "mouse" : "static")
      return
    }

    startOrientationTracking()
  }, [])

  useEffect(() => {
    return () => {
      cleanupOrientationListenerRef.current?.()
    }
  }, [])

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (interactionMode === "tilt" || !containerRef.current) {
      return
    }

    const bounds = containerRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    const gamma = (x - 0.5) * 40
    const beta = (0.5 - y) * 40

    updateTilt(beta, gamma, "mouse")
  }

  const handleMouseLeave = () => {
    if (interactionMode === "tilt") {
      return
    }

    setTilt({ beta: 0, gamma: 0 })
  }

  const normalizedGamma = clamp(tilt.gamma / 28, -1, 1)
  const normalizedBeta = clamp(tilt.beta / 40, -1, 1)
  const tiltStrength = clamp(Math.hypot(normalizedGamma, normalizedBeta) * 0.9, 0, 1)

  const maskRadius = 16 + tiltStrength * 110
  const maskX = clamp(50 + normalizedGamma * 18, 20, 80)
  const maskY = clamp(50 - normalizedBeta * 16, 20, 80)
  const overlayOpacity = clamp(tiltStrength * 1.15, 0, 1)
  const rotateX = -normalizedBeta * 10
  const rotateY = normalizedGamma * 12
  const highlightX = 50 + normalizedGamma * 30
  const highlightY = 50 - normalizedBeta * 26

  const promptText = interactionMode === "mouse" ? "Move your cursor" : caption
  const showPermissionGate = permissionState === "required" || permissionState === "denied"

  return (
    <div className={cn("flex w-full flex-col items-center gap-4", className)}>
      <div className="w-full [perspective:1400px]">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto w-full max-w-3xl"
        >
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/60 bg-slate-950 shadow-[0_35px_80px_-35px_rgba(15,23,42,0.65)] transition-transform duration-150 ease-out sm:aspect-[5/4]"
            style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
          >
            <Image
              src={imageA}
              alt={altA}
              fill
              priority={priority}
              sizes="(max-width: 768px) 92vw, 900px"
              className="pointer-events-none select-none object-cover"
            />

            <Image
              src={imageB}
              alt={altB}
              fill
              priority={priority}
              sizes="(max-width: 768px) 92vw, 900px"
              className="pointer-events-none select-none object-cover transition-[opacity,clip-path,transform] duration-150 ease-out"
              style={{
                opacity: overlayOpacity,
                clipPath: `circle(${maskRadius}% at ${maskX}% ${maskY}%)`,
                transform: `scale(${1 + tiltStrength * 0.025})`,
              }}
            />

            <div
              className="pointer-events-none absolute inset-0 transition-[background-position] duration-150 ease-out"
              style={{
                backgroundImage:
                  "linear-gradient(115deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.04) 32%, transparent 60%)",
                backgroundPosition: `${highlightX}% ${highlightY}%`,
                backgroundSize: "180% 180%",
              }}
            />

            <div
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.025) 2px, transparent 4px)",
                backgroundSize: "6px 100%",
              }}
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_52%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/45 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-slate-950/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
              {interactionMode === "tilt" ? "Tilt" : interactionMode === "mouse" ? "Mouse" : "Ready"}
            </div>

            {showPermissionGate ? (
              <div className="absolute inset-0 flex items-end justify-center bg-slate-950/28 p-6 sm:items-center">
                <button
                  type="button"
                  onClick={requestMotionPermission}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {permissionState === "denied" ? "Retry Motion Access" : "Start Experience"}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-1 text-center">
        <p className="text-sm font-medium text-slate-700">{promptText}</p>
        <p className="text-xs text-slate-500">
          {interactionMode === "tilt"
            ? "Device beta and gamma control the image blend."
            : interactionMode === "mouse"
              ? "Desktop fallback maps cursor position to the same virtual tilt."
              : permissionState === "required"
                ? "Tap once to enable motion access on iPhone or iPad."
                : "Waiting for motion input."}
        </p>
      </div>
    </div>
  )
}
