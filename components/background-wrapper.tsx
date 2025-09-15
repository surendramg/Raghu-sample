"use client"

import type React from "react"

interface BackgroundWrapperProps {
  children: React.ReactNode
  variant?: "default" | "hero" | "minimal"
}

export function BackgroundWrapper({ children, variant = "default" }: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen">
      {/* Animated floating shapes */}
      {variant !== "minimal" && (
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>
      )}

      {/* Background patterns */}
      <div
        className={`absolute inset-0 ${
          variant === "hero"
            ? "bg-hero-pattern"
            : variant === "minimal"
              ? "bg-gradient-radial"
              : "bg-grid-pattern bg-gradient-radial"
        }`}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
