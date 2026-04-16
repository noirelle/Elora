import { useState } from "react";
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
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(1);

  const daysInMonth = getDaysInMonth(month);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
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
    <div className="flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-md mx-auto w-full px-4 pt-12 md:pt-20">
      
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
          <div className="relative">
            <select 
              className="w-full p-4 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all shadow-sm appearance-none cursor-pointer text-lg text-[var(--color-foreground)] font-medium"
              value={month}
              onChange={handleMonthChange}
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-muted)]">
              <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-[0.15em] ml-1">Birth Day</label>
          <div className="relative">
            <select 
              className="w-full p-4 rounded-2xl bg-[var(--color-card)] border border-[var(--color-card-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all shadow-sm appearance-none cursor-pointer text-lg text-[var(--color-foreground)] font-medium"
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value))}
            >
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-muted)]">
              <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
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
