"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useMenu } from "@/context/menu-context"

// Custom SVG Close Icon (X)
const CloseIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current stroke-2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// Custom SVG Hamburger Icon (3 lines)
const HamburgerIcon: React.FC = () => (
  <div className="flex flex-col gap-1.5 items-center justify-center">
    <span className="w-6 h-[3px] bg-black" />
    <span className="w-6 h-[3px] bg-black" />
    <span className="w-6 h-[3px] bg-black" />
  </div>
)

export const Navbar: React.FC = () => {
  const { isOpen, setIsOpen } = useMenu()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  // Navigation menu links mapping the screenshot
  const menuLinks = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    { label: "RELEASES", href: "/releases" },
    //     { label: "PROJECTS", href: "/maintain" },
    { label: "CONTACT US", href: "/contact" },
  ]

  return (
    <>
      {/* Corner-Locked Trigger Button (Hamburger -> Cyan X Close Button) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          x: isOpen ? 260 : 0,
          y: (hidden && !isOpen) ? -48 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto w-12 h-12 fixed top-0 left-0 z-50 flex items-center justify-center cursor-pointer border-none outline-none shadow-md bg-[#e32072] text-black"
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </motion.button>

      {/* Main Top Header Branding (Stays centered on screen) */}
      <motion.header
        animate={{
          opacity: isOpen ? 0.3 : 1,
          y: (hidden && !isOpen) ? -128 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-30 w-full h-24 flex items-center justify-between pointer-events-none"
      >
        {/* Transparent top bar with bottom border */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] border-b border-white/10 pointer-events-none" />

        {/* Center branding */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full flex items-center justify-center pointer-events-auto">

          <h2 className="text-white text-base md:text-2xl tracking-[0.4em] font-extrabold uppercase font-sans whitespace-nowrap">
            C MUSIC
          </h2>
        </div>

        {/* Corner-locked booking action button */}
        <Link
          href="/contact"
          className="pointer-events-auto absolute top-0 right-0 h-12 px-6 bg-black text-white hover:bg-white hover:text-black border-l border-b border-white/10 flex items-center justify-center font-bold tracking-[0.2em] text-[10px] md:text-xs transition-colors duration-300 select-none z-10"
        >
          BOOKING
        </Link>
      </motion.header>

      {/* Left Slide-Out Navigation Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 z-[2] w-[260px] h-screen bg-black border-r border-white/10 flex flex-col justify-between shadow-2xl overflow-y-auto select-none"
          >
            {/* Navigation Vertical List */}
            <nav className="flex flex-col gap-4.5 px-6 pt-24 pb-8 font-sans">
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-[#ffa4c4cf] transition-colors text-[18px] md:text-[18px] tracking-[0.2em] font-extrabold uppercase py-0.5 block"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
