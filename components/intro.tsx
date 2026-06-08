"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface IntroProps {
  onComplete: () => void
}

export function Intro({ onComplete }: IntroProps) {
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [filmStrips, setFilmStrips] = useState<number[]>([])

  useEffect(() => {
    // Film strips appear one by one
    const stripTimers = [0, 200, 400, 600, 800].map((delay, i) =>
      setTimeout(() => {
        setFilmStrips(prev => [...prev, i])
      }, delay)
    )

    // Title appears after film strips
    const titleTimer = setTimeout(() => setShowTitle(true), 1200)
    // Subtitle appears
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 2000)
    // Scroll hint appears
    const scrollTimer = setTimeout(() => setShowScrollHint(true), 3000)

    return () => {
      stripTimers.forEach(clearTimeout)
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(scrollTimer)
    }
  }, [])

  useEffect(() => {
    if (!showScrollHint) return

    const handleScroll = () => {
      if (window.scrollY > 50) {
        onComplete()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        onComplete()
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("wheel", handleWheel)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [showScrollHint, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
    >
      {/* Film strip decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {filmStrips.map((i) => (
          <motion.div
            key={i}
            className="absolute h-32 border-y border-neutral-800"
            style={{
              width: "120%",
              top: `${15 + i * 17}%`,
            }}
            initial={{ x: i % 2 === 0 ? "-100%" : "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Film perforations */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {Array.from({ length: 30 }).map((_, j) => (
                <div
                  key={j}
                  className="w-3 h-4 bg-black border border-neutral-700 rounded-sm"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        <AnimatePresence>
          {showTitle && (
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider text-stone-100 mb-8"
              style={{
                fontFamily: "serif",
                textShadow: "0 0 60px rgba(255,255,255,0.1)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Black Celluloid
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              className="text-lg md:text-xl text-stone-400 italic max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {"Une archive qui résiste à ses propres conclusions."}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              className="mt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="w-6 h-10 border-2 border-stone-600 rounded-full mx-auto flex justify-center pt-2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-2 bg-stone-500 rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  )
}
