import { useState, useEffect, useRef } from "react";
import { CompassIcon } from "./Icons";
import { getZodiacSign } from "@/lib/zodiacUtils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

function getDaysInMonth(monthIndex: number): number {
  switch (monthIndex) {
    case 1: // February
      return 29; // Allow 29 for leap years
    case 3: case 5: case 8: case 10: // Apr, Jun, Sep, Nov
      return 30;
    default:
      return 31;
  }
}

export function BirthdaySelector({ onSignDetermined }: { onSignDetermined: (sign: string) => void }) {
  useEffect(() => {
    // Prevent scrolling on mobile during setup
    if (window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(1);

  const daysInMonth = getDaysInMonth(month);

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    const newMaxDays = getDaysInMonth(newMonth);
    if (day > newMaxDays) {
      setDay(newMaxDays);
    }
  };

  const handleContinue = () => {
    if (day > 0 && day <= 31) {
      const sign = getZodiacSign(month + 1, day);
      localStorage.setItem("elora_birth_month", (month + 1).toString());
      localStorage.setItem("elora_birth_day", day.toString());
      localStorage.setItem("elora_sign", sign);
      onSignDetermined(sign);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-md mx-auto w-full px-6 min-h-[100dvh]">
      
      {/* Strategic App Branding */}
      <div className="flex items-center gap-2 mb-16 opacity-80">
        <CompassIcon className="w-6 h-6 text-[var(--color-primary)]" />
        <span className="font-serif text-2xl tracking-widest text-[var(--color-foreground)] lowercase">elora.</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-[var(--color-foreground)] mb-4 text-center">
        When were you born?
      </h1>
      <p className="text-[var(--color-muted)] text-center mb-12 text-[1.05rem] font-light leading-relaxed">
        Let the stars align. Enter your birth date so we can find your cosmic signature.
      </p>

      <div className="w-full space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-[0.15em] ml-1">Birth Month</label>
          <CustomSelect 
            options={MONTHS.map((m, i) => ({ value: i, label: m }))}
            value={month}
            onChange={(val) => handleMonthChange(val as number)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-[0.15em] ml-1">Birth Day</label>
          <CustomSelect 
            options={Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => ({ value: d, label: d.toString() }))}
            value={day}
            onChange={(val) => setDay(val as number)}
          />
        </div>

        <button 
          onClick={handleContinue}
          className="w-full py-4 mt-6 bg-[var(--color-primary)] hover:bg-[#C26243] text-white rounded-2xl font-medium text-lg transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 duration-300"
        >
          Discover My Cosmos
        </button>
      </div>
    </div>
  );
}

function CustomSelect({ options, value, onChange }: { 
  options: { value: number | string; label: string }[]; 
  value: number | string; 
  onChange: (val: number | string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel = options.find(o => o.value === value)?.label || "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${isOpen ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/[0.03] ring-2 ring-[var(--color-primary)]/10' : 'border-[var(--color-card-border)]/60 hover:border-[var(--color-primary)]/40 bg-transparent'}`}
      >
        <span className="text-lg text-[var(--color-foreground)] font-light tracking-tight">{selectedLabel}</span>
        <svg className={`w-4 h-4 text-[var(--color-muted)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--color-primary)]' : 'opacity-30'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[var(--color-background)]/80 backdrop-blur-xl border border-[var(--color-card-border)]/40 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[250px] overflow-y-auto overflow-x-hidden hide-scroll py-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-5 py-3 text-left transition-all flex items-center justify-between group ${value === opt.value ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'text-[var(--color-foreground)] hover:bg-[var(--color-primary)]/5'}`}
              >
                <span className={`text-base tracking-tight ${value === opt.value ? 'font-bold' : 'font-light opacity-60 group-hover:opacity-100'}`}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
