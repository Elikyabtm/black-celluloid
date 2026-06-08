"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

gsap.registerPlugin(ScrollTrigger)

// HALLE BAILEY - Deux colonnes à vitesses différentes
// Colonne gauche (attaques, #NotMyAriel) défile vite et agressivement
// Colonne droite (joie des enfants) défile lentement, doucement

const fantasyData = [
  { name: "Fantasy / Non-réaliste", value: 80, fill: "#8b2020" },
  { name: "Drame / Prestige", value: 12, fill: "#7a7060" },
  { name: "Romance ordinaire", value: 4, fill: "#b8914a" },
  { name: "Autre", value: 4, fill: "#3d3830" },
]

export function HalleBaileyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tweetCount, setTweetCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".wave-1", { y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".wave-2", { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 })

      gsap.to(".attack-column", {
        y: -400,
        scrollTrigger: { trigger: ".two-columns-section", start: "top bottom", end: "bottom top", scrub: 0.3 }
      })
      gsap.to(".joy-column", {
        y: -120,
        scrollTrigger: { trigger: ".two-columns-section", start: "top bottom", end: "bottom top", scrub: 3 }
      })

      ScrollTrigger.create({
        trigger: ".hashtag-section",
        start: "top 70%",
        onEnter: () => {
          let count = 0
          const target = 1500000
          const interval = setInterval(() => {
            count += 60000; setTweetCount(count)
            if (count >= target) { setTweetCount(target); clearInterval(interval) }
          }, 20)
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ background: "#0a0e10", color: "#f0e8d5", minHeight: "100vh" }}>

      {/* §1 — Hero */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="wave-1 absolute inset-0">
          <Image src="/images/halle-bailey.jpg" alt="Halle Bailey" fill className="object-cover opacity-25 grayscale" style={{ filter: "grayscale(100%) contrast(1.1)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0e10 40%, transparent)" }} />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#7a7060" }}>Figure VIII · 2000—</p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight mb-8" style={{ color: "#f0e8d5" }}>Halle Bailey</h1>
          <p className="font-serif text-lg md:text-2xl italic max-w-3xl mx-auto leading-relaxed" style={{ color: "#c8bfa8" }}>
            "Son premier grand rôle romantique au cinéma. Elle jouait une sirène."
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, #3d3830)" }} />
          <span className="font-mono text-xs tracking-wider" style={{ color: "#7a7060" }}>deux réalités</span>
        </div>
      </section>

      {/* §2 — Le système */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§2 — Le système avant la femme</p>
          <div className="grid grid-cols-3 gap-px mb-16" style={{ background: "#3d3830", border: "1px solid #3d3830" }}>
            {[
              { num: "2020", label: "Engagements diversité post-George Floyd" },
              { num: "14%", label: "Femmes de couleur en rôles principaux (2026)", danger: true },
              { num: "2023", label: "The Little Mermaid sort. La controverse éclate." },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4" style={{ background: "#0a0806" }}>
                <span className="font-serif text-3xl font-black block mb-2" style={{ color: s.danger ? "#8b2020" : "#b8914a" }}>{s.num}</span>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#7a7060" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 — La controverse — deux vidéos côte à côte */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§3 — La controverse — la même bande-annonce, les mêmes 72 heures</p>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div>
              <div className="inline-block font-mono text-xs tracking-[0.3em] uppercase mb-3 px-2 py-1 border" style={{ borderColor: "#8b2020", color: "#8b2020" }}>
                #NotMyAriel
              </div>
              <p className="font-mono text-xs mb-4" style={{ color: "#7a7060", lineHeight: 1.8 }}>
                En 72h : 1,5 million de dislikes. Le hashtag génère des millions d'occurrences. Comme si une sirène fictive avait un héritage biologique à protéger.
              </p>
              <div className="hashtag-section border p-6 text-center" style={{ borderColor: "#3d3830", background: "#0e0c09" }}>
                <span className="font-serif font-black" style={{ fontSize: "3rem", color: "#8b2020", lineHeight: 1 }}>
                  {tweetCount.toLocaleString()}
                </span>
                <p className="font-mono text-xs mt-2" style={{ color: "#7a7060" }}>mentions #NotMyAriel en 72h</p>
              </div>
            </div>
            <div>
              <div className="inline-block font-mono text-xs tracking-[0.3em] uppercase mb-3 px-2 py-1 border" style={{ borderColor: "#b8914a", color: "#b8914a" }}>
                La représentation
              </div>
              <div className="relative w-full mb-3" style={{ paddingBottom: "56.25%", border: "1px solid #3d3830" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Qp4yfmOOv6Q?rel=0&modestbranding=1"
                  allowFullScreen
                  loading="lazy"
                  title="Black girls reacting to The Little Mermaid trailer"
                />
              </div>
              <p className="font-mono text-xs" style={{ color: "#7a7060" }}>"She's brown like me!" — réactions de petites filles noires · septembre 2022</p>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — Deux colonnes asynchrones */}
      <section className="two-columns-section py-24 overflow-hidden" style={{ background: "#0a0806" }}>
        <div className="px-6 mb-8">
          <p className="font-mono text-xs tracking-wider text-center" style={{ color: "#7a7060" }}>§4 — Deux réalités qui ne se synchronisent jamais</p>
        </div>
        <div className="grid grid-cols-2 gap-px" style={{ background: "#3d3830" }}>
          <div className="attack-column px-8 py-12" style={{ background: "#0a0806" }}>
            <p className="font-mono text-xs uppercase tracking-wider mb-8" style={{ color: "#8b2020" }}>Le rejet — vite, agressif</p>
            {[
              { n: "72h", t: "En 72 heures, 1,5M de dislikes. Comme si une sirène fictive avait un héritage biologique." },
              { n: "2019", t: "\"Ariel n'a jamais été noire.\" Le backlash commence 4 ans avant la sortie du film." },
              { n: "AI", t: "Un ingénieur utilise l'IA pour changer la race de Bailey dans la bande-annonce. Le geste circule." },
              { n: "???", t: "La même audience qui consomme ces films en masse refuse la présence d'une actrice noire." },
            ].map((item, i) => (
              <div key={i} className="mb-8 border-b pb-8" style={{ borderColor: "#2a2620" }}>
                <div className="font-serif font-black mb-2" style={{ fontSize: "2.5rem", color: "#8b2020", lineHeight: 1 }}>{item.n}</div>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "#c8bfa8" }}>{item.t}</p>
              </div>
            ))}
          </div>
          <div className="joy-column px-8 py-12" style={{ background: "#0a0806", paddingTop: "12vh" }}>
            <p className="font-mono text-xs uppercase tracking-wider mb-8" style={{ color: "#b8914a" }}>La joie — lentement, doucement</p>
            {[
              { n: "M+", t: "Le supercut des petites filles noires découvrant la bande-annonce devient viral. Halle Bailey le partage : \"I'm truly in awe.\"" },
              { n: "Réel", t: "\"Elle ressemble à moi !\" La représentation est immédiate et réelle pour ces enfants. Elle ne peut pas être théorisée à distance." },
              { n: "Mais", t: "Pourquoi le premier grand rôle romantique pour une actrice noire à peau foncée est-il celui d'une créature non-humaine ?" },
            ].map((item, i) => (
              <div key={i} className="mb-8 border-b pb-8" style={{ borderColor: "#2a2620" }}>
                <div className="font-serif font-black mb-2" style={{ fontSize: "2.5rem", color: "#b8914a", lineHeight: 1 }}>{item.n}</div>
                <p className="font-mono text-xs leading-relaxed" style={{ color: "#c8bfa8" }}>{item.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §5 — Data transversale — bar chart */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§5 — Le fantastique comme condition · 2013–2023</p>
          <div className="grid grid-cols-3 gap-px mb-12" style={{ background: "#3d3830", border: "1px solid #3d3830" }}>
            {[
              { num: "8/10", label: "Rôles principaux pour actrices noires à peau foncée dans des univers fantastiques", danger: true },
              { num: "0", label: "Personnages originaux mainstream créés pour des rôles principaux à peau foncée", danger: true },
              { num: "∞", label: "IP existantes diversifiées plutôt que de nouvelles histoires écrites" },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4" style={{ background: "#0a0806" }}>
                <span className="font-serif text-4xl font-black block mb-2" style={{ color: s.danger ? "#8b2020" : "#7a7060" }}>{s.num}</span>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#7a7060" }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="border p-8" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: "#b8914a" }}>Distribution des rôles — actrices noires à peau foncée · $50M+ budget</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={fantasyData} layout="vertical">
                <XAxis type="number" tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "DM Mono" }} axisLine={{ stroke: "#3d3830" }} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fill: "#c8bfa8", fontSize: 9, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} width={140} />
                <Tooltip contentStyle={{ background: "#0e0c09", border: "1px solid #3d3830", fontFamily: "DM Mono", fontSize: 10, color: "#f0e8d5" }}
                  formatter={(val: number) => [`${val}%`]} />
                <Bar dataKey="value" radius={0}>
                  {fantasyData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* §6 — La sortie */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-wider mb-12" style={{ color: "#7a7060" }}>§6 — La sortie</p>
          <p className="font-serif text-2xl md:text-4xl mb-20 leading-relaxed" style={{ color: "#f0e8d5" }}>
            "La représentation dans le fantastique est réelle.<br/>
            <span style={{ color: "#7a7060" }}>Et elle a des limites réelles.</span>"
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link href="/figure/lupita-nyongo" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Lupita Nyong'o</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Avant elle, un autre univers hors du réel.</p>
            </Link>
            <Link href="/figure/hattie-mcdaniel" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Hattie McDaniel</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Au début, les rôles de service. Aujourd'hui, les sirènes. Le mécanisme reste.</p>
            </Link>
          </div>
          <Link href="/" className="font-mono text-sm" style={{ color: "#7a7060" }}>← Retour aux 8 figures</Link>
        </div>
      </section>
    </div>
  )
}
