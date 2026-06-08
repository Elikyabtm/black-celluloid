"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface VisitedContextType {
  visitedFigures: string[]
  markVisited: (id: string) => void
}

const VisitedContext = createContext<VisitedContextType | null>(null)

export function VisitedProvider({ children }: { children: ReactNode }) {
  const [visitedFigures, setVisitedFigures] = useState<string[]>([])

  // Load from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("black-celluloid-visited")
    if (stored) {
      try {
        setVisitedFigures(JSON.parse(stored))
      } catch {
        // Ignore parsing errors
      }
    }
  }, [])

  const markVisited = (id: string) => {
    setVisitedFigures((prev) => {
      if (prev.includes(id)) return prev
      const updated = [...prev, id]
      sessionStorage.setItem("black-celluloid-visited", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <VisitedContext.Provider value={{ visitedFigures, markVisited }}>
      {children}
    </VisitedContext.Provider>
  )
}

export function useVisited() {
  const context = useContext(VisitedContext)
  if (!context) {
    throw new Error("useVisited must be used within a VisitedProvider")
  }
  return context
}
