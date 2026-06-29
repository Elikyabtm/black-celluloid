"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// ════════════════════════════════════════════════════════════════
// SYSTÈME DE GRILLE — 12 colonnes réelles, pas de width: 45% au hasard
// ════════════════════════════════════════════════════════════════
// Grille explicite — toujours en longhand, jamais de shorthand "padding"
// mélangé avec paddingTop/paddingBottom (React s'en plaint sinon).
function gridSection(paddingTop: string, paddingBottom: string): React.CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "1.5rem",
    paddingLeft: "8vw",
    paddingRight: "8vw",
    paddingTop,
    paddingBottom,
  }
}
const col = (start: number, span: number): React.CSSProperties => ({
  gridColumn: `${start} / span ${span}`,
})

const ROLE_IMAGES: Record<string, string> = {
  maid:  "/images/gonewiththewind.jpg",
  comic: "/images/judgepriest.jpg",
  nurse: "/images/aliceadams.jpg",
  other: "/images/showboat.jpg",
}
const ROLE_FILTERS: Record<string, string> = {
  maid:   "grayscale(100%) contrast(1.2) brightness(0.6)",
  comic:  "grayscale(100%) sepia(0.4) contrast(1.1) brightness(0.65)",
  nurse:  "grayscale(100%) contrast(1.1) brightness(0.5)",
  other:  "grayscale(100%) brightness(0.4)",
}
const ROLES: ("maid"|"comic"|"nurse"|"other")[] = [
  ...Array(269).fill("maid"),
  ...Array(25).fill("comic"),
  ...Array(9).fill("nurse"),
  ...Array(6).fill("other"),
]

function PhotoHead({ role, size = 26, onClick }: {
  role: "maid"|"comic"|"nurse"|"other"; size?: number; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size, position: "relative",
        overflow: "hidden", flexShrink: 0, border: "none", padding: 0,
        cursor: "pointer",
      }}>
      <Image src={ROLE_IMAGES[role]} alt="" fill sizes={`${size}px`}
        style={{ objectFit: "cover", objectPosition: "50% 20%", filter: ROLE_FILTERS[role] }} />
    </button>
  )
}

