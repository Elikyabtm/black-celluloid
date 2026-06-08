"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

gsap.registerPlugin(ScrollTrigger)

const careerData = [
  { year: "2009", cinema: 3, tv: 0 },
  { year: "2010", cinema: 0.5, tv: 0 },
  { year: "2011", cinema: 1, tv: 0 },
  { year: "2012", cinema: 0, tv: 1 },
  { year: "2013", cinema: 0, tv: 2 },
  { year: "2014", cinema: 0, tv: 3 },
  { year: "2015", cinema: 0, tv: 4 },
  { year: "2016", cinema: 0, tv: 4 },
  { year: "2017", cinema: 0, tv: 4 },
  { year: "2020", cinema: 0, tv: 0 },
]

export function GaboureySidibePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isStopped, setIsStopped] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".flash-overlay", { opacity: 0, duration: 1.5, delay: 0.3, ease: "power2.out" })
      gsap.fromTo(".celebration-item",
        { scale: 0, rotation: () => (Math.random() - 0.5) * 30 },
        { scale: 1, rotation: 0, stagger: { amount: 0.5, from: "random" }, duration: 0.4, ease: "back.out(2)",
          scrollTrigger: { trigger: ".celebration-section", start: "top 80%" } }
      )
      ScrollTrigger.create({
        trigger: ".stop-zone",
        start: "top center", end: "bottom center",
        pin: true, pinSpacing: true,
        onEnter: () => setIsStopped(true),
        onLeave: () => setIsStopped(false),
        onEnterBack: () => setIsStopped(true),
        onLeaveBack: () => setIsStopped(false),
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ background: "#0a0806", color: "#f0e8d5", minHeight: "100vh" }}>
      <div className="fixed top-8 right-8 z-50 font-mono text-xs" style={{ color: "#7a7060" }}>
        {isStopped && <span style={{ color: "#8b2020" }}>ARRÊT</span>}
      </div>

      {/* §1 — Hero — flash initial */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="flash-overlay absolute inset-0 pointer-events-none z-10" style={{ background: "#f0e8d5", opacity: 0.6 }} />
        <div className="absolute inset-0">
          <Image src="/images/gabourey-sidibe.jpg" alt="Gabourey Sidibe" fill className="object-cover" style={{ filter: "grayscale(100%) contrast(1.1)", opacity: 0.3 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0806 40%, transparent)" }} />
        </div>
        <div className="relative z-20 text-center px-4">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#7a7060" }}>Figure VI · 1983—</p>
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight mb-8" style={{ color: "#f0e8d5" }}>Gabourey Sidibe</h1>
          <p className="font-serif text-lg md:text-2xl italic max-w-3xl mx-auto leading-relaxed" style={{ color: "#c8bfa8" }}>
            "Du jour au lendemain, tout le monde la célébrait.<br/>Puis plus personne."
          </p>
        </div>
      </section>

      {/* §2 — Le système */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§2 — Le système avant la femme</p>
          <div className="grid grid-cols-3 gap-px" style={{ background: "#3d3830", border: "1px solid #3d3830" }}>
            {[
              { num: "2009", label: "Première présidence Obama. L'Amérique se raconte une histoire de progrès racial." },
              { num: "2009", label: "Precious sort. Salué unanimement comme courageux et authentique." },
              { num: "26", label: "Son âge lors de la nomination à l'Oscar" },
            ].map((s, i) => (
              <div key={i} className="text-center py-8 px-4" style={{ background: "#0a0806" }}>
                <span className="font-serif text-4xl font-black block mb-2" style={{ color: "#b8914a" }}>{s.num}</span>
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#7a7060" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 — La célébration explosive */}
      <section className="celebration-section py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§3 — L'effervescence</p>
          <blockquote className="text-center mb-16">
            <p className="font-serif text-2xl md:text-4xl italic leading-relaxed" style={{ color: "#f0e8d5" }}>
              "Ce soir, tout le monde est amoureux de moi."
            </p>
            <cite className="font-mono text-sm mt-4 block" style={{ color: "#7a7060" }}>— Gabourey Sidibe, cérémonie des Oscars, 2010</cite>
          </blockquote>
          <div className="flex flex-wrap justify-center gap-3">
            {["LIFE", "ESSENCE", "VOGUE", "TIME", "PEOPLE", "VARIETY", "THR", "EBONY", "GLAMOUR", "ENTERTAINMENT WEEKLY", "COSMOPOLITAN", "ROLLING STONE"].map((m, i) => (
              <div key={i} className="celebration-item border flex items-end justify-center pb-3"
                style={{ width: 90, height: 120, borderColor: "#3d3830", background: "#1e1b16" }}>
                <span className="font-mono text-xs" style={{ color: "#7a7060", letterSpacing: "0.15em" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §4 — LE STOP — zone pinned */}
      <section className="stop-zone py-32 px-4 relative flex items-center justify-center" style={{ minHeight: "100vh", background: "#060504" }}>
        <div className="text-center relative z-10">
          <p className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#7a7060" }}>2010 — 2020 · Dix ans de silence</p>
          <div className="font-serif font-black" style={{ fontSize: "clamp(6rem,18vw,14rem)", color: "#1e1b16", lineHeight: 1, transition: "color 0.5s" }}>
            <span style={{ color: isStopped ? "#8b2020" : "#1e1b16" }}>0</span>
          </div>
          <p className="font-mono text-sm mt-4" style={{ color: "#7a7060", lineHeight: 2, letterSpacing: "0.25em" }}>
            RÔLES PRINCIPAUX AU CINÉMA<br/>PROPOSÉS À GABOUREY SIDIBE<br/>ENTRE 2010 ET 2020
          </p>
          {isStopped && (
            <p className="font-mono text-xs mt-8 animate-pulse" style={{ color: "#8b2020" }}>↓ continuez à défiler</p>
          )}
        </div>
      </section>

      {/* §4 suite — La trajectoire + chart */}
      <section className="py-32 px-4" style={{ background: "#0e0c09" }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-8 text-center" style={{ color: "#7a7060" }}>§4 — L'abandon · la trajectoire vers la télévision</p>
          <div className="space-y-6 mb-16 max-w-2xl mx-auto">
            {[
              { yr: "2009", t: "Precious. Nomination à l'Oscar. Age 26. Toute l'industrie regarde.", accent: true },
              { yr: "2011", t: "Tower Heist. Rôle secondaire mineur." },
              { yr: "2013", t: "Difficult People. Télévision." },
              { yr: "2015", t: "Empire. Série télévisée, rôle récurrent." },
              { yr: "2020", t: "Empire se termine. Cinéma : silence.", danger: true },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-6 border-b pb-6" style={{ borderColor: e.danger ? "#6b1a1a" : "#2a2620" }}>
                <span className="font-mono text-sm w-16 flex-shrink-0" style={{ color: e.accent ? "#b8914a" : e.danger ? "#8b2020" : "#7a7060" }}>{e.yr}</span>
                <p className="font-serif text-lg" style={{ color: e.accent ? "#f0e8d5" : e.danger ? "#8b2020" : "#c8bfa8", fontWeight: e.accent ? 600 : 400 }}>{e.t}</p>
              </div>
            ))}
          </div>
          <div className="border p-8" style={{ borderColor: "#3d3830", background: "#0a0806" }}>
            <p className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: "#b8914a" }}>Activité cinéma vs télévision — 2009–2020</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={careerData}>
                <XAxis dataKey="year" tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "DM Mono" }} axisLine={{ stroke: "#3d3830" }} tickLine={false} />
                <YAxis tick={{ fill: "#7a7060", fontSize: 9, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0e0c09", border: "1px solid #3d3830", fontFamily: "DM Mono", fontSize: 10, color: "#f0e8d5" }} />
                <Legend formatter={(val) => <span style={{ color: "#c8bfa8", fontSize: 9, fontFamily: "DM Mono" }}>{val}</span>} />
                <Line type="monotone" dataKey="cinema" name="Cinéma" stroke="#b8914a" strokeWidth={2} dot={{ fill: "#b8914a", r: 4 }} />
                <Line type="monotone" dataKey="tv" name="Télévision" stroke="#8b2020" strokeWidth={2} dot={{ fill: "#8b2020", r: 4 }} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* §5 — La friction */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-xs tracking-wider mb-12 text-center" style={{ color: "#7a7060" }}>§5 — La friction</p>
          <div className="border-l-2 pl-8 mb-16" style={{ borderColor: "#6b1a1a" }}>
            <p className="font-serif text-lg italic leading-relaxed" style={{ color: "#c8bfa8" }}>
              bell hooks sur <em>Precious</em> : le film fait de la souffrance extrême la condition de la visibilité pour les corps qui ne correspondent pas aux standards. La représentation est réelle. Elle est conditionnelle.
            </p>
          </div>
          <p className="font-mono text-lg text-center" style={{ color: "#b8914a" }}>
            "Qu'est-ce que la représentation veut dire quand elle s'arrête au moment où la caméra se détourne ?"
          </p>
        </div>
      </section>

      {/* §6 — La sortie */}
      <section className="py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs tracking-wider mb-12" style={{ color: "#7a7060" }}>§6 — La sortie</p>
          <p className="font-serif text-2xl md:text-4xl mb-20 leading-relaxed" style={{ color: "#f0e8d5" }}>
            "L'industrie célèbre ce qu'elle ne sait pas intégrer."
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <Link href="/figure/dorothy-dandridge" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Remonter vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Dorothy Dandridge</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Célébrée. Détruite. Le même mécanisme.</p>
            </Link>
            <Link href="/figure/lupita-nyongo" className="p-8 border text-left" style={{ borderColor: "#3d3830" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "#7a7060" }}>Continuer vers</p>
              <p className="font-serif text-xl" style={{ color: "#f0e8d5" }}>Lupita Nyong'o</p>
              <p className="font-mono text-sm mt-3 italic" style={{ color: "#7a7060" }}>Oscarisée la même décennie. Une autre forme du même abandon.</p>
            </Link>
          </div>
          <Link href="/" className="font-mono text-sm" style={{ color: "#7a7060" }}>← Retour aux 8 figures</Link>
        </div>
      </section>
    </div>
  )
}
