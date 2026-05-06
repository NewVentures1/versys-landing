import { DISCOUNT_TIERS, type DiscountTier } from "../../lib/calculator";

interface Props {
  value: DiscountTier;
  onChange: (tier: DiscountTier) => void;
}

const tierOrder: DiscountTier[] = ["conservative", "typical", "best"];

export default function HonestyToggle({ value, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Discount per gallon assumption"
      className="inline-flex bg-white/[0.04] border border-white/10 rounded-full p-1 gap-1 backdrop-blur-sm"
    >
      {tierOrder.map((tier) => {
        const { value: amount, label } = DISCOUNT_TIERS[tier];
        const selected = value === tier;
        return (
          <button
            key={tier}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(tier)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              selected
                ? "bg-brand-green text-brand-dark shadow-[0_0_24px_-4px_rgba(22,176,90,0.6)]"
                : "text-brand-ink-soft hover:text-brand-ink hover:bg-white/[0.06]"
            }`}
          >
            {label}{" "}
            <span className={selected ? "opacity-80" : "opacity-60"}>
              ${amount.toFixed(2)}/gal
            </span>
          </button>
        );
      })}
    </div>
  );
}
