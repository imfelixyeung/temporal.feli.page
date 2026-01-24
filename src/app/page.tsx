import DateTimeToTimestamp from "@/components/tools/datetime-to-timestamp";
import TimestampToDateTime from "@/components/tools/timestamp-to-datetime";

export default function Home() {
  return (
    <div>
      <h1>Temporal Timestamp Tools</h1>
      <h2>Unix Timestamp to Date Time</h2>
      <TimestampToDateTime />
      <h2>Date Time to Unix Timestamp</h2>
      <DateTimeToTimestamp />
    </div>
  );
}
