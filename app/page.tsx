"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import { CustomCursor } from "@/components/custom-cursor"
import { useVisited } from "@/components/visited-provider"

gsap.registerPlugin(ScrollTrigger)

const figures = [
  { id: "hattie-mcdaniel", name: "Hattie McDaniel", years: "1895-1952", theme: "Visibilité / Enfermement", image: "/images/hattie-mcdaniel.jpg" },
  { id: "dorothy-dandridge", name: "Dorothy Dandridge", years: "1922-1965", theme: "Icône construite pour être détruite", image: "/images/dorothy-dandridge.jpg" },
  { id: "pam-grier", name: "Pam Grier", years: "1949-", theme: "Puissance subversive", image: "/images/pam-grier.jpg" },
  { id: "halle-berry", name: "Halle Berry", years: "1966-", theme: "La victoire symbolique", image: "/images/halle-berry.jpg" },
  { id: "viola-davis", name: "Viola Davis", years: "1965-", theme: "Le droit à la complexité", image: "/images/viola-davis.jpg" },
  { id: "gabourey-sidibe", name: "Gabourey Sidibe", years: "1983-", theme: "Visibilité explosive / abandon", image: "/images/gabourey-sidibe.jpg" },
  { id: "lupita-nyongo", name: "Lupita Nyong'o", years: "1983-", theme: "La diversité comme vitrine", image: "/images/lupita-nyongo.jpg" },
  { id: "halle-bailey", name: "Halle Bailey", years: "2000-", theme: "Le casting comme champ de bataille", image: "/images/halle-bailey.jpg" },
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [hoveredFigure, setHoveredFigure] = useState<string | null>(null)
  const { visitedFigures } = useVisited()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      )

      // Stagger figures appearance
      gsap.fromTo(".figure-card",
        { opacity: 0, scale: 0.8, y: 60 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        }
      )
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
              BLACK CELLULOID
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

        {/* Figures Grid Section */}
        <section className="relative py-20">
          {/* Background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
            <span className="font-serif text-[20vw] text-stone-100 whitespace-nowrap">
              HOLLYWOOD
            </span>
          </div>

          {/* Progress indicator */}
          <div className="fixed top-8 right-8 z-50 text-stone-500 text-sm">
            <span className="text-stone-300">{visitedFigures.length}</span> / 8 explorées
          </div>

          {/* Figures grid */}
          <div className="relative w-full max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {figures.map((figure, index) => (
                <Link
                  key={figure.id}
                  href={`/figure/${figure.id}`}
                  className="figure-card group block"
                  onMouseEnter={() => setHoveredFigure(figure.id)}
                  onMouseLeave={() => setHoveredFigure(null)}
                >
                  {/* Film frame border */}
                  <div className={`relative w-full aspect-[3/4] overflow-hidden transition-all duration-500 
                    ${hoveredFigure === figure.id ? "scale-[1.03]" : ""}
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
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
                      <div className="absolute top-4 right-6 w-2 h-2 rounded-full bg-stone-500 z-20" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom statement */}
          <div className="mt-20 text-center px-4">
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