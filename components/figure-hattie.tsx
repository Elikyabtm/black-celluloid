"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function FigureHattie() {
  const sectionRef = useRef<HTMLElement>(null)
  const dotMatrixRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate figure elements
    gsap.to(section.querySelector(".figure-number"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".figure-name"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".figure-years"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".figure-tension"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      x: 0,
      duration: 1,
      delay: 0.4,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".figure-quote"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out"
    })

    // Portrait animation
    gsap.to(section.querySelector(".portrait-wrap"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })

    // Dot matrix animation
    gsap.to(dotMatrixRef.current, {
      scrollTrigger: { trigger: dotMatrixRef.current, start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      onComplete: () => {
        const dots = dotMatrixRef.current?.querySelectorAll(".dot")
        dots?.forEach((dot, i) => {
          setTimeout(() => {
            (dot as HTMLElement).style.opacity = "1";
            (dot as HTMLElement).style.transform = "scale(1)"
          }, i * 15)
        })
      }
    })
  }, [])

  // Generate 120 dots representing 309 films
  const dots = Array.from({ length: 120 }, (_, i) => {
    const r = Math.random()
    const color = r < 0.87 ? "#7a7060" : r < 0.95 ? "#b8914a" : "#6b1a1a"
    return { color, delay: i * 0.015 }
  })

  return (
    <section
      ref={sectionRef}
      id="figure-1"
      className="min-h-screen py-[12vh] px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-[8vw] items-center"
    >
      {/* Text side */}
      <div className="sticky top-[20vh] self-start">
        <div className="figure-number font-display text-[8rem] font-black italic text-gris-mid leading-none -mb-4 opacity-0">
          01
        </div>
        <h2 className="figure-name font-display text-[clamp(2rem,3vw,2.8rem)] font-bold leading-[1.1] mb-2 opacity-0 -translate-x-5">
          Hattie
          <br />
          McDaniel
        </h2>
        <p className="figure-years font-mono-custom text-[10px] text-or tracking-[0.3em] mb-8 opacity-0">
          1895 — 1952 · First Black Oscar winner
        </p>
        <p className="figure-tension font-display italic text-[1.05rem] text-creme-dark leading-[1.7] border-l-2 pl-6 mb-8 opacity-0 -translate-x-5" style={{ borderColor: "var(--rouge)" }}>
          &ldquo;She won the Oscar. She sat at a segregated table at the ceremony. She played maids in 309 films. She said it was better to play a maid than be one. Her contradictions were imposed on her — and she weaponized them.&rdquo;
        </p>
        <blockquote className="figure-quote font-mono-custom text-[11px] text-muted-custom leading-[1.9] opacity-0">
          &ldquo;Why should I complain about making seven thousand dollars a week playing a maid? If I didn&apos;t, I&apos;d be making seven dollars a week being one.&rdquo;
          <span className="block mt-3 text-or text-[10px] tracking-[0.2em]">
            — Hattie McDaniel, 1947
          </span>
        </blockquote>
      </div>

      {/* Visual side */}
      <div>
        {/* Portrait */}
        <div className="portrait-wrap relative w-full max-w-[360px] aspect-[3/4] mb-8 mx-auto opacity-0 translate-y-8">
          <Image
            src="/images/hattie-mcdaniel.jpg"
            alt="Hattie McDaniel"
            fill
            className="object-cover img-grayscale"
          />
          <div className="portrait-lines" />
          <div className="portrait-frame" />
          <div className="portrait-corner tl" />
          <div className="portrait-corner tr" />
          <div className="portrait-corner bl" />
          <div className="portrait-corner br" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="block font-display text-2xl font-black italic text-creme/15">Hattie</span>
            <span className="block font-display text-2xl font-black italic text-creme/15">McDaniel</span>
          </div>
        </div>

        {/* Dot Matrix */}
        <div ref={dotMatrixRef} className="opacity-0 translate-y-10">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-or uppercase mb-6">
            309 film roles — what was she offered?
          </p>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#7a7060" }} />
              Maid / Domestic (87%)
            </div>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#b8914a" }} />
              Comic Relief (8%)
            </div>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#6b1a1a" }} />
              Other (5%)
            </div>
          </div>

          {/* Dots */}
          <div className="flex flex-wrap gap-1 max-w-[480px]">
            {dots.map((dot, i) => (
              <div
                key={i}
                className="dot opacity-0 scale-0"
                style={{
                  background: dot.color,
                  transitionDelay: `${dot.delay}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
