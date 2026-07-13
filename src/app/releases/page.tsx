"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
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

interface Track {
  id: number
  title: string
  artist: string
  image: string
  audioUrl: string
  duration: string
  durationSec: number
  spotifyUrl: string
  popularity: number
  releaseDate: string
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "NEON NOIR",
    artist: "Eliza Vance",
    image: "/track_neon.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "03:20",
    durationSec: 200,
    spotifyUrl: "https://open.spotify.com",
    popularity: 95,
    releaseDate: "2024-03-10",
  },
  {
    id: 2,
    title: "ECHO CHAMBER",
    artist: "The Silent Kings",
    image: "/track_echo.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "04:45",
    durationSec: 285,
    spotifyUrl: "https://open.spotify.com",
    popularity: 88,
    releaseDate: "2024-04-18",
  },
  {
    id: 3,
    title: "MIDNIGHT SUN",
    artist: "Nova Pulse",
    image: "/track_midnight.png",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "05:02",
    durationSec: 302,
    spotifyUrl: "https://open.spotify.com",
    popularity: 91,
    releaseDate: "2023-11-25",
  },
]
export default function MusicPage() {
  const listRef = useRef<HTMLDivElement>(null)

  // Track & Player State
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(85) // Initial 01:25 to match screenshot
  const [duration, setDuration] = useState(200) // Initial 03:20 to match screenshot
  const [activeTab, setActiveTab] = useState<"artists" | "popularity" | "recent">("artists")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchInput, setShowSearchInput] = useState(false)

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Stable callback ref for audio ended event
  const onEndedRef = useRef<() => void>(() => {})
  useEffect(() => {
    onEndedRef.current = () => {
      const currentIndex = TRACKS.findIndex((t) => t.id === activeTrack.id)
      const nextIndex = (currentIndex + 1) % TRACKS.length
      playTrack(TRACKS[nextIndex])
    }
  })

  // Initialize and Sync Audio
  useEffect(() => {
    // Create audio element only on client
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(activeTrack.audioUrl)
      
      const audio = audioRef.current

      // Timeupdate event handler
      const handleTimeUpdate = () => {
        setCurrentTime(Math.floor(audio.currentTime))
      }

      // Loadedmetadata event handler
      const handleLoadedMetadata = () => {
        setDuration(Math.floor(audio.duration))
      }

      // Audio ended handler
      const handleEnded = () => {
        onEndedRef.current()
      }

      audio.addEventListener("timeupdate", handleTimeUpdate)
      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("ended", handleEnded)

      // Set initial duration from metadata
      setDuration(activeTrack.durationSec)

      return () => {
        audio.pause()
        audio.removeEventListener("timeupdate", handleTimeUpdate)
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [activeTrack])

  // Handle Play/Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play error:", err))
      setIsPlaying(true)
    }
  }

  // Handle playing specific track
  const playTrack = (track: Track) => {
    if (activeTrack.id === track.id) {
      togglePlay()
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setActiveTrack(track)
      setIsPlaying(true)
      // Small timeout to allow state update and trigger playing in useEffect
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.log("Audio play error:", err))
        }
      }, 50)
    }
  }

  // Handle Next Track
  const handleNext = () => {
    const currentIndex = TRACKS.findIndex((t) => t.id === activeTrack.id)
    const nextIndex = (currentIndex + 1) % TRACKS.length
    playTrack(TRACKS[nextIndex])
  }

  // Handle Previous Track
  const handlePrevious = () => {
    const currentIndex = TRACKS.findIndex((t) => t.id === activeTrack.id)
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length
    playTrack(TRACKS[prevIndex])
  }

  // Seek bar change handler
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Formatting Time (mm:ss)
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Filter & Sort tracks
  const getSortedTracks = () => {
    let filtered = [...TRACKS]
    
    // Search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Tab sort
    if (activeTab === "popularity") {
      filtered.sort((a, b) => b.popularity - a.popularity)
    } else if (activeTab === "recent") {
      filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    } else {
      // "artists" tab - Alphabetical by artist name
      filtered.sort((a, b) => a.artist.localeCompare(b.artist))
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

    // Track cards scroll entrance animation
    gsap.from(".track-card", {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: listRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })
  }, [])

  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden text-white select-none pb-52">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Wrap */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-44 pb-12">
        {/* Header accent block & Title */}
        <div className="flex items-stretch gap-5 mb-16 md:mb-20 reveal-title">
          <div className="w-1.5 bg-white shrink-0" />
          <div>
            <h1 className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight uppercase leading-none text-white">
              TRACE THE TUNE
            </h1>
            <p className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase mt-2.5 font-sans font-light">
              LISTEN CLOSELY, AND FIND THE TRACK THAT CAPTURES YOUR HEART
            </p>
          </div>
        </div>

        {/* Filter and Control Box */}
        <div className="border border-white/10 rounded-sm p-4 md:p-5 flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 backdrop-blur-sm mb-8">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h2 className="text-white text-sm md:text-base tracking-[0.2em] font-extrabold uppercase font-sans">
              CMG ARTISTS
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
                  placeholder="SEARCH TRACKS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white placeholder-white/30 text-[10px] md:text-xs px-3 py-1.5 tracking-wider uppercase font-sans rounded-sm focus:outline-none focus:border-[#00adef]/60 transition-colors"
                />
              )}
            </AnimatePresence>

            <button
              onClick={() => setActiveTab("artists")}
              className={`px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] font-extrabold rounded-sm transition-all duration-300 uppercase ${
                activeTab === "artists"
                  ? "bg-white text-black font-extrabold"
                  : "bg-transparent text-white border border-white/15 hover:border-white"
              }`}
            >
              ARTISTS
            </button>

            <button
              onClick={() => setActiveTab("popularity")}
              className={`px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] font-extrabold rounded-sm transition-all duration-300 uppercase ${
                activeTab === "popularity"
                  ? "bg-white text-black font-extrabold"
                  : "bg-transparent text-white border border-white/15 hover:border-white"
              }`}
            >
              POPULARITY
            </button>

            <button
              onClick={() => setActiveTab("recent")}
              className={`px-5 py-2 text-[10px] md:text-[11px] tracking-[0.2em] font-extrabold rounded-sm transition-all duration-300 uppercase ${
                activeTab === "recent"
                  ? "bg-white text-black font-extrabold"
                  : "bg-transparent text-white border border-white/15 hover:border-white"
              }`}
            >
              RECENT
            </button>

            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className={`w-9 h-9 flex items-center justify-center border rounded-sm text-white transition-all duration-300 ${
                showSearchInput || searchQuery
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

        {/* Tracks List Container */}
        <div ref={listRef} className="flex flex-col gap-4">
          {getSortedTracks().map((track) => {
            const isCurrentTrackPlaying = activeTrack.id === track.id && isPlaying;
            return (
              <motion.div
                key={track.id}
                whileHover={{ borderColor: "rgba(255, 255, 255, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                transition={{ duration: 0.3 }}
                className={`track-card border p-4 md:p-5 flex items-center justify-between rounded-sm bg-neutral-950/40 backdrop-blur-xs transition-colors duration-300 ${
                  activeTrack.id === track.id ? "border-white/20 bg-white/[0.01]" : "border-white/5"
                }`}
              >
                {/* Left side details */}
                <div className="flex items-center gap-4 md:gap-5">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 border border-white/10 rounded-sm overflow-hidden flex-shrink-0 bg-neutral-900">
                    <Image
                      src={track.image}
                      alt={track.title}
                      fill
                      className="object-cover filter grayscale"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-white text-base md:text-lg tracking-[0.1em] font-extrabold uppercase font-sans">
                      {track.title}
                    </h3>
                    <span className="text-[11px] md:text-[12px] tracking-[0.05em] text-muted-foreground mt-0.5 font-light">
                      {track.artist}
                    </span>
                  </div>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-3">
                  {/* Play Action button */}
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playTrack(track)}
                    className="w-10 h-10 border border-white/15 hover:border-white rounded-sm flex items-center justify-center text-white cursor-pointer select-none transition-colors"
                  >
                    {isCurrentTrackPlaying ? (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current translate-x-[1px]">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </motion.button>

                  {/* Spotify Button */}
                  <Link
                    href={track.spotifyUrl}
                    target="_blank"
                    className="h-10 px-5 border border-white/15 hover:bg-white hover:text-black hover:border-white rounded-sm flex items-center justify-center font-bold tracking-[0.2em] text-[10px] md:text-xs transition-all duration-300 select-none"
                  >
                    SPOTIFY
                  </Link>
                </div>
              </motion.div>
            )
          })}

          {getSortedTracks().length === 0 && (
            <div className="border border-dashed border-white/10 rounded-sm py-16 text-center text-muted-foreground text-xs tracking-widest uppercase font-sans">
              NO TRACKS FOUND MATCHING &quot;{searchQuery.toUpperCase()}&quot;
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Music Player Container (Combines Player + Footer) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-white/10 flex flex-col">
        {/* Row 1: Player Bar */}
        <div className="px-6 md:px-12 py-3 flex items-center justify-between gap-6">
          {/* Active Album/Artist Info */}
          <div className="flex items-center gap-3.5 min-w-[200px]">
            <div className="relative w-11 h-11 border border-white/10 rounded-sm overflow-hidden flex-shrink-0 bg-neutral-900">
              <Image
                src={activeTrack.image}
                alt={activeTrack.title}
                fill
                className="object-cover filter grayscale"
                sizes="44px"
              />
              <div className="absolute top-0.5 left-0.5 bg-black/85 text-white font-sans text-[7px] font-extrabold tracking-wider px-1 py-[1px] uppercase rounded-xs">
                Now
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs md:text-sm tracking-[0.1em] font-extrabold uppercase font-sans truncate max-w-[150px] md:max-w-[250px]">
                {activeTrack.title}
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.05em] text-white/50 uppercase mt-0.5 truncate max-w-[150px] md:max-w-[250px]">
                {activeTrack.id === 1 ? "GRACIE ABRAMS" : activeTrack.artist.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Controls & Timeline slider */}
          <div className="flex flex-col items-center flex-grow max-w-xl">
            {/* Control buttons */}
            <div className="flex items-center gap-6 mb-2">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play / Pause Toggle */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-sm bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current translate-x-[1px]">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNext}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M6 18h2V6H6l8.5 6z" />
                </svg>
              </button>
            </div>

            {/* Slider and Time Indicators */}
            <div className="flex items-center gap-3 w-full text-[9px] md:text-[10px] tracking-wider text-white/50 font-mono">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeekChange}
                className="flex-grow h-[3px] bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00adef] focus:outline-none"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Spacer to balance left info block on desktop */}
          <div className="hidden md:block min-w-[200px]" />
        </div>

        {/* Row 2: Integrated Footer */}
        <Footer isStatic={true} className="border-t border-white/5 bg-transparent" />
      </div>
    </main>
  )
}
