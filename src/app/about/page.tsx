"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/sections/navigation/Navbar"
import { Footer } from "@/components/sections/footer/Footer"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger globally on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function LegacyPage() {
  const triggerRef1 = useRef<HTMLDivElement>(null)
  const triggerRef2 = useRef<HTMLDivElement>(null)

  // Scroll animations with GSAP ScrollTrigger
  useGSAP(() => {
    // Reveal block 1 elements on scroll
    gsap.from(".reveal-item-1", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerRef1.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    // Reveal block 2 elements on scroll
    gsap.from(".reveal-item-2", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: triggerRef2.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden text-white select-none">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content Container */}
      <div className="w-full min-h-screen flex flex-col justify-between">
        {/* Editorial Scrollable Layout */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-44 pb-32">
          {/* Header Accent & Title */}
          <div className="flex items-stretch gap-5 mb-16 md:mb-24">
            <div className="w-1.5 bg-white shrink-0" />
            <div>
              <h1 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight uppercase leading-none text-white">
                LEGACY IN SOUND
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase mt-2 font-sans font-light">
                DEFINING SRI LANKAN CONTEMPORARY MUSIC SINCE 2017
              </p>
            </div>
          </div>

          {/* Row 1: The Founding & Evolutionary Growth */}
          <div ref={triggerRef1} className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-start">
            {/* Left Column (The Founding) */}
            <div className="reveal-item-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/5 bg-neutral-900 rounded-sm h-[500px]" >
                <Image
                  src="/studio_console.png"
                  alt="Studio Recording Console"
                  fill
                  className="object-cover filter grayscale hover:scale-105 transition-transform duration-700"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase mt-8 mb-4">
                THE FOUNDING
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans font-light max-w-lg">
                C Music is a Sri Lankan record label founded in 2017 by visionary music producer{" "}
                <span className="text-white font-semibold">Chamath Sangeeth</span>. Our core mission has always been
                singular: talent development and the construction of lasting artist careers.
              </p>
            </div>

            {/* Right Column (Evolution & Impact) */}
            <div className="flex flex-col gap-12 md:gap-16">
              {/* Evolutionary Growth Sub-layout */}
              <div className="reveal-item-1 flex flex-col">
                <h2 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase mb-4">
                  WHAT WE ARE
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans font-light">
                  C Music is a leading force in Sri Lanka's music industry, built with a vision to take Sri Lankan music beyond borders and connect with the global music market.
                  In 2021, C Music became the first Sri Lankan music label to reach the global music market. As the only Sri Lankan label to collaborate with globally recognized music labels such as T-Series and Universal Music, we continue to create international opportunities and build a stronger global presence for Sri Lankan music.
                  Since 2017, C Music has contributed to nearly 600 songs and worked with more than 400 clients, bringing creativity, quality, and industry experience to every project.
                  Our journey is about more than music. It's about breaking boundaries, creating connections, and taking Sri Lankan sound to the world.</p>

              </div>

              {/* Manike Mage Hithe Box Container */}
              <div className="reveal-item-1 border border-white/10 p-6 md:p-8 bg-card/25 backdrop-blur-sm rounded-sm">
                <span className="text-[8px] tracking-[0.2em] text-white/40 uppercase font-sans font-bold">
                  [ GLOBAL IMPACT ]
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase mt-2 mb-4 text-[#ffa4c4cf]">
                  MANIKE MAGE HITHE
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans font-light">
                  “Manike Mage Hithe” is one of Sri Lanka's most globally recognized songs, bringing Sinhala music to millions of listeners around the world. Produced and composed by Chamath Sangeeth and featuring Yohani, the song became a global viral hit in 2021. Recorded at C Music Studio, “Manike Mage Hithe” gained worldwide attention and became a major milestone for Sri Lankan music.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: The Future */}
          <div ref={triggerRef2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mt-24 md:mt-32">
            {/* Left Column (Future Artist Landscape) */}
            <div className="reveal-item-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/5 bg-neutral-900 rounded-sm">
                <Image
                  src="/artist_future.png"
                  alt="Future Artist Landscape portrait"
                  fill
                  className="object-cover filter grayscale hover:scale-105 transition-transform duration-700"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column (The Future Statement) */}
            <div className="reveal-item-2">
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-wide uppercase mb-6">
                THE FUTURE
              </h2>
              {/* Vertical accent white details */}
              <div className="border-l-2 border-white/30 pl-4 py-0.5 mb-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans font-light">
                  We continue to champion the next generation. Through world-class production and relentless guidance,
                  C-Music Group is shaping the very future of Sri Lankan music.
                </p>
              </div>

              {/* Custom Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-black hover:bg-black hover:text-white border border-white font-extrabold tracking-[0.18em] text-[10px] md:text-xs px-8 py-3.5 uppercase transition-colors duration-300 cursor-pointer rounded-sm">
                  JOIN THE LEGACY
                </button>
                <button className="bg-transparent text-white border border-white/20 hover:border-white font-extrabold tracking-[0.18em] text-[10px] md:text-xs px-8 py-3.5 uppercase transition-colors duration-300 cursor-pointer rounded-sm">
                  VIEW CATALOG
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
