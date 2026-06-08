"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const bubbleData = [
  { decade: "1940s", x: 10, y: 75, size: 18, genre: "trauma", label: "Hattie McDaniel" },
  { decade: "1950s", x: 20, y: 55, size: 22, genre: "drama", label: "Dorothy Dandridge" },
  { decade: "1970s", x: 38, y: 70, size: 12, genre: "fantasy", label: "Pam Grier" },
  { decade: "2000s", x: 58, y: 40, size: 28, genre: "drama", label: "Halle Berry" },
  { decade: "2000s", x: 68, y: 25, size: 32, genre: "trauma", label: "Viola Davis" },
  { decade: "2000s", x: 75, y: 50, size: 16, genre: "trauma", label: "Gabourey Sidibe" },
  { decade: "2010s", x: 85, y: 35, size: 24, genre: "drama", label: "Lupita Nyong'o" },
  { decade: "2020s", x: 95, y: 55, size: 20, genre: "fantasy", label: "Halle Bailey" },
]

const genreColors: Record<string, string> = {
  trauma: "rgba(184, 145, 74, 0.7)",
  fantasy: "rgba(107, 26, 26, 0.8)",
  drama: "rgba(200, 191, 168, 0.5)",
}

export function TransversalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.to(section.querySelector(".transversal-title"), {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })

    gsap.to(section.querySelector(".transversal-sub"), {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    })

    gsap.to(chartRef.current, {
      scrollTrigger: { trigger: chartRef.current, start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })

    // Animate bubbles
    const bubbles = chartRef.current?.querySelectorAll(".bubble")
    bubbles?.forEach((bubble, i) => {
      gsap.fromTo(bubble,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: chartRef.current, start: "top 70%" }
        }
      )
    })
  }, [])

  const width = 800
  const height = 420
  const padding = 60

  return (
    <section ref={sectionRef} id="transversal" className="py-[12vh] px-[6vw] bg-noir max-w-[1200px] mx-auto">
      <div className="section-label flex justify-center mb-6">
        <span>Transversal reading</span>
      </div>

      <h2 className="transversal-title font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-center mb-4 opacity-0 translate-y-4">
        Across 84 years: what Hollywood actually gave
      </h2>
      <p className="transversal-sub font-mono-custom text-xs text-muted-custom text-center mb-16 opacity-0 translate-y-4">
        Genre distribution of lead roles for Black women · Oscar nominations vs wins · Industry gap
      </p>

      {/* Bubble Chart */}
      <div ref={chartRef} className="relative opacity-0 translate-y-8">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--gris-mid)" strokeWidth="0.5" strokeDasharray="2,4" />
            </pattern>
          </defs>
          <rect x={padding} y={padding} width={width - padding * 2} height={height - padding * 2} fill="url(#grid)" />

          {/* Axis labels */}
          <text x={width / 2} y={height - 15} className="font-mono-custom" fill="var(--text-muted)" fontSize="10" textAnchor="middle">
            DECADE →
          </text>
          <text
            x={15}
            y={height / 2}
            className="font-mono-custom"
            fill="var(--text-muted)"
            fontSize="10"
            textAnchor="middle"
            transform={`rotate(-90, 15, ${height / 2})`}
          >
            OSCAR RECOGNITION →
          </text>

          {/* Decade markers */}
          {["1940s", "1950s", "1970s", "2000s", "2010s", "2020s"].map((decade, i) => {
            const x = padding + (i / 5) * (width - padding * 2)
            return (
              <text
                key={decade}
                x={x}
                y={height - padding + 20}
                className="font-mono-custom"
                fill="var(--text-muted)"
                fontSize="9"
                textAnchor="middle"
              >
                {decade}
              </text>
            )
          })}

          {/* Bubbles */}
          {bubbleData.map((bubble, i) => {
            const cx = padding + (bubble.x / 100) * (width - padding * 2)
            const cy = padding + (bubble.y / 100) * (height - padding * 2)
            return (
              <g key={i} className="bubble" style={{ transformOrigin: `${cx}px ${cy}px` }}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={bubble.size}
                  fill={genreColors[bubble.genre]}
                  stroke="var(--creme)"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                />
                <text
                  x={cx}
                  y={cy + bubble.size + 12}
                  className="font-mono-custom"
                  fill="var(--creme-dark)"
                  fontSize="8"
                  textAnchor="middle"
                >
                  {bubble.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-8 mt-6 justify-center">
        <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: genreColors.trauma }} />
          Trauma / Realism
        </div>
        <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: genreColors.fantasy }} />
          Fantasy / Genre
        </div>
        <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: genreColors.drama }} />
          Drama / Prestige
        </div>
        <div className="flex items-center gap-2 font-mono-custom text-[10px] text-creme-dark">
          <span className="text-xs">●</span>
          Bubble size = Oscar nominations
        </div>
      </div>
    </section>
  )
}
