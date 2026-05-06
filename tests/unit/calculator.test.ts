import { describe, it, expect } from "vitest";
import { calculateSavings } from "../../src/lib/calculator";

describe("calculateSavings", () => {
  it("computes spec example: 5 trucks × 120k mi × 6.5 mpg × $1.40", () => {
    const result = calculateSavings({
      trucks: 5,
      milesPerTruckPerYear: 120_000,
      mpg: 6.5,
      discountPerGallon: 1.4,
    });
    expect(result.gallonsPerYear).toBeCloseTo(92_307.69, 1);
    expect(result.annualSavings).toBeCloseTo(129_230.77, 1);
    expect(result.monthlySavings).toBeCloseTo(10_769.23, 1);
    expect(result.perTruckMonthly).toBeCloseTo(2_153.85, 1);
  });

  it("handles single-truck conservative scenario", () => {
    const result = calculateSavings({
      trucks: 1,
      milesPerTruckPerYear: 120_000,
      mpg: 6.5,
      discountPerGallon: 0.4,
    });
    expect(result.annualSavings).toBeCloseTo(7_384.62, 1);
    expect(result.perTruckMonthly).toBeCloseTo(615.38, 1);
  });

  it("returns zero gallons and zero savings when trucks is zero", () => {
    const result = calculateSavings({
      trucks: 0,
      milesPerTruckPerYear: 120_000,
      mpg: 6.5,
      discountPerGallon: 1.4,
    });
    expect(result.gallonsPerYear).toBe(0);
    expect(result.annualSavings).toBe(0);
    expect(result.monthlySavings).toBe(0);
    expect(result.perTruckMonthly).toBe(0);
  });

  it("throws on invalid mpg (zero or negative)", () => {
    expect(() =>
      calculateSavings({
        trucks: 5,
        milesPerTruckPerYear: 120_000,
        mpg: 0,
        discountPerGallon: 1.4,
      }),
    ).toThrow();
    expect(() =>
      calculateSavings({
        trucks: 5,
        milesPerTruckPerYear: 120_000,
        mpg: -1,
        discountPerGallon: 1.4,
      }),
    ).toThrow();
  });
});
