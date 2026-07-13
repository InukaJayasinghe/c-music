"use client"

import React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/sections/navigation/Navbar"
import { Footer } from "@/components/sections/footer/Footer"
import { Contact } from "@/components/sections/contact/Contact"

export default function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <main className="relative min-h-screen bg-black w-full overflow-x-hidden text-white select-none">
        {/* Navigation Header */}
        <Navbar />

        {/* Main Page Content Container */}
        <div className="w-full min-h-screen flex flex-col justify-between">
          <Contact />

          {/* Footer with exact copyright date */}
          <Footer copyrightText="2026 C-MUSIC. LEGACY IN SOUNDS." isStatic />
        </div>
      </main>
    </motion.div>
  )
}
