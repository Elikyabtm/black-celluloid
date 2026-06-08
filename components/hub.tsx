"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { figures, fantasyData } from "@/lib/figures-data"
import Link from "next/link"

interface HubProps {
  visitedFigures: string[]
}

export function Hub({ visitedFigures }: HubProps) {
  const [revealedFigures, setRevealedFigures] = useState<number[]>([])
  const [showFantasyData, setShowFantasyData] = useState(false)

  useEffect(() => {
    // Reveal figures progressively on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const progress = scrollY / (windowHeight * 0.5)

      const numToReveal = Math.min(figures.length, Math.floor(progress * figures.length) + 1)

      const newRevealed: number[] = []
      for (let i = 0; i < numToReveal; i++) {
        newRevealed.push(i)
      }
      setRevealedFigures(newRevealed)

      // Show fantasy data after exploring at least one figure
      if (visitedFigures.length > 0 && scrollY > windowHeight * 1.5) {
        setShowFantasyData(true)
      }
    }

    // Initial reveal
    setRevealedFigures([0])

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [visitedFigures.length])

  // Asymmetric grid positions
  const positions = [
    { col: "col-span-2", row: "row-span-2", size: "large" },
    { col: "col-span-1", row: "row-span-1", size: "small" },
    { col: "col-span-1", row: "row-span-2", size: "tall" },
    { col: "col-span-2", row: "row-span-1", size: "wide" },
    { col: "col-span-1", row: "row-span-1", size: "small" },
    { col: "col-span-1", row: "row-span-2", size: "tall" },
    { col: "col-span-2", row: "row-span-1", size: "wide" },
    { col: "col-span-1", row: "row-span-1", size: "small" },
  ]

  return (
    <div className="min-h-[300vh] bg-black">
      {/* Hero section */}
      <div className="h-screen flex flex-col items-center justify-center px-8">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-stone-100 mb-6 text-center"
          style={{ fontFamily: "serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Black Celluloid
        </motion.h1>
        <motion.p
          className="text-stone-500 text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          8 figures. 8 trajectoires. Une archive fragmentée.
        </motion.p>
        <motion.div
          className="w-6 h-10 border-2 border-stone-700 rounded-full flex justify-center pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-stone-600 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Figures grid */}
      <div className="max-w-6xl mx-auto px-4 pb-32">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[150px] md:auto-rows-[200px]">
          {figures.map((figure, index) => {
            const isRevealed = revealedFigures.includes(index)
            const isVisited = visitedFigures.includes(figure.id)
            const pos = positions[index]

            return (
              <motion.div
                key={figure.id}
                className={`${pos.col} ${pos.row} relative`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isRevealed ? 1 : 0,
                  scale: isRevealed ? 1 : 0.9,
                }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link href={`/figure/${figure.id}`}>
                  <div
                    className={`
                      relative w-full h-full overflow-hidden cursor-pointer group
                      border border-stone-800 transition-all duration-500
                      ${isVisited ? "opacity-60" : "opacity-100"}
                    `}
                    style={{
                      background: `linear-gradient(135deg, ${figure.color}15 0%, transparent 50%)`,
                    }}
                  >
                    {/* Film grain texture */}
                    <div
                      className="absolute inset-0 opacity-30 mix-blend-overlay"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Photogram frame effect */}
                    <div className="absolute inset-0 border-4 border-black opacity-50" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6">
                      {/* Film perforation marks */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {[1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-3 bg-black border border-stone-700 rounded-sm opacity-50"
                          />
                        ))}
                      </div>

                      {/* Visited indicator */}
                      {isVisited && (
                        <div className="absolute top-4 left-4">
                          <div className="w-2 h-2 rounded-full bg-stone-500" />
                        </div>
                      )}

                      {/* Figure info */}
                      <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                        <h3
                          className="text-stone-100 font-medium text-lg md:text-xl mb-1 group-hover:text-white transition-colors"
                          style={{ fontFamily: "serif" }}
                        >
                          {figure.name}
                        </h3>
                        <p className="text-stone-500 text-sm">{figure.years}</p>
                        <p className="text-stone-600 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                          {figure.theme}
                        </p>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${figure.color} 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Fantasy data visualization - appears after visiting at least one figure */}
      {visitedFigures.length > 0 && (
        <motion.div
          className="max-w-4xl mx-auto px-4 py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: showFantasyData ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="border border-stone-800 p-8 md:p-12">
            <h2
              className="text-stone-400 text-sm tracking-widest uppercase mb-8"
            >
              {fantasyData.title}
            </h2>

            <p
              className="text-stone-200 text-xl md:text-2xl mb-12 italic"
              style={{ fontFamily: "serif" }}
            >
              {fantasyData.question}
            </p>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Real roles */}
              <div>
                <h3 className="text-stone-500 text-sm mb-4 uppercase tracking-wider">
                  Rôles dans le réel
                </h3>
                <div className="space-y-3">
                  {fantasyData.realRoles.map((role, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-stone-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: showFantasyData ? 1 : 0, x: showFantasyData ? 0 : -20 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <span className="text-stone-100">{role.film}</span>
                      <span className="text-stone-600">—</span>
                      <span className="text-stone-500">{role.actress}</span>
                      <span className="text-stone-700 text-sm italic">({role.note})</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fantasy roles */}
              <div>
                <h3 className="text-stone-500 text-sm mb-4 uppercase tracking-wider">
                  Rôles hors du réel
                </h3>
                <div className="space-y-3">
                  {fantasyData.fantasyRoles.map((role, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-stone-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: showFantasyData ? 1 : 0, x: showFantasyData ? 0 : 20 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <span className="text-stone-100">{role.film}</span>
                      <span className="text-stone-600">—</span>
                      <span className="text-stone-500">{role.actress}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation hint */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="text-stone-600 text-xs">
          {visitedFigures.length} / {figures.length} figures explorées
        </div>
      </div>
    </div>
  )
}
