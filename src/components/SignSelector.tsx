import { ZODIAC_SIGNS } from "@/lib/types/horoscope";
import { SignCard } from "./SignCard";
import { Header } from "./Header";

export function SignSelector({ onSelect, onCancel }: { onSelect: (sign: string) => void; onCancel?: () => void }) {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-5xl mx-auto pt-8 pb-24 px-6 md:px-12 lg:px-20 xl:px-24">
      
      <Header mode="selector" onCancel={onCancel} />

      <div className="text-center mb-16 mt-4 space-y-4 w-full">
        <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-[var(--color-foreground)] leading-tight">
          Explore the <span className="text-[var(--color-primary)]">Zodiac</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-xl mx-auto font-light leading-relaxed">
          Unveil cosmic insights and spiritual guidance for any astrological sign.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full pb-16">
        {ZODIAC_SIGNS.map((sign) => (
          <SignCard key={sign} sign={sign} onClick={() => onSelect(sign)} />
        ))}
      </div>
    </div>
  );
}
