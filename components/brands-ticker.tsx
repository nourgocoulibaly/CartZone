"use client"

const brands = [
  "PlayStation",
  "Xbox",
  "Nintendo",
  "Steam",
  "Spotify",
  "Netflix",
  "Disney+",
  "Apple",
  "Google Play",
  "Valorant",
  "Fortnite",
  "Amazon Prime",
  "TikTok",
  "Deezer",
  "IPTV Pro",
]

export function BrandsTicker() {
  return (
    <section className="overflow-hidden border-y border-border/50 bg-card/50 py-6">
      <div className="animate-slide-left flex w-max gap-12">
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="whitespace-nowrap text-lg font-semibold text-muted-foreground/40 transition-colors hover:text-muted-foreground"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}
