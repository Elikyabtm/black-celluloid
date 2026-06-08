"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const leftData = [
  { label: "Studio profit", value: "$847M", width: 90, color: "var(--or)" },
  { label: "Grier's pay share", value: "4%", width: 4, color: "var(--creme-dark)" },
  { label: '"Empowerment" in promo', value: "100%", width: 100, color: "var(--or)" },
]

const rightData = [
  { label: "Scripts by Black women", value: "0%", width: 0, color: "var(--rouge-vif)" },
  { label: "Directors: Black women", value: "0%", width: 0, color: "var(--rouge-vif)" },
  { label: "Films still distributed", value: "12%", width: 12, color: "var(--creme-dark)" },
]

export function FigurePam() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animate left side
    const leftBars = section.querySelectorAll(".hbar-left .hbar-fill")
    leftBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      gsap.to(bar, {
        scrollTrigger: { trigger: bar, start: "top 80%" },
        width: `${width}%`,
        duration: 1.5,
        ease: "power2.out"
      })
    })

    // Animate right side
    const rightBars = section.querySelectorAll(".hbar-right .hbar-fill")
    rightBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      gsap.to(bar, {
        scrollTrigger: { trigger: bar, start: "top 80%" },
        width: `${width}%`,
        duration: 1.5,
        ease: "power2.out"
      })
    })

    // Fade in labels
    gsap.to(section.querySelectorAll(".split-label"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })

    gsap.to(section.querySelectorAll(".split-quote"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      delay: 0.3,
      ease: "power3.out"
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="figure-3"
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
    >
      {/* Left side - Dark */}
      <div className="bg-noir p-[12vh_6vw] flex flex-col justify-center">
        <span className="split-label inline-block w-fit font-mono-custom text-[9px] tracking-[0.4em] uppercase mb-8 px-3 py-1 border border-or text-or opacity-0 translate-y-4">
          Hollywood says
        </span>
        
        <p className="split-quote font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.6] mb-6 opacity-0 translate-y-4">
          &ldquo;Pam Grier embodied a new kind of Black femininity — powerful, sexual, autonomous. Blaxploitation liberated her.&rdquo;
        </p>
        
        <p className="font-mono-custom text-[10px] text-muted-custom tracking-[0.15em] mb-8">
          — Hollywood marketing, 1973–1979
        </p>

        {/* Bar chart */}
        <div className="hbar-left space-y-5 max-w-md">
          {leftData.map((item) => (
            <div key={item.label} className="hbar-item">
              <div className="font-mono-custom text-[10px] text-creme-dark mb-1 flex justify-between">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="hbar-track">
                <div
                  className="hbar-fill"
                  data-width={item.width}
                  style={{ background: item.color, width: 0 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Light */}
      <div className="bg-gris border-l border-gris-mid p-[12vh_6vw] flex flex-col justify-center">
        <span className="split-label inline-block w-fit font-mono-custom text-[9px] tracking-[0.4em] uppercase mb-8 px-3 py-1 border opacity-0 translate-y-4" style={{ borderColor: "var(--rouge-vif)", color: "var(--rouge-vif)" }}>
          The contradiction
        </span>
        
        <p className="split-quote font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.6] mb-6 opacity-0 translate-y-4">
          &ldquo;She was liberated on screen and exploited off it. Her power was a product. The genre that named itself after Black audiences sold them a fantasy of autonomy while extracting maximum value.&rdquo;
        </p>
        
        <p className="font-mono-custom text-[10px] text-muted-custom tracking-[0.15em] mb-8">
          — bell hooks, Black Looks, 1992
        </p>

        {/* Bar chart */}
        <div className="hbar-right space-y-5 max-w-md">
          {rightData.map((item) => (
            <div key={item.label} className="hbar-item">
              <div className="font-mono-custom text-[10px] text-creme-dark mb-1 flex justify-between">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="hbar-track">
                <div
                  className="hbar-fill"
                  data-width={item.width}
                  style={{ background: item.color, width: 0 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
