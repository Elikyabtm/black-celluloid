"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { CustomCursor } from "@/components/custom-cursor"

gsap.registerPlugin(ScrollTrigger)

const figures = [
  { id: "hattie-mcdaniel", name: "Hattie McDaniel", years: "1895-1952", theme: "Visibilité / Enfermement", image: "/images/hattie-mcdaniel.jpg", position: { top: "15%", left: "5%" }, size: "lg", rotation: -3 },
  { id: "dorothy-dandridge", name: "Dorothy Dandridge", years: "1922-1965", theme: "Icône construite pour être détruite", image: "/images/dorothy-dandridge.jpg", position: { top: "8%", left: "55%" }, size: "md", rotation: 2 },
  { id: "pam-grier", name: "Pam Grier", years: "1949-", theme: "Puissance subversive", image: "/images/pam-grier.jpg", position: { top: "35%", left: "35%" }, size: "xl", rotation: 0 },
  { id: "halle-berry", name: "Halle Berry", years: "1966-", theme: "La victoire symbolique", image: "/images/halle-berry.jpg", position: { top: "28%", left: "75%" }, size: "md", rotation: -2 },
  { id: "viola-davis", name: "Viola Davis", years: "1965-", theme: "Le droit à la complexité", image: "/images/viola-davis.jpg", position: { top: "55%", left: "8%" }, size: "md", rotation: 4 },
  { id: "gabourey-sidibe", name: "Gabourey Sidibe", years: "1983-", theme: "Visibilité explosive / abandon", image: "/images/gabourey-sidibe.jpg", position: { top: "60%", left: "60%" }, size: "sm", rotation: -5 },
  { id: "lupita-nyongo", name: "Lupita Nyong'o", years: "1983-", theme: "La diversité comme vitrine", image: "/images/lupita-nyongo.jpg", position: { top: "75%", left: "25%" }, size: "lg", rotation: 1 },
  { id: "halle-bailey", name: "Halle Bailey", years: "2000-", theme: "Le casting comme champ de bataille", image: "/images/halle-bailey.jpg", position: { top: "78%", left: "70%" }, size: "md", rotation: -1 },
]

const sizeClasses = {
  sm: "w-40 h-52 md:w-48 md:h-64",
  md: "w-48 h-64 md:w-56 md:h-72",
  lg: "w-56 h-72 md:w-64 md:h-80",
  xl: "w-64 h-80 md:w-80 md:h-96",
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [hoveredFigure, setHoveredFigure] = useState<string | null>(null)
  const [visitedFigures, setVisitedFigures] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("visitedFigures")
    if (stored) setVisitedFigures(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      )

      // Stagger figures appearance
      gsap.fromTo(".figure-card",
        { opacity: 0, scale: 0.8, y: 100 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5
        }
      )

      // Parallax on scroll
      gsap.utils.toArray<HTMLElement>(".figure-card").forEach((card, i) => {
        gsap.to(card, {
          y: (i % 2 === 0 ? -50 : 50),
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <CustomCursor />
      
      {/* Film grain overlay */}
      <div className="film-grain" />
      
      <main ref={containerRef} className="min-h-[200vh] bg-black relative overflow-hidden">
        {/* Intro Section */}
        <section className="h-screen flex flex-col items-center justify-center relative z-10 px-4">
          <div ref={titleRef} className="text-center">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-100 tracking-tight mb-6">
              Black Celluloid
            </h1>
            <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light">
              Comment une industrie peut-elle célébrer une femme noire d'une main, et continuer de l'enfermer de l'autre ?
            </p>
            <p className="text-stone-500 text-sm tracking-[0.3em] uppercase">
              Cinéma - Hollywood - Femmes noires
            </p>
            
            <div className="mt-12 flex flex-col items-center gap-2">
              <span className="text-stone-600 text-xs tracking-widest uppercase">Explorez</span>
              <div className="w-px h-16 bg-gradient-to-b from-stone-600 to-transparent animate-pulse" />
            </div>
          </div>
        </section>

        {/* Scattered Figures Section */}
        <section className="relative min-h-[150vh] py-20">
          {/* Background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="font-serif text-[20vw] text-stone-100 whitespace-nowrap">
              HOLLYWOOD
            </span>
          </div>

          {/* Progress indicator */}
          <div className="fixed top-8 right-8 z-50 text-stone-500 text-sm">
            <span className="text-stone-300">{visitedFigures.length}</span> / 8 explorées
          </div>

          {/* Figures scattered asymmetrically */}
          <div className="relative w-full max-w-7xl mx-auto px-4" style={{ height: "140vh" }}>
            {figures.map((figure, index) => (
              <Link
                key={figure.id}
                href={`/figure/${figure.id}`}
                className={`figure-card absolute group ${sizeClasses[figure.size as keyof typeof sizeClasses]}`}
                style={{
                  top: figure.position.top,
                  left: figure.position.left,
                  transform: `rotate(${figure.rotation}deg)`,
                  zIndex: hoveredFigure === figure.id ? 50 : 10 + index,
                }}
                onMouseEnter={() => setHoveredFigure(figure.id)}
                onMouseLeave={() => setHoveredFigure(null)}
              >
                {/* Film frame border */}
                <div className={`relative w-full h-full overflow-hidden transition-all duration-500 
                  ${hoveredFigure === figure.id ? "scale-105" : ""}
                  ${visitedFigures.includes(figure.id) ? "opacity-60" : "opacity-100"}
                `}>
                  {/* Perforations */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-black z-10 flex flex-col justify-around py-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2 h-3 bg-stone-900 rounded-sm mx-auto" />
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-4 bg-black z-10 flex flex-col justify-around py-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2 h-3 bg-stone-900 rounded-sm mx-auto" />
                    ))}
                  </div>

                  {/* Image */}
                  <div className="absolute inset-0 ml-4 mr-4">
                    <Image
                      src={figure.image}
                      alt={figure.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  </div>

                  {/* Info overlay */}
                  <div className={`absolute bottom-0 left-4 right-4 p-4 transition-all duration-500 
                    ${hoveredFigure === figure.id ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"}
                  `}>
                    <h3 className="font-serif text-lg md:text-xl text-stone-100 mb-1">{figure.name}</h3>
                    <p className="text-stone-400 text-xs">{figure.years}</p>
                    <p className={`text-stone-500 text-xs mt-2 transition-all duration-500 
                      ${hoveredFigure === figure.id ? "opacity-100" : "opacity-0"}
                    `}>
                      {figure.theme}
                    </p>
                  </div>

                  {/* Visited indicator */}
                  {visitedFigures.includes(figure.id) && (
                    <div className="absolute top-4 right-6 w-2 h-2 rounded-full bg-stone-500" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom statement */}
          <div className="absolute bottom-20 left-0 right-0 text-center px-4">
            <p className="text-stone-500 text-sm md:text-base max-w-xl mx-auto font-light italic">
              {"\"Chaque trajectoire est une impasse. Chaque victoire, une forme d'enfermement.\""}
            </p>
          </div>
        </section>

        {/* Film strip decoration */}
        <div className="fixed left-0 top-0 bottom-0 w-8 bg-black z-40 opacity-50 hidden lg:flex flex-col justify-around py-4 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-5 bg-stone-900 rounded-sm mx-auto" />
          ))}
        </div>
        <div className="fixed right-0 top-0 bottom-0 w-8 bg-black z-40 opacity-50 hidden lg:flex flex-col justify-around py-4 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-5 bg-stone-900 rounded-sm mx-auto" />
          ))}
        </div>
      </main>
    </>
  )
}
