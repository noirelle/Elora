import { useEffect, useState } from "react";
import { CompassIcon } from "./Icons";

interface WelcomeSplashProps {
  onComplete: () => void;
}

export function WelcomeSplash({ onComplete }: WelcomeSplashProps) {
  const [stage, setStage] = useState<"enter" | "reveal" | "exit">("enter");

  useEffect(() => {
    // Sequence: Enter -> Reveal -> Exit -> onComplete
    const revealTimer = setTimeout(() => setStage("reveal"), 500);
    const exitTimer = setTimeout(() => setStage("exit"), 3500);
    const completeTimer = setTimeout(onComplete, 4500);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--color-background)] transition-opacity duration-1000 ${stage === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      
      {/* Ambient background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Icon */}
        <div className={`mb-12 transition-all duration-1000 transform ${stage === "reveal" ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
            <div className="relative p-6 rounded-[2rem] bg-gradient-to-br from-[var(--color-card)] to-transparent border border-[var(--color-primary)]/20 shadow-2xl">
              <CompassIcon className="w-12 h-12 text-[var(--color-primary)] animate-[spin_10s_linear_infinite]" />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className={`text-center space-y-6 transition-all duration-1000 delay-300 ${stage === "reveal" ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h1 className="font-serif text-5xl md:text-7xl tracking-[0.2em] text-[var(--color-foreground)] lowercase font-light">
            elora<span className="text-[var(--color-primary)]">.</span>
          </h1>
          
          <div className="flex flex-col gap-2">
            <p className="text-[0.7rem] md:text-[0.8rem] uppercase tracking-[0.6em] font-black text-[var(--color-primary)] opacity-80 drop-shadow-sm">
              Stars Vision
            </p>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[var(--color-primary)]/40 to-transparent mx-auto"></div>
          </div>

          <div className="space-y-4 mt-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-1000 fill-mode-both">
            <h2 className="text-2xl md:text-4xl font-light text-[var(--color-foreground)] tracking-tight">
              Your Daily Horoscope
            </h2>
            <p className="max-w-[280px] md:max-w-md mx-auto text-sm md:text-base text-[var(--color-muted)] font-light leading-relaxed opacity-60 italic">
              "The universe whispers its secrets to those who dare to look up. Align your path with the rhythm of the stars."
            </p>
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-12 flex gap-4 opacity-20">
         {[...Array(3)].map((_, i) => (
           <div 
             key={i} 
             className="w-1 h-1 bg-[var(--color-primary)] rounded-full animate-bounce"
             style={{ animationDelay: `${i * 0.2}s` }}
           ></div>
         ))}
      </div>
    </div>
  );
}
