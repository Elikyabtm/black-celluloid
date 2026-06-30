"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"

gsap.registerPlugin(ScrollTrigger)

const filmoCats = [
  { name: "Trauma / Souffrance", value: 45, fill: "#6b1a1a" },
  { name: "Épique / Fantastique", value: 35, fill: "#b8914a" },
  { name: "Drame / Prestige", value: 15, fill: "#7a7060" },
  { name: "Autre", value: 5, fill: "#3d3830" },
]

const payGapData = [
  { name: "Hommes blancs (équivalents)", value: 100 },
  { name: "Femmes blanches (équivalents)", value: 82 },
  { name: "Viola Davis (déclaré)", value: 61 },
]

export function ViolaPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isResisting, setIsResisting] = useState(false)
  const [resistProgress, setResistProgress] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".spotlight", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2, ease: "power2.out" })

      ScrollTrigger.create({
        trigger: ".resistance-zone-1", start: "top center", end: "bottom center",
        onEnter: () => setIsResisting(true), onLeave: () => setIsResisting(false),
        onEnterBack: () => setIsResisting(true), onLeaveBack: () => setIsResisting(false),
        onUpdate: (self) => setResistProgress(self.progress),
      })
      gsap.fromTo(".role-column", { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.25, duration: 0.8, scrollTrigger: { trigger: ".role-columns", start: "top 70%" } }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ background: "#0a0c0a", color: "#f0e8d5", minHeight: "100vh" }}>
      <div className="fixed top-8 right-8 z-50 font-mono text-xs" style={{ color: "#7a7060" }}>
        {isResisting && <span style={{ color: "#8b2020" }}>résistance</span>}
      </div>

      {/* §1 — Hero spotlight */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="spotlight absolute" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(184,145,74,0.06) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute inset-0">
          <Image src="/images/viola-davis.jpg" alt="Viola Davis" fill className="object-cover opacity-25" style={{ filter: "grayscale(100%) contrast(1.2)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0c0a 40%, transparent)" }} />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#7a7060" }}>Figure V · 1965—</p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight mb-8" style={{ color: "#f0e8d5" }}>Viola Davis</h1>
          <p className="font-serif text-lg md:text-2xl italic max-w-3xl mx-auto leading-relaxed" style={{ color: "#c8bfa8" }}>
            "La plus récompensée de sa génération.<br/>Elle regrette certains de ces rôles."
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, #3d3830)" }} />
          <span className="font-mono text-xs tracking-wider" style={{ color: "#7a7060" }}>le scroll résistera</span>
        </div>
      </section>

      {/* §2 — Le système + pie chart filmographie */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§2 — Le système avant la femme</p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              {[
                { yr: "2015", t: "Lancement du mouvement #OscarsSoWhite. Hollywood sous pression." },
                { yr: "2008–20", t: "Moins de 3% des rôles principaux féminins attribués à des femmes noires." },
                { yr: "2022", t: "Davis révèle dans ses mémoires être payée significativement moins que ses homologues blancs." },
              ].map((e, i) => (
                <div key={i} className="flex gap-6 border-b pb-6" style={{ borderColor: "#2a2620" }}>
                  <span className="font-mono text-xs flex-shrink-0 w-20" style={{ color: "#b8914a" }}>{e.yr}</span>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: "#c8bfa8" }}>{e.t}</p>
                </div>
              ))}
            </div>
            <div className="border p-6" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#b8914a" }}>Filmographie Viola Davis — par catégorie</p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={filmoCats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} stroke="none">
                    {filmoCats.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0e0c09", border: "1px solid #3d3830", fontFamily: "Syne", fontSize: 10, color: "#f0e8d5" }}
                    formatter={(val: number) => [`${val}%`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-4">
                {filmoCats.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-xs" style={{ color: "#c8bfa8" }}>
                    <div style={{ width: 8, height: 8, background: c.fill, borderRadius: "50%", flexShrink: 0 }} />
                    {c.name} — {c.value}%
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Pay gap chart */}
          <div className="border p-6" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#b8914a" }}>Écart de rémunération — rôles équivalents · base 100</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={payGapData} layout="vertical">
                <XAxis type="number" tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "Syne" }} axisLine={{ stroke: "#3d3830" }} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#c8bfa8", fontSize: 9, fontFamily: "Syne" }} axisLine={false} tickLine={false} width={180} />
                <Tooltip contentStyle={{ background: "#0e0c09", border: "1px solid #3d3830", fontFamily: "Syne", fontSize: 10, color: "#f0e8d5" }} />
                <Bar dataKey="value" radius={0}>
                  {payGapData.map((_, i) => <Cell key={i} fill={i === 2 ? "#8b2020" : i === 0 ? "#b8914a" : "#7a7060"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* §3 — Les deux registres */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§3 — Les deux registres</p>
          <blockquote className="text-center mb-20">
            <p className="font-serif text-2xl md:text-4xl italic leading-relaxed" style={{ color: "#f0e8d5" }}>
              "I said yes to <em>The Help</em>.<br/>
              <span style={{ color: "#8b2020" }}>It's the biggest regret of my career."</span>
            </p>
          </blockquote>
          <div className="role-columns grid md:grid-cols-2 gap-px" style={{ background: "#3d3830" }}>
            <div className="role-column p-8" style={{ background: "#0a0806" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "#6b1a1a" }}>Trauma / Souffrance</p>
              {["The Help (2011) — son plus grand regret", "Fences (2016) — Oscar", "Ma Rainey's Black Bottom (2020)"].map((r, i) => (
                <div key={i} className="font-mono text-sm py-3 border-b" style={{ color: "#c8bfa8", borderColor: "#2a2620" }}>{r}</div>
              ))}
            </div>
            <div className="role-column p-8" style={{ background: "#0a0806" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "#b8914a" }}>Épique / Fantastique</p>
              {["The Woman King (2022) — guerrière", "Suicide Squad (2016) — Amanda Waller"].map((r, i) => (
                <div key={i} className="font-mono text-sm py-3 border-b" style={{ color: "#c8bfa8", borderColor: "#2a2620" }}>{r}</div>
              ))}
              <div className="font-mono text-sm py-3 border-b italic" style={{ color: "#b8914a", borderColor: "#2a2620" }}>
                L'ordinaire. La complexité quotidienne. Absent.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §4 — ZONE DE RÉSISTANCE */}
      <section className="resistance-zone-1 py-40 px-4 relative text-center" style={{ background: "#060504" }}>
        <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#7a7060" }}>— point de résistance — continuez à défiler —</p>
        <p className="font-serif italic max-w-2xl mx-auto leading-relaxed" style={{
          fontSize: "clamp(1.2rem,2.5vw,2rem)", color: "#f0e8d5",
          filter: isResisting ? "none" : "blur(2px)",
          transition: "filter 0.5s"
        }}>
          "I said yes to <em>The Help</em>.<br/>It's the biggest regret of my career."
        </p>
        <div className="mx-auto mt-6" style={{ width: `${resistProgress * 100}%`, maxWidth: 500, height: 2, background: "#8b2020", transition: "width 0.1s" }} />
        {!isResisting && <p className="font-mono text-xs mt-4" style={{ color: "#7a7060" }}>↓ insistez</p>}

        {/* The Woman King data */}
        <div className="border p-8 max-w-xl mx-auto mt-20" style={{ borderColor: "#3d3830", background: "#0e0c09" }}>
          <p className="font-serif italic text-lg mb-4" style={{ color: "#c8bfa8" }}>
            <em>The Woman King</em> est salué comme une avancée historique. Des historiens notent que le film édulcore le rôle des Agojie dans la traite des esclaves pour produire une image plus héroïque.
          </p>
          <p className="font-mono text-sm" style={{ color: "#b8914a" }}>
            "À quel prix accède-t-on à une représentation positive ?"
          </p>
          <p className="font-mono text-xs mt-4" style={{ color: "#7a7060" }}>
            68% des rôles majeurs pour actrices noires dans les films à 50M$+ (2015–2025) sont dans des univers fantastiques, épiques ou superhéros.
          </p>
        </div>
      </section>

      {/* §5 — La friction */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§5 — La friction</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 border" style={{ borderColor: "#3d3830", background: "rgba(14,12,9,0.5)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: "#7a7060" }}>Les critiques féministes noires de The Help</p>
              <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>
                Un film sur la souffrance noire raconté depuis un regard blanc, salué par Hollywood comme un acte de représentation.
              </p>
            </div>
            <div className="p-10 border" style={{ borderColor: "#3d3830", background: "rgba(14,12,9,0.5)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: "#b8914a" }}>La défense du film</p>
              <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>
                Une visibilité réelle pour des actrices noires dans des rôles complexes et centraux, malgré les limites du cadrage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* §6 — La sortie */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-wider mb-12" style={{ color: "#7a7060" }}>§6 — La sortie</p>
          <p className="font-serif text-2xl md:text-4xl mb-20 leading-relaxed" style={{ color: "#f0e8d5" }}>
            "Être puissante à l'écran n'est pas la même chose qu'être ordinaire."
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link href="/figure/halle-berry" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Halle Berry</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Récompensée. Marginalisée. Le même chemin.</p>
            </Link>
            <Link href="/figure/lupita-nyongo" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Continuer vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Lupita Nyong'o</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Célébrée. Puis enfermée dans l'altérité.</p>
            </Link>
          </div>
          <Link href="/" className="font-mono text-sm" style={{ color: "#7a7060" }}>← Retour aux 8 figures</Link>
        </div>
      </section>
    </div>
  )
}