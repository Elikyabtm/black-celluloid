"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function OutroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.to(section.querySelector(".outro-title"), {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".outro-line"), {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 1,
      scaleX: 1,
      duration: 1,
      delay: 0.5,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".outro-mono"), {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 1,
      duration: 1,
      delay: 0.8,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".outro-sub"), {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 1,
      duration: 1,
      delay: 1.2,
      ease: "power3.out"
    })
  }, [])

  return (
    <section ref={sectionRef} id="outro" className="py-[20vh] px-[6vw] text-center relative">
      <h2 className="outro-title font-display text-[clamp(2rem,5vw,4rem)] font-black italic leading-[1.2] max-w-[800px] mx-auto mb-8 opacity-0 translate-y-8">
        &ldquo;The image is never innocent.&rdquo;
      </h2>

      <div
        className="outro-line w-20 h-px mx-auto mb-8 opacity-0 scale-x-0"
        style={{ background: "var(--or)" }}
      />

      <p className="outro-mono font-mono-custom text-[11px] text-muted-custom tracking-[0.2em] opacity-0">
        — bell hooks · Black Looks: Race and Representation · 1992
      </p>

      <p className="outro-sub font-mono-custom text-[11px] text-muted-custom tracking-[0.15em] mt-8 opacity-0">
        Black Celluloid · PFE 2025–2026 · Plateforme de médiation critique
      </p>
    </section>
  )
}
