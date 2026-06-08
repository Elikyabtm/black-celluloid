"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// DOROTHY DANDRIDGE - Scroll vertical classique, SANS ralentissement (buggy)
// L'effet de chute est rendu visuellement par l'opacité décroissante des événements
// et le chart de carrière qui plonge vers zéro.

export function DorothyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeYear, setActiveYear] = useState<number | null>(null)

  const careerData = [
    { year: 1937, level: 10, label: "Débuts à 15 ans" },
    { year: 1942, level: 20, label: "Petits rôles" },
    { year: 1951, level: 35, label: "Tarzan's Peril" },
    { year: 1954, level: 100, label: "Carmen Jones — Nomination Oscar" },
    { year: 1957, level: 65, label: "Island in the Sun" },
    { year: 1959, level: 45, label: "Porgy and Bess" },
    { year: 1961, level: 15, label: "Les propositions s'arrêtent" },
    { year: 1963, level: 5,  label: "Faillite personnelle" },
    { year: 1965, level: 0,  label: "Décès — 42 ans" },
  ]

  const fallEvents = [
    { year: "1954", text: "Nomination à l'Oscar pour Carmen Jones — première femme noire dans cette catégorie", opacity: 1 },
    { year: "1957", text: "Island in the Sun provoque un scandale — une relation interraciale suggérée à l'écran", opacity: 0.85 },
    { year: "1959", text: "Porgy and Bess — son dernier grand rôle.", opacity: 0.7 },
    { year: "1960", text: "Plus aucune proposition de rôle majeur. Hollywood ne sait pas quoi faire d'elle.", opacity: 0.5 },
    { year: "1962", text: "Elle déclare faillite.", opacity: 0.35 },
    { year: "1965", text: "Elle meurt à 42 ans, seule, dans son appartement.", opacity: 0.2 },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".gold-overlay", {
        opacity: 0,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "40% top", scrub: true }
      })

      gsap.fromTo(".glamour-photo",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 2.5, ease: "power2.out" }
      )

      gsap.fromTo(".chart-bar",
        { scaleY: 0, transformOrigin: "bottom" },
        { scaleY: 1, stagger: 0.15, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".career-chart", start: "top 75%" } }
      )

      gsap.fromTo(".fall-event",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.18,
          scrollTrigger: { trigger: ".fall-section", start: "top 70%" } }
      )

      // Big numbers reveal
      gsap.fromTo(".big-stat",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8,
          scrollTrigger: { trigger: ".stats-row", start: "top 75%" } }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen" style={{ background: "#0a0806", color: "#f0e8d5" }}>
      {/* Amber overlay fade */}
      <div className="gold-overlay fixed inset-0 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(120,80,20,0.15), transparent 60%)" }} />

      {/* §1 — Hero */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="glamour-photo absolute inset-0">
          <Image src="/images/dorothy-dandridge.jpg" alt="Dorothy Dandridge" fill
            className="object-cover" style={{ opacity: 0.45, filter: "grayscale(40%) contrast(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0806 35%, transparent)" }} />
        </div>
        <div className="relative z-20 text-center px-4">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#b8914a" }}>
            Figure II · 1922–1965
          </p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight mb-8" style={{ color: "#f0e8d5" }}>
            Dorothy Dandridge
          </h1>
          <p className="font-serif text-lg md:text-2xl font-light italic max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(212,168,83,0.75)" }}>
            "Hollywood l'a faite icône pour mieux la laisser mourir."
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(184,145,74,0.4))" }} />
          <span className="font-mono text-xs tracking-wider" style={{ color: "rgba(184,145,74,0.4)" }}>défiler</span>
        </div>
      </section>

      {/* §2 — Données macro — style Pudding grand format */}
      <section className="stats-row py-24 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-16 text-center" style={{ color: "#7a7060" }}>
            §2 — Le système avant la femme
          </p>

          {/* 3 big stats Pudding-style */}
          <div className="grid grid-cols-3 gap-px mb-20" style={{ background: "#3d3830", border: "1px solid #3d3830" }}>
            {[
              { num: "1954", sub: "1ère femme noire nominée Best Actress", color: "#b8914a" },
              { num: "42",   sub: "Son âge à sa mort. Hollywood l'a abandonnée avant.", color: "#8b2020" },
              { num: "0",    sub: "Rôles romantiques centraux accessibles après 1959", color: "#8b2020" },
            ].map((s, i) => (
              <div key={i} className="big-stat text-center py-12 px-6" style={{ background: "#0a0806" }}>
                <span className="font-serif font-black block" style={{ fontSize: "clamp(3rem,6vw,5rem)", color: s.color, lineHeight: 1 }}>
                  {s.num}
                </span>
                <span className="font-mono text-xs tracking-widest uppercase mt-3 block" style={{ color: "#7a7060", lineHeight: 1.6 }}>
                  {s.sub}
                </span>
              </div>
            ))}
          </div>

          {/* 3 contexte dates */}
          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              { yr: "1954", t: "Le Code Hays est encore en vigueur. Les relations interraciales sont interdites à l'écran." },
              { yr: "1954", t: "Brown v. Board of Education — la déségrégation légale commence. Hollywood ne suit pas." },
              { yr: "1954", t: "Les rôles romantiques centraux dans les grandes productions : réservés aux actrices blanches." },
            ].map((e, i) => (
              <div key={i} className="flex gap-6 border-b pb-6" style={{ borderColor: "#2a2620" }}>
                <span className="font-mono text-sm flex-shrink-0 w-16" style={{ color: "#b8914a" }}>{e.yr}</span>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "#c8bfa8" }}>{e.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §2 suite — Bar chart carrière */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-center mb-4" style={{ color: "#f0e8d5" }}>
            Montée. Apogée. Chute.
          </h2>
          <p className="font-mono text-sm text-center mb-20" style={{ color: "#7a7060" }}>
            Une carrière construite pour s'effondrer — hover pour le détail
          </p>

          <div className="career-chart relative" style={{ height: "24rem" }}>
            <div className="absolute left-0 top-0 bottom-12 w-20 flex flex-col justify-between text-right pr-4"
              style={{ color: "#7a7060", fontSize: 11, fontFamily: "DM Mono" }}>
              <span>Apogée</span>
              <span>Visibilité</span>
              <span>Néant</span>
            </div>
            <div className="ml-20 h-full flex items-end gap-3 md:gap-5 pb-12 border-b border-l"
              style={{ borderColor: "rgba(61,56,48,0.5)" }}>
              {careerData.map((point, i) => (
                <div key={point.year}
                  className="flex-1 flex flex-col items-center justify-end h-full relative group cursor-pointer"
                  onMouseEnter={() => setActiveYear(i)}
                  onMouseLeave={() => setActiveYear(null)}>
                  <div className="chart-bar w-full rounded-t transition-all duration-500"
                    style={{
                      height: `${point.level}%`,
                      minHeight: point.level > 0 ? 4 : 0,
                      background: point.year === 1954 ? "#b8914a"
                        : point.year >= 1961 ? "#2a2620"
                        : "rgba(184,145,74,0.5)",
                      opacity: activeYear === i ? 1 : 0.75,
                    }} />
                  <span className="absolute -bottom-10 font-mono text-xs -rotate-45 origin-top-left whitespace-nowrap"
                    style={{ color: "#7a7060" }}>{point.year}</span>
                  {activeYear === i && (
                    <div className="absolute bottom-full mb-3 border p-3 text-center whitespace-nowrap z-20"
                      style={{ background: "#0e0c09", borderColor: "#3d3830" }}>
                      <p className="font-mono text-sm" style={{ color: "#b8914a" }}>{point.year}</p>
                      <p className="font-mono text-xs mt-1" style={{ color: "#c8bfa8" }}>{point.label}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="font-mono text-sm italic text-center mt-12" style={{ color: "#7a7060" }}>
            La courbe de sa carrière suit la courbe de sa vie.
          </p>
        </div>
      </section>

      {/* §3 — Le choix impossible */}
      <section className="py-24 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§3 — Le choix impossible</p>
          <blockquote className="text-center mb-20">
            <p className="font-serif text-2xl md:text-4xl italic leading-relaxed" style={{ color: "#f0e8d5" }}>
              "Je ne pouvais pas être la fille d'à côté."
            </p>
            <p className="font-serif text-xl md:text-3xl italic mt-4" style={{ color: "#7a7060" }}>
              "Ils ne savaient pas quoi faire de moi."
            </p>
          </blockquote>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-4"
                style={{ color: "#b8914a" }}>
                <span className="w-12 h-px" style={{ background: "rgba(184,145,74,0.4)" }} />
                Ce que Hollywood a fait d'elle
              </h3>
              <ul className="space-y-5">
                {["Couverture de Life Magazine", "Comparaisons constantes à Marilyn Monroe",
                  "Icône glamour « exotique »", "Qualificatifs : sensuelle, envoûtante, tropicale"].map((item, i) => (
                  <li key={i} className="font-serif text-lg pl-6 border-l" style={{ color: "#c8bfa8", borderColor: "rgba(184,145,74,0.3)" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-4"
                style={{ color: "#7a7060" }}>
                <span className="w-12 h-px" style={{ background: "#3d3830" }} />
                Ce qu'elle n'a jamais pu être
              </h3>
              <ul className="space-y-5">
                {["Une femme ordinaire à l'écran", "Un rôle romantique avec un homme blanc",
                  "Une actrice parmi d'autres", "Vivante au-delà de 42 ans"].map((item, i) => (
                  <li key={i} className="font-serif text-lg pl-6 italic border-l" style={{ color: "#7a7060", borderColor: "#2a2620" }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — La chute — opacité décroissante */}
      <section className="fall-section py-24 px-4" style={{ background: "#060504" }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-4 text-center" style={{ color: "#7a7060" }}>§4 — La chute</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-20 text-center" style={{ color: "#f0e8d5" }}>
            La disparition
          </h2>
          <div className="space-y-10">
            {fallEvents.map((event, i) => (
              <div key={i} className="fall-event flex items-start gap-8" style={{ opacity: event.opacity }}>
                <span className="font-mono text-xl w-20 shrink-0" style={{ color: "rgba(184,145,74,0.7)" }}>
                  {event.year}
                </span>
                <p className="font-serif text-lg leading-relaxed" style={{ color: "#c8bfa8" }}>{event.text}</p>
              </div>
            ))}
          </div>

          {/* Big zero at the end */}
          <div className="text-center mt-20">
            <div className="font-serif font-black" style={{ fontSize: "clamp(6rem,16vw,12rem)", color: "#1e1b16", lineHeight: 1 }}>
              0
            </div>
            <p className="font-mono text-xs tracking-widest uppercase mt-2" style={{ color: "#3d3830" }}>
              Propositions de rôles · 1960–1965
            </p>
          </div>
        </div>

        {/* Ghost image */}
        <div className="absolute bottom-0 right-0 w-80 h-96 opacity-5 pointer-events-none overflow-hidden">
          <Image src="/images/dorothy-dandridge.jpg" alt="" fill className="object-cover grayscale" style={{ filter: "blur(8px)" }} />
        </div>
      </section>

      {/* §5 — La friction */}
      <section className="py-24 px-4" style={{ background: "#0a0806" }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§5 — La friction</p>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: "#2a2620" }} />
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 text-right">
                <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>
                  Hollywood réhabilite Dandridge après sa mort — documentaires, biographies, hommages.
                  Halle Berry l'incarne en 1999 et remporte un Emmy.
                </p>
              </div>
              <div className="p-8">
                <p className="font-serif leading-relaxed" style={{ color: "#7a7060" }}>
                  L'industrie qui l'a détruite écrit maintenant le récit de sa vie.
                  Le mécanisme de réhabilitation posthume permet de se racheter une conscience.
                </p>
              </div>
            </div>
          </div>
          <div className="border p-8 mt-16 text-center max-w-lg mx-auto" style={{ borderColor: "#3d3830", background: "#0e0c09" }}>
            <span className="font-serif font-black" style={{ fontSize: "4rem", color: "#8b2020", lineHeight: 1 }}>≈ 0</span>
            <p className="font-mono text-xs mt-3 tracking-widest uppercase" style={{ color: "#7a7060" }}>
              Actrices noires en rôles romantiques centraux<br/>dans les grandes productions · 1955–1975
            </p>
          </div>
        </div>
      </section>

      {/* §6 — La sortie */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-wider mb-12" style={{ color: "#7a7060" }}>§6 — La sortie</p>
          <p className="font-serif text-2xl md:text-4xl mb-6 leading-relaxed" style={{ color: "#f0e8d5" }}>
            Le système ne détruit pas celles qu'il ignore.
          </p>
          <p className="font-serif text-2xl md:text-4xl mb-20 leading-relaxed" style={{ color: "#7a7060" }}>
            Il détruit celles qu'il a choisies.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link href="/figure/hattie-mcdaniel"
              className="p-8 border text-left transition-all duration-500"
              style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Hattie McDaniel</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Reconnue pour s'être soumise.</p>
            </Link>
            <Link href="/figure/gabourey-sidibe"
              className="p-8 border text-left transition-all duration-500"
              style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Continuer vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Gabourey Sidibe</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Le même mécanisme, soixante ans plus tard.</p>
            </Link>
          </div>
          <Link href="/" className="font-mono text-sm" style={{ color: "#7a7060" }}>← Retour aux 8 figures</Link>
        </div>
      </section>
    </div>
  )
}
