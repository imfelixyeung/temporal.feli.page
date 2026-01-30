import Clock from "@/components/clock";
import DateTimeToTimestamp from "@/components/tools/datetime-to-timestamp";
import TimestampToDateTime from "@/components/tools/timestamp-to-datetime";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-lg shadow-md space-y-8">
      <h1 className="text-3xl font-bold mb-4">Temporal Timestamp Tools</h1>
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
