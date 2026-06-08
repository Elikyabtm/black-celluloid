"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function StatementSection() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll(".statement-line")
    const mono = containerRef.current?.querySelector(".statement-mono")

    lines?.forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: "top 80%" },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.2,
        ease: "power3.out"
      })
    })

    if (mono) {
      gsap.to(mono, {
        scrollTrigger: { trigger: mono, start: "top 80%" },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
      })
    }
  }, [])

  return (
    <section ref={containerRef} className="py-[15vh] px-[10vw] max-w-[1100px] mx-auto">
      <p className="statement-line font-display text-[clamp(1.8rem,3.5vw,3rem)] font-normal leading-[1.35] text-creme-dark opacity-0 translate-y-10">
        Hollywood <strong className="text-creme font-bold">has always claimed</strong> to reflect society.
      </p>
      <br />
      <p className="statement-line font-display text-[clamp(1.8rem,3.5vw,3rem)] font-normal leading-[1.35] text-creme-dark opacity-0 translate-y-10">
        What it has actually reflected
      </p>
      <p className="statement-line font-display text-[clamp(1.8rem,3.5vw,3rem)] font-normal leading-[1.35] text-or italic opacity-0 translate-y-10">
        is its own fear of Black womanhood.
      </p>

      <div className="statement-mono mt-16 font-mono-custom text-[11px] tracking-[0.2em] text-muted-custom border-l-2 pl-6 leading-[2] opacity-0 -translate-x-5" style={{ borderColor: "var(--rouge)" }}>
        — This platform does not celebrate progress.
        <br />
        — It does not denounce Hollywood.
        <br />
        — It maps the contradiction.
      </div>
    </section>
  )
}
