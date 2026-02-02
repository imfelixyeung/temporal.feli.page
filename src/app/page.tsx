import Clock from "@/components/clock";
import DateDifference from "@/components/tools/date-difference";
import DateTimeToTimestamp from "@/components/tools/datetime-to-timestamp";
import TimestampToDateTime from "@/components/tools/timestamp-to-datetime";
import { HelpTooltip } from "@/components/help-tooltip";

/**
 * Renders the Home page containing a live clock and three timestamp utilities: Unix Timestamp to Date Time, Date Time to Unix Timestamp, and Date Difference Calculator.
 *
 * @returns The page's React element with a header, a live Clock, and three tool sections for timestamp conversion and date difference calculation.
 */
export default function Home() {
  return (
    <div className="space-y-8 rounded-lg py-8 shadow-md">
      <h1 className="mb-4 text-3xl font-bold">Temporal Timestamp Tools</h1>
      <Clock />

      <section className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          Unix Timestamp to Date Time
          <HelpTooltip
            content="Convert Unix timestamps (seconds or milliseconds since Jan 1, 1970) to human-readable date/time format. Supports auto-detection of timestamp units."
            side="right"
          />
        </h2>
        <TimestampToDateTime />
      </section>

      <section className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          Date Time to Unix Timestamp
          <HelpTooltip
            content="Convert date and time to Unix timestamp format. The result shows seconds elapsed since January 1, 1970 00:00:00 UTC."
            side="right"
          />
        </h2>
        <DateTimeToTimestamp />
      </section>

      <section className="space-y-2">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          Date Difference Calculator
          <HelpTooltip
            content="Calculate the difference between two dates in various units: days, weeks, months (approximate), hours, minutes, and seconds. Uses your current timezone for calculations."
            side="right"
          />
        </h2>
        <DateDifference />
      </section>
    </div>
  );
}
