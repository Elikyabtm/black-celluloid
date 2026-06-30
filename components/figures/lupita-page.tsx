"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

gsap.registerPlugin(ScrollTrigger)

const colorismData = [
  { name: "Peau claire / métissée", value: 65, fill: "#b8914a" },
  { name: "Peau foncée — rôles fantastiques", value: 27, fill: "#6b1a1a" },
  { name: "Peau foncée — rôles réalistes", value: 8, fill: "#7a7060" },
]

export function LupitaPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dissociationOffset, setDissociationOffset] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current, start: "top top", end: "bottom bottom",
        onUpdate: (self) => setDissociationOffset(self.progress * 100)
      })
      gsap.to(".public-layer", {
        y: -300,
        scrollTrigger: { trigger: ".parallax-section", start: "top bottom", end: "bottom top", scrub: 0.5 }
      })
      gsap.to(".roles-layer", {
        y: -100,
        scrollTrigger: { trigger: ".parallax-section", start: "top bottom", end: "bottom top", scrub: 2 }
      })
      gsap.to(".face-dissolve", {
        filter: "blur(30px)", opacity: 0.2, scale: 0.9,
        scrollTrigger: { trigger: ".dissolve-section", start: "top center", end: "bottom center", scrub: 1.5 }
      })
      gsap.fromTo(".colorism-bar", { scaleX: 0 },
        { scaleX: 1, stagger: 0.2, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".colorism-section", start: "top 70%" } }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ background: "#0a0e10", color: "#f0e8d5", minHeight: "100vh", overflow: "hidden" }}>
      <div className="fixed bottom-8 right-8 z-50 font-mono text-xs" style={{ color: "#7a7060" }}>
        dissociation : {Math.round(dissociationOffset)}%
      </div>

      {/* §1 — Hero split */}
      <section className="h-screen relative flex overflow-hidden">
        <div className="w-1/2 relative flex items-center justify-center" style={{ background: "#0a0e10" }}>
          <div>
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#7a7060" }}>Figure VII · 1983—</p>
            <h1 className="font-serif font-black leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)", color: "#f0e8d5" }}>Lupita<br/>Nyong'o</h1>
            <p className="font-serif italic mt-4 text-lg" style={{ color: "#c8bfa8" }}>Présente. Visible.</p>
          </div>
        </div>
        <div className="w-1/2 relative flex items-center justify-center" style={{ background: "#060504" }}>
          <div className="text-center" style={{ opacity: 0.4 }}>
            <div className="font-serif font-black leading-none" style={{ fontSize: "clamp(3rem,7vw,6rem)", color: "#3d3830" }}>Maz<br/>Kanata</div>
            <p className="font-mono text-xs tracking-wider mt-4" style={{ color: "#3d3830" }}>Motion capture. Effacée.</p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, #3d3830)" }} />
          <span className="font-mono text-xs tracking-wider" style={{ color: "#7a7060" }}>deux vitesses</span>
        </div>
      </section>

      {/* §2 — Le système + bar chart colorisme */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§2 — Le système avant la femme</p>
          <div className="grid grid-cols-3 gap-px mb-12" style={{ background: "#3d3830", border: "1px solid #3d3830" }}>
            {[
              { num: "2015", label: "#OscarsSoWhite — Hollywood sous pression de diversifier." },
              { num: "65%", label: "Rôles principaux noirs attribués à des actrices à peau claire (2014)", danger: true },
              { num: "2014", label: "Le colorisme au centre du débat public via Black Lives Matter." },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4" style={{ background: "#0a0806" }}>
                <span className="font-serif text-4xl font-black block mb-2" style={{ color: s.danger ? "#8b2020" : "#b8914a" }}>{s.num}</span>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#7a7060" }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="colorism-section border p-8" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: "#b8914a" }}>Distribution des rôles féminins noirs principaux · 2013–2023</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={colorismData} layout="vertical">
                <XAxis type="number" tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "Syne" }} axisLine={{ stroke: "#3d3830" }} tickLine={false} unit="%" />
                <YAxis type="category" dataKey="name" tick={{ fill: "#c8bfa8", fontSize: 9, fontFamily: "Syne" }} axisLine={false} tickLine={false} width={200} />
                <Tooltip contentStyle={{ background: "#0e0c09", border: "1px solid #3d3830", fontFamily: "Syne", fontSize: 10, color: "#f0e8d5" }}
                  formatter={(val: number) => [`${val}%`]} />
                <Bar dataKey="value" radius={0}>
                  {colorismData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* §3 — L'icône et la honte */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§3 — L'icône et la honte</p>
          <blockquote className="text-center mb-20">
            <p className="font-serif text-2xl md:text-4xl italic leading-relaxed" style={{ color: "#f0e8d5" }}>
              "Quand j'étais enfant, je priais pour avoir la peau plus claire."
            </p>
            <cite className="font-mono text-sm mt-4 block" style={{ color: "#7a7060" }}>— Lupita Nyong'o, Essence Black Women in Hollywood Awards, 2014</cite>
          </blockquote>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "#3d3830" }}>
            <div className="p-8" style={{ background: "#0a0806" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "#b8914a" }}>Son image publique</p>
              {["Couvertures de magazines", "Célébrée comme icône de beauté noire à peau foncée", "Discours sur le colorisme", "Essence Awards, campagnes Lancôme"].map((r, i) => (
                <div key={i} className="font-mono text-sm py-2 border-b" style={{ color: "#c8bfa8", borderColor: "#2a2620" }}>{r}</div>
              ))}
            </div>
            <div className="p-8" style={{ background: "#0a0806" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "#6b1a1a" }}>Ses rôles à l'écran</p>
              {["12 Years a Slave (2013) — trauma esclavagiste", "Star Wars (2015) — motion capture, visage effacé", "Black Panther (2018) — guerrière", "Us (2019) — figure horrifique"].map((r, i) => (
                <div key={i} className="font-mono text-sm py-2 border-b" style={{ color: "#c8bfa8", borderColor: "#2a2620" }}>{r}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* §4 — LA DISPARITION DU VISAGE — parallaxe */}
      <section className="parallax-section dissolve-section py-20 px-4 relative" style={{ minHeight: "80vh", overflow: "hidden" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§4 — La disparition du visage</p>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="public-layer text-center" style={{ willChange: "transform" }}>
              <div className="relative mx-auto overflow-hidden" style={{ width: 260, height: 340, border: "1px solid rgba(184,145,74,0.3)" }}>
                <Image src="/images/lupita-nyongo.jpg" alt="Lupita Nyong'o" fill className="object-cover" style={{ filter: "grayscale(60%) contrast(1.1)" }} />
              </div>
              <p className="font-mono text-xs mt-4 tracking-widest uppercase" style={{ color: "#b8914a" }}>Lupita Nyong'o — visible</p>
              <p className="font-mono text-xs mt-2" style={{ color: "#7a7060" }}>Photo publique · Magazine covers · Présence</p>
            </div>
            <div className="roles-layer text-center" style={{ willChange: "transform", opacity: 0.5 }}>
              <div className="flex items-center justify-center" style={{ width: 260, height: 340, background: "#0e0c09", border: "1px solid #3d3830", margin: "0 auto" }}>
                <div className="text-center">
                  <div className="font-serif font-black" style={{ fontSize: "4rem", color: "#2a2620" }}>?</div>
                  <p className="font-mono text-xs mt-4" style={{ color: "#3d3830", letterSpacing: "0.25em", textTransform: "uppercase" }}>Maz Kanata</p>
                  <p className="font-mono text-xs mt-2" style={{ color: "#2a2620" }}>Motion capture · Star Wars · Visage absent</p>
                </div>
              </div>
              <p className="font-mono text-xs mt-4 tracking-widest uppercase" style={{ color: "#7a7060" }}>Maz Kanata — effacée</p>
              <p className="font-mono text-xs mt-2" style={{ color: "#3d3830" }}>Sa voix reste · Son corps n'existe plus</p>
            </div>
          </div>
          <div className="border p-8 mt-16 text-center" style={{ borderColor: "#3d3830", background: "#0e0c09" }}>
            <p className="font-serif italic text-lg max-w-2xl mx-auto" style={{ color: "#c8bfa8", lineHeight: 1.7 }}>
              "Hollywood lui a donné un rôle central dans l'une des franchises les plus vues de l'histoire. Et a effacé son visage."
            </p>
          </div>
        </div>
      </section>

      {/* §5 — Friction */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§5 — La friction</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 border" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase mb-4" style={{ color: "#b8914a" }}>La trajectoire célébrée</p>
              <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>La célébrée comme preuve que la diversité progresse. Oscar 2014. Campagnes mondiales. Beauté noire enfin représentée.</p>
            </div>
            <div className="p-10 border" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase mb-4" style={{ color: "#8b2020" }}>La réalité des rôles</p>
              <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>Sur les 10 rôles principaux féminins les plus vus (2013–2023), le nombre attribué à des actrices à peau foncée dans des rôles réalistes ordinaires : quasi zéro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — Sortie */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-wider mb-12" style={{ color: "#7a7060" }}>§6 — La sortie</p>
          <p className="font-serif text-2xl md:text-4xl mb-20 leading-relaxed" style={{ color: "#f0e8d5" }}>
            "Être visible ne signifie pas avoir le droit d'être ordinaire."
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link href="/figure/gabourey-sidibe" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Gabourey Sidibe</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Oscarisées la même décennie. Deux formes du même effacement.</p>
            </Link>
            <Link href="/figure/halle-bailey" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Continuer vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Halle Bailey</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Après elle, une autre actrice à peau foncée dans un rôle fantastique. Une sirène.</p>
            </Link>
          </div>
          <Link href="/" className="font-mono text-sm" style={{ color: "#7a7060" }}>← Retour aux 8 figures</Link>
        </div>
      </section>
    </div>
  )
}