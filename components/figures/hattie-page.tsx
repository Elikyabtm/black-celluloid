"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// HATTIE McDaniel — Scroll vertical classique, descendant.
// Chaque section s'enchaîne sans rupture — le texte narrate,
// les données émergent DANS la narration, pas en blocs séparés.
// Style The Pudding : une idée à la fois, plein écran, immersif.

// ─── CITATION VOIX OFF INLINE ──────────────────────────────────
// ─── SVG HEAD ──────────────────────────────────────────────────
function HeadSVG({ color, highlight, size = 28 }: { color: string; highlight: boolean; size?: number }) {
  return (
    <svg width={size} height={size + 6} viewBox="0 0 32 38" fill="none">
      {highlight && <rect width="32" height="38" fill="rgba(184,145,74,0.10)" />}
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

// 309 rôles : 269 domestiques, 25 comic, 9 nourrice, 6 autre
const HEAD_COLORS = ["#6b4c3b","#7a5c4a","#5c3d2e","#8a6b52","#4a2e1e","#9a7a62","#3d2414"]
const ROLES: ("maid"|"comic"|"nurse"|"other")[] = [
  ...Array(269).fill("maid"),
  ...Array(25).fill("comic"),
  ...Array(9).fill("nurse"),
  ...Array(6).fill("other"),
]

// ─── COMPOSANT VOIX OFF ────────────────────────────────────────
function InlineQuote({ text, accentColor = "#b8914a" }: { text: string; accentColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 65%",
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

  const words = text.split(" ")

  return (
    <div ref={ref} className="relative">
      {/* Bouton écouter discret */}
      <button onClick={speak} style={{
        position: "absolute", top: 0, right: 0,
        border: `1px solid ${playing ? accentColor : "#3d3830"}`,
        color: playing ? accentColor : "#7a7060",
        background: "transparent", cursor: "pointer",
        fontFamily: "DM Mono", fontSize: 9, letterSpacing: "0.2em",
        textTransform: "uppercase", padding: "4px 10px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {playing
            ? <><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></>
            : <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>
          }
        </svg>
        {playing ? "stop" : "écouter"}
      </button>

      {/* Texte mot à mot */}
      <blockquote style={{
        fontFamily: "Playfair Display, serif",
        fontStyle: "italic",
        fontSize: "clamp(1.3rem,2.5vw,2rem)",
        lineHeight: 1.6,
        color: "#f0e8d5",
        paddingRight: "5rem",
      }}>
        {words.map((word, i) => {
          const clean = word.replace(/[""".,;:!?]/g, "")
          const strong = clean === clean.toUpperCase() && clean.length > 1
          return (
            <span key={i} style={{
              display: "inline-block",
              marginRight: "0.28em",
              color: strong ? accentColor : "#f0e8d5",
              fontWeight: strong ? 700 : 400,
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.4s ${i * 0.04}s, transform 0.4s ${i * 0.04}s`,
            }}>{word}</span>
          )
        })}
      </blockquote>
    </div>
  )
}

// ─── OSCAR TIMELINE HORIZONTALE ────────────────────────────────
// Chaque beat = 100vw. Le scroll vertical traduit en translateX.
// L'utilisateur sent physiquement la progression de cette nuit.
const BEATS = [
  {
    time: "19:00",
    text: "L'équipe de Gone with the Wind arrive à l'Ambassador Hotel.",
    sub: "Le film a remporté 8 Oscars cette nuit-là.",
    bg: "#060504", accent: false, dim: true,
  },
  {
    time: "19:15",
    text: "Hattie McDaniel arrive séparément.",
    sub: "L'hôtel pratique la ségrégation raciale. Elle est placée à une table isolée au fond de la salle, loin du reste du cast.",
    bg: "#0a0806", accent: false, dim: false,
  },
  {
    time: "—",
    text: "Elle attend.",
    sub: "",
    bg: "#060504", accent: false, dim: true,
  },
  {
    time: "22:45",
    text: "Son nom est annoncé.",
    sub: "Best Supporting Actress.",
    bg: "#060504", accent: false, dim: false,
  },
  {
    time: "",
    text: "Elle est la première personne noire\nà recevoir un Oscar.",
    sub: "",
    bg: "#0e0a04", accent: true, dim: false,
  },
  {
    time: "22:50",
    text: "Elle pleure. Elle remercie l'Académie.",
    sub: "Son discours a été révisé et approuvé par le studio avant la cérémonie.",
    bg: "#060504", accent: false, dim: false,
  },
  {
    time: "23:30",
    text: "Elle repart seule.",
    sub: "Elle n'est pas invitée à l'after-party.",
    bg: "#040302", accent: false, dim: true,
  },
]

function OscarTimeline() {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!outer.current || !inner.current) return
    const totalBeats = BEATS.length
    // Height of sticky container = beats * 100vh so scroll maps to slides
    ScrollTrigger.create({
      trigger: outer.current,
      start: "top top",
      end: () => `+=${(totalBeats - 1) * window.innerHeight}`,
      pin: inner.current,
      scrub: 0.6,
      onUpdate: (self) => {
        const idx = Math.round(self.progress * (totalBeats - 1))
        setActive(Math.min(idx, totalBeats - 1))
        // Translate the strip
        if (inner.current) {
          const strip = inner.current.querySelector<HTMLElement>(".beat-strip")
          if (strip) {
            strip.style.transform = `translateX(-${self.progress * (totalBeats - 1) * 100}vw)`
          }
        }
      },
    })
  }, [])

  const beat = BEATS[active]

  return (
    // outer div sets the scroll height
    <div ref={outer} style={{ height: `${BEATS.length * 100}vh`, position: "relative" }}>
      {/* inner is pinned */}
      <div ref={inner} style={{
        height: "100vh", overflow: "hidden",
        background: beat.bg, transition: "background 0.6s ease",
      }}>
        {/* Header fixe */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
          padding: "2rem 4vw",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#b8914a",
            letterSpacing: "0.45em", textTransform: "uppercase" }}>
            27 février 1940 · Ambassador Hotel · Los Angeles
          </p>
          {/* Dots de progression */}
          <div style={{ display: "flex", gap: 8 }}>
            {BEATS.map((_, i) => (
              <div key={i} style={{
                width: i === active ? 20 : 6, height: 6, borderRadius: 3,
                background: i === active ? "#b8914a" : "#3d3830",
                transition: "all 0.4s ease",
              }} />
            ))}
          </div>
        </div>

        {/* Strip horizontale */}
        <div className="beat-strip" style={{
          display: "flex", width: `${BEATS.length * 100}vw`,
          height: "100%", transform: "translateX(0)",
          transition: "none", // géré par GSAP scrub
        }}>
          {BEATS.map((b, i) => (
            <div key={i} style={{
              width: "100vw", height: "100%", flexShrink: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: "8vh 12vw",
            }}>
              {/* Heure */}
              {b.time && (
                <p style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.9rem,2vw,1.4rem)",
                  color: "#7a7060", marginBottom: "3vh",
                  letterSpacing: "0.1em",
                }}>
                  {b.time}
                </p>
              )}

              {/* Texte principal */}
              <p style={{
                fontFamily: "Playfair Display, serif",
                fontSize: b.accent
                  ? "clamp(2rem,5vw,4.5rem)"
                  : "clamp(1.5rem,3.5vw,3rem)",
                fontWeight: b.accent ? 900 : 400,
                fontStyle: b.accent ? "normal" : "normal",
                lineHeight: 1.2,
                textAlign: "center",
                color: b.accent ? "#f0e8d5" : b.dim ? "#4a4540" : "#c8bfa8",
                maxWidth: 820,
                whiteSpace: "pre-line",
              }}>
                {b.text}
                {b.accent && (
                  <span style={{ display: "block", color: "#b8914a", marginTop: "0.5em" }}>
                    ·
                  </span>
                )}
              </p>

              {/* Sous-texte */}
              {b.sub && (
                <p style={{
                  fontFamily: "DM Mono, monospace",
                  fontSize: "clamp(0.75rem,1.2vw,1rem)",
                  color: "#7a7060", marginTop: "3vh",
                  textAlign: "center", maxWidth: 560,
                  lineHeight: 1.7, letterSpacing: "0.05em",
                }}>
                  {b.sub}
                </p>
              )}

              {/* Numéro discret */}
              <p style={{
                position: "absolute", bottom: "2rem", right: "4vw",
                fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#2a2620", letterSpacing: "0.2em",
              }}>
                {String(i + 1).padStart(2, "0")} / {String(BEATS.length).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>

        {/* Flèche scroll */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "DM Mono, monospace", fontSize: 8,
          color: "#3d3830", letterSpacing: "0.3em", textTransform: "uppercase",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 1, height: 32,
            background: "linear-gradient(to bottom, transparent, #3d3830)" }} />
          défiler
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ──────────────────────────────────────────────────────
export function HattiePage() {
  const container = useRef<HTMLDivElement>(null)
  const [headsVisible, setHeadsVisible] = useState(false)
  const [activeHead, setActiveHead] = useState<number | null>(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // §1 ENTRÉE — pellicule qui se déroule
      gsap.fromTo(".pellicule-line",
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.08, duration: 1.2, ease: "power3.out", delay: 0.3 }
      )
      gsap.fromTo(".entry-phrase",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.6 }
      )

      // Portrait qui émerge
      gsap.fromTo(".hero-portrait",
        { clipPath: "inset(0 0 100% 0)", opacity: 0.4 },
        { clipPath: "inset(0 0 0% 0)", opacity: 0.35,
          scrollTrigger: { trigger: ".hero-portrait", start: "top 80%", scrub: 1.5 } }
      )

      // §2 SYSTÈME — les 3 données apparaissent l'une après l'autre au scroll
      gsap.utils.toArray<HTMLElement>(".data-point").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 72%", toggleActions: "play none none reverse" },
            delay: i * 0.1 }
        )
      })

      // §2 — Grand nombre 309 au scroll
      ScrollTrigger.create({
        trigger: ".count-trigger",
        start: "top 70%",
        onEnter: () => {
          let c = 0
          const interval = setInterval(() => {
            c += 7; setCounter(c)
            if (c >= 309) { setCounter(309); clearInterval(interval) }
          }, 16)
        }
      })

      // §3 — GRILLE TÊTES
      ScrollTrigger.create({
        trigger: ".heads-trigger",
        start: "top 65%",
        onEnter: () => setHeadsVisible(true)
      })

      // §4 — La ligne de temps horizontale est gérée par OscarTimeline lui-même

      // §5 FRICTION — chiffre clé apparaît
      gsap.fromTo(".friction-zero",
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".friction-zero", start: "top 70%" } }
      )

      // §6 SORTIE — fondu
      gsap.fromTo(".exit-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: ".exit-content", start: "top 70%" } }
      )

    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={container} style={{ background: "#0a0806", color: "#f0e8d5", fontFamily: "Syne, sans-serif" }}>

      {/* ── §1 ENTRÉE ────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

        {/* Lignes pellicule latérales */}
        {["left", "right"].map(side => (
          <div key={side} style={{
            position: "absolute", top: 0, bottom: 0, [side]: 0, width: 32,
            display: "flex", flexDirection: "column", justifyContent: "space-around",
            padding: "12px 0", zIndex: 2,
          }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="pellicule-line" style={{
                width: 18, height: 12, background: "#1e1b16", borderRadius: 2,
                margin: "0 auto", transformOrigin: "left center", transform: "scaleX(0)",
              }} />
            ))}
          </div>
        ))}

        {/* Portrait en arrière-plan */}
        <div className="hero-portrait" style={{
          position: "absolute", inset: 0,
          clipPath: "inset(0 0 100% 0)", opacity: 0,
        }}>
          <Image src="/images/hattie-mcdaniel.jpg" alt="" fill
            style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(100%) contrast(1.2) brightness(0.5)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to top, #0a0806 30%, rgba(10,9,6,0.6) 70%, rgba(10,9,6,0.3))" }} />
        </div>

        {/* Numéro de figure discret */}
        <p className="entry-phrase" style={{
          opacity: 0, position: "relative", zIndex: 3,
          fontFamily: "DM Mono, monospace", fontSize: 9, letterSpacing: "0.45em",
          color: "#7a7060", textTransform: "uppercase", marginBottom: "2.5rem",
        }}>
          Figure I · 1895–1952 · Hattie McDaniel
        </p>

        {/* Phrase clé — plein écran */}
        <h1 className="entry-phrase" style={{
          opacity: 0, position: "relative", zIndex: 3,
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(2.2rem,5vw,4.5rem)",
          fontWeight: 900, lineHeight: 1.1,
          textAlign: "center", maxWidth: 900, padding: "0 2rem",
          color: "#f0e8d5",
        }}>
          Elle a remporté l'Oscar<br />
          <span style={{ color: "#b8914a", fontStyle: "italic" }}>
            qu'elle n'avait pas le droit de célébrer.
          </span>
        </h1>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3 }}>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(184,145,74,0.4))" }} />
          <span style={{ fontFamily: "DM Mono", fontSize: 8, letterSpacing: "0.35em",
            color: "rgba(184,145,74,0.4)", textTransform: "uppercase" }}>défiler</span>
        </div>
      </section>

      {/* ── §2 LE SYSTÈME — narration qui coule ─────────────────── */}
      {/* Pas de titre "§2". Juste le texte qui continue. */}
      <section style={{ padding: "15vh 0", maxWidth: 720, margin: "0 auto", paddingLeft: "6vw", paddingRight: "6vw" }}>

        {/* Texte narratif — style Pudding : large, respiré */}
        <p className="data-point" style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,2vw,1.5rem)",
          lineHeight: 1.85, color: "#c8bfa8", marginBottom: "6vh",
        }}>
          En 1930, le Code Hays interdit les relations romantiques interraciales à l'écran.
          En 1940, les rôles disponibles pour les actrices noires se résument à trois catégories.
        </p>

        {/* 3 catégories — pas de bloc, dans le flux */}
        {[
          { label: "Domestiques", sub: "nourrices, cuisinières, femmes de chambre" },
          { label: "Comic relief", sub: "figures de service dans un récit blanc" },
          { label: "Rien d'autre", sub: "littéralement" },
        ].map((item, i) => (
          <div key={i} className="data-point" style={{
            display: "flex", alignItems: "baseline", gap: "1.5rem",
            marginBottom: "3vh", paddingLeft: "1.5rem",
            borderLeft: `2px solid ${i === 2 ? "#3d3830" : "#b8914a"}`,
          }}>
            <span style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.1rem,2vw,1.5rem)",
              color: i === 2 ? "#7a7060" : "#f0e8d5", fontStyle: i === 2 ? "italic" : "normal" }}>
              {item.label}
            </span>
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: "#7a7060" }}>
              {item.sub}
            </span>
          </div>
        ))}

        <p className="data-point" style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,2vw,1.5rem)",
          lineHeight: 1.85, color: "#c8bfa8", marginTop: "6vh",
        }}>
          Dans ce système, Hattie McDaniel a tourné dans
        </p>

        {/* Grand nombre au scroll — dans le texte */}
        <div className="count-trigger" style={{ margin: "3vh 0", textAlign: "center" }}>
          <span style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(5rem,14vw,10rem)",
            fontWeight: 900, color: "#b8914a", lineHeight: 1, display: "block",
          }}>{counter}</span>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#7a7060",
            letterSpacing: "0.35em", textTransform: "uppercase" }}>
            films
          </span>
        </div>

        <p className="data-point" style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,2vw,1.5rem)",
          lineHeight: 1.85, color: "#7a7060",
          fontStyle: "italic",
        }}>
          Dans 87% d'entre eux, elle jouait une domestique.
        </p>
      </section>

      {/* ── §3 GRILLE DE TÊTES — Pudding middle-school ───────────── */}
      <section style={{ padding: "10vh 6vw", background: "#0e0c09" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Titre intégré au flux */}
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#b8914a",
            letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>
            309 films · chaque visage est un rôle
          </p>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
            {[
              { color: "#7a7060", label: "Domestique / Mammy — 87%" },
              { color: "#b8914a", label: "Comic Relief — 8%" },
              { color: "#6b4c3b", label: "Nourrice — 3%" },
              { color: "#3d3830", label: "Autre — 2%" },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7,
                fontFamily: "DM Mono, monospace", fontSize: 9, color: "#c8bfa8" }}>
                <div style={{ width: 9, height: 9, background: l.color, borderRadius: 2, flexShrink: 0 }} />
                {l.label}
              </div>
            ))}
          </div>

          {/* Grille */}
          <div className="heads-trigger" style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            {ROLES.map((role, i) => {
              const col = role === "maid" ? HEAD_COLORS[i % HEAD_COLORS.length]
                : role === "comic" ? "#8a7a52"
                : role === "nurse" ? "#5c3d2e"
                : "#3a3530"
              return (
                <div key={i} onMouseEnter={() => setActiveHead(i)} onMouseLeave={() => setActiveHead(null)}
                  style={{
                    opacity: headsVisible ? 1 : 0,
                    transform: headsVisible ? "scale(1)" : "scale(0.6)",
                    transition: `opacity 0.4s ${(i * 6) % 800}ms, transform 0.4s ${(i * 6) % 800}ms`,
                    position: "relative", cursor: "default",
                  }}>
                  <HeadSVG color={col} highlight={role === "maid"} size={26} />
                  {activeHead === i && (
                    <div style={{
                      position: "absolute", bottom: "calc(100% + 4px)", left: "50%",
                      transform: "translateX(-50%)", background: "#0e0c09",
                      border: "1px solid #3d3830", padding: "3px 7px", whiteSpace: "nowrap",
                      fontFamily: "DM Mono, monospace", fontSize: 8, color: "#c8bfa8",
                      letterSpacing: "0.1em", zIndex: 10, pointerEvents: "none",
                    }}>
                      {role === "maid" ? "Domestique" : role === "comic" ? "Comic relief" : role === "nurse" ? "Nourrice" : "Autre"}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#7a7060",
            marginTop: "1.5rem", letterSpacing: "0.1em" }}>
            Aucun rôle principal. Aucun personnage libre. Toutes des servantes.
          </p>
        </div>
      </section>

      {/* ── §3 CHOIX — citation voix off ─────────────────────────── */}
      {/* Pas de coupure. Le texte continue à couler. */}
      <section style={{ padding: "15vh 6vw", maxWidth: 820, margin: "0 auto" }}>
        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#c8bfa8", marginBottom: "6vh" }}>
          Face aux critiques de la NAACP qui l'accusait de trahir la communauté noire,
          Hattie McDaniel a répondu simplement.
        </p>

        <InlineQuote
          text="Je préfère jouer une femme de chambre que l'être."
          accentColor="#b8914a"
        />

        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#7a7060", marginTop: "6vh",
          fontStyle: "italic" }}>
          Dans un système entièrement fermé, la contrainte n'était pas individuelle.
          Elle était structurelle. Son choix n'en était pas un.
        </p>
      </section>

      {/* ── §4 NUIT DES OSCARS — timeline horizontale sticky ────── */}
      <OscarTimeline />

      {/* ── VIDÉO — dans le flux, pas dans un bloc ───────────────── */}
      {/* Après la timeline, avant la friction. Le texte introduit la vidéo. */}
      <section style={{ padding: "12vh 6vw", maxWidth: 820, margin: "0 auto" }}>
        <p style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#c8bfa8", marginBottom: "5vh",
        }}>
          Ce soir-là, Hattie McDaniel prononce un discours.
          Le studio l'a réécrit. Elle le sait.
          Elle le lit quand même.
        </p>

        {/* Embed YouTube — extrait de la cérémonie / documentaire */}
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%",
          background: "#0e0c09", border: "1px solid #2a2620" }}>
          <iframe
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            src="https://www.youtube.com/embed/6P0sA6ZTCAM?rel=0&modestbranding=1&color=white"
            title="Hattie McDaniel — Academy Award 1940 — documentary footage"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9, color: "#7a7060",
          letterSpacing: "0.2em", marginTop: "1rem", lineHeight: 1.7 }}>
          Extrait documentaire · Hattie McDaniel · Academy Award 1940
        </p>

        <p style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#7a7060", marginTop: "5vh", fontStyle: "italic",
        }}>
          Après cette nuit, rien ne change.
        </p>
      </section>

      {/* ── §5 FRICTION — texte + chiffre, pas de bloc ───────────── */}
      <section style={{ padding: "15vh 6vw", maxWidth: 720, margin: "0 auto" }}>

        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#c8bfa8", marginBottom: "6vh" }}>
          La NAACP condamnait ses choix. Elle les défendait.
          Ni l'une ni l'autre n'avait tort.
          Mais après son Oscar, le système n'a pas bougé.
        </p>

        {/* Chiffre intégré dans le texte */}
        <div style={{ margin: "8vh 0", textAlign: "center" }}>
          <span className="friction-zero" style={{ display: "block", opacity: 0,
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(4rem,12vw,9rem)",
            fontWeight: 900, color: "#8b2020", lineHeight: 1 }}>
            0
          </span>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
            color: "#7a7060", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            nouveaux types de rôles disponibles après son Oscar
          </span>
        </div>

        <p style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1rem,1.8vw,1.35rem)",
          lineHeight: 1.85, color: "#7a7060", fontStyle: "italic" }}>
          La reconnaissance peut être une forme d'enfermement.
        </p>
      </section>

      {/* ── §5 CITATION VOIX OFF — seconde ───────────────────────── */}
      <section style={{ padding: "10vh 6vw", background: "#060504",
        borderTop: "1px solid #1e1b16", borderBottom: "1px solid #1e1b16" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <InlineQuote
            text="Why should I complain about making seven thousand dollars a week playing a maid? If I didn't, I'd be making seven dollars a week being one."
            accentColor="#b8914a"
          />
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10, color: "#7a7060",
            letterSpacing: "0.2em", marginTop: "1.5rem" }}>
            — Hattie McDaniel, 1947
          </p>
        </div>
      </section>

      {/* ── §6 SORTIE — plein écran, simple, ouvert ──────────────── */}
      <section style={{ minHeight: "80vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "15vh 6vw", position: "relative" }}>

        {/* Image portrait fantôme */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
          <Image src="/images/hattie-mcdaniel.jpg" alt="" fill
            style={{ objectFit: "cover", objectPosition: "top",
              filter: "grayscale(100%) blur(4px)" }} />
        </div>

        <div className="exit-content" style={{ opacity: 0, position: "relative", zIndex: 2, textAlign: "center" }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.5rem,3vw,2.5rem)",
            fontStyle: "italic", color: "#f0e8d5", lineHeight: 1.4,
            maxWidth: 700, marginBottom: "10vh" }}>
            "La reconnaissance peut être une forme d'enfermement."
          </p>

          {/* Ponts vers d'autres figures — discrets, pas de boutons */}
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            color: "#7a7060", letterSpacing: "0.4em",
            textTransform: "uppercase", marginBottom: "3rem" }}>
            La même industrie. Le même mécanisme.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <Link href="/figure/dorothy-dandridge" style={{
              fontFamily: "Playfair Display, serif", fontSize: "1.1rem",
              color: "#c8bfa8", textDecoration: "none",
              borderBottom: "1px solid #3d3830", paddingBottom: "0.2rem",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "#b8914a"; (e.target as HTMLElement).style.borderColor = "#b8914a" }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = "#c8bfa8"; (e.target as HTMLElement).style.borderColor = "#3d3830" }}
            >
              Dorothy Dandridge · Dix ans plus tard, le même piège →
            </Link>
            <Link href="/figure/halle-berry" style={{
              fontFamily: "Playfair Display, serif", fontSize: "1.1rem",
              color: "#c8bfa8", textDecoration: "none",
              borderBottom: "1px solid #3d3830", paddingBottom: "0.2rem",
              transition: "color 0.3s, border-color 0.3s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "#b8914a"; (e.target as HTMLElement).style.borderColor = "#b8914a" }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = "#c8bfa8"; (e.target as HTMLElement).style.borderColor = "#3d3830" }}
            >
              Halle Berry · Soixante ans plus tard, une autre première fois →
            </Link>

            <Link href="/" style={{
              fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#7a7060", textDecoration: "none", marginTop: "2rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
            }}>
              ← Hub
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}