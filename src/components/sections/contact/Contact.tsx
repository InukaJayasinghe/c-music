"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger globally on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Custom SVG Icons matching the layout exactly
const InstagramIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const MapPinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const PhoneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const WhatsAppIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L3 21l3.22-1.01C7.8 20.7 9.8 21 12 21c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M15.5 14.5c-.3-.2-1.8-1-2-.1-.2.8-1 1.2-1.7.9-.7-.3-1.3-.8-1.8-1.3s-1-1.1-1.3-1.8c-.3-.7.1-1.5.9-1.7.9-.2.1-1.7-.1-2C9.2 8 8.8 8.1 8.5 8.3c-.6.4-.9 1.2-.9 2 0 1.2.6 2.5 1.5 3.4.9.9 2.2 1.5 3.4 1.5.8 0 1.6-.3 2-.9.2-.3.1-.7-.1-.9z" />
  </svg>
)

const MailIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // 1. Animate Header elements (Vertical line, Title, Subtitle)
    gsap.fromTo(".reveal-header-line",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.0, ease: "power4.out" }
    )
    gsap.fromTo(".reveal-subtitle",
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
    )

    // 2. Animate Collage elements (Lines and Images)
    gsap.fromTo([".reveal-collage-line-left", ".reveal-collage-line-right"],
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    )
    gsap.fromTo(".reveal-img-wrapper",
      { opacity: 0, scale: 1.03, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, stagger: 0.08, ease: "power3.out", delay: 0.4 }
    )

    // 3. Animate Contact Card elements (Card container and List items)
    gsap.fromTo(".reveal-contact-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
    )
    gsap.fromTo(".reveal-contact-item",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.06, ease: "power3.out", delay: 0.5 }
    )

  }, { scope: containerRef })

  // Contact list definitions
  const contactDetails = [
    {
      id: "instagram",
      icon: <InstagramIcon />,
      text: "@CMUSICPRODUCTION",
      href: "https://www.instagram.com/cmusicproduction"
    },
    {
      id: "location",
      icon: <MapPinIcon />,
      text: (
        <>
          NO33, POLKOTUWA ROAD, KATUBEDDA,<br />MORATUWA
        </>
      ),
      href: "https://maps.google.com/?q=NO33,+POLKOTUWA+ROAD,+KATUBEDDA,+MORATUWA"
    },
    {
      id: "phone",
      icon: <PhoneIcon />,
      text: "TELEPHONE: +94 77 402 98 94",
      href: "tel:+94774029894"
    },
    {
      id: "whatsapp",
      icon: <WhatsAppIcon />,
      text: "WHATSAPP: +94 77 402 98 94",
      href: "https://wa.me/94774029894"
    },
    {
      id: "email",
      icon: <MailIcon />,
      text: "PRODUCTIONS.CMUSIC@GMAIL.COM",
      href: "mailto:productions.cmusic@gmail.com"
    }
  ]

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto w-full px-6 md:px-12 pt-44 pb-32 flex-grow">

      {/* Header Title Section with Vertical Accent Line */}
      <div className="flex gap-5 md:gap-7 items-stretch mb-16 md:mb-20 overflow-hidden">
        <div className="reveal-header-line w-[3px] bg-white shrink-0" />
        <div className="flex flex-col justify-center">
          <div className="overflow-hidden py-1">
            <h1
              className="text-4xl md:text-6xl font-sans font-extrabold tracking-tight uppercase leading-none text-white"            >
              WRITE YOUR VERSE
            </h1>
          </div>
          <p className="reveal-subtitle text-[9px] md:text-xs tracking-[0.28em] text-muted-foreground uppercase mt-3.5 font-sans font-light">
            SHAPE THE FUTURE OF SOUND, AND BECOME A PERMANENT CHAPTER IN OUR STORY.
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center max-w-5xl mx-auto w-full max-lg:flex-col-reverse">

        {/* Left Column: Image Collage framed by borders */}
        <div className="relative py-1 px-4 sm:px-6 w-full max-w-[600px] shrink-0">

          {/* Collage Bento-style Grid */}
          <div className="columns-2 sm:columns-3 gap-3 w-full max-w-[600px] max-h-[600px] overflow-hidden mx-auto">
            {/* Image 1: 16:9 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[16/9] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/contact_top_guitarist.png"
                alt="Guitarist playing electric guitar live on stage with smoke"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.03] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
                priority
              />
            </div>

            {/* Image 2: 9:16 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[9/16] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/contact_female_singer.png"
                alt="Female singer vocal performance"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>

            {/* Image 3: 4:3 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[4/3] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/contact_acoustic_guitarist.png"
                alt="Male guitarist with acoustic guitar"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>

            {/* Image 4: 9:16 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[9/16] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/contact_skateboard.png"
                alt="Person holding skateboard overhead"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>

            {/* Image 5: 1:1 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[1/1] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/contact_studio_guitarist.png"
                alt="Guitarist performing in studio"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>

            {/* Image 6: 1:1 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[1/1] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/contact_blonde_portrait.png"
                alt="Editorial close up portrait"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>

            {/* Image 7: 16:9 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[16/9] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/studio_console.png"
                alt="Studio mixing board console"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>

            {/* Image 8: 4:3 Aspect Ratio */}
            <div className="reveal-img-wrapper relative w-full aspect-[4/3] mb-3 break-inside-avoid overflow-hidden bg-neutral-900 border border-white/5 rounded-sm">
              <Image
                src="/concert_stage.png"
                alt="Concert stage empty with spotlights"
                fill
                className="object-cover filter grayscale brightness-95 hover:brightness-110 hover:scale-[1.04] transition-all duration-700 ease-out"
                sizes="(max-w-600px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details Card Container */}
        <div className="reveal-contact-card flex-grow lg:max-w-[420px] w-full">
          {/* Card Title (Outside the border box) */}
          <h2 className="font-condensed text-3xl md:text-4xl font-extrabold tracking-wider text-white uppercase leading-none">
            GET IN TOUCH
          </h2>
          {/* Underline accent divider */}
          <div className="w-10 h-[3px] bg-white mt-4 mb-8" />

          {/* Contact List Box (Nested box with border) */}
          <div className="bg-[#0b0b0b] border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl">
            <div className="flex flex-col gap-5">
              {contactDetails.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.id !== "phone" && item.id !== "email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="reveal-contact-item group flex items-start sm:items-center gap-5 p-1.5 rounded-sm transition-all duration-300 hover:translate-x-1"
                >
                  {/* Icon Container Box */}
                  <div className="w-[42px] h-[42px] flex items-center justify-center bg-white/5 border border-white/5 text-muted-foreground group-hover:text-white group-hover:bg-white/10 group-hover:border-white/15 transition-all duration-300 shrink-0">
                    {item.icon}
                  </div>
                  {/* Text label */}
                  <div className="text-[10px] md:text-xs tracking-[0.2em] font-sans font-medium text-muted-foreground group-hover:text-white transition-colors duration-300 leading-relaxed uppercase pt-2.5 sm:pt-0">
                    {item.text}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
