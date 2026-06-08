"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
  }, [])

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Film strips */}
      <div className="film-strip absolute left-0 top-0 bottom-0 w-12" />
      <div className="film-strip absolute right-0 top-0 bottom-0 w-12" />

      <p
        ref={eyebrowRef}
        className="font-mono-custom text-[10px] tracking-[0.4em] text-or uppercase mb-10 opacity-0 translate-y-4"
      >
        A Critical Archive — Hollywood, 1939–2023
      </p>

      <h1
        ref={titleRef}
        className="font-display text-[clamp(4rem,10vw,9rem)] font-black leading-[0.9] text-center opacity-0 translate-y-4"
      >
        Black
        <br />
        <em className="italic text-or">Celluloid</em>
      </h1>

      <p
        ref={subtitleRef}
        className="mt-12 font-display italic text-[clamp(0.9rem,1.5vw,1.1rem)] text-creme-dark text-center max-w-[560px] leading-[1.8] px-6 opacity-0 translate-y-4"
      >
        Eight women. Eight contradictions the industry never resolved.
        <br />
        A platform that refuses to celebrate, refuses to condemn.
      </p>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "2.5s", opacity: 0 }}>
        <div
          className="w-px h-10 animate-scroll-pulse"
          style={{ background: "linear-gradient(to bottom, var(--or), transparent)" }}
        />
        <span className="font-mono-custom text-[9px] tracking-[0.3em] text-muted-custom uppercase">
          scroll
        </span>
      </div>
    </section>
  )
}
