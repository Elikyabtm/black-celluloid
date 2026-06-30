"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine
} from "recharts"

gsap.registerPlugin(ScrollTrigger)

// HALLE BERRY - Bascule brutale au moment de l'Oscar
// Flash + shake + changement de palette visuelle

const radarBefore = [
  { subject: "Drama", before: 90, after: 20 },
  { subject: "Romance", before: 75, after: 15 },
  { subject: "Fantasy", before: 10, after: 85 },
  { subject: "Action", before: 20, after: 90 },
  { subject: "Prestige", before: 65, after: 15 },
  { subject: "Thriller", before: 50, after: 30 },
]

const oscarGapData = [
  { year: "1929", wins: 0, label: "1ère cérémonie" },
  { year: "1940", wins: 0, label: "Hattie McDaniel — Supporting" },
  { year: "1954", wins: 0, label: "Dandridge nominée" },
  { year: "2002", wins: 1, label: "Halle Berry — 1ère" },
  { year: "2010", wins: 0, label: "" },
  { year: "2024", wins: 0, label: "Toujours la seule" },
]

export function HalleBerryPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<"before" | "oscar" | "after">("before")

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".oscar-moment",
        start: "top center", end: "bottom center",
        onEnter: () => setPhase("oscar"),
        onLeaveBack: () => setPhase("before"),
        onLeave: () => setPhase("after"),
        onEnterBack: () => setPhase("oscar"),
      })
      gsap.fromTo(".before-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, scrollTrigger: { trigger: ".before-section", start: "top 70%", scrub: 1 } }
      )
      gsap.to(".oscar-glow", {
        scale: 1.15, opacity: 0.7, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
      })
      ScrollTrigger.create({
        trigger: ".the-pivot",
        start: "top center",
        onEnter: () => {
          gsap.fromTo(".pivot-flash", { opacity: 0.9 }, { opacity: 0, duration: 0.4, ease: "power2.out" })
          gsap.to(".shake-container", { x: "random(-8,8)", y: "random(-4,4)", duration: 0.08, repeat: 8, yoyo: true, ease: "none",
            onComplete: () => gsap.to(".shake-container", { x: 0, y: 0, duration: 0.2 }) })
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ background: "#0a0806", color: "#f0e8d5", minHeight: "100vh" }}>
      <div className="fixed top-8 right-8 z-50 font-mono text-xs" style={{ color: "#7a7060" }}>
        <span style={{ color: phase === "before" ? "#c8bfa8" : phase === "oscar" ? "#b8914a" : "#8b2020" }}>
          {phase === "before" ? "before" : phase === "oscar" ? "THE MOMENT" : "after"}
        </span>
      </div>

      {/* §1 — Hero */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/halle-berry.jpg" alt="Halle Berry" fill className="object-cover grayscale opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0806 30%, transparent)" }} />
        </div>
        <div className="relative z-10 text-center px-4">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#7a7060" }}>Figure IV · 1966—</p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight mb-8" style={{ color: "#f0e8d5" }}>Halle Berry</h1>
          <p className="font-serif text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed italic" style={{ color: "#c8bfa8" }}>
            "La première. La seule. Vingt ans de silence après elle."
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, #3d3830)" }} />
          <span className="font-mono text-xs tracking-wider" style={{ color: "#7a7060" }}>le scroll s'arrêtera</span>
        </div>
      </section>

      {/* §2 — Le système : 73 ans de silence */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§2 — Le système avant la femme</p>
          <div className="grid grid-cols-3 gap-px mb-16" style={{ background: "#3d3830", border: "1px solid #3d3830" }}>
            {[
              { num: "1929", label: "1ère cérémonie des Oscars" },
              { num: "2002", label: "1ère femme noire Best Actress" },
              { num: "73", label: "Ans d'attente", danger: true },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4" style={{ background: "#0a0806" }}>
                <span className="font-serif text-4xl font-black block mb-2" style={{ color: s.danger ? "#8b2020" : "#b8914a" }}>{s.num}</span>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#7a7060" }}>{s.label}</span>
              </div>
            ))}
          </div>
          {/* LINE CHART — le gouffre temporel */}
          <div className="border p-6" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#b8914a" }}>Best Actress Oscar — femmes noires · 1929–2024</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={oscarGapData}>
                <XAxis dataKey="year" tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "Syne" }} axisLine={{ stroke: "#3d3830" }} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "#0e0c09", border: "1px solid #3d3830", fontFamily: "Syne", fontSize: 10, color: "#f0e8d5" }}
                  formatter={(_: number, __: string, props: { payload?: { label?: string } }) => [props.payload?.label || "", ""]} />
                <ReferenceLine x="2002" stroke="#b8914a" strokeWidth={2} label={{ value: "2002", fill: "#b8914a", fontSize: 9, fontFamily: "Syne" }} />
                <Line type="monotone" dataKey="wins" stroke="#b8914a" strokeWidth={2} dot={{ fill: "#b8914a", r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="font-mono text-xs text-center mt-3" style={{ color: "#7a7060" }}>Un seul point sur 95 ans. Elle est toujours la seule.</p>
          </div>
        </div>
      </section>

      {/* §3 — SECTION BEFORE */}
      <section className="before-section py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§3 — Avant l'Oscar</p>
          <div className="space-y-6">
            {[
              { yr: "1992", title: "Boomerang", note: "Rôle romantique complexe" },
              { yr: "1995", title: "Losing Isaiah", note: "Drame brut, ancré dans le réel" },
              { yr: "1999", title: "Introducing Dorothy Dandridge", note: "Emmy Award" },
              { yr: "2001", title: "Monster's Ball", note: "Le rôle de l'Oscar" },
            ].map((r, i) => (
              <div key={i} className="before-item flex items-start gap-6 border-b pb-6" style={{ borderColor: "#2a2620" }}>
                <span className="font-mono text-sm w-16 flex-shrink-0" style={{ color: "#b8914a" }}>{r.yr}</span>
                <div>
                  <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>{r.title}</p>
                  <p className="font-mono text-xs mt-1" style={{ color: "#7a7060" }}>{r.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §4 — LE PIVOT / OSCAR MOMENT */}
      <section className="oscar-moment the-pivot py-32 px-4 relative overflow-hidden" style={{ background: "#060504" }}>
        <div className="pivot-flash absolute inset-0 pointer-events-none" style={{ background: "#b8914a", opacity: 0 }} />
        <div className="shake-container max-w-4xl mx-auto text-center relative z-10">
          <div className="oscar-glow absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(184,145,74,0.15), transparent 70%)" }} />
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#b8914a" }}>24 mars 2002 — Le bascule</p>
          <div className="font-serif mb-8 font-black leading-none" style={{ fontSize: "clamp(6rem,14vw,10rem)", color: "#2a2620" }}>
            2002
          </div>
          <p className="font-serif text-2xl md:text-3xl italic max-w-2xl mx-auto leading-relaxed" style={{ color: "#f0e8d5" }}>
            "This moment is so much bigger than me.<br/>
            <span style={{ color: "#b8914a" }}>This moment is for Dorothy Dandridge,<br/>Lena Horne, Diahann Carroll."</span>
          </p>
          <p className="font-mono text-sm mt-6" style={{ color: "#7a7060" }}>— Halle Berry, 74th Academy Awards, March 24, 2002</p>
          {/* YouTube embed */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%", border: "1px solid #3d3830" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/llgL7mGYVTI?rel=0&modestbranding=1"
                allowFullScreen
                loading="lazy"
                title="Halle Berry wins Best Actress Oscar 2002"
              />
            </div>
            <p className="font-mono text-xs mt-2 text-center" style={{ color: "#7a7060" }}>Le discours complet · 74th Academy Awards · 2002</p>
          </div>
        </div>
      </section>

      {/* §4 suite — Après l'Oscar */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#8b2020" }}>Après l'Oscar — la bascule</p>
          <div className="grid md:grid-cols-2 gap-px mb-12" style={{ background: "#3d3830" }}>
            <div className="p-8" style={{ background: "#0a0806" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "#c8bfa8" }}>Avant — rôles dramatiques</p>
              {["Boomerang (1992)", "Losing Isaiah (1995)", "Introducing Dorothy Dandridge (1999)", "Monster's Ball (2001)"].map((r, i) => (
                <div key={i} className="font-mono text-sm py-2 border-b" style={{ color: "#c8bfa8", borderColor: "#2a2620" }}>{r}</div>
              ))}
            </div>
            <div className="p-8" style={{ background: "#0a0806" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-6" style={{ color: "#8b2020" }}>Après — franchise / fantastique</p>
              {["Die Another Day (2002) — Bond girl", "X-Men 2 (2003) — Storm", "Catwoman (2004) — Razzie", "X-Men: The Last Stand (2006)"].map((r, i) => (
                <div key={i} className="font-mono text-sm py-2 border-b" style={{ color: "#8b2020", borderColor: "#2a2620" }}>{r}</div>
              ))}
            </div>
          </div>
          {/* Radar chart */}
          <div className="border p-8 max-w-xl mx-auto" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6 text-center" style={{ color: "#b8914a" }}>Type de rôles — avant vs après Oscar</p>
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "#c8bfa8" }}>
                <div style={{ width: 10, height: 10, background: "rgba(200,191,168,0.4)", borderRadius: "50%" }} />Avant
              </div>
              <div className="flex items-center gap-2 font-mono text-xs" style={{ color: "#8b2020" }}>
                <div style={{ width: 10, height: 10, background: "rgba(139,32,32,0.5)", borderRadius: "50%" }} />Après
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={radarBefore}>
                <PolarGrid stroke="#3d3830" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "Syne" }} />
                <Radar name="Avant" dataKey="before" stroke="rgba(200,191,168,0.7)" fill="rgba(200,191,168,0.15)" strokeWidth={1.5} />
                <Radar name="Après" dataKey="after" stroke="rgba(139,32,32,0.8)" fill="rgba(139,32,32,0.15)" strokeWidth={1.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* §5 — La friction */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§5 — La friction</p>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-10 border" style={{ borderColor: "#3d3830", background: "rgba(14,12,9,0.5)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: "#b8914a" }}>La promesse</p>
              <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>
                "It's for every nameless, faceless woman of color that now has a chance because this door tonight has been opened."
              </p>
            </div>
            <div className="p-10 border" style={{ borderColor: "#3d3830", background: "rgba(14,12,9,0.5)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4" style={{ color: "#8b2020" }}>La réalité</p>
              <p className="font-serif leading-relaxed" style={{ color: "#c8bfa8" }}>
                "I do feel completely heartbroken that there's no other woman standing next to me in 20 years."
              </p>
              <p className="font-mono text-xs mt-4" style={{ color: "#7a7060" }}>— Halle Berry, 2022</p>
            </div>
          </div>
          <div className="border p-8 text-center max-w-lg mx-auto" style={{ borderColor: "#3d3830", background: "#0e0c09" }}>
            <span className="font-serif font-black" style={{ fontSize: "5rem", color: "#8b2020", lineHeight: 1 }}>20</span>
            <p className="font-mono text-sm mt-2" style={{ color: "#7a7060" }}>ans. Toujours la seule.<br/>Le symbole de l'ouverture est aussi le symbole du plafond.</p>
          </div>
        </div>
      </section>

      {/* §6 — La sortie */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-wider mb-12" style={{ color: "#7a7060" }}>§6 — La sortie</p>
          <p className="font-serif text-2xl md:text-4xl mb-20 leading-relaxed" style={{ color: "#f0e8d5" }}>
            "Être la première ne garantit pas qu'il y en aura d'autres."
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link href="/figure/hattie-mcdaniel" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Hattie McDaniel</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>La première reconnaissance. Le même enfermement.</p>
            </Link>
            <Link href="/figure/viola-davis" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Continuer vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Viola Davis</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>La plus récompensée après elle. Les mêmes structures.</p>
            </Link>
          </div>
          <Link href="/" className="font-mono text-sm" style={{ color: "#7a7060" }}>← Retour aux 8 figures</Link>
        </div>
      </section>
    </div>
  )
}