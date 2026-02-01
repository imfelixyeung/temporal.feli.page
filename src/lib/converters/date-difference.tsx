import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";

/**
 * Interface for date difference calculation results.
 */
export interface DateDifferenceResult {
  /** Number of complete days between the two dates */
  days: number;
  /** Number of complete weeks (decimal) between the two dates */
  weeks: number;
  /** Approximate number of months between the two dates */
  monthsApprox: number;
  /** Number of complete hours between the two dates */
  hours: number;
  /** Number of complete minutes between the two dates */
  minutes: number;
  /** Number of complete seconds between the two dates */
  seconds: number;
}

/**
 * Calculates the difference between two dates in various units with timezone support.
 *
 * This function computes the time difference between two dates using the specified timezone.
 * The calculation accounts for timezone offsets and daylight saving time changes. The result
 * provides the difference in days, weeks, months (approximate), hours, minutes, and seconds.
 *
 * @param startDate - The start date in ISO format (YYYY-MM-DD)
 * @param endDate - The end date in ISO format (YYYY-MM-DD)
 * @param timezone - Optional timezone identifier (e.g., "America/New_York", "UTC")
 *                   If not provided, uses the system's local timezone
 *
 * @returns Object containing:
 *   - result: DateDifferenceResult with calculated differences
 *   - error: Error message string (empty if no error)
 *
 * @example
 * ```typescript
 * // Basic usage
 * const { result, error } = calculateDateDifference("2025-10-23", "2026-02-20");
 * console.log(result.days); // 120
 *
 * // With timezone
 * const { result: result2 } = calculateDateDifference("2025-10-23", "2026-02-20", "UTC");
 * console.log(result2.weeks); // 17.14
 * ```
 *
 * @throws Does not throw errors, returns them in the error field instead
 */
export const calculateDateDifference = (
  startDate: string,
  endDate: string,
  timezone?: string
): { result: DateDifferenceResult; error: string } => {
  // Handle empty inputs
  if (!startDate || !endDate) {
    return {
      result: {
        days: 0,
        weeks: 0,
        monthsApprox: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      error: "Both start and end dates are required",
    };
  }

  // Parse dates
  const startDateObj = new Date(startDate + "T00:00:00");
  const endDateObj = new Date(endDate + "T00:00:00");

  // Validate date parsing
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    return {
      result: {
        days: 0,
        weeks: 0,
        monthsApprox: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      error: "Invalid date format. Please use YYYY-MM-DD format.",
    };
  }

  // Check if end date is before start date
  if (endDateObj < startDateObj) {
    return {
      result: {
        days: 0,
        weeks: 0,
        monthsApprox: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      error: "End date must be after or equal to start date",
    };
  }

  // Convert to timezone-aware dates
  const zonedStartDate = timezone
    ? toZonedTime(startDateObj, timezone)
    : startDateObj;
  const zonedEndDate = timezone
    ? toZonedTime(endDateObj, timezone)
    : endDateObj;

  // Calculate differences using date-fns functions
  const days = differenceInDays(zonedEndDate, zonedStartDate);
  const weeks = Math.floor(days / 7);
  const remainingDaysAfterWeeks = days % 7;
  const months = Math.floor(days / 30.44); // Average month length (365.25 / 12)
  const remainingDaysAfterMonths = Math.round(days % 30.44);
  const hours = differenceInHours(zonedEndDate, zonedStartDate);
  const minutes = differenceInMinutes(zonedEndDate, zonedStartDate);
  const seconds = differenceInSeconds(zonedEndDate, zonedStartDate);

  return {
    result: {
      days,
      weeks,
      monthsApprox: months,
      hours,
      minutes,
      seconds,
    },
    error: "",
  };
};
