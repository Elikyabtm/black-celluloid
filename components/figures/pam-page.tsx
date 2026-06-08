"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

// PAM GRIER - Scroll horizontal puis bascule en vertical
// Une rupture dans la navigation, comme la Blaxploitation est une rupture dans l'histoire.
// L'utilisateur fait défiler horizontalement, comme une pellicule qui se déroule latéralement.
// Puis la navigation bascule et redevient verticale au moment où Hollywood récupère le mouvement.

export function PamPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const [scrollMode, setScrollMode] = useState<"horizontal" | "vertical">("horizontal")

  const archetypes = [
    { classic: "Mammy — soumise, maternelle", grier: "Coffy — indépendante, vengeresse" },
    { classic: "Jezebel — hypersexualisée, passive", grier: "Foxy Brown — puissante, active" },
    { classic: "Sapphire — agressive, comique", grier: "Sheba — stratège, centrale" },
    { classic: "Fonction : servir le récit blanc", grier: "Fonction : contrôler son propre destin" },
  ]

  const timeline = [
    { year: "1971", text: "Sweet Sweetback's Baadasssss Song", note: "Melvin Van Peebles autoproduit le premier film", color: "amber" },
    { year: "1972", text: "Hollywood récupère", note: "Les studios blancs sentent l'argent", color: "stone" },
    { year: "1973", text: "COFFY sort en salles", note: "Pam Grier devient une star", color: "amber" },
    { year: "1974", text: "FOXY BROWN", note: "Apogée du phénomène", color: "amber" },
    { year: "1975", text: "Coalition Against Blaxploitation", note: "La NAACP s'oppose au mouvement", color: "red" },
    { year: "1976", text: "Le mouvement s'effondre", note: "Hollywood passe à autre chose", color: "stone" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split screen entrance
      gsap.fromTo(".split-left",
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      gsap.fromTo(".split-right",
        { x: "100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
      )

      // HORIZONTAL SCROLL SECTION
      if (horizontalRef.current) {
        const horizontalSection = horizontalRef.current
        const horizontalContent = horizontalSection.querySelector(".horizontal-track") as HTMLElement
        
        if (horizontalContent) {
          const totalWidth = horizontalContent.scrollWidth - window.innerWidth

          gsap.to(horizontalContent, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: horizontalSection,
              start: "top top",
              end: () => `+=${totalWidth}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                // When we reach the end, switch to vertical mode
                if (self.progress > 0.95) {
                  setScrollMode("vertical")
                } else {
                  setScrollMode("horizontal")
                }
              }
            }
          })
        }
      }

      // Power words explosion in vertical section
      gsap.fromTo(".power-word",
        { scale: 0, rotation: () => (Math.random() - 0.5) * 20 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".power-section",
            start: "top 70%"
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-stone-950 overflow-x-hidden">
      {/* Scroll mode indicator */}
      <div className="fixed top-8 right-8 z-50 flex items-center gap-3 text-stone-600 text-xs">
        <span className={scrollMode === "horizontal" ? "text-amber-500" : ""}>←→</span>
        <div className="w-8 h-px bg-stone-700" />
        <span className={scrollMode === "vertical" ? "text-amber-500" : ""}>↑↓</span>
      </div>

      {/* Hero - Split screen 70s style */}
      <section className="h-screen relative flex overflow-hidden">
        <div className="split-left w-1/2 h-full bg-gradient-to-br from-amber-800 to-amber-900 relative flex items-center justify-end pr-8 md:pr-16">
          <div className="text-right">
            <p className="text-amber-300/60 text-xs tracking-[0.4em] uppercase mb-4">Figure III • 1949—</p>
            <h1 className="font-serif text-5xl md:text-8xl text-amber-100 tracking-tight">PAM</h1>
          </div>
        </div>
        <div className="split-right w-1/2 h-full bg-stone-900 relative flex items-center pl-8 md:pl-16">
          <div>
            <h1 className="font-serif text-5xl md:text-8xl text-stone-100 tracking-tight">GRIER</h1>
            <p className="text-stone-500 text-lg mt-4">Reine de la Blaxploitation</p>
          </div>
        </div>

        {/* Center portrait with film strip border */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative w-56 h-72 md:w-72 md:h-96">
            <div className="absolute -inset-3 border-4 border-amber-600" />
            <div className="absolute -inset-6 border border-amber-700/30" />
            <Image 
              src="/images/pam-grier.jpg" 
              alt="Pam Grier" 
              fill 
              className="object-cover"
              style={{ filter: "contrast(1.1) saturate(1.3)" }}
            />
          </div>
        </div>

        {/* Entry phrase */}
        <div className="absolute bottom-16 left-0 right-0 text-center z-20 px-4">
          <p className="text-stone-300 text-lg md:text-2xl font-light max-w-2xl mx-auto">
            Elle incarnait la femme noire qui prend le pouvoir.
          </p>
          <p className="text-stone-500 text-lg md:text-xl mt-2">
            Financée par des studios blancs.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-amber-600/60 text-xs">
          <span>scroll horizontal</span>
          <span>→</span>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SECTION - The Blaxploitation Timeline */}
      <section ref={horizontalRef} className="h-screen relative overflow-hidden">
        <div className="horizontal-track flex h-full">
          {/* Panel 1: Introduction */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16 bg-black">
            <div className="max-w-2xl text-center">
              <p className="text-amber-600 text-sm tracking-wider mb-6">§2 — La rupture</p>
              <h2 className="font-serif text-4xl md:text-6xl text-stone-100 mb-8">
                La Blaxploitation
              </h2>
              <p className="text-stone-400 text-xl leading-relaxed">
                Un mouvement qui a mis les Noirs au centre de l'écran.
                <br />
                <span className="text-stone-600">Produit, distribué et rentabilisé par Hollywood.</span>
              </p>
              <div className="mt-12 flex justify-center">
                <span className="text-amber-600/50 animate-pulse">→</span>
              </div>
            </div>
          </div>

          {/* Timeline panels */}
          {timeline.map((event, i) => (
            <div 
              key={i}
              className={`flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16
                ${event.color === "amber" ? "bg-amber-950/30" : 
                  event.color === "red" ? "bg-red-950/20" : "bg-stone-950"}`}
            >
              <div className="max-w-xl">
                <span className="font-mono text-6xl md:text-8xl text-amber-600/30 block mb-4">
                  {event.year}
                </span>
                <h3 className="text-2xl md:text-4xl text-stone-100 font-medium mb-4">
                  {event.text}
                </h3>
                <p className="text-stone-500 text-lg">
                  {event.note}
                </p>
              </div>
            </div>
          ))}

          {/* Final panel - The pivot */}
          <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-8 md:px-16 bg-gradient-to-r from-stone-950 to-stone-900">
            <div className="max-w-2xl text-center">
              <p className="text-stone-600 text-xl mb-8">Le mouvement horizontal s'arrête ici.</p>
              <h2 className="font-serif text-3xl md:text-5xl text-stone-100 mb-8">
                Hollywood reprend le contrôle.
              </h2>
              <p className="text-stone-500">
                La navigation redevient verticale. Conventionnelle.
              </p>
              <div className="mt-12 flex justify-center">
                <span className="text-stone-600 animate-bounce">↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERTICAL SECTION BEGINS - Back to conventional scroll */}
      
      {/* The Split - Classic archetypes vs Grier's characters */}
      <section className="py-40 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <p className="text-stone-600 text-sm tracking-wider mb-4 text-center">§3 — Le choix impossible</p>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-100 mb-16 text-center">
            Ce qu'ils attendaient vs. Ce qu'elle a joué
          </h2>

          <div className="space-y-4">
            {archetypes.map((item, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-2 items-stretch">
                <div className="p-6 md:p-8 bg-stone-900/50 text-stone-500 text-lg text-right flex items-center justify-end">
                  {item.classic}
                </div>
                <div className="p-6 md:p-8 bg-amber-900/20 border-l-4 border-amber-600 text-amber-100 text-lg font-medium flex items-center">
                  {item.grier}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Power Section */}
      <section className="power-section py-40 px-4 bg-gradient-to-b from-black to-amber-950/20">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-center mb-20">
            <p className="font-serif text-2xl md:text-4xl text-stone-300 italic mb-4">
              "Mes personnages n'avaient pas besoin d'être sauvées."
            </p>
            <p className="font-serif text-2xl md:text-4xl text-amber-400 italic">
              "Elles se sauvaient elles-mêmes."
            </p>
          </blockquote>

          {/* Power words */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["INDÉPENDANTE", "VENGERESSE", "PUISSANTE", "CENTRALE", "LIBRE"].map((word, i) => (
              <span 
                key={i}
                className="power-word text-2xl md:text-4xl font-bold text-amber-500"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The Friction - But who profits? */}
      <section className="py-40 px-4 bg-stone-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-stone-600 text-sm tracking-wider mb-12 text-center">§5 — La friction</p>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="p-10 bg-red-950/20 border border-red-900/30">
              <h3 className="text-red-400 text-xs uppercase tracking-wider mb-6">Coalition Against Blaxploitation</h3>
              <p className="text-stone-300 leading-relaxed">
                "Ces films reproduisent des stéréotypes, criminalisent la communauté noire, 
                et hypersexualisent les femmes. C'est de l'exploitation, pas de la libération."
              </p>
            </div>
            <div className="p-10 bg-amber-950/20 border border-amber-900/30">
              <h3 className="text-amber-400 text-xs uppercase tracking-wider mb-6">Grier et ses défenseurs</h3>
              <p className="text-stone-300 leading-relaxed">
                "Ces films ont donné une visibilité et une puissance inédites aux personnages noirs.
                Pour la première fois, nous étions au centre de l'histoire."
              </p>
            </div>
          </div>

          <div className="text-center border-t border-stone-800 pt-16">
            <p className="text-stone-500 text-lg mb-4">La question sans réponse :</p>
            <p className="text-stone-300 text-xl max-w-2xl mx-auto">
              Une résistance produite dans les conditions du système qu'elle conteste
              reste-t-elle une résistance ?
            </p>
          </div>

          <div className="mt-20 p-8 bg-stone-950/50 border border-stone-800">
            <h3 className="text-stone-500 text-xs uppercase tracking-wider mb-6 text-center">Qui a profité ?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                "Studios blancs financent",
                "Studios blancs distribuent", 
                "Profits vers Hollywood",
                "Contrôle de l'image"
              ].map((item, i) => (
                <p key={i} className="text-stone-400 text-sm">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exit */}
      <section className="py-40 px-4 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-stone-600 text-sm tracking-wider mb-12">§6 — La sortie</p>
          
          <p className="font-serif text-2xl md:text-4xl text-stone-200 mb-8 leading-relaxed">
            Après la fin de la Blaxploitation, le nombre de rôles centraux 
            pour les actrices noires dans le cinéma mainstream
          </p>
          <p className="font-serif text-3xl md:text-5xl text-amber-500 mb-20">
            s'effondre.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center mb-20">
            <Link 
              href="/figure/halle-berry" 
              className="group p-8 border border-stone-800 hover:border-amber-700/50 transition-all duration-500 text-left"
            >
              <p className="text-stone-600 text-xs uppercase tracking-wider mb-3">Continuer vers</p>
              <p className="text-stone-200 font-serif text-xl group-hover:text-stone-100">Halle Berry</p>
              <p className="text-stone-600 text-sm mt-3 italic">La puissance à l'écran. Le même plafond après.</p>
            </Link>
            <Link 
              href="/figure/halle-bailey" 
              className="group p-8 border border-stone-800 hover:border-amber-700/50 transition-all duration-500 text-left"
            >
              <p className="text-stone-600 text-xs uppercase tracking-wider mb-3">Ou vers</p>
              <p className="text-stone-200 font-serif text-xl group-hover:text-stone-100">Halle Bailey</p>
              <p className="text-stone-600 text-sm mt-3 italic">La visibilité a toujours un prix.</p>
            </Link>
          </div>

          <Link href="/" className="text-stone-600 hover:text-stone-400 text-sm transition-colors">
            ← Retour aux 8 figures
          </Link>
        </div>
      </section>
    </div>
  )
}
