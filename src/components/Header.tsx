import { useState, useEffect } from "react";
import { CompassIcon, ArrowLeftIcon } from "./Icons";
import { IconGridDots, IconCalendarEvent, IconX, IconChevronRight } from "@tabler/icons-react";
import { ZODIAC_ICONS } from "./ZodiacIcons";

interface HeaderProps {
  mode?: "horoscope" | "selector" | "birthday";
  sign?: string;
  birthDateString?: string;
  isMySign?: boolean;
  onExplore?: () => void;
  onBackToMySign?: () => void;
  onResetAccount?: () => void;
  onCancel?: () => void;
}

export function Header({ 
  mode = "horoscope",
  sign, 
  birthDateString, 
  isMySign, 
  onExplore, 
  onBackToMySign, 
  onResetAccount,
  onCancel
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Sidebar state is handled cleanly without body-scroll locking 
  // to avoid the 'scrollbar jump' flicker on desktop.

  const ZodiacIcon = sign ? ZODIAC_ICONS[sign.toLowerCase()] : null;

  return (
    <div className="flex items-center justify-between w-full mb-10 md:mb-16 relative z-[60]">
      {/* Brand Section */}
      <div 
        className="flex items-center gap-2.5 group cursor-pointer"
        onClick={onCancel || (mode === "horoscope" && !isMySign ? onBackToMySign : undefined)}
      >
        <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent border border-[var(--color-primary)]/10 transition-transform group-hover:scale-110 group-hover:rotate-12">
          <CompassIcon className="w-5 h-5 text-[var(--color-primary)]" />
        </div>
        <div className="flex flex-col -gap-1">
          <span className="font-serif text-2xl tracking-widest text-[var(--color-foreground)] lowercase leading-none">elora.</span>
          {isMySign && mode === "horoscope" && (
            <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold text-[var(--color-primary)] opacity-60 ml-0.5">Your Cosmos</span>
          )}
        </div>
      </div>
      
      {/* Interactive Actions */}
      <div className="flex items-center gap-4">
        {mode === "horoscope" && (
          <>
            {isMySign ? (
              <button 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-3 px-6 py-3 rounded-full ring-1 ring-inset ring-[var(--color-card-border)] bg-[var(--color-card)] backdrop-blur-sm shadow-sm hover:shadow-xl hover:ring-[var(--color-primary)]/30 hover:-translate-y-0.5 transition-all group active:scale-95 overflow-hidden bg-clip-padding"
              >
                <div className="relative">
                  <IconCalendarEvent className="w-4 h-4 text-[var(--color-primary)]" stroke={2.5} />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-primary)] rounded-full border-2 border-[var(--color-background)] animate-pulse"></div>
                </div>
                <span className="text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-foreground)] opacity-90">
                  {birthDateString || "Profile"}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-[var(--color-card)]/40 p-1.5 rounded-full border border-[var(--color-card-border)] backdrop-blur-sm">
                <button 
                  onClick={onBackToMySign}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl hover:brightness-110 transition-all group active:scale-95"
                >
                  <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-[0.65rem] sm:text-xs uppercase tracking-[0.15em] font-bold mt-[1px]">Back home</span>
                </button>
                <button 
                  onClick={onExplore}
                  title="Browse Signs"
                  className="p-2 rounded-full text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-sm active:scale-95"
                >
                  <IconGridDots className="w-5 h-5" stroke={2} />
                </button>
              </div>
            )}
          </>
        )}

        {mode === "selector" && (
          <button 
            onClick={onCancel}
            className="group flex items-center gap-2 text-[0.65rem] sm:text-xs uppercase tracking-widest font-bold text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-all hover:translate-x-[-4px] active:scale-95 px-6 py-3 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card)]/60 shadow-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 text-[var(--color-primary)] transition-transform group-hover:-translate-x-1" />
            <span className="mt-[1px]">Return Home</span>
          </button>
        )}
      </div>

      {/* --- PREMIUM SIDEBAR DRAWER --- */}
      {isOpen && mode === "horoscope" && isMySign && (
        <>
          {/* Backdrop (Fully transparent, only handles click-to-close) */}
          <div 
            className="fixed inset-0 z-[100] bg-transparent" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* High-End Sidebar Drawer (Floating Borderless Card on Desktop) */}
          <div className="fixed top-0 right-0 h-full w-full sm:top-4 sm:right-4 sm:h-[calc(100vh-2rem)] sm:w-[380px] bg-[var(--color-background)]/95 backdrop-blur-3xl shadow-[-20px_0_80px_rgba(0,0,0,0.1)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.2)] z-[101] p-0 flex flex-col sm:rounded-[3rem] animate-in fade-in slide-in-from-right sm:zoom-in-95 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform origin-right" style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}>
            
            {/* Sidebar Top Nav */}
            <div className="p-8 pb-6 flex justify-between items-center bg-transparent">
               <div className="flex items-center gap-3">
                 <div className="p-2.5 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/10">
                    <CompassIcon className="w-5 h-5 text-[var(--color-primary)]" />
                 </div>
                 <span className="font-serif text-2xl tracking-[0.2em] lowercase font-light text-[var(--color-foreground)]">elora.</span>
               </div>
               <button 
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-full hover:bg-slate-500/10 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-all active:scale-90 border border-transparent hover:border-[var(--color-card-border)]"
               >
                 <IconX className="w-6 h-6" stroke={1.5} />
               </button>
            </div>

            {/* Sidebar Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-12 hide-scrollbar">
              
              {/* Profile Context Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <span className="text-[0.6rem] uppercase tracking-[0.4em] font-black text-[var(--color-muted)] opacity-40">Your Root</span>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-[var(--color-card)] to-[var(--color-card)] rounded-[2rem] shadow-md relative overflow-hidden group transition-all">
                   {/* Background Icon Watermark */}
                   <div className="absolute -bottom-4 -right-4 p-4 text-[var(--color-primary)] opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 -rotate-12 group-hover:rotate-0 scale-125 group-hover:scale-[1.5]">
                     {ZodiacIcon && <ZodiacIcon className="w-32 h-32" stroke={1} />}
                   </div>
                   
                   <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="p-3 rounded-xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 text-[var(--color-primary)]">
                            {ZodiacIcon && <ZodiacIcon className="w-8 h-8" stroke={1.5} />}
                         </div>
                         <div className="flex flex-col">
                           <span className="text-2xl font-serif text-[var(--color-foreground)] capitalize tracking-tight leading-tight">{sign}</span>
                           <span className="text-[0.65rem] font-bold text-[var(--color-primary)] opacity-80 uppercase tracking-[0.2em] mt-0.5">{birthDateString}</span>
                         </div>
                      </div>
                      
                      <p className="text-xs text-[var(--color-muted)] font-light leading-relaxed opacity-80">
                        Synthesizing celestial alignments for {sign}.
                      </p>
                   </div>
                </div>
              </div>

              {/* Action Ecosystem Section */}
              <div className="space-y-3">
                <span className="text-[0.6rem] uppercase tracking-[0.4em] font-black text-[var(--color-muted)] opacity-40 px-1">Actions</span>
                
                <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => { setIsOpen(false); onExplore && onExplore(); }}
                      className="w-full flex items-center justify-between p-6 rounded-3xl bg-[var(--color-card)]/80 hover:bg-[var(--color-primary)]/[0.04] shadow-md transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3.5 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-all group-hover:bg-[var(--color-primary)] group-hover:text-white shadow-md">
                          <IconGridDots className="w-6 h-6" stroke={2} />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">Explore Signs</span>
                          <span className="text-xs text-[var(--color-muted)] font-medium opacity-70">Browse the entire zodiac</span>
                        </div>
                      </div>
                      <IconChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-40 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                    
                    <button 
                      onClick={() => { setIsOpen(false); onResetAccount && onResetAccount(); }}
                      className="w-full flex items-center justify-between p-6 rounded-3xl bg-[var(--color-card)]/80 hover:bg-red-500/[0.04] shadow-md transition-all group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-3.5 rounded-2xl bg-red-500/10 text-red-500 transition-all group-hover:bg-red-500 group-hover:text-white shadow-md">
                          <IconCalendarEvent className="w-6 h-6" stroke={2} />
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-lg font-bold tracking-tight text-red-600 dark:text-red-400">Update Profile</span>
                          <span className="text-xs text-[var(--color-muted)] font-medium opacity-70">Restart your cosmic journey</span>
                        </div>
                      </div>
                      <IconChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-40 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </button>
                </div>
              </div>

              {/* Ambient Info */}
              <div className="bg-[var(--color-primary)]/[0.03] p-5 rounded-3xl text-center space-y-2">
                 <p className="text-[0.65rem] font-serif text-[var(--color-muted)] italic opacity-60">"The universe whispers to those who listen."</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
