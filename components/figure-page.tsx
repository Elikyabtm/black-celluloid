"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { FigureData } from "@/lib/figures-data"
import Link from "next/link"

interface FigurePageProps {
  figure: FigureData
  onVisit: (id: string) => void
}

export function FigurePage({ figure, onVisit }: FigurePageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Track current section based on scroll
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const section = Math.floor(latest * 6)
      setCurrentSection(Math.min(5, section))
    })
  }, [scrollYProgress])

  // Mark as visited
  useEffect(() => {
    const timer = setTimeout(() => {
      onVisit(figure.id)
    }, 2000)
    return () => clearTimeout(timer)
  }, [figure.id, onVisit])

  return (
    <div ref={containerRef} className="bg-black min-h-[600vh]">
      {/* Fixed navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-stone-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-stone-500 hover:text-stone-300 transition-colors text-sm">
            ← Retour au hub
          </Link>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                  i <= currentSection ? "bg-stone-400" : "bg-stone-800"
                }`}
              />
            ))}
          </div>
          <div className="text-stone-600 text-sm" style={{ fontFamily: "serif" }}>
            {figure.name}
          </div>
        </div>
      </nav>

      {/* Section 0: Entry */}
      <Section0Entry figure={figure} scrollYProgress={scrollYProgress} />

      {/* Section 1: System */}
      <Section1System figure={figure} scrollYProgress={scrollYProgress} />

      {/* Section 2: Choice */}
      <Section2Choice figure={figure} scrollYProgress={scrollYProgress} />

      {/* Section 3: Signature */}
      <Section3Signature figure={figure} scrollYProgress={scrollYProgress} />

      {/* Section 4: Friction */}
      <Section4Friction figure={figure} scrollYProgress={scrollYProgress} />

      {/* Section 5: Exit */}
      <Section5Exit figure={figure} scrollYProgress={scrollYProgress} />
    </div>
  )
}

