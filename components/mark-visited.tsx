"use client"

import { useEffect } from "react"
import { useVisited } from "@/components/visited-provider"

// Petit composant client : marque la figure courante comme visitée
// dès que sa page se charge, en s'appuyant sur le contexte VisitedProvider
// (qui persiste dans sessionStorage). C'est ce qui manquait pour que
// le compteur "X / 8 explorées" sur la page d'accueil fonctionne réellement.
export function MarkVisited({ id }: { id: string }) {
  const { markVisited } = useVisited()

  useEffect(() => {
    markVisited(id)
  }, [id, markVisited])

  return null
}