import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { animate } from "motion";
import { motion } from "motion/react";
import {
  calculateSavings,
  DISCOUNT_TIERS,
  type DiscountTier,
} from "../../lib/calculator";
import HonestyToggle from "../ui/HonestyToggle";

const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString()}`;
const fmtCount = (n: number) => Math.round(n).toLocaleString();

export default function CalculatorSection() {
  const [trucks, setTrucks] = useState(5);
  const [miles, setMiles] = useState(120_000);
  const [mpg, setMpg] = useState(6.5);
  const [tier, setTier] = useState<DiscountTier>("typical");

  const result = useMemo(
    () =>
      calculateSavings({
        trucks,
        milesPerTruckPerYear: miles,
        mpg,
        discountPerGallon: DISCOUNT_TIERS[tier].value,
      }),
    [trucks, miles, mpg, tier],
  );

  // Spring-animated displayed savings — eases between values rather than jumping.
  const [displayed, setDisplayed] = useState(result.annualSavings);
  const displayedRef = useRef(displayed);
  useEffect(() => {
    const controls = animate(displayedRef.current, result.annualSavings, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        displayedRef.current = v;
        setDisplayed(v);
      },
    });
    return () => controls.stop();
  }, [result.annualSavings]);

  // Pulse-glow the big number when the tier changes (separate from slider drags).
  const [pulseKey, setPulseKey] = useState(0);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPulseKey((k) => k + 1);
  }, [tier]);

  return (
    <motion.section
      id="calculator"
      aria-labelledby="calculator-title"
      className="relative py-24 md:py-32 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section background — soft green orb anchored bottom-right of the card */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="gradient-orb bg-brand-green/10 w-[700px] h-[700px] -bottom-40 -right-40" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6">
        {/* Heading block */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-green font-semibold mb-4">
            Fuel Savings Calculator
          </p>
          <h2
            id="calculator-title"
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5 text-balance"
          >
            What would your fleet save?
          </h2>
          <p className="text-base md:text-lg text-brand-ink-soft max-w-2xl mx-auto leading-relaxed">
            <span className="block">
              Most carriers have no idea what they&apos;re leaving on the table.
            </span>
            <span className="block mt-1">
              Drag the sliders. See yours.
            </span>
          </p>
        </div>

        {/* Calculator card */}
        <div className="group relative bg-white/[0.025] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-14 grid lg:grid-cols-[5fr_6fr] gap-12 lg:gap-16 items-center transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.035] hover:-translate-y-0.5">
          {/* Sliders */}
          <div className="space-y-7">
            <SliderRow
              icon={<TruckIcon />}
              label="Trucks"
              value={trucks}
              min={1}
              max={100}
              step={1}
              onChange={setTrucks}
              format={(n) => n.toString()}
              delay={0}
            />
            <SliderRow
              icon={<RouteIcon />}
              label="Miles per truck / year"
              value={miles}
              min={50_000}
              max={200_000}
              step={5_000}
              onChange={setMiles}
              format={(n) => `${(n / 1000).toFixed(0)}k`}
              delay={0.06}
            />
            <SliderRow
              icon={<GaugeIcon />}
              label="Miles per gallon"
              value={mpg}
              min={5.0}
              max={8.0}
              step={0.1}
              onChange={setMpg}
              format={(n) => n.toFixed(1)}
              delay={0.12}
            />
          </div>

          {/* Output */}
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-brand-ink-faint font-semibold mb-3">
              Estimated Annual Savings
            </div>
            <div
              key={pulseKey}
              className="font-display gradient-text-green leading-none mb-6 savings-pulse text-[clamp(3.5rem,9vw,6.5rem)] font-bold"
              data-savings-display
              aria-live="polite"
              aria-atomic="true"
            >
              {fmtMoney(displayed)}
            </div>

            {/* Sub-stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
              <Stat
                label="Gallons/yr"
                value={fmtCount(result.gallonsPerYear)}
              />
              <Stat
                label="Per truck/mo"
                value={fmtMoney(result.perTruckMonthly)}
                up
              />
              <Stat
                label="Total/mo"
                value={fmtMoney(result.monthlySavings)}
                up
              />
            </div>

            {/* Honesty toggle */}
            <div className="mb-4">
              <HonestyToggle value={tier} onChange={setTier} />
            </div>
            <p className="text-xs text-brand-ink-faint leading-relaxed mb-7 max-w-md">
              <span className="text-brand-ink-soft font-medium">
                Conservative
              </span>{" "}
              is what most fuel cards advertise.{" "}
              <span className="text-brand-ink-soft font-medium">Best</span> is
              what we&apos;ve seen at our deepest-discount partner stops.{" "}
              <span className="text-brand-ink-soft font-medium">Typical</span>{" "}
              is most carriers&apos; real-world average across all fills.
            </p>

            {/* CTA */}
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-brand-dark font-semibold px-6 py-3.5 rounded-full transition-all duration-200 shadow-[0_8px_24px_-8px_rgba(22,176,90,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(22,176,90,0.7)] hover:-translate-y-0.5 group/cta"
            >
              <span>Get your fleet&apos;s number — join waitlist</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SliderRow({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  delay: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-brand-ink-soft" aria-hidden="true">
            {icon}
          </span>
          <label className="text-sm font-medium text-brand-ink-soft">
            {label}
          </label>
        </div>
        <span className="font-display text-2xl md:text-3xl font-bold text-brand-ink tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="range-slider"
        style={{ ["--fill-pct" as string]: `${pct}%` } as CSSProperties}
      />
    </motion.div>
  );
}

function Stat({
  label,
  value,
  up = false,
}: {
  label: string;
  value: string;
  up?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.14em] text-brand-ink-faint font-semibold mb-1.5 whitespace-nowrap">
        {label}
      </div>
      <div className="font-display text-lg sm:text-xl font-bold text-brand-ink flex items-baseline gap-1 tabular-nums whitespace-nowrap">
        {up && (
          <span className="text-brand-green text-xs leading-none" aria-hidden="true">
            ▲
          </span>
        )}
        {value}
      </div>
    </div>
  );
}

/* Inline icons — Lucide-style, 18px, stroke 1.75 */
function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 17h2M17 17h2M3 17V8a1 1 0 0 1 1-1h10v10M14 9h5l2 4v4h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
function RouteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h7a4 4 0 0 0 0-8h-6a4 4 0 0 1 0-8h7" />
    </svg>
  );
}
function GaugeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 14l4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}
