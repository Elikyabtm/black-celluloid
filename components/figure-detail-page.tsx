"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomCursor } from "./custom-cursor"
import type { FigureData } from "@/lib/figures-data"

gsap.registerPlugin(ScrollTrigger)

const figureImages: Record<string, string> = {
  "hattie-mcdaniel": "/images/hattie-mcdaniel.jpg",
  "dorothy-dandridge": "/images/dorothy-dandridge.jpg",
  "pam-grier": "/images/pam-grier.jpg",
  "halle-berry": "/images/halle-berry.jpg",
  "viola-davis": "/images/viola-davis.jpg",
  "gabourey-sidibe": "/images/gabourey-sidibe.jpg",
  "lupita-nyongo": "/images/lupita-nyongo.jpg",
  "halle-bailey": "/images/halle-bailey.jpg",
}

interface Props {
  figure: FigureData
  prevFigure: FigureData | null
  nextFigure: FigureData | null
  index: number
}

export function FigureDetailPage({ figure, prevFigure, nextFigure, index }: Props) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update progress bar on scroll
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress((scrollTop / docHeight) * 100)
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Animate sections on scroll
    const sections = container.querySelectorAll(".anim-section")
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          }
        }
      )
    })

    // Timeline events
    const events = container.querySelectorAll(".timeline-event")
    events.forEach((event, i) => {
      gsap.fromTo(event,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: event,
            start: "top 80%",
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [figure.id])

  const imageSrc = figureImages[figure.id] || "/images/hattie-mcdaniel.jpg"

  return (
    <>
      <CustomCursor />
      
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gris-mid z-[200]">
        <div
          className="h-full transition-all duration-150"
          style={{ width: `${progress}%`, background: "var(--or)" }}
        />
      </div>

      {/* Back button */}
      <Link
        href="/#hub"
        className="fixed top-8 left-8 z-[100] font-mono-custom text-[10px] tracking-[0.3em] text-muted-custom uppercase hover:text-or transition-colors flex items-center gap-2"
      >
        <span>←</span> Back to archive
      </Link>

      {/* Figure number */}
      <div className="fixed top-8 right-8 z-[100] font-display text-[3rem] font-black italic text-gris-mid leading-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div ref={containerRef} className="min-h-screen" style={{ background: "var(--noir)" }}>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt={figure.name}
              fill
              className="object-cover opacity-20 img-grayscale"
              priority
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, var(--noir), transparent 30%, transparent 70%, var(--noir))" }} />
          </div>

          <div className="relative z-10 text-center px-8 max-w-4xl">
            <p className="font-mono-custom text-[10px] tracking-[0.4em] text-or uppercase mb-6">
              {figure.years} · {figure.theme}
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] mb-8">
              {figure.name.split(" ")[0]}
              <br />
              <em className="italic text-or">{figure.name.split(" ").slice(1).join(" ")}</em>
            </h1>
            <p className="font-display italic text-[clamp(1rem,2vw,1.3rem)] text-creme-dark leading-[1.7] max-w-2xl mx-auto">
              &ldquo;{figure.entry.phrase}&rdquo;
            </p>
            
            {figure.entry.film && (
              <p className="font-mono-custom text-[9px] tracking-[0.2em] text-muted-custom mt-6">
                {figure.entry.film}
              </p>
            )}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div
              className="w-px h-10 animate-scroll-pulse"
              style={{ background: "linear-gradient(to bottom, var(--or), transparent)" }}
            />
            <span className="font-mono-custom text-[9px] tracking-[0.3em] text-muted-custom uppercase">
              scroll
            </span>
          </div>
        </section>

        {/* §2 The System */}
        <section className="py-[15vh] px-[8vw] anim-section">
          <div className="max-w-4xl mx-auto">
            <div className="section-label flex items-center gap-4 mb-8">
              <span>Le système</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--gris-mid), transparent)" }} />
            </div>

            <div className="space-y-4">
              {figure.system.dates.map((date, i) => (
                <p key={i} className="font-mono-custom text-sm text-creme-dark leading-[1.9] pl-6 border-l-2 border-gris-mid">
                  {date}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* §3 The Impossible Choice */}
        <section className="py-[15vh] px-[8vw] anim-section" style={{ background: "var(--noir-soft)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="section-label flex items-center gap-4 mb-8">
              <span>Le choix impossible</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--gris-mid), transparent)" }} />
            </div>

            {/* Quote */}
            <blockquote className="font-display italic text-[clamp(1.5rem,3vw,2.5rem)] text-center leading-[1.4] mb-12 max-w-3xl mx-auto">
              &ldquo;{figure.choice.quote}&rdquo;
              {figure.choice.quoteAuthor && (
                <footer className="font-mono-custom text-[10px] text-or tracking-[0.2em] mt-4 not-italic">
                  — {figure.choice.quoteAuthor}
                </footer>
              )}
            </blockquote>

            {/* Columns */}
            <div className={`grid gap-8 ${figure.choice.center ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
              <div className="p-6 border border-gris-mid">
                <h3 className="font-mono-custom text-[10px] tracking-[0.3em] text-or uppercase mb-4">
                  {figure.choice.left.title}
                </h3>
                <ul className="space-y-2">
                  {figure.choice.left.items.map((item, i) => (
                    <li key={i} className="font-mono-custom text-xs text-creme-dark leading-[1.7]">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>

              {figure.choice.center && (
                <div className="p-6 border border-or">
                  <h3 className="font-mono-custom text-[10px] tracking-[0.3em] text-or uppercase mb-4">
                    {figure.choice.center.title}
                  </h3>
                  <ul className="space-y-2">
                    {figure.choice.center.items.map((item, i) => (
                      <li key={i} className="font-mono-custom text-xs text-creme-dark leading-[1.7]">
                        — {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-6 border border-gris-mid">
                <h3 className="font-mono-custom text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--rouge-vif)" }}>
                  {figure.choice.right.title}
                </h3>
                <ul className="space-y-2">
                  {figure.choice.right.items.map((item, i) => (
                    <li key={i} className="font-mono-custom text-xs text-creme-dark leading-[1.7]">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* §4 Signature Section */}
        <section className="py-[15vh] px-[8vw] anim-section">
          <div className="max-w-4xl mx-auto">
            <div className="section-label flex items-center gap-4 mb-8">
              <span>Le moment clé</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--gris-mid), transparent)" }} />
            </div>

            <h2 className="font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold mb-12">
              {figure.signature.title}
            </h2>

            {/* Timeline */}
            <div className="relative pl-8 border-l border-gris-mid">
              {figure.signature.events.map((event, i) => (
                <div key={i} className="timeline-event relative mb-8 last:mb-0">
                  <div className="absolute -left-[33px] w-2 h-2 rounded-full bg-gris-mid border border-or" />
                  {event.year && (
                    <span className="font-mono-custom text-[10px] text-or tracking-[0.2em] block mb-1">
                      {event.year}
                    </span>
                  )}
                  <p className="font-display text-creme-dark leading-[1.7]">
                    {event.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* §5 The Friction */}
        <section className="py-[15vh] px-[8vw] anim-section" style={{ background: "var(--gris)" }}>
          <div className="max-w-5xl mx-auto">
            <div className="section-label flex items-center gap-4 mb-12">
              <span>La friction</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--gris-mid), transparent)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="p-6 border-l-2 border-or">
                <p className="font-display italic text-lg text-creme leading-[1.7]">
                  {figure.friction.position1}
                </p>
              </div>
              <div className="p-6 border-l-2" style={{ borderColor: "var(--rouge)" }}>
                <p className="font-display italic text-lg text-creme leading-[1.7]">
                  {figure.friction.position2}
                </p>
              </div>
            </div>

            <div className="text-center p-8 bg-noir">
              <p className="font-mono-custom text-xs text-muted-custom leading-[1.9]">
                {figure.friction.data}
              </p>
            </div>
          </div>
        </section>

        {/* §6 Exit */}
        <section className="py-[20vh] px-[8vw] text-center anim-section">
          <p className="font-display italic text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.4] max-w-3xl mx-auto mb-16">
            &ldquo;{figure.exit.phrase}&rdquo;
          </p>

          {/* Links to other figures */}
          <div className="section-label flex justify-center mb-8">
            <span>Ponts thématiques</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {figure.exit.links.map((link) => (
              <Link
                key={link.id}
                href={`/figure/${link.id}`}
                className="group p-6 border border-gris-mid hover:border-or transition-colors text-left"
              >
                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-or transition-colors">
                  {link.name}
                </h3>
                <p className="font-mono-custom text-xs text-muted-custom leading-[1.7]">
                  {link.phrase}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center px-[8vw] py-12 border-t border-gris-mid">
          {prevFigure ? (
            <Link
              href={`/figure/${prevFigure.id}`}
              className="group flex items-center gap-4 hover:text-or transition-colors"
            >
              <span className="font-mono-custom text-sm">←</span>
              <div>
                <span className="font-mono-custom text-[9px] tracking-[0.2em] text-muted-custom block">Previous</span>
                <span className="font-display font-bold">{prevFigure.name}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/#hub"
            className="font-mono-custom text-[10px] tracking-[0.3em] text-muted-custom uppercase hover:text-or transition-colors"
          >
            Back to archive
          </Link>

          {nextFigure ? (
            <Link
              href={`/figure/${nextFigure.id}`}
              className="group flex items-center gap-4 hover:text-or transition-colors text-right"
            >
              <div>
                <span className="font-mono-custom text-[9px] tracking-[0.2em] text-muted-custom block">Next</span>
                <span className="font-display font-bold">{nextFigure.name}</span>
              </div>
              <span className="font-mono-custom text-sm">→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  )
}
