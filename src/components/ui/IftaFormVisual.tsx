import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const ROWS = [
  { state: "TX", gallons: 1240 },
  { state: "OK", gallons: 870 },
  { state: "KS", gallons: 920 },
  { state: "NE", gallons: 540 },
  { state: "IA", gallons: 1100 },
];

export default function IftaFormVisual() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setFilled(0);
    const id = setInterval(() => {
      setFilled((c) => {
        if (c >= ROWS.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 360);
    return () => clearInterval(id);
  }, [inView]);

  const runningTotal = ROWS.slice(0, filled).reduce(
    (sum, r) => sum + r.gallons,
    0,
  );

  return (
    <div
      ref={containerRef}
      className="bg-white/[0.025] border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-[480px] mx-auto backdrop-blur-sm"
      role="img"
      aria-label="Mock IFTA quarterly summary populating from card swipes"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-brand-ink-faint font-semibold mb-1">
            IFTA Quarterly Summary
          </div>
          <div className="font-display text-xl font-bold text-brand-ink">
            Q2 2026
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-brand-green/12 text-brand-green text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          Auto-filling
        </span>
      </div>

      {/* Table */}
      <div className="text-sm">
        <div className="grid grid-cols-[40px_1fr_auto_28px] gap-3 text-[10px] uppercase tracking-[0.14em] text-brand-ink-faint font-semibold pb-2 border-b border-white/5">
          <div>State</div>
          <div>Fuel</div>
          <div className="text-right">Gallons</div>
          <div></div>
        </div>

        {ROWS.map((row, i) => {
          const isFilled = i < filled;
          return (
            <motion.div
              key={row.state}
              initial={{ opacity: 0, y: 8 }}
              animate={
                isFilled ? { opacity: 1, y: 0 } : { opacity: 0.18, y: 0 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-[40px_1fr_auto_28px] gap-3 items-center py-2.5 border-b border-white/5 ${
                isFilled ? "bg-brand-green/[0.04]" : ""
              }`}
            >
              <div className="font-bold text-brand-ink tabular-nums">
                {row.state}
              </div>
              <div className="text-brand-ink-soft text-xs">Diesel</div>
              <div className="text-brand-ink font-semibold tabular-nums text-right">
                {row.gallons.toLocaleString()}
              </div>
              <div className="flex justify-end">
                {isFilled && (
                  <motion.svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      fill="rgb(22 176 90 / 0.18)"
                    />
                    <path
                      d="M8 12.5l3 3 5-6"
                      stroke="#16B05A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </div>
            </motion.div>
          );
        })}

        {/* Total row */}
        <div className="grid grid-cols-[40px_1fr_auto_28px] gap-3 items-center pt-3.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-brand-ink-faint font-semibold">
            Total
          </div>
          <div></div>
          <div className="font-display text-xl font-bold gradient-text-green tabular-nums text-right">
            {runningTotal.toLocaleString()}
          </div>
          <div></div>
        </div>
      </div>

      <p className="text-[11px] text-brand-ink-faint mt-4 leading-relaxed">
        Captured automatically from every card swipe. Export your IFTA-ready
        summary on demand.
      </p>
    </div>
  );
}
