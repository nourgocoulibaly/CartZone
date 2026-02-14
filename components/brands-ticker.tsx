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
    <section className="overflow-hidden border-y border-white/10 bg-[#0b1220] py-5">
      <div className="animate-slide-left flex w-max gap-5">
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold text-slate-300"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}
