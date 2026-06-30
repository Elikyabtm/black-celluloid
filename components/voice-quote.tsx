"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface VoiceQuoteProps {
  text: string
  author: string
  accentColor?: string
  // optionnel : URL d'un fichier audio mp3 dans /public/audio/
  audioSrc?: string
}

// Composant citation voix off — style The Pudding / The Middle Ages
// Le texte apparaît mot par mot, les mots clés s'illuminent
// Un bouton lecture utilise Web Speech API (ou audio file si fourni)
export function VoiceQuote({ text, author, accentColor = "#b8914a", audioSrc }: VoiceQuoteProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Split en mots, marquer les mots "forts" (capitalisés ou en majuscules)
  const words = text.split(" ")

  useEffect(() => {
    if (!ref.current) return
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 70%",
      onEnter: () => {
        setRevealed(true)
        gsap.fromTo(".vq-word",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.4, ease: "power2.out", delay: 0.1 }
        )
      }
    })
  }, [])

  const speak = () => {
    // Si fichier audio fourni, utiliser Audio API
    if (audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc)
        audioRef.current.onended = () => setIsPlaying(false)
      }
      if (isPlaying) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
      return
    }

    // Sinon Web Speech API
    if ("speechSynthesis" in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel()
        setIsPlaying(false)
        return
      }
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = "fr-FR"
      utter.rate = 0.85
      utter.pitch = 1.0
      // Chercher une voix féminine
      const voices = window.speechSynthesis.getVoices()
      const femVoice = voices.find(v => v.lang.startsWith("fr") && v.name.toLowerCase().includes("female"))
        || voices.find(v => v.lang.startsWith("fr"))
      if (femVoice) utter.voice = femVoice
      utter.onend = () => setIsPlaying(false)
      utteranceRef.current = utter
      window.speechSynthesis.speak(utter)
      setIsPlaying(true)
    }
  }

  return (
    <div ref={ref} className="relative py-16 px-4 md:px-16 max-w-4xl mx-auto">
      {/* Lignes décoratives latérales comme The Pudding */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block" style={{ width: 48, height: 1, background: `rgba(${accentColor === "#b8914a" ? "184,145,74" : "139,32,32"},0.3)` }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block" style={{ width: 48, height: 1, background: `rgba(${accentColor === "#b8914a" ? "184,145,74" : "139,32,32"},0.3)` }} />

      {/* Bouton lecture */}
      <div className="flex justify-end mb-6">
        <button
          onClick={speak}
          className="flex items-center gap-2 border px-3 py-2 transition-all duration-300"
          style={{
            borderColor: isPlaying ? accentColor : "#3d3830",
            color: isPlaying ? accentColor : "#7a7060",
            background: "transparent",
            fontFamily: "Syne",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
          aria-label={isPlaying ? "Arrêter" : "Écouter la citation"}
        >
          {/* Icône speaker */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </>
            ) : (
              <>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </>
            )}
          </svg>
          {isPlaying ? "stop" : "écouter"}
        </button>
      </div>

      {/* Texte — mot par mot */}
      <blockquote className="leading-relaxed" style={{ fontSize: "clamp(1.1rem,2.2vw,1.65rem)", fontFamily: "Playfair Display, Georgia, serif", fontStyle: "italic", lineHeight: 1.65 }}>
        {words.map((word, i) => {
          // Mots forts = en majuscules ou après "jamais", "toujours", "seule"
          const clean = word.replace(/[""".,;:!?]/g, "")
          const isStrong = clean === clean.toUpperCase() && clean.length > 1
          return (
            <span key={i} className="vq-word inline-block mr-[0.28em]"
              style={{
                opacity: 0,
                color: isStrong ? accentColor : "#f0e8d5",
                fontWeight: isStrong ? 700 : 400,
              }}>
              {word}
            </span>
          )
        })}
      </blockquote>

      {/* Auteur */}
      <cite className="block mt-6 not-italic font-mono text-xs tracking-[0.25em]"
        style={{ color: "#7a7060" }}>
        — {author}
      </cite>

      {/* Barre de progression si lecture en cours */}
      {isPlaying && (
        <div className="mt-4 h-px w-full overflow-hidden" style={{ background: "#2a2620" }}>
          <div className="h-full animate-[grow_3s_linear_infinite]" style={{ background: accentColor, animation: "grow 3s linear forwards", width: "100%", transformOrigin: "left", transform: "scaleX(0)" }} />
        </div>
      )}
    </div>
  )
}