import { motion } from "motion/react";

const DATA = [
  { stop: "Stop A", typical: 0.3, versys: 1.4 },
  { stop: "Stop B", typical: 0.35, versys: 0.95 },
  { stop: "Stop C", typical: 0.4, versys: 0.65 },
];

const MAX = 1.5;

export default function DiscountStackChart() {
  return (
    <div
      className="bg-white/[0.025] border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-[480px] mx-auto backdrop-blur-sm"
      role="img"
      aria-label="Bar chart comparing typical card savings versus Versys at three sample stops"
    >
      <div className="flex items-baseline justify-between mb-6">
        <div className="text-[10px] uppercase tracking-[0.16em] text-brand-ink-faint font-semibold">
          Savings per gallon
        </div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-brand-ink-faint font-semibold">
          3 sample stops
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-52 mb-4">
        {DATA.map((d, i) => (
          <div key={d.stop} className="grid grid-cols-2 gap-2 items-end h-full">
            {/* Typical card bar */}
            <BarColumn
              pct={(d.typical / MAX) * 100}
              label={`$${d.typical.toFixed(2)}`}
              tone="muted"
              delay={i * 0.1}
            />
            {/* Versys bar */}
            <BarColumn
              pct={(d.versys / MAX) * 100}
              label={`$${d.versys.toFixed(2)}`}
              tone="brand"
              delay={i * 0.1 + 0.15}
            />
          </div>
        ))}
      </div>

      {/* X-axis stop labels */}
      <div className="flex gap-6 mb-5">
        {DATA.map((d) => (
          <div
            key={d.stop}
            className="flex-1 text-center text-xs text-brand-ink-soft font-medium"
          >
            {d.stop}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 text-xs pt-4 border-t border-white/5">
        <span className="flex items-center gap-2 text-brand-ink-soft">
          <span className="w-3 h-3 rounded-sm bg-white/15" />
          Typical card
        </span>
        <span className="flex items-center gap-2 text-brand-ink">
          <span className="w-3 h-3 rounded-sm bg-brand-green shadow-[0_0_10px_rgba(22,176,90,0.6)]" />
          Versys
        </span>
      </div>
    </div>
  );
}

function BarColumn({
  pct,
  label,
  tone,
  delay,
}: {
  pct: number;
  label: string;
  tone: "muted" | "brand";
  delay: number;
}) {
  const isBrand = tone === "brand";
  return (
    <div className="flex-1 flex flex-col items-center justify-end h-full">
      <span
        className={`text-[11px] font-semibold mb-1.5 tabular-nums ${
          isBrand ? "text-brand-green" : "text-brand-ink-faint"
        }`}
      >
        {label}
      </span>
      <div
        className="w-full overflow-hidden"
        style={{ height: `${pct}%` }}
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.2 + delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "bottom", height: "100%" }}
          className={`w-full rounded-t-md ${
            isBrand
              ? "bg-gradient-to-t from-brand-green-deep to-brand-green shadow-[0_-4px_24px_-4px_rgba(22,176,90,0.6)]"
              : "bg-white/[0.08]"
          }`}
        />
      </div>
    </div>
  );
}
