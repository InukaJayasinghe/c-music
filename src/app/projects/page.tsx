"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/sections/navigation/Navbar"
import { Footer } from "@/components/sections/footer/Footer"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger globally on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Song {
  id: number
  title: string
  artist: string
  image: string
  type: "project" | "stem"
  downloadUrl: string
}

const SONGS: Song[] = [
  {
    id: 1,
    title: "NEON NOIR",
    artist: "Eliza Vance",
    image: "/track_neon.png",
    type: "stem",
    downloadUrl: "/downloads/neon_noir_stems.zip"
  },
  {
    id: 2,
    title: "ECHO CHAMBER",
    artist: "The Silent Kings",
    image: "/track_echo.png",
    type: "project",
    downloadUrl: "/downloads/echo_chamber_project.zip"
  },
  {
    id: 3,
    title: "MIDNIGHT SUN",
    artist: "Nova Pulse",
    image: "/track_midnight.png",
    type: "stem",
    downloadUrl: "/downloads/midnight_sun_stems.zip"
  },
  {
    id: 4,
    title: "DESERT WIND",
    artist: "Dilu Beats",
    image: "/Artists/Dilu Beats.png",
    type: "project",
    downloadUrl: "/downloads/desert_wind_project.zip"
  },
  {
    id: 5,
    title: "OCEAN BREEZE",
    artist: "Yohani",
    image: "/Artists/Yohani.png",
    type: "project",
    downloadUrl: "/downloads/ocean_breeze_project.zip"
  }
]

