"use client"

import React from "react"
import { Navbar } from "@/components/sections/navigation/Navbar"
import { HeroSlider } from "@/components/ui/HeroSlider"
import { Footer } from "@/components/sections/footer/Footer"

export default function Home() {
  return (
    <main className="relative min-h-dvh bg-black w-full overflow-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content Container */}
      <div className="w-full min-h-dvh flex flex-col justify-between">
        {/* Main Fullscreen Hero Slider */}
        <HeroSlider />

        {/* Footer Branding & Links */}
        <Footer />
      </div>
    </main>
  )
}