// Section 0: Entry with film strip effect
function Section0Entry({ figure, scrollYProgress }: { figure: FigureData; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -100])

  const [typedText, setTypedText] = useState("")
  const [showPhrase, setShowPhrase] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowPhrase(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showPhrase) return

    let index = 0
    const interval = setInterval(() => {
      if (index <= figure.entry.phrase.length) {
        setTypedText(figure.entry.phrase.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [showPhrase, figure.entry.phrase])

  return (
    <motion.section
      className="h-screen flex flex-col items-center justify-center sticky top-0 px-8"
      style={{ opacity, y }}
    >
      {/* Film strip frame */}
      <div className="relative max-w-3xl w-full">
        {/* Top perforation */}
        <div className="flex justify-center gap-4 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-6 bg-black border border-stone-700 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Main frame */}
        <motion.div
          className="relative aspect-[4/3] bg-stone-950 border-4 border-stone-900 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center p-8">
            {figure.entry.film && (
              <motion.p
                className="text-stone-600 text-sm mb-4 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {figure.entry.film}
              </motion.p>
            )}

            <motion.p
              className="text-stone-200 text-xl md:text-2xl lg:text-3xl italic leading-relaxed"
              style={{ fontFamily: "serif" }}
            >
              {typedText}
              <span className="animate-pulse">|</span>
            </motion.p>
          </div>

          {/* Vignette effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </motion.div>

        {/* Bottom perforation */}
        <div className="flex justify-center gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-6 bg-black border border-stone-700 rounded-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-stone-700 rounded-full flex justify-center pt-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-stone-600 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Section 1: The System
function Section1System({ figure, scrollYProgress }: { figure: FigureData; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.15, 0.25, 0.3], [100, 0, 0, -100])

  return (
    <motion.section
      className="h-screen flex items-center justify-center sticky top-0 px-8"
      style={{ opacity, y }}
    >
      <div className="max-w-3xl w-full">
        {/* Name and years */}
        <motion.div className="mb-12 text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-stone-100 mb-2"
            style={{ fontFamily: "serif" }}
          >
            {figure.name}
          </h2>
          <p className="text-stone-500 text-lg">{figure.years}</p>
        </motion.div>

        {/* System data */}
        <div className="space-y-8">
          {figure.system.dates.map((date, i) => (
            <motion.div
              key={i}
              className="border-l-2 border-stone-700 pl-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-stone-300 text-lg leading-relaxed">{date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Section 2: The Choice
function Section2Choice({ figure, scrollYProgress }: { figure: FigureData; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [100, 0, 0, -100])

  return (
    <motion.section
      className="h-screen flex items-center justify-center sticky top-0 px-8"
      style={{ opacity, y }}
    >
      <div className="max-w-5xl w-full">
        {/* Quote */}
        <motion.blockquote
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p
            className="text-stone-200 text-xl md:text-2xl italic mb-4"
            style={{ fontFamily: "serif" }}
          >
            "{figure.choice.quote}"
          </p>
          {figure.choice.quoteAuthor && (
            <cite className="text-stone-500 text-sm not-italic">
              — {figure.choice.quoteAuthor}
            </cite>
          )}
        </motion.blockquote>

        {/* Two/Three columns */}
        <div className={`grid gap-8 ${figure.choice.center ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {/* Left column */}
          <div className="border border-stone-800 p-6">
            <h3 className="text-stone-500 text-sm uppercase tracking-wider mb-4">
              {figure.choice.left.title}
            </h3>
            <ul className="space-y-3">
              {figure.choice.left.items.map((item, i) => (
                <motion.li
                  key={i}
                  className="text-stone-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Center column (optional) */}
          {figure.choice.center && (
            <div className="border border-red-900/50 bg-red-950/10 p-6">
              <h3 className="text-red-400/80 text-sm uppercase tracking-wider mb-4">
                {figure.choice.center.title}
              </h3>
              <ul className="space-y-3">
                {figure.choice.center.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="text-red-200/70"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Right column */}
          <div className="border border-stone-800 p-6">
            <h3 className="text-stone-500 text-sm uppercase tracking-wider mb-4">
              {figure.choice.right.title}
            </h3>
            <ul className="space-y-3">
              {figure.choice.right.items.map((item, i) => (
                <motion.li
                  key={i}
                  className="text-stone-300"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Section 3: Signature moment
function Section3Signature({ figure, scrollYProgress }: { figure: FigureData; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [100, 0, 0, -100])

  return (
    <motion.section
      className="h-screen flex items-center justify-center sticky top-0 px-8"
      style={{ opacity, y }}
    >
      <div className="max-w-3xl w-full">
        <h3
          className="text-stone-400 text-sm tracking-widest uppercase mb-12 text-center"
        >
          {figure.signature.title}
        </h3>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-stone-800 transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {figure.signature.events.map((event, i) => (
              <motion.div
                key={i}
                className={`relative flex items-start gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-stone-600 rounded-full transform md:-translate-x-1/2 -translate-x-1" />

                {/* Content */}
                <div className={`pl-6 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  {event.year && (
                    <span className="text-stone-500 text-sm font-mono block mb-1">
                      {event.year}
                    </span>
                  )}
                  <p className="text-stone-300 leading-relaxed">{event.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

// Section 4: Friction
function Section4Friction({ figure, scrollYProgress }: { figure: FigureData; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [100, 0, 0, -100])

  return (
    <motion.section
      className="h-screen flex items-center justify-center sticky top-0 px-8"
      style={{ opacity, y }}
    >
      <div className="max-w-4xl w-full">
        <h3 className="text-stone-500 text-sm tracking-widest uppercase mb-12 text-center">
          La friction
        </h3>

        {/* Two positions in tension */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="p-6 border-l-2 border-stone-600"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-stone-300 leading-relaxed italic">
              {figure.friction.position1}
            </p>
          </motion.div>

          <motion.div
            className="p-6 border-l-2 border-stone-600"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-stone-300 leading-relaxed italic">
              {figure.friction.position2}
            </p>
          </motion.div>
        </div>

        {/* Data */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-stone-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {figure.friction.data}
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Section 5: Exit
function Section5Exit({ figure, scrollYProgress }: { figure: FigureData; scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const opacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0.75, 0.8], [100, 0])

  return (
    <motion.section
      className="h-screen flex items-center justify-center sticky top-0 px-8"
      style={{ opacity, y }}
    >
      <div className="max-w-3xl w-full text-center">
        {/* Exit phrase */}
        <motion.p
          className="text-stone-200 text-2xl md:text-3xl lg:text-4xl italic mb-16 leading-relaxed"
          style={{ fontFamily: "serif" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          "{figure.exit.phrase}"
        </motion.p>

        {/* Links to other figures */}
        <div className="grid md:grid-cols-2 gap-6">
          {figure.exit.links.map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/figure/${link.id}`}
                className="block p-6 border border-stone-800 hover:border-stone-600 transition-all group"
              >
                <h4
                  className="text-stone-200 text-lg mb-2 group-hover:text-white transition-colors"
                  style={{ fontFamily: "serif" }}
                >
                  {link.name}
                </h4>
                <p className="text-stone-500 text-sm italic">
                  {link.phrase}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Back to hub */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/"
            className="text-stone-600 hover:text-stone-400 transition-colors text-sm"
          >
            Retourner au hub central →
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