// ─── CITATION VOIX OFF ─────────────────────────────────────────
function InlineQuote({ text, author, accentColor = "#d4a853" }: {
  text: string; author?: string; accentColor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({ trigger: ref.current, start: "top 75%", onEnter: () => setActive(true) })
  }, [])

  const speak = () => {
    if (!("speechSynthesis" in window)) return
    if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return }
    const u = new SpeechSynthesisUtterance(text)
    u.lang = "fr-FR"; u.rate = 0.85; u.pitch = 1
    const v = window.speechSynthesis.getVoices().find(v => v.lang.startsWith("fr"))
    if (v) u.voice = v
    u.onend = () => setPlaying(false)
    window.speechSynthesis.speak(u)
    setPlaying(true)
  }

  return (
    <div ref={ref}>
      <button onClick={speak} style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        border: "none", background: "none", cursor: "pointer",
        padding: 0, marginBottom: "1rem",
        color: playing ? accentColor : "#8a8276",
        fontFamily: "DM Mono, monospace", fontSize: 12,
        letterSpacing: "0.15em", textTransform: "uppercase",
      }}>
        <span style={{ width: 28, height: 28, borderRadius: "50%",
          border: `1px solid ${playing ? accentColor : "#4a4540"}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {playing ? "⏸" : "▶"}
        </span>
        {playing ? "en lecture" : "écouter la citation"}
      </button>
      <blockquote style={{
        fontFamily: "Playfair Display, serif", fontStyle: "italic",
        fontSize: "clamp(1.5rem,3vw,2.4rem)", lineHeight: 1.5, color: "#f0e8d5",
      }}>
        {text.split(" ").map((word, i) => (
          <span key={i} style={{
            display: "inline-block", marginRight: "0.3em",
            opacity: active ? 1 : 0.15,
            color: active ? "#f0e8d5" : "#3d3830",
            transition: `opacity 0.5s ${i * 0.04}s, color 0.5s ${i * 0.04}s`,
          }}>{word}</span>
        ))}
      </blockquote>
      {author && (
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12,
          color: "#8a8276", letterSpacing: "0.15em", marginTop: "1.2rem" }}>— {author}</p>
      )}
    </div>
  )
}

// ─── PHOTOGRAMME ───────────────────────────────────────────────
function Photogram({ src, title, year, role, expanded, onToggle }: {
  src: string; title: string; year: string; role: string
  expanded: boolean; onToggle: () => void
}) {
  return (
    <button onClick={onToggle} style={{
      position: "relative", aspectRatio: expanded ? "16/10" : "4/3",
      overflow: "hidden", background: "#0c0a07", border: "1px solid #2a2620",
      width: "100%", padding: 0, cursor: "pointer",
      transition: "aspect-ratio 0.5s ease",
    }}>
      <Image src={src} alt={title} fill
        style={{ objectFit: "cover",
          filter: expanded
            ? "grayscale(60%) contrast(1.15) brightness(0.85)"
            : "grayscale(100%) contrast(1.2) brightness(0.55)",
          transition: "filter 0.5s ease" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", bottom: 14, left: 16, right: 16,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic",
            fontSize: "1rem", color: "#f0e8d5" }}>{title}</p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11,
            color: "#a89e8e", letterSpacing: "0.1em", marginTop: "0.2rem" }}>{role}</p>
        </div>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#8a8276" }}>{year}</p>
      </div>
    </button>
  )
}

// ─── FAIT DIVERS ───────────────────────────────────────────────
function FaitDivers({ date, lieu, source, children }: {
  date: string; lieu: string; source?: string; children: React.ReactNode
}) {
  return (
    <div style={{ borderLeft: "3px solid #d4a853", paddingLeft: "1.8rem" }}>
      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12,
        color: "#d4a853", letterSpacing: "0.15em", textTransform: "uppercase",
        marginBottom: "0.4rem" }}>{date}</p>
      <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12,
        color: "#8a8276", marginBottom: "1.2rem" }}>{lieu}</p>
      <div style={{ fontFamily: "Playfair Display, serif",
        fontSize: "clamp(1rem,1.6vw,1.2rem)", lineHeight: 1.85, color: "#d8cfc0" }}>
        {children}
      </div>
      {source && (
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11,
          color: "#5c5448", marginTop: "1rem", lineHeight: 1.6 }}>Source : {source}</p>
      )}
    </div>
  )
}

// ─── TIMELINE OSCARS — interactive, cliquable, plus de jeu ──────
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
  const stRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!outer.current || !inner.current) return
    stRef.current = ScrollTrigger.create({
      trigger: outer.current, start: "top top",
      end: () => `+=${(BEATS.length - 1) * window.innerHeight}`,
      pin: inner.current, scrub: 0.6,
      onUpdate: (self) => {
        const idx = Math.min(Math.round(self.progress * (BEATS.length - 1)), BEATS.length - 1)
        setActive(idx)
        if (strip.current) {
          strip.current.style.transform = `translateX(-${self.progress * (BEATS.length - 1) * 100}vw)`
        }
      },
    })
    return () => { stRef.current?.kill() }
  }, [])

  // Click sur un point = saute directement à ce beat
  const jumpTo = (i: number) => {
    if (!stRef.current || !outer.current) return
    const total = stRef.current.end - stRef.current.start
    const target = stRef.current.start + (total * i) / (BEATS.length - 1)
    gsap.to(window, { scrollTo: target, duration: 0.8, ease: "power2.inOut" })
  }

  const beat = BEATS[active]

  return (
    <div ref={outer} style={{ height: `${BEATS.length * 100}vh`, position: "relative" }}>
      <div ref={inner} style={{
        height: "100vh", overflow: "hidden",
        background: beat.accent ? "#140d04" : beat.dim ? "#050402" : "#080705",
        transition: "background 0.6s ease",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          padding: "2rem 8vw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#d4a853",
            letterSpacing: "0.25em", textTransform: "uppercase" }}>
            27 février 1940 · Ambassador Hotel
          </p>
          {/* Points cliquables — navigation directe */}
          <div style={{ display: "flex", gap: 10 }}>
            {BEATS.map((_, i) => (
              <button key={i} onClick={() => jumpTo(i)} style={{
                width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                background: i === active ? "#d4a853" : "#3a352c",
                border: "none", padding: 0, cursor: "pointer",
                transition: "all 0.4s ease",
              }} aria-label={`Aller au moment ${i + 1}`} />
            ))}
          </div>
        </div>

        <div ref={strip} style={{ display: "flex", width: `${BEATS.length * 100}vw`, height: "100%" }}>
          {BEATS.map((b, i) => (
            <div key={i} style={{
              width: "100vw", height: "100%", flexShrink: 0,
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", justifyContent: "center", padding: "8vh 8vw",
            }}>
              {b.time && (
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(1rem,2vw,1.4rem)",
                  color: "#8a8276", marginBottom: "3vh" }}>{b.time}</p>
              )}
              <p style={{
                fontFamily: "Playfair Display, serif",
                fontSize: b.accent ? "clamp(2.5rem,6vw,5.5rem)" : "clamp(1.8rem,4vw,3.8rem)",
                fontWeight: b.accent ? 900 : 400,
                lineHeight: 1.15, whiteSpace: "pre-line",
                color: b.accent ? "#f0e8d5" : b.dim ? "#6b6358" : "#d8cfc0",
                maxWidth: b.accent ? "80vw" : "65vw",
              }}>{b.text}</p>
              {b.sub && (
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(0.9rem,1.4vw,1.1rem)",
                  color: "#8a8276", marginTop: "3vh", maxWidth: "45vw", lineHeight: 1.7 }}>{b.sub}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════
// PAGE
// ════════════════════════════════════════════════════════════════
export function HattiePage() {
  const container = useRef<HTMLDivElement>(null)
  const [headsVisible, setHeadsVisible] = useState(false)
  const [counter, setCounter] = useState(0)
  const [selectedHead, setSelectedHead] = useState<{ role: string; idx: number } | null>(null)
  const [expandedFilm, setExpandedFilm] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-img", { opacity: 0 }, { opacity: 0.55, duration: 3, delay: 0.3 })
      gsap.fromTo(".hero-phrase", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.7 })

      gsap.utils.toArray<HTMLElement>(".data-reveal").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.9,
          scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
        })
      })

      ScrollTrigger.create({
        trigger: ".count-trigger", start: "top 85%",
        onEnter: () => {
          let c = 0
          const iv = setInterval(() => { c += 6; setCounter(c); if (c >= 309) { setCounter(309); clearInterval(iv) } }, 16)
        }
      })
      ScrollTrigger.create({ trigger: ".heads-trigger", start: "top 80%", onEnter: () => setHeadsVisible(true) })

      gsap.fromTo(".col-left", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: ".col-left", start: "top 78%" } })
      gsap.fromTo(".col-right", { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: ".col-right", start: "top 78%" } })

      gsap.fromTo(".friction-zero", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ".friction-zero", start: "top 80%" } })
      gsap.fromTo(".friction-phrase", { opacity: 0 }, { opacity: 1, duration: 1.3, scrollTrigger: { trigger: ".friction-phrase", start: "top 80%" } })

      gsap.fromTo(".exit-left", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ".exit-left", start: "top 92%" } })
      gsap.fromTo(".exit-right", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, delay: 0.15, scrollTrigger: { trigger: ".exit-right", start: "top 92%" } })

      setTimeout(() => ScrollTrigger.refresh(), 300)
    }, container)
    return () => ctx.revert()
  }, [])

  const roleLabel = (r: string) =>
    r === "maid" ? "Domestique" : r === "comic" ? "Comic relief" : r === "nurse" ? "Nourrice" : "Autre"
  const roleFilm = (r: string) =>
    r === "maid" ? "Gone with the Wind, 1939" : r === "comic" ? "Judge Priest, 1934"
    : r === "nurse" ? "Alice Adams, 1935" : "Show Boat, 1936"

  return (
    <div ref={container} style={{ background: "#0a0806", color: "#d8cfc0", fontFamily: "Syne, sans-serif" }}>

      {/* ── §1 ENTRÉE ────────────────────────────────────────────── */}
      <section style={{ height: "100vh", position: "relative" }}>
        <div className="hero-img" style={{ position: "absolute", inset: 0, opacity: 0 }}>
          <Image src="/images/hattie-mcdaniel.jpg" alt="Hattie McDaniel, Gone with the Wind, 1939" fill
            style={{ objectFit: "cover", objectPosition: "50% 20%",
              filter: "grayscale(100%) contrast(1.35) brightness(0.6)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(10,9,6,0.15) 0%, rgba(10,9,6,0.75) 70%)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to top, #0a0806 10%, transparent 50%)" }} />
        </div>

        <p style={{ position: "absolute", top: "2.5rem", left: "8vw", zIndex: 3,
          fontFamily: "DM Mono, monospace", fontSize: 12, color: "#a8895a",
          letterSpacing: "0.3em", textTransform: "uppercase" }}>
          Figure I · 1895–1952
        </p>

        <div className="hero-phrase" style={{ position: "absolute", bottom: "12vh", left: "8vw",
          zIndex: 3, width: "min(640px, 60%)", opacity: 0 }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.4rem,5vw,4.6rem)",
            fontWeight: 900, lineHeight: 1.12, color: "#f0e8d5", margin: 0 }}>
            Elle a remporté l'Oscar
          </h1>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.4rem,5vw,4.6rem)",
            fontStyle: "italic", lineHeight: 1.12, color: "#a89e8e", margin: 0 }}>
            qu'elle n'avait pas le droit de célébrer.
          </h1>
        </div>
      </section>

      {/* ── §2 LE SYSTÈME ────────────────────────────────────────── */}
      <section style={gridSection("14vh", "8vh")}>
        <p className="data-reveal" style={{ ...col(1, 6), fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.2rem,2vw,1.55rem)", lineHeight: 1.85, color: "#d8cfc0", marginBottom: "3vh" }}>
          En 1930, le Code Hays entre en vigueur. Il ne dit pas que les actrices noires
          n'ont pas le droit d'exister dans les films. Il rend simplement impossible
          qu'elles y existent autrement que dans des rôles de service.
        </p>
        <p className="data-reveal" style={{ ...col(1, 5), fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,1.9vw,1.4rem)", lineHeight: 1.85, color: "#8a8276",
          fontStyle: "italic", marginBottom: "8vh" }}>
          Ce système précède Hattie McDaniel. C'est ce qui le rend difficile à combattre.
        </p>

        <div className="data-reveal" style={{ ...col(1, 3), borderTop: "1px solid #2a2620", paddingTop: "3vh" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem,6vw,5rem)",
            fontWeight: 900, color: "#d4a853", lineHeight: 1 }}>1930</span>
        </div>
        <div className="data-reveal" style={{ ...col(4, 6), borderTop: "1px solid #2a2620",
          paddingTop: "3vh", marginBottom: "10vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.1rem,1.8vw,1.35rem)",
            lineHeight: 1.85, color: "#d8cfc0", marginBottom: "0.75rem" }}>
            Le Code Hays interdit les relations romantiques interraciales à l'écran.
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#5c5448" }}>
            Source : Motion Picture Production Code, 1930. MPAA Archives.
          </p>
        </div>

        <p className="data-reveal count-trigger" style={{ ...col(1, 7), fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.2rem,2vw,1.55rem)", lineHeight: 1.85, color: "#d8cfc0", marginBottom: 0 }}>
          Dans ce cadre, Hattie McDaniel a tourné dans
        </p>
        <div style={{ ...col(1, 8), lineHeight: 0.85 }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(7rem,16vw,13rem)",
            fontWeight: 900, color: "#d4a853", display: "block", letterSpacing: "-0.02em" }}>
            {counter}
          </span>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "#8a8276",
            letterSpacing: "0.25em", textTransform: "uppercase" }}>films</span>
        </div>
        <p className="data-reveal" style={{ ...col(1, 6), fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,1.8vw,1.35rem)", lineHeight: 1.85, color: "#8a8276",
          fontStyle: "italic", marginTop: "2vh", marginBottom: "0.5rem" }}>
          Dans 87% d'entre eux, elle jouait une domestique.
        </p>
        <p style={{ ...col(1, 6), fontFamily: "DM Mono, monospace", fontSize: 11, color: "#5c5448" }}>
          Source : IMDb, filmographie complète Hattie McDaniel. Black Film Archive.
        </p>
      </section>

      {/* ── GRILLE DE 309 TÊTES — interactive ─────────────────────── */}
      <section style={{ padding: "8vh 8vw", background: "#0e0c09" }}>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "#d4a853",
          letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          309 films · cliquez sur un visage
        </p>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#5c5448", marginBottom: "1.5rem" }}>
          Chaque visage représente un rôle qu'elle a tenu.
        </p>

        <div className="heads-trigger" style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: "1.5rem" }}>
          {ROLES.map((role, i) => (
            <div key={i} style={{
              opacity: headsVisible ? 1 : 0,
              transform: headsVisible ? "scale(1)" : "scale(0.7)",
              transition: `opacity 0.3s ${(i * 4) % 500}ms, transform 0.3s ${(i * 4) % 500}ms`,
            }}>
              <PhotoHead role={role} size={26} onClick={() => setSelectedHead({ role, idx: i })} />
            </div>
          ))}
        </div>

        {/* Panneau de détail au clic — vraie interaction, pas un tooltip hover */}
        {selectedHead && (
          <div style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            padding: "1.2rem 1.5rem", background: "#161310",
            border: "1px solid #3a352c", marginTop: "1rem", maxWidth: 480,
          }}>
            <div style={{ width: 56, height: 56, position: "relative", overflow: "hidden", flexShrink: 0 }}>
              <Image src={ROLE_IMAGES[selectedHead.role]} alt="" fill
                style={{ objectFit: "cover", objectPosition: "50% 20%", filter: ROLE_FILTERS[selectedHead.role] }} />
            </div>
            <div>
              <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic",
                fontSize: "1.1rem", color: "#f0e8d5" }}>{roleLabel(selectedHead.role)}</p>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#8a8276", marginTop: "0.2rem" }}>
                {roleFilm(selectedHead.role)} · rôle {selectedHead.idx + 1} sur 309
              </p>
            </div>
            <button onClick={() => setSelectedHead(null)} style={{
              marginLeft: "auto", background: "none", border: "none",
              color: "#5c5448", cursor: "pointer", fontSize: 18, padding: "0.3rem",
            }}>×</button>
          </div>
        )}

        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#8a8276", marginTop: "1.5rem" }}>
          Aucun rôle principal. Aucun personnage libre. Toutes des servantes.
        </p>
      </section>

      {/* ── SUITE §2 — Donnée 2 + fait divers ────────────────────── */}
      <section style={gridSection("10vh", "10vh")}>
        <div className="data-reveal" style={{ ...col(1, 3), borderTop: "1px solid #2a2620", paddingTop: "3vh" }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(3rem,6vw,5rem)",
            fontWeight: 900, color: "#5c5448", lineHeight: 1 }}>1940</span>
        </div>
        <div className="data-reveal" style={{ ...col(4, 7), borderTop: "1px solid #2a2620",
          paddingTop: "3vh", marginBottom: "8vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.1rem,1.8vw,1.35rem)",
            lineHeight: 1.85, color: "#d8cfc0", marginBottom: "0.75rem" }}>
            L'hôtel Ambassador de Los Angeles pratique la ségrégation raciale. Hattie McDaniel
            n'est autorisée à y entrer que grâce à une intervention personnelle du producteur
            David O. Selznick.
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#5c5448" }}>
            Source : Donald Bogle, Bright Boulevards, Bold Dreams, 2005.
          </p>
        </div>

        <div style={{ ...col(1, 8) }}>
          <FaitDivers date="15 décembre 1939 — Atlanta, Géorgie" lieu="Loew's Grand Theatre"
            source="Jill Watts, Hattie McDaniel: Black Ambition, White Hollywood, 2005.">
            La première de <span style={{ fontStyle: "italic" }}>Gone with the Wind</span> a lieu
            au Loew's Grand Theatre. Hattie McDaniel n'est pas invitée. Les lois de ségrégation
            de l'État interdisent sa présence dans les salles réservées aux Blancs.
            Clark Gable propose de boycotter la soirée. McDaniel lui demande de ne pas le faire.
          </FaitDivers>
        </div>
      </section>

      {/* ── §3 LE CHOIX IMPOSSIBLE — photogrammes cliquables ─────── */}
      <section style={{ padding: "10vh 8vw", background: "#060504", borderTop: "1px solid #1a1710" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.5rem", marginBottom: "6vh" }}>
          <div style={{ gridColumn: "1 / span 7" }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.1rem,1.8vw,1.35rem)",
              lineHeight: 1.85, color: "#d8cfc0", marginBottom: "3vh" }}>
              Face aux critiques de la NAACP qui l'accusait de trahir sa communauté,
              Hattie McDaniel avait une réponse.
            </p>
            <InlineQuote text="Je préfère jouer une femme de chambre que l'être." author="Hattie McDaniel" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "1.5rem" }}>
          <div className="col-left" style={{ gridColumn: "1 / span 6", opacity: 0 }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#d4a853",
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Ce que l'industrie lui proposait — cliquez pour agrandir
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              {[
                { src: "/images/judgepriest.jpg", title: "Judge Priest", year: "1934", role: "Dilsey, domestique" },
                { src: "/images/aliceadams.jpg", title: "Alice Adams", year: "1935", role: "Cuisinière" },
                { src: "/images/showboat.jpg", title: "Show Boat", year: "1936", role: "Lavandière" },
                { src: "/images/gonewiththewind.jpg", title: "Gone with the Wind", year: "1939", role: "Mammy" },
              ].map((f, i) => (
                <div key={i} style={{ gridColumn: expandedFilm === i ? "1 / span 2" : "auto" }}>
                  <Photogram {...f} expanded={expandedFilm === i}
                    onToggle={() => setExpandedFilm(expandedFilm === i ? null : i)} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-right" style={{ ...col(8, 5), opacity: 0 }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 12, color: "#5c5448",
              letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Ce qu'elle n'a jamais obtenu
            </p>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1rem,1.6vw,1.2rem)",
              lineHeight: 1.85, color: "#8a8276", marginBottom: "1.5rem" }}>
              Des rôles dramatiques complexes. Des femmes avec une vie intérieure.
              Des personnages qui ne sont pas définis par leur relation de service
              à des personnages blancs.
            </p>
            <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1rem,1.6vw,1.2rem)",
              lineHeight: 1.85, color: "#6b6358", fontStyle: "italic", marginBottom: "1.5rem" }}>
              Les archives de sa correspondance montrent des demandes répétées.
              Des refus systématiques.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#5c5448", lineHeight: 1.6 }}>
              Source : Jill Watts, Hattie McDaniel: Black Ambition, White Hollywood, 2005.
            </p>
            <div style={{ marginTop: "2rem", padding: "2rem", border: "1px dashed #2a2620",
              fontFamily: "DM Mono, monospace", fontSize: 11, color: "#3a352c",
              textTransform: "uppercase", letterSpacing: "0.2em" }}>
              espace volontairement vide
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDÉO — déplacée AVANT la timeline ───────────────────── */}
      <section style={gridSection("12vh", "12vh")}>
        <p style={{ ...col(1, 7), fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,1.8vw,1.35rem)", lineHeight: 1.85, color: "#d8cfc0", marginBottom: "4vh" }}>
          Ce soir-là, Hattie McDaniel prononce un discours.
          Le studio l'a réécrit. Elle le sait. Elle le lit quand même.
        </p>
        <div style={{ ...col(1, 12), position: "relative", paddingBottom: "47%",
          background: "#0e0c09", border: "1px solid #1a1710", marginBottom: "1rem" }}>
          <iframe style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            src="https://www.youtube.com/embed/e7t4pTNZshA?rel=0&modestbranding=1&color=white"
            title="Hattie McDaniel — Academy Award 1940" allowFullScreen loading="lazy" />
        </div>
        <p style={{ ...col(1, 8), fontFamily: "DM Mono, monospace", fontSize: 11, color: "#5c5448" }}>
          Extrait documentaire · Hattie McDaniel · Academy Award 1940
        </p>
      </section>

      {/* ── §4 LA NUIT DES OSCARS — après la vidéo ───────────────── */}
      <OscarTimeline />

      <section style={gridSection("8vh", "8vh")}>
        <p style={{ ...col(1, 6), fontFamily: "Playfair Display, serif", fontSize: "clamp(1rem,1.7vw,1.3rem)",
          lineHeight: 1.85, color: "#8a8276", fontStyle: "italic", marginBottom: "4vh" }}>
          Après cette nuit, rien ne change.
        </p>
        <div style={{ ...col(6, 7) }}>
          <FaitDivers date="27 février 1940 — Los Angeles" lieu="La même nuit"
            source="Executive Order 9981, July 26, 1948. National Archives.">
            L'armée américaine est encore entièrement ségrégée. Il faudra attendre 1948 et
            le décret exécutif 9981 du président Truman pour que la déségrégation militaire
            soit ordonnée. Hattie McDaniel reçoit son Oscar dans un pays où les soldats noirs
            servent dans des unités séparées.
          </FaitDivers>
        </div>
      </section>

      {/* ── §5 LA FRICTION ───────────────────────────────────────── */}
      <section style={{ ...gridSection("12vh", "12vh"), background: "#0e0c09", borderTop: "1px solid #1a1710" }}>
        <p style={{ ...col(1, 6), fontFamily: "Playfair Display, serif", fontSize: "clamp(1.1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#d8cfc0", marginBottom: "8vh" }}>
          La NAACP condamnait ses choix. Elle les défendait. Après son Oscar, le système n'a pas bougé.
        </p>

        <div className="friction-zero" style={{ ...col(1, 9), opacity: 0 }}>
          <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(9rem,22vw,18rem)",
            fontWeight: 900, color: "#b03a3a", display: "block", lineHeight: 0.85, letterSpacing: "-0.03em" }}>0</span>
        </div>

        <div style={{ ...col(1, 5), marginBottom: "8vh" }}>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 13, color: "#c97a7a",
            letterSpacing: "0.1em", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            nouveaux types de rôles disponibles pour les actrices noires après son Oscar
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#5c5448" }}>
            Source : Donald Bogle, Toms, Coons, Mulattoes, Mammies, and Bucks, 1973.
          </p>
        </div>

        <div style={{ ...col(5, 7), borderTop: "1px solid #2a2620", paddingTop: "5vh", marginBottom: "8vh" }}>
          <InlineQuote
            text="Pourquoi me plaindrais-je de gagner sept mille dollars par semaine en jouant une femme de chambre ? Si je ne le faisais pas, je gagnerais sept dollars par semaine à l'être."
            author="Hattie McDaniel, 1947" />
        </div>

        <div style={{ ...col(1, 6), borderTop: "1px solid #2a2620", paddingTop: "5vh", marginBottom: "8vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1rem,1.6vw,1.2rem)",
            lineHeight: 1.85, color: "#8a8276", marginBottom: "2vh" }}>
            Elle meurt en 1952. Elle avait demandé à être enterrée au Hollywood Cemetery.
            Le cimetière refusait les Noirs. Sa demande est rejetée.
          </p>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1rem,1.6vw,1.2rem)",
            lineHeight: 1.85, color: "#6b6358", fontStyle: "italic" }}>
            En 1999, le Hollywood Forever Cemetery lui accorde une sépulture commémorative.
            Cinquante ans après.
          </p>
        </div>

        <div className="friction-phrase" style={{ ...col(1, 12), opacity: 0 }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem,3.8vw,3.2rem)",
            fontStyle: "italic", color: "#c97a7a", lineHeight: 1.3 }}>
            "L'industrie l'a récompensée pour avoir joué<br />un rôle qui niait son humanité."
          </p>
        </div>
      </section>

      {/* ── §6 LA SORTIE ─────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", position: "relative",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "0 8vw 12vh" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/hattie-mcdaniel.jpg" alt="" fill
            style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(100%) brightness(0.2)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,9,6,0.85)" }} />
        </div>

        <div className="exit-left" style={{ opacity: 0, position: "relative", zIndex: 2,
          width: "min(640px, 55%)", marginBottom: "6vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem,3.2vw,2.8rem)",
            fontStyle: "italic", color: "#d8cfc0", lineHeight: 1.3 }}>
            "La reconnaissance peut être<br />une forme d'enfermement."
          </p>
        </div>

        <div className="exit-right" style={{ opacity: 0, position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.2rem", marginLeft: "auto" }}>
          {[
            { href: "/figure/dorothy-dandridge", label: "Dorothy Dandridge",
              sub: "La même industrie. Le même piège. Dix ans plus tard." },
            { href: "/figure/halle-berry", label: "Halle Berry",
              sub: "Soixante ans plus tard. Une autre première fois. Une autre impasse." },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: "Playfair Display, serif", fontSize: "1.1rem", color: "#8a8276",
              textDecoration: "none", textAlign: "right",
              borderBottom: "1px solid #2a2620", paddingBottom: "0.2rem",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#d4a853"; (e.currentTarget as HTMLElement).style.borderColor = "#d4a853" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#8a8276"; (e.currentTarget as HTMLElement).style.borderColor = "#2a2620" }}>
              {link.label} · <span style={{ fontStyle: "italic", fontSize: "1rem" }}>{link.sub}</span> →
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}