import { ZODIAC_ICONS } from "./ZodiacIcons";

export const ZODIAC_ELEMENTS: Record<string, "Fire" | "Earth" | "Air" | "Water"> = {
  aries: "Fire",
  leo: "Fire",
  sagittarius: "Fire",
  taurus: "Earth",
  virgo: "Earth",
  capricorn: "Earth",
  gemini: "Air",
  libra: "Air",
  aquarius: "Air",
  cancer: "Water",
  scorpio: "Water",
  pisces: "Water",
};

export function SignCard({ sign, onClick }: { sign: string; onClick: () => void }) {
  const Icon = ZODIAC_ICONS[sign.toLowerCase()];
  
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-4 sm:p-6 aspect-square gap-3 md:gap-4 rounded-3xl bg-[var(--color-card)] border border-[var(--color-card-border)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[var(--color-primary)]/10 hover:-translate-y-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
    >
      <div className="p-4 rounded-2xl bg-[var(--color-muted)]/5 text-[var(--color-primary)] opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/10 group-hover:opacity-100">
        {Icon ? <Icon className="w-8 h-8 stroke-[1.5]" /> : null}
      </div>
      <span className="capitalize font-medium text-[var(--color-foreground)] tracking-wide">
        {sign}
      </span>
    </button>
  );
}
