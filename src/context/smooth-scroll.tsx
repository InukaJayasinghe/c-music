"use client"

import React, { createContext, useContext, useEffect, useRef } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const SmoothScrollContext = createContext<Lenis | null>(null)

export const useSmoothScroll = () => useContext(SmoothScrollContext)

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll events with GSAP ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update)

    // Link Lenis frame updates to GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Sync ScrollTrigger defaults
    ScrollTrigger.defaults({
      markers: false,
    })

    // Clean up instances on component unmount
    return () => {
      gsap.ticker.remove(tick)
      lenis.off("scroll", ScrollTrigger.update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
