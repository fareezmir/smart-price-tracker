"use client"

import { motion } from "motion/react"
import * as React from "react"

type AnimatedBackgroundProps = {
  className?: string
  speed?: number // seconds per cycle
  amplitude?: number // px shift for parallax
  glowOpacity?: [number, number] // [min, max]
  gridOpacity?: [number, number] // [min, max]
  showGrid?: boolean
}

export function AnimatedBackground({
  className,
  speed = 8,
  amplitude = 12,
  glowOpacity = [0.6, 0.9],
  gridOpacity = [0.02, 0.05],
  showGrid = true,
}: AnimatedBackgroundProps) {
  const parallax = amplitude
  const scaleBump = 1 + amplitude * 0.002

  return (
    <div className={"absolute inset-0 overflow-hidden " + (className ?? "")}> 
      <div className="absolute inset-0 bg-gradient-to-br from-surfaceBlack via-surfaceSlate to-surfaceJet" />

      {/* Animated radial glows */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: glowOpacity[0] }}
        animate={{
          x: [0, parallax, 0],
          y: [0, -parallax * 0.66, 0],
          scale: [1, scaleBump, 1],
          opacity: [glowOpacity[0], glowOpacity[1], glowOpacity[0]],
        }}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(600px 300px at 50% -10%, rgba(167,139,250,0.18), transparent 60%), radial-gradient(500px 250px at 80% 20%, rgba(139,92,246,0.12), transparent 60%), radial-gradient(500px 250px at 20% 80%, rgba(167,139,250,0.10), transparent 60%)",
        }}
      />

      {/* Subtle drifting grid */}
      {showGrid && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: gridOpacity[0] }}
          animate={{
            backgroundPosition: ["0px 0px", "24px 12px", "0px 0px"],
            opacity: [gridOpacity[0], gridOpacity[1], gridOpacity[0]],
          }}
          transition={{ duration: speed * 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "42px 42px",
          }}
        />
      )}
    </div>
  )
}

export default AnimatedBackground


