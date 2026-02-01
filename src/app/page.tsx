import Clock from "@/components/clock";
import DateDifference from "@/components/tools/date-difference";
import DateTimeToTimestamp from "@/components/tools/datetime-to-timestamp";
import TimestampToDateTime from "@/components/tools/timestamp-to-datetime";

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
        <h2 className="text-xl font-semibold">Unix Timestamp to Date Time</h2>
        <TimestampToDateTime />
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Date Time to Unix Timestamp</h2>
        <DateTimeToTimestamp />
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Date Difference Calculator</h2>
        <DateDifference />
      </section>
    </div>
  );
}
