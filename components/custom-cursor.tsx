"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      gsap.set(cursor, { x: e.clientX - 4, y: e.clientY - 4 })
      gsap.to(ring, { x: e.clientX - 14, y: e.clientY - 14, duration: 0.4, ease: "power2.out" })
    }

    const onEnter = () => gsap.to(cursor, { scale: 3, duration: 0.2 })
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.2 })

    document.addEventListener("mousemove", onMove)
    document.querySelectorAll("a, button, .figure-card, [data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      document.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ width: 8, height: 8, borderRadius: "50%", background: "#b8914a" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(184,145,74,0.4)" }}
      />
    </>
  )
}
