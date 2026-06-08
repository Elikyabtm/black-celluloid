"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const hubData = [
  { id: "hattie-mcdaniel", name: "Hattie", full: "McDaniel", year: "1940", image: "/images/hattie-mcdaniel.jpg", tension: "She won the Oscar. She sat at a segregated table." },
  { id: "dorothy-dandridge", name: "Dorothy", full: "Dandridge", year: "1954", image: "/images/dorothy-dandridge.jpg", tension: "Hollywood made her an icon. Then let her die." },
  { id: "pam-grier", name: "Pam", full: "Grier", year: "1973", image: "/images/pam-grier.jpg", tension: "Liberated on screen. Exploited off it." },
  { id: "halle-berry", name: "Halle", full: "Berry", year: "2002", image: "/images/halle-berry.jpg", tension: "The first. Still the only. Twenty years later." },
  { id: "viola-davis", name: "Viola", full: "Davis", year: "2008", image: "/images/viola-davis.jpg", tension: "The most acclaimed. The most limited." },
  { id: "gabourey-sidibe", name: "Gabourey", full: "Sidibe", year: "2009", image: "/images/gabourey-sidibe.jpg", tension: "Celebrated. Then abandoned." },
  { id: "lupita-nyongo", name: "Lupita", full: "Nyong'o", year: "2013", image: "/images/lupita-nyongo.jpg", tension: "Global beauty. Invisible face." },
  { id: "halle-bailey", name: "Halle", full: "Bailey", year: "2023", image: "/images/halle-bailey.jpg", tension: "A mermaid. A culture war." },
]

export function HubSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll(".hub-card")
    cards.forEach((card, i) => {
      gsap.to(card, {
        scrollTrigger: { trigger: section, start: "top 60%" },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
      })
    })
  }, [])

  return (
    <section ref={sectionRef} id="hub" className="py-[15vh] px-[6vw] bg-noir-soft relative">
      {/* Top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--or), transparent)" }}
      />

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[1.05]">
          Eight
          <br />
          <em className="italic text-or">figures.</em>
          <br />
          Eight tensions.
        </h2>
        <p className="font-mono-custom text-xs text-muted-custom leading-[1.9] border-l-2 border-gris-mid pl-6">
          Each trajectory is a case study in how Hollywood uses, celebrates, limits, and abandons Black women.
          <br /><br />
          No figure is a victim. No figure is a hero. Each is a site where contradictions become visible.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
        {hubData.map((figure, i) => (
          <Link
            key={figure.id}
            href={`/figure/${figure.id}`}
            className="hub-card relative aspect-[2/3] overflow-hidden cursor-pointer bg-gris group opacity-0 translate-y-8"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <Image
                src={figure.image}
                alt={`${figure.name} ${figure.full}`}
                fill
                className="object-cover object-top img-grayscale group-hover:scale-[1.04] transition-transform duration-700"
              />
            </div>

            {/* Overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background: "linear-gradient(to top, rgba(10,9,6,0.95) 0%, rgba(10,9,6,0.3) 50%, transparent 100%)"
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="block font-mono-custom text-[9px] text-or tracking-[0.3em] mb-1">
                {figure.year}
              </span>
              <h3 className="font-display text-[1.05rem] font-bold leading-[1.2] mb-1">
                {figure.name}
                <br />
                {figure.full}
              </h3>
              <p className="font-mono-custom text-[9px] text-creme-dark leading-[1.5] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {figure.tension}
              </p>
            </div>

            {/* Bottom bar */}
            <div
              className="absolute left-0 bottom-0 h-0.5 w-0 bg-or group-hover:w-full transition-all duration-500"
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
