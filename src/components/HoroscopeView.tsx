import { useState, useEffect } from "react";
import { ArrowLeftIcon, StarIcon } from "./Icons";
import { Header } from "./Header";
import { ZODIAC_ICONS } from "./ZodiacIcons";

export function HoroscopeView({
  sign,
  isMySign,
  onExplore,
  onBackToMySign,
  onResetAccount
}: {
  sign: string;
  isMySign: boolean;
  onExplore: () => void;
  onBackToMySign: () => void;
  onResetAccount: () => void;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [birthDateString, setBirthDateString] = useState("");

  useEffect(() => {
    const m = localStorage.getItem("elora_birth_month");
    const d = localStorage.getItem("elora_birth_day");
    if (m && d) {
      const monthNames = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      setBirthDateString(`${monthNames[parseInt(m)]} ${d}`);
    }
    async function fetchHoroscope() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/v1/horoscope/all?sign=${sign}`);
        if (!res.ok) throw new Error("Cosmic alignment obscured. Please try again.");
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHoroscope();
  }, [sign]);

  const ZodiacIcon = ZODIAC_ICONS[sign.toLowerCase()];

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-8 duration-700 w-full max-w-5xl mx-auto pt-8 pb-24 px-6 md:px-12 lg:px-20 xl:px-24">

      <Header 
        mode="horoscope"
        sign={sign}
        birthDateString={birthDateString}
        isMySign={isMySign}
        onExplore={onExplore}
        onBackToMySign={onBackToMySign}
        onResetAccount={onResetAccount}
      />

      <div className="mb-12 flex flex-col md:flex-row items-center justify-center md:justify-start gap-6">
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8 w-full">
          <div className="p-6 bg-[var(--color-card)] rounded-[2rem] shadow-sm border border-[var(--color-card-border)] text-[var(--color-primary)]">
            {ZodiacIcon && <ZodiacIcon className="w-16 h-16 stroke-1" />}
          </div>
          <div>
            <h2 className="text-5xl md:text-6xl font-serif capitalize tracking-tight text-[var(--color-foreground)] mb-3">
              {sign}
            </h2>
            <p className="text-[var(--color-muted)] text-xl font-light">
              {isMySign ? "Your Cosmic Profile" : "Exploring Astrological Alignments"}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 w-full">
          <div className="md:col-span-2">
            <SkeletonSection />
          </div>
          <div className="flex max-md:overflow-hidden max-md:-mx-6 max-md:px-6 gap-4 md:gap-8 md:col-span-2 md:grid md:grid-cols-2">
            <div className="shrink-0 w-[85vw] sm:w-[60vw] md:w-auto">
              <SkeletonSection />
            </div>
            <div className="shrink-0 w-[85vw] sm:w-[60vw] md:w-auto">
              <SkeletonSection />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-3xl border border-red-100 dark:border-red-900/50 text-center shadow-sm">
          <p className="text-lg">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 w-full items-stretch">

          {/* Hero Content: Daily Insight (Spans full width) */}
          <div className="md:col-span-2 flex flex-col h-full">
            <Section title="Daily Insight" content={data?.daily?.data?.horoscope} isPrimary />
          </div>

          {/* Secondary Cards Wrapper for Mobile Swipe / Desktop Grid */}
          <div className="flex max-md:overflow-x-auto max-md:pb-6 max-md:pt-2 max-md:-mx-6 max-md:px-6 snap-x snap-mandatory gap-4 md:gap-8 md:col-span-2 md:grid md:grid-cols-2 hide-scroll">

            {/* Secondary Content: Weekly */}
            {data?.weekly?.data?.horoscope && (
              <div className="snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto h-full flex flex-col">
                <Section title="Weekly Horizon" content={data?.weekly?.data?.horoscope} />
              </div>
            )}

            {/* Secondary Content: Monthly */}
            <div className={`snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-auto h-full flex flex-col ${!data?.weekly?.data?.horoscope ? 'md:col-span-2' : ''}`}>
              <Section title="Monthly Deep Dive" content={data?.monthly?.data?.horoscope} />
            </div>

          </div>

        </div>
      )}

      {!loading && !error && (
        <div className="mt-16 pt-8 border-t border-[var(--color-card-border)] text-center w-full">
          <p className="text-[var(--color-muted)] font-serif text-lg italic opacity-80">
            "The stars incline us, they do not bind us."
          </p>
        </div>
      )}
    </div>
  );
}

function Section({ title, content, isPrimary = false }: { title: string; content?: string; isPrimary?: boolean }) {
  if (!content) return null;
  return (
    <div className={`p-7 sm:p-8 md:p-10 bg-[var(--color-card)] border transition-all duration-500 rounded-[2rem] md:rounded-[2.5rem] hover:shadow-lg flex flex-col h-full ${isPrimary ? 'border-[var(--color-primary)]/30 ring-1 ring-[var(--color-primary)]/10 shadow-md' : 'border-[var(--color-card-border)] shadow-sm hover:border-[var(--color-primary)]/30'}`}>
      <div className="flex items-center gap-3 mb-5 md:mb-6">
        {isPrimary && <StarIcon className="w-5 h-5 text-[var(--color-primary)] opacity-80" />}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[var(--color-foreground)] tracking-tight">{title}</h3>
      </div>
      <p className="text-[var(--color-muted)] leading-[1.7] md:leading-[1.8] text-[0.95rem] sm:text-[1.05rem] md:text-[1.1rem] font-light">{content}</p>
    </div>
  );
}

function SkeletonSection() {
  return (
    <div className="p-7 sm:p-8 md:p-10 bg-[var(--color-card)]/40 border border-[var(--color-card-border)]/60 rounded-[2rem] md:rounded-[2.5rem] shadow-sm flex flex-col h-full min-h-[220px] overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[var(--color-foreground)]/5 to-transparent"></div>
      <div className="flex items-center gap-3 mb-5 md:mb-6 opacity-60">
        <div className="w-5 h-5 rounded-full bg-[var(--color-muted)]/20 animate-pulse"></div>
        <div className="h-5 md:h-6 bg-[var(--color-muted)]/20 rounded-md w-1/3 max-w-[200px] animate-pulse"></div>
      </div>
      <div className="space-y-4 opacity-60 w-full">
        <div className="h-2.5 md:h-3 bg-[var(--color-muted)]/10 rounded-md w-full animate-pulse delay-75"></div>
        <div className="h-2.5 md:h-3 bg-[var(--color-muted)]/10 rounded-md w-[95%] animate-pulse delay-100"></div>
        <div className="h-2.5 md:h-3 bg-[var(--color-muted)]/10 rounded-md w-[85%] animate-pulse delay-150"></div>
        <div className="h-2.5 md:h-3 bg-[var(--color-muted)]/10 rounded-md w-[90%] animate-pulse delay-200"></div>
      </div>
    </div>
  );
}