export default function ProjectsPage() {
  const listRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"all" | "project" | "stem">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchInput, setShowSearchInput] = useState(false)
  const [sharedSongId, setSharedSongId] = useState<number | null>(null)

  // Set document title for SEO
  useEffect(() => {
    document.title = "Projects & Stems | C-Music"
  }, [])

  // Mock download functionality
  const handleDownload = (song: Song) => {
    const element = document.createElement("a")
    const fileContent = `--- C-MUSIC PROJECTS DOWNLOAD ARCHIVE ---
Track: ${song.title}
Artist: ${song.artist}
Type: ${song.type.toUpperCase()}
Resource URL: ${song.downloadUrl}
Timestamp: ${new Date().toLocaleString()}

Thank you for downloading from C-MUSIC. Use these resources to collaborate, remix, and create!
`
    const file = new Blob([fileContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${song.title.toLowerCase().replace(/\s+/g, "_")}_${song.type}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Share functionality (copies link to clipboard)
  const handleShare = (song: Song) => {
    const shareUrl = `${window.location.origin}/projects?song=${song.id}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      setSharedSongId(song.id)
      setTimeout(() => {
        setSharedSongId(null)
      }, 2000)
    }).catch((err) => {
      console.error("Clipboard copy failed:", err)
    })
  }

  // Filter songs based on tab selection and search query
  const getFilteredSongs = () => {
    let filtered = [...SONGS]

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((s) => s.type === activeTab)
    }

    return filtered
  }

  // GSAP Animations
  useGSAP(() => {
    // Title reveal animation
    gsap.from(".reveal-title", {
      opacity: 0,
      x: -30,
      duration: 1.2,
      ease: "power3.out",
    })

    // Track cards entrance animation
    gsap.from(".track-card", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: listRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden text-white select-none">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Wrap */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-44 pb-32">
        {/* Header accent block & Title */}
        <div className="flex items-stretch gap-5 mb-16 md:mb-20 reveal-title">
          <div className="w-1.5 bg-[#e32072] shrink-0 animate-pulse" />
          <div>
            <h1 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight uppercase leading-none text-white">
              PROJECT ARCHIVE
            </h1>
            <p className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase mt-2.5 font-sans font-light">
              DOWNLOAD RAW PROJECTS AND STEMS TO REMIX AND CRAFT YOUR OWN SOUNDS
            </p>
          </div>
        </div>

        {/* Filter and Control Box */}
        <div className="border border-white/10 rounded-sm p-4 md:p-5 flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 backdrop-blur-sm mb-8">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h2 className="text-white text-sm md:text-base tracking-[0.2em] font-extrabold uppercase font-sans">
              CREATIVE STEMS &amp; ASSETS
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
            {/* Search Input inline toggle */}
            <AnimatePresence>
              {showSearchInput && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="SEARCH ARCHIVE..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white placeholder-white/30 text-[10px] md:text-xs px-3 py-1.5 tracking-wider uppercase font-sans rounded-sm focus:outline-none focus:border-[#00adef]/60 transition-colors"
                />
              )}
            </AnimatePresence>

            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] font-extrabold rounded-sm transition-all duration-300 uppercase cursor-pointer ${activeTab === "all"
                  ? "bg-white text-black font-extrabold"
                  : "bg-transparent text-white border border-white/15 hover:border-white"
                }`}
            >
              ALL
            </button>

            <button
              onClick={() => setActiveTab("project")}
              className={`px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] font-extrabold rounded-sm transition-all duration-300 uppercase cursor-pointer ${activeTab === "project"
                  ? "bg-white text-black font-extrabold"
                  : "bg-transparent text-white border border-white/15 hover:border-white"
                }`}
            >
              PROJECTS
            </button>

            <button
              onClick={() => setActiveTab("stem")}
              className={`px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] font-extrabold rounded-sm transition-all duration-300 uppercase cursor-pointer ${activeTab === "stem"
                  ? "bg-white text-black font-extrabold"
                  : "bg-transparent text-white border border-white/15 hover:border-white"
                }`}
            >
              STEMS
            </button>

            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`w-9 h-9 flex items-center justify-center border rounded-sm text-white transition-all duration-300 cursor-pointer ${showSearchInput || searchQuery
                  ? "border-[#00adef] text-[#00adef] bg-[#00adef]/5"
                  : "border-white/15 hover:border-white bg-transparent"
                }`}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Songs List Container */}
        <div ref={listRef} className="flex flex-col gap-4">
          {getFilteredSongs().map((song) => {
            return (
              <motion.div
                key={song.id}
                whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                transition={{ duration: 0.3 }}
                className="track-card border border-white/5 p-4 md:p-5 flex items-center justify-between rounded-sm bg-neutral-950/40 backdrop-blur-xs transition-colors duration-300"
              >
                {/* Left side details */}
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 border border-white/10 rounded-sm overflow-hidden flex-shrink-0 bg-neutral-900">
                    <Image
                      src={song.image}
                      alt={song.title}
                      fill
                      className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white text-base md:text-lg tracking-[0.1em] font-extrabold uppercase font-sans">
                      {song.title}
                    </h3>
                    <span className="text-[11px] md:text-[12px] tracking-[0.05em] text-muted-foreground mt-1 font-light flex items-center gap-2">
                      <span>{song.artist}</span>
                      <span className="text-[#e32072] font-extrabold tracking-wider font-mono text-[10px] uppercase">
                        #{song.type}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-3">
                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(song)}
                    className={`h-10 px-5 border rounded-sm flex items-center justify-center gap-2 font-bold tracking-[0.2em] text-[10px] md:text-xs transition-all duration-300 select-none cursor-pointer ${
                      sharedSongId === song.id
                        ? "bg-[#e32072] border-[#e32072] text-white"
                        : "border-white/15 hover:bg-white hover:text-black hover:border-white text-white"
                    }`}
                  >
                    {sharedSongId === song.id ? (
                      <>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        COPIED!
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="18" cy="5" r="3" />
                          <circle cx="6" cy="12" r="3" />
                          <circle cx="18" cy="19" r="3" />
                          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                        </svg>
                        SHARE
                      </>
                    )}
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(song)}
                    className="h-10 px-5 border border-white/15 hover:bg-white hover:text-black hover:border-white rounded-sm flex items-center justify-center gap-2 font-bold tracking-[0.2em] text-[10px] md:text-xs transition-all duration-300 select-none cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    DOWNLOAD
                  </button>
                </div>
              </motion.div>
            )
          })}

          {getFilteredSongs().length === 0 && (
            <div className="border border-dashed border-white/10 rounded-sm py-16 text-center text-muted-foreground text-xs tracking-widest uppercase font-sans">
              NO PROJECTS FOUND MATCHING &quot;{searchQuery.toUpperCase()}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Footer Branding & Links */}
      <Footer isStatic={true} className="border-t border-white/5 bg-transparent" />
    </main>
  )
}
