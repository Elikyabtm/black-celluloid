"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// DOROTHY DANDRIDGE — Scroll vertical. Pas de ralentissement.
// La chute est rendue par l'opacité décroissante, la courbe qui plonge,
// et le silence visuel de la fin. Tout reste dans le noir.

// ─── CITATION VOIX OFF ─────────────────────────────────────────
function InlineQuote({ text, accentColor = "#b8914a" }: { text: string; accentColor?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current, start: "top 65%",
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
    <div ref={ref} style={{ position: "relative", paddingRight: "5rem" }}>
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
        fontSize: "clamp(1.3rem,2.5vw,2rem)", lineHeight: 1.6, color: "#f0e8d5",
      }}>
        {text.split(" ").map((word, i) => (
          <span key={i} style={{
            display: "inline-block", marginRight: "0.28em",
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.4s ${i * 0.05}s, transform 0.4s ${i * 0.05}s`,
          }}>{word}</span>
        ))}
      </blockquote>
    </div>
  )
}

// ─── COURBE DE CHUTE ────────────────────────────────────────────
// Canvas dessiné à la main au scroll — pas de librairie
const CAREER = [
  { year: 1937, y: 0.08, label: "Débuts" },
  { year: 1946, y: 0.18, label: "Petits rôles" },
  { year: 1951, y: 0.32, label: "Tarzan's Peril" },
  { year: 1953, y: 0.55, label: "Remains to Be Seen" },
  { year: 1954, y: 1.00, label: "Carmen Jones — Oscar" },
  { year: 1957, y: 0.62, label: "Island in the Sun" },
  { year: 1958, y: 0.45, label: "Tamango" },
  { year: 1959, y: 0.38, label: "Porgy and Bess" },
  { year: 1960, y: 0.12, label: "Les propositions s'arrêtent" },
  { year: 1962, y: 0.05, label: "Faillite" },
  { year: 1963, y: 0.03, label: "Cabarets" },
  { year: 1965, y: 0.00, label: "†  42 ans" },
]

function CareerCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top 70%", end: "bottom 30%",
      onUpdate: s => setProgress(s.progress),
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = canvas.width, H = canvas.height
    const PAD = { l: 60, r: 40, t: 30, b: 50 }
    const chartW = W - PAD.l - PAD.r
    const chartH = H - PAD.t - PAD.b

    ctx.clearRect(0, 0, W, H)

    const toX = (yr: number) => PAD.l + ((yr - 1937) / (1965 - 1937)) * chartW
    const toY = (v: number) => PAD.t + (1 - v) * chartH

    // Grid lines
    ctx.strokeStyle = "rgba(61,56,48,0.3)"
    ctx.lineWidth = 0.5
    ;[0, 0.25, 0.5, 0.75, 1].forEach(v => {
      ctx.beginPath()
      ctx.moveTo(PAD.l, toY(v))
      ctx.lineTo(W - PAD.r, toY(v))
      ctx.stroke()
    })

    // Year labels
    ctx.fillStyle = "#7a7060"
    ctx.font = "10px DM Mono"
    ctx.textAlign = "center"
    ;[1940, 1950, 1954, 1960, 1965].forEach(yr => {
      ctx.fillText(String(yr), toX(yr), H - PAD.b + 20)
      ctx.strokeStyle = "rgba(61,56,48,0.15)"
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(toX(yr), PAD.t)
      ctx.lineTo(toX(yr), H - PAD.b)
      ctx.stroke()
    })

    // Y labels
    ctx.textAlign = "right"
    ctx.fillStyle = "#7a7060"
    ctx.fillText("Apogée", PAD.l - 6, toY(1) + 4)
    ctx.fillText("Néant", PAD.l - 6, toY(0) + 4)

    // How many points to draw based on progress
    const totalPoints = CAREER.length
    const drawUpTo = Math.min(totalPoints - 1, Math.floor(progress * (totalPoints + 2)))

    if (drawUpTo < 1) return

    // Filled area under curve
    const grad = ctx.createLinearGradient(0, PAD.t, 0, H - PAD.b)
    grad.addColorStop(0, "rgba(184,145,74,0.18)")
    grad.addColorStop(1, "rgba(184,145,74,0.00)")

    ctx.beginPath()
    ctx.moveTo(toX(CAREER[0].year), toY(CAREER[0].y))
    for (let i = 1; i <= drawUpTo; i++) {
      const prev = CAREER[i - 1], curr = CAREER[i]
      const cpx = (toX(prev.year) + toX(curr.year)) / 2
      ctx.bezierCurveTo(cpx, toY(prev.y), cpx, toY(curr.y), toX(curr.year), toY(curr.y))
    }
    ctx.lineTo(toX(CAREER[Math.min(drawUpTo, totalPoints - 1)].year), H - PAD.b)
    ctx.lineTo(toX(CAREER[0].year), H - PAD.b)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.moveTo(toX(CAREER[0].year), toY(CAREER[0].y))
    for (let i = 1; i <= drawUpTo; i++) {
      const prev = CAREER[i - 1], curr = CAREER[i]
      const cpx = (toX(prev.year) + toX(curr.year)) / 2
      ctx.bezierCurveTo(cpx, toY(prev.y), cpx, toY(curr.y), toX(curr.year), toY(curr.y))
    }
    ctx.strokeStyle = drawUpTo >= 4 ? "#8b0000" : "#b8914a"
    ctx.lineWidth = 2
    ctx.stroke()

    // Dots
    for (let i = 0; i <= drawUpTo; i++) {
      const p = CAREER[i]
      const x = toX(p.year), y = toY(p.y)
      const isHovered = hoveredIdx === i
      const isPeak = p.year === 1954
      const isDead = p.year === 1965

      ctx.beginPath()
      ctx.arc(x, y, isHovered ? 7 : isPeak ? 6 : 4, 0, Math.PI * 2)
      ctx.fillStyle = isDead ? "#8b0000" : isPeak ? "#b8914a" : "#0a0806"
      ctx.fill()
      ctx.strokeStyle = isDead ? "#8b0000" : isPeak ? "#b8914a" : "#3d3830"
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Label on hover
      if (isHovered) {
        ctx.fillStyle = "#f0e8d5"
        ctx.font = "bold 11px DM Mono"
        ctx.textAlign = "center"
        ctx.fillText(`${p.year} — ${p.label}`, x, y - 14)
      }
    }
  }, [progress, hoveredIdx])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = (e.clientX - rect.left) * (canvas.width / rect.width)
    const W = canvas.width
    const PAD = { l: 60, r: 40 }
    const chartW = W - PAD.l - PAD.r
    const toX = (yr: number) => PAD.l + ((yr - 1937) / (1965 - 1937)) * chartW
    let closest = -1, minDist = 30
    CAREER.forEach((p, i) => {
      const dist = Math.abs(toX(p.year) - mx)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setHoveredIdx(closest)
  }

  return (
    <div ref={wrapRef}>
      <canvas
        ref={canvasRef}
        width={860} height={340}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
        style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
      />
    </div>
  )
}

// ─── PAGE ───────────────────────────────────────────────────────
export function DorothyPage() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // §1 — photo qui se craquelle (grain qui monte)
      gsap.fromTo(".dorothy-grain",
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: "power1.inOut", delay: 1 }
      )
      gsap.fromTo(".entry-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.5 }
      )

      // §2 — données brutes au scroll
      gsap.utils.toArray<HTMLElement>(".data-reveal").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none reverse" } }
        )
      })

      // §3 — colonnes tension
      gsap.fromTo(".col-left",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1,
          scrollTrigger: { trigger: ".col-left", start: "top 70%" } }
      )
      gsap.fromTo(".col-right",
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1,
          scrollTrigger: { trigger: ".col-right", start: "top 70%" } }
      )

      // §5 — friction phrase
      gsap.fromTo(".friction-phrase",
        { opacity: 0 },
        { opacity: 1, duration: 1.5,
          scrollTrigger: { trigger: ".friction-phrase", start: "top 70%" } }
      )

      // §6 — sortie
      gsap.fromTo(".exit-wrap",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: ".exit-wrap", start: "top 75%" } }
      )

    }, container)
    return () => ctx.revert()
  }, [])

  // Évènements chute
  const fallEvents = [
    { year: "1954", text: "Nomination à l'Oscar — Best Actress — pour Carmen Jones. Première femme noire dans cette catégorie. Les propositions de rôles affluent.", opacity: 1, accent: true },
    { year: "1957", text: "Island in the Sun. La scène interraciale suggérée provoque un tollé dans les États du Sud. Plusieurs salles refusent de diffuser le film. Les studios deviennent plus prudents.", opacity: 0.85, accent: false },
    { year: "1958", text: "Tamango — une coproduction franco-américaine. Elle l'accepte faute de meilleures propositions hollywoodiennes.", opacity: 0.7, accent: false },
    { year: "1959", text: "Porgy and Bess. Son dernier grand rôle dans une production hollywoodienne majeure.", opacity: 0.55, accent: false },
    { year: "1960", text: "Les propositions hollywoodiennes s'arrêtent presque entièrement. Elle tente de relancer sa carrière en Europe.", opacity: 0.38, accent: false },
    { year: "1962", text: "Elle déclare faillite. Elle perd sa maison.", opacity: 0.25, accent: false },
    { year: "1963", text: "Elle accepte des engagements dans des cabarets et des clubs pour survivre.", opacity: 0.15, accent: false },
    { year: "Sept. 8, 1965", text: "Elle meurt dans son appartement de West Hollywood. Elle a 42 ans. Elle est retrouvée seule.", opacity: 0.08, accent: false, death: true },
  ]

  return (
    <div ref={container} style={{ background: "#0a0806", color: "#f0e8d5", fontFamily: "Syne, sans-serif" }}>

      {/* ── §1 ENTRÉE ── */}
      <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

        {/* Photo Life Magazine 1954 */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/dorothy-dandridge.jpg" alt="Dorothy Dandridge" fill
            style={{ objectFit: "cover", objectPosition: "top center",
              filter: "grayscale(30%) contrast(1.1) brightness(0.55)" }} />
          <div style={{ position: "absolute", inset: 0,
            background: "linear-gradient(to top, #0a0806 25%, rgba(10,9,6,0.55) 65%, rgba(10,9,6,0.2))" }} />
        </div>

        {/* Grain qui monte — craquelle l'image */}
        <div className="dorothy-grain" style={{
          position: "absolute", inset: 0, opacity: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }} />

        <div className="entry-title" style={{ position: "relative", zIndex: 2,
          textAlign: "center", padding: "0 6vw", opacity: 0 }}>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            letterSpacing: "0.45em", color: "rgba(184,145,74,0.6)",
            textTransform: "uppercase", marginBottom: "2.5rem" }}>
            Figure II · 1922–1965
          </p>
          <h1 style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem,5vw,4.5rem)", fontWeight: 900,
            lineHeight: 1.1, color: "#f0e8d5", marginBottom: "2rem" }}>
            "Hollywood a fait d'elle une icône.
            <br />
            <span style={{ color: "rgba(184,145,74,0.7)", fontStyle: "italic" }}>
              Puis l'a laissée mourir."
            </span>
          </h1>
        </div>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%",
          transform: "translateX(-50%)", display: "flex",
          flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2 }}>
          <div style={{ width: 1, height: 48,
            background: "linear-gradient(to bottom, transparent, rgba(184,145,74,0.3))" }} />
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: 8,
            letterSpacing: "0.35em", color: "rgba(184,145,74,0.35)",
            textTransform: "uppercase" }}>défiler</span>
        </div>
      </section>

      {/* ── §2 LE SYSTÈME ── */}
      <section style={{ padding: "15vh 0", maxWidth: 720,
        margin: "0 auto", paddingLeft: "6vw", paddingRight: "6vw" }}>

        <p className="data-reveal" style={{ fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.1rem,2vw,1.5rem)", lineHeight: 1.85,
          color: "#c8bfa8", marginBottom: "8vh" }}>
          Dorothy Dandridge. 1922–1965.
        </p>

        {/* Donnée 1 */}
        <div className="data-reveal" style={{ marginBottom: "7vh" }}>
          <span style={{ fontFamily: "DM Mono, monospace", fontSize: "clamp(2.5rem,6vw,4.5rem)",
            fontWeight: 900, color: "#b8914a", display: "block", lineHeight: 1 }}>
            1954
          </span>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85,
            color: "#c8bfa8", marginTop: "1rem", maxWidth: 580 }}>
            Le Code Hays est encore en vigueur. Les relations romantiques interraciales
            sont interdites à l'écran. Tout rôle romantique central impliquant une actrice noire
            avec un acteur blanc est structurellement bloqué par la censure hollywoodienne.
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em" }}>
            Source : Motion Picture Production Code, 1930, révisé 1934. MPAA Archives.
          </p>
        </div>

        {/* Donnée 2 */}
        <div className="data-reveal" style={{ marginBottom: "7vh",
          paddingLeft: "1.5rem", borderLeft: "2px solid #2a2620" }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85, color: "#c8bfa8" }}>
            Brown v. Board of Education déclenche la déségrégation légale aux États-Unis.
            Hollywood ne suit pas. La même année, la nomination de Dandridge à l'Oscar
            est un événement isolé dans une industrie qui ne modifie pas ses structures de casting.
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em" }}>
            Source : Donald Bogle, Bright Boulevards, Bold Dreams, 2005.
          </p>
        </div>

        {/* Donnée 3 */}
        <div className="data-reveal" style={{ marginBottom: "7vh" }}>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85, color: "#7a7060",
            fontStyle: "italic" }}>
            Sur les productions hollywoodiennes à gros budget de cette décennie,
            les rôles romantiques centraux avec une actrice noire comme protagoniste principale
            se comptent sur les doigts d'une main. Dandridge est l'exception qui confirme la règle —
            et cette exception a un prix.
          </p>
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em" }}>
            Source : Carolyn M. West, Mammy, Jezebel, Sapphire and Their Homegirls, 2008.
          </p>
        </div>
      </section>

      {/* ── §3 L'ICÔNE CONDITIONNELLE ── */}
      <section style={{ padding: "10vh 6vw", background: "#0e0c09",
        borderTop: "1px solid #1e1b16", borderBottom: "1px solid #1e1b16" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          <InlineQuote
            text="Je ne pouvais pas être la fille d'à côté. Ils ne savaient pas quoi faire de moi."
            accentColor="#b8914a"
          />
          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
            color: "#7a7060", letterSpacing: "0.2em", marginTop: "1.2rem" }}>
            — Dorothy Dandridge
          </p>

          {/* Deux colonnes en tension */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "4vw", marginTop: "8vh" }}>

            {/* Gauche — ce que Hollywood a fait d'elle */}
            <div className="col-left" style={{ opacity: 0 }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#b8914a", letterSpacing: "0.35em",
                textTransform: "uppercase", marginBottom: "2rem" }}>
                Ce que Hollywood a fait d'elle
              </p>
              <p style={{ fontFamily: "Playfair Display, serif",
                fontSize: "clamp(0.9rem,1.5vw,1.1rem)", lineHeight: 1.85,
                color: "#c8bfa8", marginBottom: "2rem" }}>
                Première femme noire en couverture du magazine Life en 1954.
                Icône glamour internationale — comparée à Monroe et Ava Gardner.
                Mais les qualificatifs de la presse disent quelque chose :
                <span style={{ color: "#8b2020", fontStyle: "italic" }}> exotique,
                envoûtante, tropicale, sensuelle.</span> Une icône construite sur des termes
                qui exotisent son corps et le maintiennent à distance de la normalité.
              </p>

              {/* Filmographie — format liste sobre */}
              <div style={{ borderTop: "1px solid #2a2620", paddingTop: "1.5rem" }}>
                {[
                  { title: "Carmen Jones", year: "1954", role: "Femme fatale — meurt à la fin" },
                  { title: "Island in the Sun", year: "1957", role: "Relation interraciale suggérée" },
                  { title: "Tamango", year: "1958", role: "Esclave à bord d'un navire négrier" },
                  { title: "Porgy and Bess", year: "1959", role: "Figure tragique et sexualisée" },
                ].map((film, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #1e1b16",
                    padding: "0.9rem 0", display: "flex", justifyContent: "space-between",
                    alignItems: "baseline", gap: "1rem" }}>
                    <div>
                      <span style={{ fontFamily: "Playfair Display, serif",
                        fontSize: "1rem", color: "#f0e8d5", fontStyle: "italic" }}>
                        {film.title}
                      </span>
                      <span style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
                        color: "#7a7060", display: "block", marginTop: "0.2rem" }}>
                        {film.role}
                      </span>
                    </div>
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                      color: "#3d3830", flexShrink: 0 }}>{film.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite — ce qu'elle n'a jamais pu être */}
            <div className="col-right" style={{ opacity: 0 }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#7a7060", letterSpacing: "0.35em",
                textTransform: "uppercase", marginBottom: "2rem" }}>
                Ce qu'elle n'a jamais pu être
              </p>
              <p style={{ fontFamily: "Playfair Display, serif",
                fontSize: "clamp(0.9rem,1.5vw,1.1rem)", lineHeight: 1.85,
                color: "#7a7060", marginBottom: "2rem" }}>
                Dandridge voulait jouer des femmes ordinaires — des rôles romantiques classiques,
                des comédies, des drames psychologiques. Les archives de sa correspondance avec
                la 20th Century Fox montrent des refus répétés, systématiques, souvent justifiés
                par la peur de la réaction du public blanc du Sud des États-Unis.
              </p>
              <p style={{ fontFamily: "Playfair Display, serif",
                fontSize: "clamp(0.9rem,1.5vw,1.1rem)", lineHeight: 1.85,
                color: "#4a4540", fontStyle: "italic" }}>
                Elle n'a jamais joué une femme ordinaire dans une situation ordinaire.
                Chaque rôle la plaçait dans une position d'exception, d'exotisme ou de tragédie.
              </p>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#3d3830", marginTop: "1.5rem", letterSpacing: "0.1em",
                lineHeight: 1.7 }}>
                Source : Earl Mills, Dorothy Dandridge: A Portrait in Black, 1970.<br />
                Donald Bogle, Dorothy Dandridge: A Biography, 1997.
              </p>

              {/* Ce qu'elle voulait */}
              <div style={{ borderTop: "1px solid #1e1b16", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
                {[
                  "Rôles romantiques classiques",
                  "Comédies légères",
                  "Drames psychologiques",
                  "Femmes ordinaires",
                ].map((item, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #1e1b16",
                    padding: "0.9rem 0" }}>
                    <span style={{ fontFamily: "Playfair Display, serif",
                      fontSize: "1rem", color: "#3d3830", fontStyle: "italic" }}>
                      {item}
                    </span>
                    <span style={{ fontFamily: "DM Mono, monospace", fontSize: 8,
                      color: "#2a2620", display: "block", marginTop: "0.2rem" }}>
                      jamais obtenu
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── §4 LA CHUTE ── */}
      <section style={{ padding: "15vh 6vw" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>

          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "#b8914a", marginBottom: "1rem" }}>
            La chute — 1954 à 1965
          </p>
          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1rem,1.8vw,1.4rem)", lineHeight: 1.85,
            color: "#7a7060", marginBottom: "4vh", fontStyle: "italic" }}>
            Le nombre de propositions de rôles reçues par Dandridge entre 1954 et 1965.
          Passez la souris sur la courbe pour le détail de chaque année.
          </p>

          {/* Courbe canvas */}
          <CareerCurve />

          {/* Évènements au scroll — opacité décroissante */}
          <div style={{ marginTop: "8vh", maxWidth: 680, margin: "8vh auto 0" }}>
            {fallEvents.map((ev, i) => (
              <div key={i} style={{
                display: "flex", gap: "2rem", marginBottom: "4.5vh",
                alignItems: "flex-start",
                opacity: ev.opacity,
                borderLeft: ev.death ? "2px solid #8b0000"
                  : ev.accent ? "2px solid rgba(184,145,74,0.5)"
                  : "2px solid transparent",
                paddingLeft: "1.5rem",
              }}>
                <span style={{ fontFamily: "DM Mono, monospace",
                  fontSize: ev.death ? 11 : 10,
                  color: ev.death ? "#8b0000" : ev.accent ? "#b8914a" : "#7a7060",
                  flexShrink: 0, width: 90, paddingTop: "0.2rem" }}>
                  {ev.year}
                </span>
                <p style={{ fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(0.95rem,1.6vw,1.2rem)", lineHeight: 1.7,
                  color: ev.death ? "#8b0000"
                    : ev.accent ? "#f0e8d5"
                    : "#c8bfa8",
                  margin: 0,
                  fontWeight: ev.accent ? 600 : 400 }}>
                  {ev.text}
                </p>
              </div>
            ))}

            {/* Donnée seule après */}
            <div style={{ marginTop: "6vh", padding: "2.5rem",
              borderTop: "1px solid #1e1b16" }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
                color: "#7a7060", lineHeight: 1.9, letterSpacing: "0.05em" }}>
                Entre 1960 et 1965, Dorothy Dandridge ne tourne aucun film hollywoodien majeur.
              </p>
              <p style={{ fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 900,
                color: "#1e1b16", lineHeight: 1, margin: "0.5rem 0" }}>
                5 ans
              </p>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#3d3830", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                de silence · après la première nomination à l'Oscar
              </p>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
                color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em" }}>
                Source : Donald Bogle, Dorothy Dandridge: A Biography, 1997.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── §5 LA FRICTION ── */}
      <section style={{ padding: "15vh 6vw", background: "#0e0c09",
        borderTop: "1px solid #1e1b16" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>

          <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "#7a7060", marginBottom: "6vh" }}>
            La friction
          </p>

          {/* Voix 1 */}
          <div style={{ marginBottom: "6vh" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#b8914a", marginBottom: "1.5rem" }}>
              La réhabilitation posthume
            </p>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85,
              color: "#c8bfa8" }}>
              Après sa mort, Hollywood réhabilite Dorothy Dandridge. En 1999,
              Halle Berry l'incarne dans le téléfilm{" "}
              <span style={{ fontStyle: "italic" }}>Introducing Dorothy Dandridge</span>{" "}
              et remporte un Golden Globe. L'industrie qui n'a pas su quoi faire d'elle
              de son vivant écrit le récit de sa vie après sa mort.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em",
              lineHeight: 1.7 }}>
              Source : Kimberlé Crenshaw, Mapping the Margins, 1991.<br />
              Patricia White, Uninvited, 1999.
            </p>
          </div>

          {/* Donnée centrale */}
          <div style={{ padding: "3rem 0", borderTop: "1px solid #1e1b16",
            borderBottom: "1px solid #1e1b16", margin: "4vh 0", textAlign: "center" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 10,
              color: "#7a7060", lineHeight: 1.9, marginBottom: "0.5rem" }}>
              Actrices noires en rôles romantiques centraux · productions majeures · 1955–1975
            </p>
            <span style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(4rem,12vw,9rem)", fontWeight: 900,
              color: "#1e1b16", display: "block", lineHeight: 1 }}>
              {"< 5"}
            </span>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", letterSpacing: "0.2em", textTransform: "uppercase",
              marginTop: "0.5rem" }}>
              La nomination de Dandridge n'a pas ouvert une porte.
              Elle a illuminé une impasse.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em",
              lineHeight: 1.7 }}>
              Source : USC Annenberg Inclusion Initiative.<br />
              Donald Bogle, Toms, Coons, Mulattoes, Mammies, and Bucks, 1973.
            </p>
          </div>

          {/* Voix 2 */}
          <div style={{ marginBottom: "6vh" }}>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#7a7060", marginBottom: "1.5rem" }}>
              Ce que sa trajectoire dit sur les structures
            </p>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1rem,1.7vw,1.3rem)", lineHeight: 1.85,
              color: "#7a7060" }}>
              L'industrie hollywoodienne produit des figures d'exception — des premières fois —
              sans modifier les structures qui rendent ces exceptions nécessaires.
              Dandridge est la première nominée. Elle reste longtemps la seule.
              L'exception ne devient pas la règle.
            </p>
            <p style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#3d3830", marginTop: "0.75rem", letterSpacing: "0.1em" }}>
              Source : Melissa V. Harris-Perry, Sister Citizen, 2011.
            </p>
          </div>

          {/* Phrase de friction */}
          <div className="friction-phrase" style={{ opacity: 0, marginTop: "6vh" }}>
            <p style={{ fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.3rem,2.5vw,2rem)", fontStyle: "italic",
              color: "#8b0000", lineHeight: 1.4 }}>
              "L'industrie qui l'a détruite a écrit le récit de sa vie."
            </p>
          </div>
        </div>
      </section>

      {/* ── §6 LA SORTIE ── */}
      {/* Fondu sur noir total. Silence. */}
      <section style={{ minHeight: "90vh", background: "#040302",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "15vh 6vw", position: "relative", overflow: "hidden" }}>

        {/* Portrait fantôme qui s'efface */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04,
          pointerEvents: "none" }}>
          <Image src="/images/dorothy-dandridge.jpg" alt="" fill
            style={{ objectFit: "cover", objectPosition: "top",
              filter: "grayscale(100%) blur(8px)" }} />
        </div>

        <div className="exit-wrap" style={{ opacity: 0, position: "relative",
          zIndex: 2, textAlign: "center", maxWidth: 720 }}>

          <p style={{ fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.5rem,3vw,2.5rem)", fontStyle: "italic",
            color: "#c8bfa8", lineHeight: 1.35, marginBottom: "8vh" }}>
            "Le système ne détruit pas celles qu'il ignore.
            <br />
            <span style={{ color: "rgba(240,232,213,0.4)" }}>
              Il détruit celles qu'il a choisies."
            </span>
          </p>

          <div style={{ width: 40, height: 1,
            background: "rgba(184,145,74,0.2)", margin: "0 auto 6vh" }} />

          <div style={{ display: "flex", flexDirection: "column",
            gap: "1.2rem", alignItems: "center" }}>
            {[
              { href: "/figure/hattie-mcdaniel", label: "Hattie McDaniel",
                sub: "Récompensée pour s'être soumise. Elle aussi a payé le prix." },
              { href: "/figure/gabourey-sidibe", label: "Gabourey Sidibe",
                sub: "Célébrée. Puis abandonnée. Le même mécanisme, soixante ans plus tard." },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{
                fontFamily: "Playfair Display, serif", fontSize: "1rem",
                color: "#7a7060", textDecoration: "none",
                borderBottom: "1px solid #2a2620", paddingBottom: "0.2rem",
                transition: "color 0.3s, border-color 0.3s",
                textAlign: "center",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#b8914a"
                ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(184,145,74,0.4)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#7a7060"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#2a2620"
              }}
              >
                {link.label} · <span style={{ fontStyle: "italic", fontSize: "0.9rem" }}>{link.sub}</span> →
              </Link>
            ))}
            <Link href="/" style={{ fontFamily: "DM Mono, monospace", fontSize: 9,
              color: "#2a2620", textDecoration: "none", marginTop: "3rem",
              letterSpacing: "0.3em", textTransform: "uppercase",
              transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7a7060"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#2a2620"}
            >
              ← Hub
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}