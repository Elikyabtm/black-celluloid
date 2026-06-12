"use client"

import { useEffect } from "react"

// Force le scroll en haut à chaque ouverture de page figure.
// Next.js App Router ne le fait pas toujours automatiquement
// lors de navigations client-side depuis le hub.
export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])
  return null
}
