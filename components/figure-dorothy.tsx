"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const careerData = [
  { year: 1950, value: 2 },
  { year: 1951, value: 3 },
  { year: 1952, value: 4 },
  { year: 1953, value: 5 },
  { year: 1954, value: 8 },
  { year: 1955, value: 6 },
  { year: 1956, value: 4 },
  { year: 1957, value: 3 },
  { year: 1958, value: 2 },
  { year: 1959, value: 1 },
  { year: 1960, value: 0 },
  { year: 1961, value: 0 },
  { year: 1962, value: 0 },
  { year: 1963, value: 0 },
  { year: 1964, value: 0 },
  { year: 1965, value: 0 },
]

export function FigureDorothy() {
  const sectionRef = useRef<HTMLElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

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

    gsap.to(section.querySelector(".portrait-wrap"), {
      scrollTrigger: { trigger: section, start: "top 60%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })

    // Area chart animation
    gsap.to(chartRef.current, {
      scrollTrigger: { trigger: chartRef.current, start: "top 70%" },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    })

    // Animate area fill
    const areaPath = chartRef.current?.querySelector(".area-path")
    if (areaPath) {
      gsap.fromTo(areaPath, 
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: chartRef.current, start: "top 70%" }
        }
      )
    }
  }, [])

  // Create SVG path for area chart
  const maxValue = Math.max(...careerData.map(d => d.value))
  const width = 400
  const height = 200
  const padding = 20
  
  const points = careerData.map((d, i) => {
    const x = padding + (i / (careerData.length - 1)) * (width - padding * 2)
    const y = height - padding - (d.value / maxValue) * (height - padding * 2)
    return { x, y, year: d.year, value: d.value }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`

  return (
    <section
      ref={sectionRef}
      id="figure-2"
      className="min-h-screen py-[12vh] px-[6vw] grid grid-cols-1 lg:grid-cols-2 gap-[8vw] items-center"
    >
      {/* Text side */}
      <div className="sticky top-[20vh] self-start">
        <div className="figure-number font-display text-[8rem] font-black italic text-gris-mid leading-none -mb-4 opacity-0">
          02
        </div>
        <h2 className="figure-name font-display text-[clamp(2rem,3vw,2.8rem)] font-bold leading-[1.1] mb-2 opacity-0 -translate-x-5">
          Dorothy
          <br />
          Dandridge
        </h2>
        <p className="figure-years font-mono-custom text-[10px] text-or tracking-[0.3em] mb-8 opacity-0">
          1922 — 1965 · First Black Best Actress nominee
        </p>
        <p className="figure-tension font-display italic text-[1.05rem] text-creme-dark leading-[1.7] border-l-2 pl-6 mb-8 opacity-0 -translate-x-5" style={{ borderColor: "var(--rouge)" }}>
          &ldquo;The first Black woman nominated for Best Actress. Hollywood celebrated her. Then Hollywood abandoned her. Her career didn&apos;t plateau — it collapsed. The industry that created her refused to sustain her.&rdquo;
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-gris-mid border border-gris-mid max-w-[360px]">
          <div className="bg-noir p-4 text-center">
            <span className="stat-num block mb-1 text-2xl">1954</span>
            <span className="font-mono-custom text-[8px] text-muted-custom tracking-[0.15em] uppercase leading-[1.4]">
              Oscar<br />nomination
            </span>
          </div>
          <div className="bg-noir p-4 text-center">
            <span className="stat-num block mb-1 text-2xl">0</span>
            <span className="font-mono-custom text-[8px] text-muted-custom tracking-[0.15em] uppercase leading-[1.4]">
              Lead roles<br />after 1959
            </span>
          </div>
          <div className="bg-noir p-4 text-center">
            <span className="stat-num block mb-1 text-2xl">$</span>
            <span className="font-mono-custom text-[8px] text-muted-custom tracking-[0.15em] uppercase leading-[1.4]">
              Died nearly<br />broke, 1965
            </span>
          </div>
        </div>
      </div>

      {/* Visual side */}
      <div>
        {/* Portrait */}
        <div className="portrait-wrap relative w-full max-w-[360px] aspect-[3/4] mb-8 mx-auto opacity-0 translate-y-8">
          <Image
            src="/images/dorothy-dandridge.jpg"
            alt="Dorothy Dandridge"
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
            <span className="block font-display text-2xl font-black italic text-creme/15">Dorothy</span>
            <span className="block font-display text-2xl font-black italic text-creme/15">Dandridge</span>
          </div>
        </div>

        {/* Area Chart */}
        <div ref={chartRef} className="opacity-0 translate-y-10 max-w-[460px] mx-auto">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] text-or uppercase mb-6">
            Career trajectory — film offers per year
          </p>

          <div className="relative">
            <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full h-auto">
              {/* Grid lines */}
              {[0, 2, 4, 6, 8].map((v) => {
                const y = height - padding - (v / maxValue) * (height - padding * 2)
                return (
                  <g key={v}>
                    <line
                      x1={padding}
                      y1={y}
                      x2={width - padding}
                      y2={y}
                      stroke="var(--gris-mid)"
                      strokeWidth="0.5"
                      strokeDasharray="2,4"
                    />
                    <text
                      x={padding - 8}
                      y={y + 3}
                      className="font-mono-custom"
                      fill="var(--text-muted)"
                      fontSize="8"
                      textAnchor="end"
                    >
                      {v}
                    </text>
                  </g>
                )
              })}

              {/* Area */}
              <path
                className="area-path"
                d={areaPath}
                fill="url(#areaGradient)"
              />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="var(--or)"
                strokeWidth="2"
              />

              {/* Peak marker */}
              <circle
                cx={points[4].x}
                cy={points[4].y}
                r="4"
                fill="var(--or)"
              />
              <text
                x={points[4].x}
                y={points[4].y - 10}
                className="font-mono-custom"
                fill="var(--or)"
                fontSize="9"
                textAnchor="middle"
              >
                1954 Oscar nom.
              </text>

              {/* Years axis */}
              {[1950, 1954, 1959, 1965].map((year) => {
                const idx = careerData.findIndex(d => d.year === year)
                if (idx === -1) return null
                const x = padding + (idx / (careerData.length - 1)) * (width - padding * 2)
                return (
                  <text
                    key={year}
                    x={x}
                    y={height + 5}
                    className="font-mono-custom"
                    fill="var(--text-muted)"
                    fontSize="8"
                    textAnchor="middle"
                  >
                    {year}
                  </text>
                )
              })}

              {/* Gradient definition */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--or)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--or)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>

            {/* Collapse annotation */}
            <div className="absolute right-4 top-1/2 font-mono-custom text-[9px] text-muted-custom">
              <span className="text-rouge-vif">↓ Collapse</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
