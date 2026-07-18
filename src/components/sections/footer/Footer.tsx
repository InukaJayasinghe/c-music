"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const YouTubeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

// Premium custom SVG for Instagram
const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

// Premium custom SVG for Mail
const MailIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

interface FooterProps {
  className?: string
  isStatic?: boolean
  copyrightText?: string
}

export const Footer: React.FC<FooterProps> = ({ className, isStatic = false, copyrightText = "2024 C-MUSIC. LEGACY IN SOUNDS." }) => {
  return (
    <>
      {/* Fixed bottom-left logo */}
      <motion.div
        initial={isStatic ? {} : { opacity: 0, y: 20 }}
        animate={isStatic ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-[10px] left-[5px] z-50 pointer-events-none"
      >
        <Image
          src="/logo.png"
          alt="C Music Logo"
          width={100}
          height={100}
          className="w-16 h-16 md:w-[72px] md:h-[72px] object-contain"
        />
      </motion.div>

      <motion.footer
        initial={isStatic ? {} : { opacity: 0, y: 20 }}
        animate={isStatic ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "bg-black/10 backdrop-blur-sm border-t border-white/10 py-4 px-6 md:px-8 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between select-none ml-auto w-[calc(100%-40px)] h-[49px] rounded-tl-[100px] [corner-shape:scoop] [@media(max-width:769px)]:w-full [@media(max-width:769px)]:h-auto [@media(max-width:769px)]:m-0 [@media(max-width:769px)]:rounded-none",
          isStatic ? "relative w-full" : "fixed bottom-0 left-0 right-0 z-2",
          className
        )}
      >

        {/* Left Copyright Section */}
        <div className="ml-[32px] text-[9px] md:text-[10px] tracking-[0.18em] text-muted-foreground uppercase font-sans max-[770px]:hidden">
          {copyrightText}
        </div>

        {/* Center Social Icon Container Box */}
        <div className="flex items-center h-9 bg-black/30 border border-white/10 divide-x divide-white/10 rounded-sm  min-[770px]:mr-[145px]">
          <motion.a
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "rgba(255, 255, 255, 1)" }}
            href="https://www.instagram.com/cmusicproduction?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            className="w-10 h-full flex items-center justify-center text-muted-foreground cursor-pointer transition-colors"
          >
            <InstagramIcon />
          </motion.a>

          <motion.a
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "rgba(255, 255, 255, 1)" }}
            href="https://youtube.com/@cmusicsl?si=T_ugU6x9iEYAuYuw"
            target="_blank"
            className="w-10 h-full flex items-center justify-center text-muted-foreground cursor-pointer transition-colors"
          >
            <YouTubeIcon />
          </motion.a>

          <motion.a
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)", color: "rgba(255, 255, 255, 1)" }}
            href="mailto:productions.cmusic@gmail.com"
            target="_blank"
            className="w-10 h-full flex items-center justify-center text-muted-foreground cursor-pointer transition-colors"
          >
            <MailIcon />
          </motion.a>
        </div>

        {/* Right Editorial wrapping Links */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right text-[9px] md:text-[10px] tracking-[0.15em] text-muted-foreground uppercase leading-relaxed font-sans font-light">
          <div>
            <a href="#terms" className="hover:text-white transition-colors">TERMS</a>
            <a href="#privacy" className="hover:text-white transition-colors"> / PRIVACY</a>
            <a href="#cookies" className="hover:text-white transition-colors"> / COOKIES</a>
          </div>
          <div className="md:mt-0.5">
            <a href="#rights" className="hover:text-white transition-colors"> / RESERVATION OF RIGHTS</a>
          </div>
        </div>
      </motion.footer>
    </>
  )
}
