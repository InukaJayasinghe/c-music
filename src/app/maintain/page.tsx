"use client"

import React, { Suspense } from "react"
import Link from "next/link"
import { Navbar } from "@/components/sections/navigation/Navbar"
import { Footer } from "@/components/sections/footer/Footer"
import { motion } from "framer-motion"
import { Calendar, Wrench, ArrowLeft, Mail, Music, Library, Layers } from "lucide-react"
import { useSearchParams } from "next/navigation"

function MaintenanceContent() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get("page")?.toLowerCase() || ""

  // Dynamic configurations based on the page parameter
  let pageTitle = "Section Offline"
  let pageSubtitle = "We'll be back shortly"
  let pageDescription = "We are currently upgrading this section of our website to bring you a faster and more seamless experience. Please check back shortly."
  let IconComponent = Wrench

  if (pageParam === "booking" || pageParam === "bookings") {
    pageTitle = "Booking Engine"
    pageSubtitle = "Tuning up our digital scheduling system"
    pageDescription = "We are currently upgrading our reservation platform to bring you a faster and more seamless booking experience. C Music studio bookings, session reservations, and artist inquiries are temporarily handled manually."
    IconComponent = Calendar
  } else if (pageParam === "releases" || pageParam === "music" || pageParam === "release") {
    pageTitle = "Releases Directory"
    pageSubtitle = "Syncing our sound database"
    pageDescription = "We are updating our catalog database to bring you the latest high-fidelity tracks, music videos, and artist discographies. The full catalog is being refreshed."
    IconComponent = Music
  } else if (pageParam === "about" || pageParam === "legacy") {
    pageTitle = "Legacy Archive"
    pageSubtitle = "Polishing our history"
    pageDescription = "We are currently editing and archiving our legacy information, artist timeline, and records catalog to include our newest milestones."
    IconComponent = Library
  } else if (pageParam) {
    // Capitalize custom input page name
    const capitalized = pageParam.charAt(0).toUpperCase() + pageParam.slice(1)
    pageTitle = `${capitalized} Page`
    pageSubtitle = "System maintenance in progress"
    pageDescription = `We are currently carrying out system updates on the ${capitalized} section. Everything will be back up and running shortly.`
    IconComponent = Layers
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full border border-white/10 bg-neutral-950/40 backdrop-blur-md rounded-lg p-8 md:p-12 text-center overflow-hidden"
    >
      {/* Ambient Radial Gradient Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#e32072]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Glowing Icon Container */}
      <div className="flex justify-center mb-8">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative flex items-center justify-center w-20 h-20 rounded-full bg-black/60 border border-white/15 shadow-[0_0_20px_rgba(227,32,114,0.15)]"
        >
          <IconComponent className="w-8 h-8 text-[#e32072]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 -right-1 flex items-center justify-center w-7 h-7 rounded-full bg-[#111] border border-white/10 text-cyan-400"
          >
            <Wrench className="w-3.5 h-3.5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Title & Accent */}
      <div className="flex justify-center">
        <span className="text-[10px] tracking-[0.3em] font-sans font-bold uppercase text-[#e32072] bg-[#e32072]/10 border border-[#e32072]/20 px-3.5 py-1 rounded-full">
          Status: Under Maintenance
        </span>
      </div>

      <h1 className="text-3xl md:text-5xl font-sans font-extrabold tracking-tight uppercase leading-none text-white mt-8 mb-4">
        {pageTitle}
      </h1>

      <p className="text-[11px] md:text-xs tracking-[0.25em] text-[#ffa4c4cf] uppercase mb-8 font-sans font-semibold">
        {pageSubtitle}
      </p>

      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans font-light max-w-xl mx-auto mb-10">
        {pageDescription}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link href="/" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-white text-black hover:bg-black hover:text-white border border-white font-extrabold tracking-[0.18em] text-[10px] md:text-xs px-8 py-4 uppercase transition-all duration-300 cursor-pointer rounded-sm flex items-center justify-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            Go Back Home
          </button>
        </Link>
        <Link href="/contact" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-transparent text-white border border-white/20 hover:border-white font-extrabold tracking-[0.18em] text-[10px] md:text-xs px-8 py-4 uppercase transition-all duration-300 cursor-pointer rounded-sm flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            Contact Us
          </button>
        </Link>
      </div>
    </motion.div>
  )
}

export default function MaintenancePage() {
  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden text-white select-none">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content Container */}
      <div className="w-full min-h-screen flex flex-col justify-between pt-32 pb-16 px-6">
        {/* Under Maintenance Content */}
        <div className="flex-1 flex items-center justify-center max-w-3xl mx-auto w-full py-12">
          <Suspense fallback={
            <div className="text-center py-20 font-sans tracking-widest text-white/50 text-xs">
              LOADING SYSTEM STATUS...
            </div>
          }>
            <MaintenanceContent />
          </Suspense>
        </div>

        {/* Footer Branding & Links */}
        <Footer />
      </div>
    </main>
  )
}
