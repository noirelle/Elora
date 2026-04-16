"use client";
import { useState, useEffect } from "react";

import { BirthdaySelector } from "@/components/BirthdaySelector";
import { HoroscopeView } from "@/components/HoroscopeView";
import { SignSelector } from "@/components/SignSelector";

export default function EloraApp() {
  const [mySign, setMySign] = useState<string | null>(null);
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [isExploring, setIsExploring] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedSign = localStorage.getItem("elora_sign");
    if (savedSign) {
      setMySign(savedSign);
      setActiveSign(savedSign);
    }
  }, []);

  const handleResetAuth = () => {
    localStorage.removeItem("elora_sign");
    localStorage.removeItem("elora_birth_month");
    localStorage.removeItem("elora_birth_day");
    setMySign(null);
    setActiveSign(null);
    setIsExploring(false);
  };

  const handleExplore = () => {
    setIsExploring(true);
  };

  const handleSelectExplore = (sign: string) => {
    setActiveSign(sign);
    setIsExploring(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToMySign = () => {
    setActiveSign(mySign);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] flex flex-col font-sans transition-colors duration-500 selection:bg-[var(--color-primary)]/20 selection:text-[var(--color-primary)] relative overflow-hidden">
      
      {/* Premium Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden flex items-center justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--color-primary)]/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#a855f7]/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      </div>

      <main className="flex-1 w-full flex flex-col relative z-10 pb-24 md:pb-12">
          {!mySign ? (
            <BirthdaySelector onSignDetermined={(sign) => {
              setMySign(sign);
              setActiveSign(sign);
            }} />
          ) : isExploring ? (
            <SignSelector 
              onSelect={handleSelectExplore} 
              onCancel={() => setIsExploring(false)} 
            />
          ) : (
             <HoroscopeView 
               sign={activeSign!} 
               isMySign={activeSign === mySign}
               onExplore={handleExplore}
               onBackToMySign={handleBackToMySign}
               onResetAccount={handleResetAuth}
             />
          )}
      </main>
    </div>
  );
}
