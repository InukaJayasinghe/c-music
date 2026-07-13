"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import { EffectFade, Autoplay } from "swiper/modules"
import { useGSAP } from "@/hooks/use-gsap"
import { gsap } from "gsap"
import { motion } from "framer-motion"



// Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"

interface SlideData {
  id: number
  name: string
  image: string
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    name: "Shan Putha",
    image: "/Artists/Shan Putha.png",
  },
  {
    id: 2,
    name: "Yohani",
    image: "/Artists/Yohani.png",
  },
  {
    id: 3,
    name: "Dilu Beats",
    image: "/Artists/Dilu_Beats.png",
  },
  {
    id: 4,
    name: "Sandun Perera",
    image: "/Artists/Sandun Perera.png",
  },
  {
    id: 5,
    name: "Ikky Berry",
    image: "/Artists/Ikky Berry.png",
  },
  {
    id: 6,
    name: "Abu Cantona",
    image: "/Artists/Abu Cantona.png",
  },
  {
    id: 7,
    name: "Supun Perera",
    image: "/Artists/Supun Perera.png",
  },
  {
    id: 8,
    name: "Krish Manoj",
    image: "/Artists/Krish Manjo.png",
  },
  {
    id: 9,
    name: "Sosa Lean",
    image: "/Artists/Sosa Lean.png",
  },
  {
    id: 10,
    name: "Dhyan Hewage",
    image: "/Artists/Dhyan Hewage.png",
  },
  {
    id: 11,
    name: "Maduwa",
    image: "/Artists/Maduwa.png",
  },
  {
    id: 12,
    name: "Pranav Chandran",
    image: "/Artists/Pranav Chandran.png",
  },
  {
    id: 13,
    name: "badsha",
    image: "/Artists/badash.png",
  },
  {
    id: 14,
    name: "Uzi Senadeera",
    image: "/Artists/Uzi Senadeera.png",
  },
  {
    id: 15,
    name: "Kaizer Kaiz",
    image: "/Artists/Kaizer Kaiz.png",
  },
  {
    id: 16,
    name: "Dinuli Damsandi",
    image: "/Artists/Dinuli Damsandi.png",
  },
  {
    id: 17,
    name: "hana shafa",
    image: "/Artists/hana shafa.png",
  },
  {
    id: 18,
    name: "Mc Soul",
    image: "/Artists/Mc Soul.png",
  },
  {
    id: 19,
    name: "smokio",
    image: "/Artists/smokio.png",
  },
  {
    id: 20,
    name: "Dinesh Gamge",
    image: "/Artists/Dinesh Gamge.png",
  },
  {
    id: 21,
    name: "Arjun Kanango",
    image: "/Artists/Arjun Kanango.png",
  },
  {
    id: 22,
    name: "Dulan ARX",
    image: "/Artists/Dulan ARX.png",
  },
  {
    id: 23,
    name: "Nilan Hettiarachchi",
    image: "/Artists/Nilan Hettiarachchi.png",
  },
  {
    id: 24,
    name: "Manakkalpitha",
    image: "/Artists/Manakkalpitha.png",
  },
  {
    id: 25,
    name: "Kanchana Anuradhi",
    image: "/Artists/Kanchana Anuradhi.png",
  },
  {
    id: 26,
    name: "spukuriti Kakker & Prakathi Kakker",
    image: "/Artists/Kuriti Kakker Prakathi Kakker.png",
  },
  {
    id: 27,
    name: "Ravi Jay",
    image: "/Artists/Ravi Jay.png",
  },
  {
    id: 28,
    name: "Suwavas",
    image: "/Artists/Suwahas.png",
  },
  {
    id: 29,
    name: "Thiwanka Dilshan",
    image: "/Artists/Thiwanka Dilshan.png",
  },
  {
    id: 30,
    name: "Dilki Uresha",
    image: "/Artists/Dilki Uresha.png",
  },
  {
    id: 31,
    name: "Dimi3",
    image: "/Artists/Dimi3.png",
  },
  {
    id: 32,
    name: "yuki Nawarathna",
    image: "/Artists/yuki Nawarathna.png",
  },

]

const SliderControls: React.FC = () => {
  const swiper = useSwiper()
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex flex-col bg-black/90">
      <motion.button
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(0, 0, 0, 1)" }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          swiper.slidePrev(0)
          swiper.autoplay?.stop()
          swiper.autoplay?.start()
        }}
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white cursor-pointer select-none border-l border-t border-r border-b-[0.5px] border-white/10"
      >
        <span className="font-mono text-xl md:text-2xl tracking-widest font-semibold">&lt;</span>
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)", color: "rgba(0, 0, 0, 1)" }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          swiper.slideNext(0)
          swiper.autoplay?.stop()
          swiper.autoplay?.start()
        }}
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white cursor-pointer select-none border-l border-b border-r border-t-[0.5px] border-white/10"
      >
        <span className="font-mono text-xl md:text-2xl tracking-widest font-semibold">&gt;</span>
      </motion.button>
    </div>
  )
}

export const HeroSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef<number | null>(null)

  // Trigger GSAP animations on slide change
  useGSAP(() => {
    const prevIndex = prevIndexRef.current

    if (prevIndex === null) {
      // First render: set all other slides to initial state instantly
      SLIDES.forEach((slide, index) => {
        if (index !== activeIndex) {
          gsap.set(`.slide-image-${index}`, { scale: 1.15, opacity: 0.4 })
          gsap.set(`.slide-title-${index} .reveal-line`, { y: "100%" })
        }
      })
    } else if (prevIndex !== activeIndex) {
      // Smoothly transition previous slide elements to inactive state
      gsap.to(`.slide-image-${prevIndex}`, {
        scale: 1.15,
        opacity: 0.4,
        duration: 2.0,
        ease: "power3.out",
      })
      gsap.to(`.slide-title-${prevIndex} .reveal-line`, {
        y: "100%",
        duration: 1.4,
        ease: "power4.out",
      })
    }

    // Animate active slide elements
    gsap.to(`.slide-image-${activeIndex}`, {
      scale: 1.0,
      opacity: 1,
      duration: 2.0,
      ease: "power3.out",
    })

    gsap.to(`.slide-title-${activeIndex} .reveal-line`, {
      y: "50%",
      duration: 1.4,
      delay: 0.1,
      ease: "power4.out",
    })

    prevIndexRef.current = activeIndex
  }, [activeIndex])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        allowTouchMove={true}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="w-full h-full"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`} className="relative w-full h-full">
            {/* Grayscale Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.name}
                fill
                priority={index === 0}
                className={`object-cover filter grayscale slide-image slide-image-${index}`}
                style={{ objectPosition: "center" }}
                sizes="100vw"
              />
            </div>

            {/* Gradient Overlays */}
            {/* Top Fade */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/10 to-transparent z-10 pointer-events-none" />

            {/* Bottom Vignette */}
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black via-black/35 to-transparent z-10 pointer-events-none" />

            {/* Large Artist Name Title - Bottom Center */}
            <div className="absolute bottom-[0%] max-[770px]:bottom-[160px] md:bottom-[16%] left-1/2 -translate-x-1/2 w-full text-center px-4 z-20 pointer-events-none">
              <div className={`py-4 slide-title-${index}`}>
                <h1 className="font-sans text-[50px] max-[770px]:text-[40px] tracking-[0.16em] font-extrabold uppercase text-white leading-none whitespace-normal md:whitespace-nowrap">
                  <span className="inline-block reveal-line translate-y-full">
                    {slide.name}
                  </span>
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SliderControls />
      </Swiper>
    </div>
  )
}
