"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { figures } from "@/lib/figures-data"

gsap.registerPlugin(ScrollTrigger)

const timelineData = [
  { id: "hattie-mcdaniel", name: "Hattie", full: "McDaniel", year: "1940", image: "/images/hattie-mcdaniel.jpg", letter: "H" },
  { id: "dorothy-dandridge", name: "Dorothy", full: "Dandridge", year: "1954", image: "/images/dorothy-dandridge.jpg", letter: "D" },
  { id: "pam-grier", name: "Pam", full: "Grier", year: "1973", image: "/images/pam-grier.jpg", letter: "P" },
  { id: "halle-berry", name: "Halle", full: "Berry", year: "2002", image: "/images/halle-berry.jpg", letter: "H" },
  { id: "viola-davis", name: "Viola", full: "Davis", year: "2008", image: "/images/viola-davis.jpg", letter: "V" },
  { id: "gabourey-sidibe", name: "Gabourey", full: "Sidibe", year: "2009", image: "/images/gabourey-sidibe.jpg", letter: "G" },
  { id: "lupita-nyongo", name: "Lupita", full: "Nyong'o", year: "2013", image: "/images/lupita-nyongo.jpg", letter: "L" },
  { id: "halle-bailey", name: "Halle", full: "Bailey", year: "2023", image: "/images/halle-bailey.jpg", letter: "H" },
]

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const photos = sectionRef.current?.querySelectorAll(".timeline-photo-wrap")
    photos?.forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out"
      })
    })

    // Animate counters
    const stats = statsRef.current?.querySelectorAll("[data-target]")
    stats?.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0")
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
        onUpdate: function() {
          el.textContent = Math.round(this.targets()[0].val).toString()
        }
      })
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-[10vh] px-[6vw] relative">
      <div className="section-label flex items-center gap-4 mb-6">
        <span>Chronological overview</span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--gris-mid), transparent)" }} />
      </div>

      <h2 className="font-display text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold mb-3 max-w-[600px]">
        84 years of contradictions
      </h2>
      <p className="font-mono-custom text-xs text-muted-custom leading-[1.8] max-w-[500px] mb-16">
        From Hattie McDaniel&apos;s Oscar in 1940 to Halle Bailey&apos;s casting battle in 2023.
        <br />
        Eight moments the system tried to define Black women — and eight women who complicated that definition.
      </p>

      {/* Timeline */}
      <div className="relative overflow-hidden">
        <div className="flex items-end gap-0 pb-12 relative">
          {/* Axis line */}
          <div className="absolute bottom-12 left-0 right-0 h-px bg-gris-mid" />

          {timelineData.map((figure, i) => (
            <Link
              key={figure.id}
              href={`/figure/${figure.id}`}
              className="timeline-figure flex-1 flex flex-col items-center gap-0 cursor-pointer relative group"
            >
              <div
                className="timeline-photo-wrap relative w-16 mb-4 opacity-0 translate-y-8"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative w-16 h-[90px] overflow-hidden">
                  <Image
                    src={figure.image}
                    alt={`${figure.name} ${figure.full}`}
                    fill
                    className="object-cover img-grayscale group-hover:border-or"
                    style={{ border: "1px solid transparent", transition: "all 0.4s" }}
                  />
                  <div className="absolute inset-0 bg-noir mix-blend-multiply transition-opacity group-hover:opacity-0" />
                </div>
              </div>

              <div className="w-1.5 h-1.5 rounded-full bg-gris-mid border border-muted-custom transition-all group-hover:bg-or group-hover:border-or group-hover:shadow-[0_0_12px_rgba(184,145,74,0.4)]" />
              
              <span className="font-mono-custom text-[9px] text-muted-custom mt-2 tracking-[0.1em]">
                {figure.year}
              </span>
              <span className="font-sans text-[9px] font-semibold text-creme-dark text-center mt-1 tracking-[0.05em] uppercase">
                {figure.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-3 gap-px bg-gris-mid border border-gris-mid mt-8">
        <div className="bg-noir p-6 text-center">
          <span className="stat-num block mb-2" data-target="309">0</span>
          <span className="font-mono-custom text-[9px] text-muted-custom tracking-[0.2em] uppercase leading-[1.4]">
            Films in<br />Hattie&apos;s career
          </span>
        </div>
        <div className="bg-noir p-6 text-center">
          <span className="stat-num block mb-2" data-target="84">0</span>
          <span className="font-mono-custom text-[9px] text-muted-custom tracking-[0.2em] uppercase leading-[1.4]">
            Years of<br />this archive
          </span>
        </div>
        <div className="bg-noir p-6 text-center">
          <span className="stat-num block mb-2">
            <span data-target="1">0</span>%
          </span>
          <span className="font-mono-custom text-[9px] text-muted-custom tracking-[0.2em] uppercase leading-[1.4]">
            Lead roles for<br />Black women in 1960s
          </span>
        </div>
      </div>
    </section>
  )
}
