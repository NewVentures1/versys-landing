export interface CalculatorInput {
  trucks: number;
  milesPerTruckPerYear: number;
  mpg: number;
  discountPerGallon: number;
}

export interface CalculatorOutput {
  gallonsPerYear: number;
  annualSavings: number;
  monthlySavings: number;
  perTruckMonthly: number;
}

export function calculateSavings(input: CalculatorInput): CalculatorOutput {
  if (input.mpg <= 0) {
    throw new Error("mpg must be greater than 0");
  }
  const gallonsPerYear =
    (input.trucks * input.milesPerTruckPerYear) / input.mpg;
  const annualSavings = gallonsPerYear * input.discountPerGallon;
  const monthlySavings = annualSavings / 12;
  const perTruckMonthly = input.trucks > 0 ? monthlySavings / input.trucks : 0;
  return { gallonsPerYear, annualSavings, monthlySavings, perTruckMonthly };
}

export const DISCOUNT_TIERS = {
  conservative: { value: 0.4, label: "Conservative" },
  typical: { value: 0.7, label: "Typical" },
  best: { value: 1.4, label: "Best" },
} as const;

export type DiscountTier = keyof typeof DISCOUNT_TIERS;
