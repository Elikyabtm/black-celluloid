"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// ─── SVG HEAD ──────────────────────────────────────────────────
function HeadSVG({ color, highlight, size = 24 }: {
  color: string; highlight: boolean; size?: number
}) {
  return (
    <svg width={size} height={size + 6} viewBox="0 0 32 38" fill="none">
      {highlight && <rect width="32" height="38" fill="rgba(184,145,74,0.09)" />}
      <rect x="13" y="26" width="6" height="8" rx="1" fill={color} opacity="0.85" />
      <ellipse cx="16" cy="17" rx="11" ry="12" fill={color} />
      <ellipse cx="16" cy="7" rx="10" ry="4.5" fill={color} opacity="0.65" />
      <ellipse cx="12" cy="16" rx="1.8" ry="1.4" fill="rgba(255,255,255,0.65)" />
      <ellipse cx="20" cy="16" rx="1.8" ry="1.4" fill="rgba(255,255,255,0.65)" />
      <circle cx="12.5" cy="16" r="0.9" fill="#1a1208" />
      <circle cx="20.5" cy="16" r="0.9" fill="#1a1208" />
      <path d="M13 21 Q16 23.5 19 21" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
      {highlight && <rect x="11" y="30" width="10" height="5" rx="1" fill="rgba(240,232,213,0.18)" />}
    </svg>
  )
}

const HEAD_COLORS = ["#6b4c3b","#7a5c4a","#5c3d2e","#8a6b52","#4a2e1e","#9a7a62","#3d2414"]
const ROLES: ("maid"|"comic"|"nurse"|"other")[] = [
  ...Array(269).fill("maid"),
  ...Array(25).fill("comic"),
  ...Array(9).fill("nurse"),
  ...Array(6).fill("other"),
]

