"use client"

import Link from "next/link"

export function Navigation() {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-12 px-10 py-4 backdrop-blur-xl border border-gris-mid animate-fade-in hidden md:flex" style={{ background: "rgba(10,9,6,0.8)", animationDelay: "3s", opacity: 0 }}>
      <Link href="/" className="font-display text-[0.9rem] font-bold tracking-[0.05em] whitespace-nowrap hover:text-or transition-colors">
        Black <span className="text-or">Celluloid</span>
      </Link>
      
      <ul className="flex gap-8">
        <li>
          <a href="#statement" className="font-mono-custom text-[9px] tracking-[0.3em] text-muted-custom uppercase hover:text-or transition-colors">
            About
          </a>
        </li>
        <li>
          <a href="#figure-1" className="font-mono-custom text-[9px] tracking-[0.3em] text-muted-custom uppercase hover:text-or transition-colors">
            Figures
          </a>
        </li>
        <li>
          <a href="#hub" className="font-mono-custom text-[9px] tracking-[0.3em] text-muted-custom uppercase hover:text-or transition-colors">
            Archive
          </a>
        </li>
        <li>
          <a href="#transversal" className="font-mono-custom text-[9px] tracking-[0.3em] text-muted-custom uppercase hover:text-or transition-colors">
            Data
          </a>
        </li>
      </ul>
    </nav>
  )
}
