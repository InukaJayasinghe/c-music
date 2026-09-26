"use client"

import React from "react"
import { Navbar } from "@/components/sections/navigation/Navbar"
import { Footer } from "@/components/sections/footer/Footer"

export default function MusicPage() {
  return (
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-44 pb-24">
        {/* TRACE THE TUNE Header */}
        <section className="mb-16 md:mb-20">
          <div className="flex items-stretch gap-5">
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
        </section>

        {/* Spotify Main Section */}
        <section className="w-full">
          <div className="w-full overflow-hidden rounded-xl">
            <iframe
              data-testid="embed-iframe"
              src="https://open.spotify.com/embed/artist/3Bej6ikcqBylMRbkX1DKpu?utm_source=generator&theme=0&si=282ed081e3f947b1"
              className="block w-full border-0"
              style={{
                borderRadius: "12px",
                height: "900px",
              }}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Artist"
            />
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer isStatic={true} />
    </main>
  )
}