// ─── CITATION VOIX OFF ─────────────────────────────────────────
function InlineQuote({ text, author, accentColor = "#b8914a" }: {
  text: string; author?: string; accentColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current, start: "top 68%",
      onEnter: () => setActive(true),
    })
  }, [])

  const speak = () => {
    if (!("speechSynthesis" in window)) return
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return }
    const u = new SpeechSynthesisUtterance(text)
    u.lang = "fr-FR"; u.rate = 0.82; u.pitch = 1
    const v = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("fr"))
    if (v) u.voice = v
    u.onend = () => setPlaying(false)
    window.speechSynthesis.speak(u)
    setPlaying(true)
  }

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={speak} style={{
        position: "absolute", top: 0, right: 0,
        border: `1px solid ${playing ? accentColor : "#3d3830"}`,
        color: playing ? accentColor : "#7a7060",
        background: "transparent", cursor: "pointer",
        fontFamily: "DM Mono, monospace", fontSize: 9,
        letterSpacing: "0.2em", textTransform: "uppercase",
        padding: "4px 10px", display: "flex", alignItems: "center", gap: 6,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {playing
            ? <><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></>
            : <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>
          }
        </svg>
        {playing ? "arrêter" : "écouter"}
      </button>
      <blockquote style={{
        fontFamily: "Playfair Display, serif", fontStyle: "italic",
        fontSize: "clamp(1.4rem,2.8vw,2.2rem)", lineHeight: 1.55,
        color: "#f0e8d5", paddingRight: "7rem",
      }}>
        {text.split(" ").map((word, i) => (
          <span key={i} style={{
            display: "inline-block", marginRight: "0.28em",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.45s ${i * 0.05}s, transform 0.45s ${i * 0.05}s`,
          }}>{word}</span>
        ))}
      </blockquote>
      {author && (
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
          color: "#7a7060", letterSpacing: "0.2em", marginTop: "1.2rem" }}>
          — {author}
        </p>
      )}
    </div>
  )
}

// ─── PHOTOGRAMME ───────────────────────────────────────────────
function Photogram({ title, year, role }: { title: string; year: string; role: string }) {
  return (
    <div style={{
      position: "relative", aspectRatio: "4/3", overflow: "hidden",
      background: "#080604", border: "1px solid #1a1710",
    }}>
      <Image src="/images/hattie-mcdaniel.jpg" alt={title} fill
        style={{ objectFit: "cover", objectPosition: "top",
          filter: "grayscale(100%) contrast(1.3) brightness(0.4)" }} />
      <div style={{ position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.12, mixBlendMode: "overlay", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)" }} />
      {/* Bandes pellicule */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10,
        background: "repeating-linear-gradient(to right,#0a0806 0,#0a0806 14px,transparent 14px,transparent 22px)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 10,
        background: "repeating-linear-gradient(to right,#0a0806 0,#0a0806 14px,transparent 14px,transparent 22px)" }} />
      <div style={{ position: "absolute", bottom: 14, left: 0, right: 0,
        padding: "0 1.2rem", display: "flex", justifyContent: "space-between",
        alignItems: "flex-end" }}>
        <div>
          <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic",
            fontSize: "clamp(0.85rem,1.3vw,1rem)", color: "rgba(240,232,213,0.6)",
            lineHeight: 1.2 }}>{title}</p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 8,
            color: "rgba(122,112,96,0.5)", letterSpacing: "0.15em",
            marginTop: "0.2rem", textTransform: "uppercase" }}>{role}</p>
        </div>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
          color: "rgba(122,112,96,0.4)", letterSpacing: "0.1em" }}>{year}</p>
      </div>
    </div>
  )
}

// ─── FAIT DIVERS ───────────────────────────────────────────────
function FaitDivers({ date, lieu, source, children }: {
  date: string; lieu: string; source?: string; children: React.ReactNode
}) {
  return (
    <div style={{ borderLeft: "2px solid #2a2620", paddingLeft: "2rem" }}>
      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
        color: "#b8914a", letterSpacing: "0.3em", textTransform: "uppercase",
        marginBottom: "0.3rem" }}>{date}</p>
      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
        color: "#7a7060", letterSpacing: "0.15em", marginBottom: "1.2rem" }}>{lieu}</p>
      <div style={{ fontFamily: "Playfair Display, serif",
        fontSize: "clamp(0.9rem,1.5vw,1.1rem)", lineHeight: 1.85, color: "#c8bfa8" }}>
        {children}
      </div>
      {source && (
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 8,
          color: "#3d3830", letterSpacing: "0.1em", marginTop: "1rem", lineHeight: 1.6 }}>
          Source : {source}
        </p>
      )}
    </div>
  )
}

// ─── OSCAR TIMELINE HORIZONTALE ────────────────────────────────
const BEATS = [
  { time: "19:00", text: "L'équipe de Gone with the Wind arrive à l'Ambassador Hotel.",
    sub: "Le film remportera 8 Oscars cette nuit-là.", accent: false, dim: true },
  { time: "19:15", text: "Hattie McDaniel arrive séparément.",
    sub: "Elle est placée à une table isolée au fond de la salle, loin du reste du cast.", accent: false, dim: false },
  { time: "—", text: "Elle attend.", sub: "", accent: false, dim: true },
  { time: "22:45", text: "Son nom est annoncé.", sub: "Best Supporting Actress.", accent: false, dim: false },
  { time: "", text: "Elle est la première personne noire\nà recevoir un Oscar.", sub: "", accent: true, dim: false },
  { time: "22:50", text: "Elle pleure. Elle remercie l'Académie.",
    sub: "Son discours a été révisé par le studio avant la cérémonie.", accent: false, dim: false },
  { time: "23:30", text: "Elle repart seule.", sub: "Elle n'est pas invitée à l'after-party.", accent: false, dim: true },
]

function OscarTimeline() {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!outer.current || !inner.current) return
    ScrollTrigger.create({
      trigger: outer.current,
      start: "top top",
      end: () => `+=${(BEATS.length - 1) * window.innerHeight}`,
      pin: inner.current,
      scrub: 0.6,
      onUpdate: (self) => {
        const idx = Math.min(Math.round(self.progress * (BEATS.length - 1)), BEATS.length - 1)
        setActive(idx)
        if (strip.current) {
          strip.current.style.transform =
            `translateX(-${self.progress * (BEATS.length - 1) * 100}vw)`
        }
      },
    })
  }, [])

  const beat = BEATS[active]

  return (
    <div ref={outer} style={{ height: `${BEATS.length * 100}vh`, position: "relative" }}>
      <div ref={inner} style={{
        height: "100vh", overflow: "hidden",
        background: beat.accent ? "#0e0a04" : beat.dim ? "#040302" : "#060504",
        transition: "background 0.6s ease",
      }}>
        {/* Header */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          padding: "2rem 8vw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#b8914a",
            letterSpacing: "0.45em", textTransform: "uppercase" }}>
            27 février 1940 · Ambassador Hotel · Los Angeles
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {BEATS.map((_, i) => (
              <div key={i} style={{
                width: i === active ? 20 : 6, height: 6, borderRadius: 3,
                background: i === active ? "#b8914a" : "#2a2620",
                transition: "all 0.4s ease",
              }} />
            ))}
          </div>
        </div>

        {/* Strip */}
        <div ref={strip} style={{
          display: "flex", width: `${BEATS.length * 100}vw`,
          height: "100%", transform: "translateX(0)",
        }}>
          {BEATS.map((b, i) => (
            <div key={i} style={{
              width: "100vw", height: "100%", flexShrink: 0,
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", justifyContent: "center",
              padding: `8vh 8vw`,
            }}>
              {b.time && (
                <p style={{ fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.85rem,1.8vw,1.3rem)",
                  color: "#7a7060", marginBottom: "3vh", letterSpacing: "0.1em" }}>
                  {b.time}
                </p>
              )}
              <p style={{
                fontFamily: "Playfair Display, serif",
                fontSize: b.accent ? "clamp(2.5rem,6vw,5.5rem)" : "clamp(1.8rem,4vw,3.8rem)",
                fontWeight: b.accent ? 900 : 400,
                lineHeight: 1.15, whiteSpace: "pre-line",
                color: b.accent ? "#f0e8d5" : b.dim ? "#2a2620" : "#c8bfa8",
                maxWidth: b.accent ? "80vw" : "65vw",
              }}>
                {b.text}
              </p>
              {b.sub && (
                <p style={{ fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.75rem,1.2vw,1rem)",
                  color: "#7a7060", marginTop: "3vh",
                  maxWidth: "45vw", lineHeight: 1.7, letterSpacing: "0.05em" }}>
                  {b.sub}
                </p>
              )}
              <p style={{ position: "absolute", bottom: "2rem", right: "8vw",
                fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#2a2620", letterSpacing: "0.2em" }}>
                {String(i + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "8vw",
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
          fontFamily: "DM Mono, monospace", fontSize: 8,
          color: "#2a2620", letterSpacing: "0.3em", textTransform: "uppercase" }}>
          <div style={{ width: 1, height: 32,
            background: "linear-gradient(to bottom, transparent, #3d3830)" }} />
          défiler
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────
export function HattiePage() {
  const container = useRef<HTMLDivElement>(null)
  const [headsVisible, setHeadsVisible] = useState(false)
  const [activeHead, setActiveHead] = useState<number | null>(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // §1
      gsap.fromTo(".hero-img",
        { opacity: 0 },
        { opacity: 0.5, duration: 3.5, ease: "power2.inOut", delay: 0.3 }
      )
      gsap.fromTo(".hero-phrase",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.8 }
      )

      // §2 — reveals
      gsap.utils.toArray<HTMLElement>(".data-reveal").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9,
            scrollTrigger: { trigger: el, start: "top 78%",
              toggleActions: "play none none reverse" } }
        )
      })

      // Compteur 309
      ScrollTrigger.create({
        trigger: ".count-trigger", start: "top 72%",
        onEnter: () => {
          let c = 0
          const iv = setInterval(() => {
            c += 6; setCounter(c)
            if (c >= 309) { setCounter(309); clearInterval(iv) }
          }, 16)
        }
      })

      // Grille
      ScrollTrigger.create({
        trigger: ".heads-trigger", start: "top 68%",
        onEnter: () => setHeadsVisible(true)
      })

      // §3 colonnes
      gsap.fromTo(".col-left",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1,
          scrollTrigger: { trigger: ".col-left", start: "top 74%" } }
      )
      gsap.fromTo(".col-right",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 1,
          scrollTrigger: { trigger: ".col-right", start: "top 74%" } }
      )

      // §5
      gsap.fromTo(".friction-zero",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".friction-zero", start: "top 74%" } }
      )
      gsap.fromTo(".friction-phrase",
        { opacity: 0 },
        { opacity: 1, duration: 1.5,
          scrollTrigger: { trigger: ".friction-phrase", start: "top 74%" } }
      )

      // §6
      gsap.fromTo(".exit-left",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: ".exit-left", start: "top 75%" } }
      )
      gsap.fromTo(".exit-right",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2,
          scrollTrigger: { trigger: ".exit-right", start: "top 75%" } }
      )

    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={container} style={{ background: "#0a0806", color: "#f0e8d5",
      fontFamily: "Syne, sans-serif" }}>

      {/* ── §1 ENTRÉE ────────────────────────────────────────────── */}
      <section style={{ height: "100vh", position: "relative", overflow: "hidden" }}>

        {/* Image pleine largeur */}
        <div className="hero-img" style={{ position: "absolute", inset: 0, opacity: 0 }}>
          <Image src="/images/hattie-mcdaniel.jpg" alt="Hattie McDaniel, Gone with the Wind, 1939"
            fill style={{ objectFit: "cover", objectPosition: "50% 20%",
              filter: "grayscale(100%) contrast(1.4) brightness(0.55)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 30% 50%, rgba(10,9,6,0.1) 0%, rgba(10,9,6,0.8) 75%)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to top, #0a0806 12%, transparent 55%)" }} />
          {/* Grain */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* Numéro de figure — haut gauche */}
        <p style={{ position: "absolute", top: "2.5rem", left: "8vw", zIndex: 3,
          fontFamily: "DM Mono, monospace", fontSize: 9,
          color: "rgba(184,145,74,0.5)", letterSpacing: "0.45em",
          textTransform: "uppercase" }}>
          Figure I · 1895–1952
        </p>

        {/* Texte ancré bas gauche */}
        <div className="hero-phrase" style={{ position: "absolute", bottom: "12vh",
          left: "8vw", zIndex: 3, width: "55%", opacity: 0 }}>
          <h1 style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2.2rem,5vw,4.8rem)", fontWeight: 900,
            lineHeight: 1.1, color: "#f0e8d5", margin: 0 }}>
            Elle a remporté l'Oscar
          </h1>
          <h1 style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2.2rem,5vw,4.8rem)", fontWeight: 400,
            fontStyle: "italic", lineHeight: 1.1,
            color: "rgba(240,232,213,0.45)", margin: 0 }}>
            qu'elle n'avait pas le droit de célébrer.
          </h1>
        </div>

        <div style={{ position: "absolute", bottom: "3rem", right: "8vw",
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, zIndex: 3 }}>
          <div style={{ width: 1, height: 40,
            background: "linear-gradient(to bottom, transparent, rgba(184,145,74,0.25))" }} />
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 8,
            letterSpacing: "0.35em", color: "rgba(184,145,74,0.25)",
            textTransform: "uppercase" }}>défiler</span>
        </div>
      </section>

      {/* ── §2 LE SYSTÈME ────────────────────────────────────────── */}
      <section style={{ padding: "14vh 8vw 10vh" }}>

        {/* Texte narratif — 45% de la largeur, laisse le vide à droite */}
        <p className="data-reveal" style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,1.9vw,1.45rem)", lineHeight: 1.9,
          color: "#c8bfa8", width: "45%", marginBottom: "4vh" }}>
          En 1930, le Code Hays entre en vigueur. Il ne dit pas que les actrices noires
          n'ont pas le droit d'exister dans les films. Il rend simplement impossible
          qu'elles y existent autrement que dans des rôles de service.
        </p>
        <p className="data-reveal" style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,1.9vw,1.45rem)", lineHeight: 1.9,
          color: "#4a4540", fontStyle: "italic",
          width: "45%", marginBottom: "10vh" }}>
          Ce système précède Hattie McDaniel. C'est ce qui le rend difficile à combattre.
        </p>

        {/* Donnée 1930 — pleine largeur, deux colonnes naturelles */}
        <div className="data-reveal" style={{ display: "flex", alignItems: "flex-start",
          gap: "4vw", marginBottom: "10vh",
          borderTop: "1px solid #1e1b16", paddingTop: "4vh" }}>
          <span style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(4rem,9vw,8rem)", fontWeight: 900,
            color: "#b8914a", lineHeight: 1, flexShrink: 0 }}>
            1930
          </span>
          <div style={{ paddingTop: "1rem" }}>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85,
              color: "#c8bfa8", marginBottom: "0.75rem" }}>
              Le Code Hays interdit les relations romantiques interraciales à l'écran.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", letterSpacing: "0.1em" }}>
              Source : Motion Picture Production Code, 1930. MPAA Archives.
            </p>
          </div>
        </div>

        {/* Texte + grand nombre */}
        <p className="data-reveal count-trigger" style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,1.9vw,1.45rem)", lineHeight: 1.9,
          color: "#c8bfa8", marginBottom: "0" }}>
          Dans ce cadre, Hattie McDaniel a tourné dans
        </p>

        {/* 309 — énorme, déborde vers la droite */}
        <div style={{ margin: "0 0 2vh", lineHeight: 0.85 }}>
          <span style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(8rem,20vw,16rem)", fontWeight: 900,
            color: "#b8914a", display: "block", letterSpacing: "-0.03em" }}>
            {counter}
          </span>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
            color: "#7a7060", letterSpacing: "0.35em", textTransform: "uppercase",
            display: "block", paddingLeft: "0.5rem" }}>
            films
          </span>
        </div>

        <p className="data-reveal" style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.3rem)", lineHeight: 1.9,
          color: "#7a7060", fontStyle: "italic",
          width: "45%", marginBottom: "1vh" }}>
          Dans 87% d'entre eux, elle jouait une domestique.
        </p>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
          color: "#3d3830", letterSpacing: "0.1em", lineHeight: 1.6,
          marginBottom: "10vh" }}>
          Source : IMDb, filmographie complète Hattie McDaniel. Black Film Archive.
        </p>
      </section>

      {/* ── GRILLE DE TÊTES — pleine largeur ─────────────────────── */}
      <section style={{ padding: "6vh 8vw 10vh", background: "#0e0c09" }}>

        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
          color: "#b8914a", letterSpacing: "0.4em",
          textTransform: "uppercase", marginBottom: "1rem" }}>
          309 films · chaque visage est un rôle
        </p>
        <div style={{ display: "flex", gap: "2.5rem", marginBottom: "1.8rem",
          flexWrap: "wrap" }}>
          {[
            { color: "#7a7060", label: "Domestique / Mammy — 87%" },
            { color: "#b8914a", label: "Comic Relief — 8%" },
            { color: "#6b4c3b", label: "Nourrice — 3%" },
            { color: "#3d3830", label: "Autre — 2%" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 7,
              fontFamily: "DM Mono, monospace", fontSize: 9, color: "#c8bfa8" }}>
              <div style={{ width: 9, height: 9, background: l.color,
                borderRadius: 2, flexShrink: 0 }} />
              {l.label}
            </div>
          ))}
        </div>

        {/* Grille pleine largeur */}
        <div className="heads-trigger" style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {ROLES.map((role, i) => {
            const col = role === "maid" ? HEAD_COLORS[i % HEAD_COLORS.length]
              : role === "comic" ? "#8a7a52"
              : role === "nurse" ? "#5c3d2e"
              : "#3a3530"
            return (
              <div key={i}
                onMouseEnter={() => setActiveHead(i)}
                onMouseLeave={() => setActiveHead(null)}
                style={{
                  opacity: headsVisible ? 1 : 0,
                  transform: headsVisible ? "scale(1)" : "scale(0.6)",
                  transition: `opacity 0.35s ${(i * 5) % 700}ms, transform 0.35s ${(i * 5) % 700}ms`,
                  position: "relative", cursor: "default",
                }}>
                <HeadSVG color={col} highlight={role === "maid"} size={24} />
                {activeHead === i && (
                  <div style={{
                    position: "absolute", bottom: "calc(100% + 4px)", left: "50%",
                    transform: "translateX(-50%)", background: "#0e0c09",
                    border: "1px solid #3d3830", padding: "3px 7px",
                    whiteSpace: "nowrap", fontFamily: "DM Mono, monospace",
                    fontSize: 8, color: "#c8bfa8", letterSpacing: "0.1em",
                    zIndex: 10, pointerEvents: "none",
                  }}>
                    {role === "maid" ? "Domestique"
                      : role === "comic" ? "Comic relief"
                      : role === "nurse" ? "Nourrice" : "Autre"}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
          color: "#7a7060", marginTop: "1.5rem", letterSpacing: "0.1em" }}>
          Aucun rôle principal. Aucun personnage libre. Toutes des servantes.
        </p>
      </section>

      {/* ── SUITE §2 — Donnée 2 + fait divers ────────────────────── */}
      <section style={{ padding: "10vh 8vw" }}>

        <div className="data-reveal" style={{ display: "flex", alignItems: "flex-start",
          gap: "4vw", marginBottom: "8vh",
          borderTop: "1px solid #1e1b16", paddingTop: "4vh" }}>
          <span style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(4rem,9vw,8rem)", fontWeight: 900,
            color: "#2a2620", lineHeight: 1, flexShrink: 0 }}>
            1940
          </span>
          <div style={{ paddingTop: "1rem" }}>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85,
              color: "#c8bfa8", marginBottom: "0.75rem" }}>
              L'hôtel Ambassador de Los Angeles pratique la ségrégation raciale.
              Hattie McDaniel n'est autorisée à y entrer que grâce à une intervention
              personnelle du producteur David O. Selznick.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", letterSpacing: "0.1em" }}>
              Source : Donald Bogle, Bright Boulevards, Bold Dreams, 2005.
            </p>
          </div>
        </div>

        {/* Fait divers ancré à gauche */}
        <div style={{ width: "55%" }}>
          <FaitDivers
            date="15 décembre 1939 — Atlanta, Géorgie"
            lieu="Loew's Grand Theatre"
            source="Jill Watts, Hattie McDaniel: Black Ambition, White Hollywood, 2005."
          >
            La première de{" "}
            <span style={{ fontStyle: "italic" }}>Gone with the Wind</span>{" "}
            a lieu au Loew's Grand Theatre. Hattie McDaniel n'est pas invitée.
            Les lois de ségrégation de l'État interdisent sa présence dans les salles
            réservées aux Blancs. Clark Gable propose de boycotter la soirée.
            McDaniel lui demande de ne pas le faire.
          </FaitDivers>
        </div>
      </section>

      {/* ── §3 LE CHOIX IMPOSSIBLE ───────────────────────────────── */}
      <section style={{ padding: "10vh 8vw", background: "#060504",
        borderTop: "1px solid #1a1710" }}>

        {/* Citation — 60% depuis la gauche */}
        <div style={{ width: "60%", marginBottom: "8vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.8vw,1.35rem)", lineHeight: 1.9,
            color: "#c8bfa8", marginBottom: "4vh" }}>
            Face aux critiques de la NAACP qui l'accusait de trahir sa communauté,
            Hattie McDaniel avait une réponse.
          </p>
          <InlineQuote
            text="Je préfère jouer une femme de chambre que l'être."
            author="Hattie McDaniel"
            accentColor="#b8914a"
          />
        </div>

        {/* Deux colonnes — pleine largeur bord à bord */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
          marginLeft: "-8vw", marginRight: "-8vw" }}>

          {/* Gauche */}
          <div className="col-left" style={{ opacity: 0, padding: "4vh 8vw" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#b8914a", letterSpacing: "0.35em",
              textTransform: "uppercase", marginBottom: "2.5rem" }}>
              Ce que l'industrie lui proposait
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <Photogram title="Judge Priest" year="1934" role="Dilsey, domestique" />
              <Photogram title="Alice Adams" year="1935" role="Malena Burns, cuisinière" />
              <Photogram title="Show Boat" year="1936" role="Queenie, lavandière" />
              <Photogram title="Gone with the Wind" year="1939" role="Mammy" />
            </div>
          </div>

          {/* Droite */}
          <div className="col-right" style={{ opacity: 0, padding: "4vh 8vw",
            borderLeft: "1px solid #1a1710" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", letterSpacing: "0.35em",
              textTransform: "uppercase", marginBottom: "2.5rem" }}>
              Ce qu'elle n'a jamais obtenu
            </p>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(0.95rem,1.6vw,1.2rem)", lineHeight: 1.9,
              color: "#7a7060", marginBottom: "2.5rem" }}>
              Des rôles dramatiques complexes. Des femmes avec une vie intérieure.
              Des personnages qui ne sont pas définis par leur relation de service
              à des personnages blancs.
            </p>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(0.95rem,1.6vw,1.2rem)", lineHeight: 1.9,
              color: "#4a4540", fontStyle: "italic", marginBottom: "2.5rem" }}>
              Les archives de sa correspondance montrent des demandes répétées.
              Des refus systématiques.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", letterSpacing: "0.1em", lineHeight: 1.6,
              marginBottom: "3rem" }}>
              Source : Jill Watts, Hattie McDaniel:<br />
              Black Ambition, White Hollywood, 2005.
            </p>
            {/* Zone vide — volontaire */}
            <div style={{ height: "16rem", border: "1px solid #1a1710",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 8,
                color: "#1e1b16", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                vide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── §4 LA NUIT DES OSCARS ────────────────────────────────── */}
      <OscarTimeline />

      {/* ── VIDÉO + FAIT DIVERS ──────────────────────────────────── */}
      <section style={{ padding: "12vh 8vw" }}>

        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)", lineHeight: 1.9,
          color: "#c8bfa8", width: "55%", marginBottom: "4vh" }}>
          Ce soir-là, Hattie McDaniel prononce un discours.
          Le studio l'a réécrit. Elle le sait. Elle le lit quand même.
        </p>

        {/* Vidéo — pleine largeur - 8vw */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%",
          background: "#0e0c09", border: "1px solid #1a1710", marginBottom: "5vh" }}>
          <iframe
            style={{ position: "absolute", inset: 0, width: "100%",
              height: "100%", border: "none" }}
            src="https://www.youtube.com/embed/6P0sA6ZTCAM?rel=0&modestbranding=1&color=white"
            title="Hattie McDaniel — Academy Award 1940"
            allowFullScreen loading="lazy"
          />
        </div>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
          color: "#3d3830", letterSpacing: "0.15em", marginBottom: "6vh", lineHeight: 1.7 }}>
          Extrait documentaire · Hattie McDaniel · Academy Award 1940
        </p>

        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)", lineHeight: 1.9,
          color: "#7a7060", fontStyle: "italic",
          width: "45%", marginBottom: "6vh" }}>
          Après cette nuit, rien ne change.
        </p>

        {/* Fait divers ancré à droite */}
        <div style={{ marginLeft: "auto", width: "40%" }}>
          <FaitDivers
            date="27 février 1940 — Los Angeles"
            lieu="La même nuit"
            source="Executive Order 9981, July 26, 1948. National Archives."
          >
            L'armée américaine est encore entièrement ségrégée. Il faudra attendre
            1948 et le décret exécutif 9981 du président Truman pour que la
            déségrégation militaire soit ordonnée. Hattie McDaniel reçoit son Oscar
            dans un pays où les soldats noirs servent dans des unités séparées.
          </FaitDivers>
        </div>
      </section>

      {/* ── §5 LA FRICTION ───────────────────────────────────────── */}
      <section style={{ padding: "12vh 8vw", background: "#0e0c09",
        borderTop: "1px solid #1a1710" }}>

        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)", lineHeight: 1.9,
          color: "#c8bfa8", width: "45%", marginBottom: "8vh" }}>
          La NAACP condamnait ses choix. Elle les défendait.
          Après son Oscar, le système n'a pas bougé.
        </p>

        {/* Grand 0 — immense, ancré à gauche */}
        <div className="friction-zero" style={{ opacity: 0, marginBottom: "0" }}>
          <span style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(10rem,28vw,22rem)",
            fontWeight: 900, color: "#8b0000",
            display: "block", lineHeight: 0.85,
            letterSpacing: "-0.04em",
          }}>
            0
          </span>
        </div>

        {/* Texte sous le 0 — ancré à gauche, 40% */}
        <div style={{ width: "40%", marginBottom: "8vh" }}>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
            color: "rgba(139,0,0,0.6)", letterSpacing: "0.2em",
            textTransform: "uppercase", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            nouveaux types de rôles disponibles pour les actrices noires après son Oscar
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            color: "#3d3830", letterSpacing: "0.1em" }}>
            Source : Donald Bogle, Toms, Coons, Mulattoes, Mammies, and Bucks, 1973.
          </p>
        </div>

        {/* Citation voix off — ancrée à droite */}
        <div style={{ marginLeft: "30%", marginBottom: "8vh",
          paddingTop: "5vh", borderTop: "1px solid #1a1710" }}>
          <InlineQuote
            text="Pourquoi me plaindrais-je de gagner sept mille dollars par semaine en jouant une femme de chambre ? Si je ne le faisais pas, je gagnerais sept dollars par semaine à l'être."
            author="Hattie McDaniel, 1947"
            accentColor="#b8914a"
          />
        </div>

        {/* Épilogue — ancré à gauche, 45% */}
        <div style={{ width: "45%", paddingTop: "5vh",
          borderTop: "1px solid #1a1710", marginBottom: "8vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.7vw,1.25rem)", lineHeight: 1.9,
            color: "#7a7060", marginBottom: "2vh" }}>
            Elle meurt en 1952. Elle avait demandé à être enterrée au Hollywood Cemetery.
            Le cimetière refusait les Noirs. Sa demande est rejetée.
          </p>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.7vw,1.25rem)", lineHeight: 1.9,
            color: "#3d3830", fontStyle: "italic" }}>
            En 1999, le Hollywood Forever Cemetery lui accorde une sépulture commémorative.
            Cinquante ans après.
          </p>
        </div>

        {/* Phrase de friction — pleine largeur, très grande */}
        <div className="friction-phrase" style={{ opacity: 0 }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem,4vw,3.5rem)", fontStyle: "italic",
            color: "#8b0000", lineHeight: 1.3 }}>
            "L'industrie l'a récompensée pour avoir joué<br />
            un rôle qui niait son humanité."
          </p>
        </div>
      </section>

      {/* ── §6 LA SORTIE ─────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 8vw 12vh" }}>

        {/* Image plein écran, très basse opacité */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/hattie-mcdaniel.jpg" alt="" fill
            style={{ objectFit: "cover", objectPosition: "top",
              filter: "grayscale(100%) brightness(0.2)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "rgba(10,9,6,0.88)" }} />
        </div>

        {/* Phrase finale — ancrée à gauche, grande */}
        <div className="exit-left" style={{ opacity: 0, position: "relative",
          zIndex: 2, width: "55%", marginBottom: "8vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.8rem,3.5vw,3rem)", fontStyle: "italic",
            color: "#c8bfa8", lineHeight: 1.3 }}>
            "La reconnaissance peut être<br />une forme d'enfermement."
          </p>
        </div>

        {/* Liens — en bas à droite */}
        <div className="exit-right" style={{ opacity: 0, position: "relative",
          zIndex: 2, display: "flex", flexDirection: "column",
          alignItems: "flex-end", gap: "1.2rem",
          marginLeft: "auto" }}>
          {[
            { href: "/figure/dorothy-dandridge", label: "Dorothy Dandridge",
              sub: "La même industrie. Le même piège. Dix ans plus tard." },
            { href: "/figure/halle-berry", label: "Halle Berry",
              sub: "Soixante ans plus tard. Une autre première fois. Une autre impasse." },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: "Playfair Display, serif", fontSize: "1rem",
              color: "#7a7060", textDecoration: "none", textAlign: "right",
              borderBottom: "1px solid #2a2620", paddingBottom: "0.2rem",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#b8914a"
              ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(184,145,74,0.4)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#7a7060"
              ;(e.currentTarget as HTMLElement).style.borderColor = "#2a2620"
            }}>
              {link.label} ·{" "}
              <span style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{link.sub}</span>{" "}→
            </Link>
          ))}
        </div>

        {/* Lien hub — bas gauche, très petit */}
        <Link href="/" style={{
          position: "absolute", bottom: "3rem", left: "8vw",
          fontFamily: "DM Mono, monospace", fontSize: 9,
          color: "#2a2620", textDecoration: "none",
          letterSpacing: "0.3em", textTransform: "uppercase",
          zIndex: 2, transition: "color 0.3s",
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7a7060"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#2a2620"}>
          ← Archive
        </Link>
      </section>

    </div>
  )
}