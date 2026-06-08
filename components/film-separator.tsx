"use client"

export function FilmSeparator({ text }: { text: string }) {
  return (
    <div className="flex items-center px-[6vw] gap-4 opacity-30">
      <div className="w-5 h-3 bg-gris-mid flex-shrink-0" />
      <div className="flex-1 h-px bg-gris-mid" />
      <span className="font-mono-custom text-[8px] tracking-[0.4em] text-gris-mid whitespace-nowrap uppercase">
        {text}
      </span>
      <div className="flex-1 h-px bg-gris-mid" />
      <div className="w-5 h-3 bg-gris-mid flex-shrink-0" />
    </div>
  )
}
