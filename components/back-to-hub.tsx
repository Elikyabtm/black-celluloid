"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

// Flèche de retour persistante — visible à tout moment du scroll
// sur les pages figure, pour revenir au hub sans avoir à scroller
// jusqu'en bas de la page.
export function BackToHub() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <Link
      href="/"
      style={{
        position: "fixed",
        top: "2rem",
        left: "2rem",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1rem",
        background: "rgba(10,9,6,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(61,56,48,0.6)",
        borderRadius: "2px",
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease, border-color 0.3s",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,145,74,0.6)"
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,56,48,0.6)"
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b8914a" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{
        fontFamily: "DM Mono, monospace",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#c8bfa8",
      }}>
        Archive
      </span>
    </Link>
  )
}
