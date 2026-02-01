import { describe, it, expect } from "vitest";
import { calculateDateDifference } from "../date-difference";

describe("calculateDateDifference", () => {
  describe("Basic functionality", () => {
    it("should calculate exact example correctly", () => {
      const { result, error } = calculateDateDifference(
        "2025-10-23",
        "2026-02-20"
      );

      expect(error).toBe("");
      expect(result.days).toBe(120);
      expect(result.weeks).toBe(17);
      expect(result.monthsApprox).toBe(3);
      expect(result.hours).toBe(2881);
      expect(result.minutes).toBe(172860);
      expect(result.seconds).toBe(10371600);
    });

    it("should show 2 months 8 days for 2025-12-29 to 2026-03-08", () => {
      const { result, error } = calculateDateDifference(
        "2025-12-29",
        "2026-03-08"
      );

      expect(error).toBe("");
      expect(result.days).toBe(69);
      expect(result.weeks).toBe(9); // 9 weeks (63 days) + 6 remaining days
      expect(result.monthsApprox).toBe(2); // 2 months (60.88 days) + 8.12 remaining days = 69 days
    });

    it("should return 0 days for same date", () => {
      const { result, error } = calculateDateDifference(
        "2025-01-01",
        "2025-01-01"
      );

      expect(error).toBe("");
      expect(result.days).toBe(0);
      expect(result.weeks).toBe(0);
      expect(result.monthsApprox).toBe(0);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
      expect(result.seconds).toBe(0);
    });

    it("should calculate 1 day difference correctly", () => {
      const { result, error } = calculateDateDifference(
        "2025-01-01",
        "2025-01-02"
      );

      expect(error).toBe("");
      expect(result.days).toBe(1);
      expect(result.weeks).toBe(0);
      expect(result.hours).toBe(24);
      expect(result.minutes).toBe(1440);
      expect(result.seconds).toBe(86400);
    });
  });

  describe("Edge cases", () => {
    it("should handle empty inputs", () => {
      const { result, error } = calculateDateDifference("", "2025-01-02");

      expect(error).toBe("Both start and end dates are required");
      expect(result.days).toBe(0);
      expect(result.weeks).toBe(0);
      expect(result.monthsApprox).toBe(0);
      expect(result.hours).toBe(0);
      expect(result.minutes).toBe(0);
      expect(result.seconds).toBe(0);
    });

    it("should handle invalid date format", () => {
      const { result, error } = calculateDateDifference(
        "invalid-date",
        "2025-01-02"
      );

      expect(error).toBe("Invalid date format. Please use YYYY-MM-DD format.");
      expect(result.days).toBe(0);
    });

    it("should handle end date before start date", () => {
      const { result, error } = calculateDateDifference(
        "2025-01-02",
        "2025-01-01"
      );

      expect(error).toBe("End date must be after or equal to start date");
      expect(result.days).toBe(0);
    });
  });

  describe("Multi-year calculations", () => {
    it("should handle leap year correctly", () => {
      const { result, error } = calculateDateDifference(
        "2024-02-28",
        "2024-03-01"
      );

      expect(error).toBe("");
      expect(result.days).toBe(2); // Feb 28 to Feb 29 to Mar 1
    });

    it("should handle year transition", () => {
      const { result, error } = calculateDateDifference(
        "2024-12-31",
        "2025-01-01"
      );

      expect(error).toBe("");
      expect(result.days).toBe(1);
    });

    it("should handle multi-year span", () => {
      const { result, error } = calculateDateDifference(
        "2020-01-01",
        "2023-01-01"
      );

      expect(error).toBe("");
      expect(result.days).toBe(1096); // 2020 (leap year) + 2021 + 2022 = 366 + 365 + 365
    });
  });

  describe("Timezone functionality", () => {
    it("should work with UTC timezone", () => {
      const { result, error } = calculateDateDifference(
        "2025-01-01",
        "2025-01-02",
        "UTC"
      );

      expect(error).toBe("");
      expect(result.days).toBe(1);
    });

    it("should work with different timezone", () => {
      const { result, error } = calculateDateDifference(
        "2025-01-01",
        "2025-01-02",
        "America/New_York"
      );

      expect(error).toBe("");
      expect(result.days).toBe(1);
    });
  });

  describe("Whole number calculations", () => {
    it("should calculate whole weeks correctly", () => {
      const { result } = calculateDateDifference("2025-01-01", "2025-01-10"); // 9 days
      expect(result.weeks).toBe(1); // 9 days = 1 week
    });

    it("should calculate whole months correctly", () => {
      const { result } = calculateDateDifference("2025-01-01", "2025-02-01"); // 31 days
      expect(result.monthsApprox).toBe(1); // 31 days = 1 month
    });
  });

  describe("Large date ranges", () => {
    it("should handle decades", () => {
      const { result, error } = calculateDateDifference(
        "2000-01-01",
        "2030-01-01"
      );

      expect(error).toBe("");
      expect(result.days).toBe(10958); // Including leap years
      expect(result.weeks).toBe(1565);
      expect(result.monthsApprox).toBe(359);
    });

    it("should show whole months and weeks with remaining days", () => {
      const { result, error } = calculateDateDifference(
        "2025-12-29",
        "2026-03-08"
      );

      expect(error).toBe("");
      expect(result.days).toBe(69);
      expect(result.weeks).toBe(9); // 9 weeks (63 days) + 6 remaining days
      expect(result.monthsApprox).toBe(2); // 2 months (60.88 days) + 8.12 remaining days = 69 days
    });
  });
});
