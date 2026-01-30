import Clock from "@/components/clock";
import DateTimeToTimestamp from "@/components/tools/datetime-to-timestamp";
import TimestampToDateTime from "@/components/tools/timestamp-to-datetime";

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
    </div>
  );
}
