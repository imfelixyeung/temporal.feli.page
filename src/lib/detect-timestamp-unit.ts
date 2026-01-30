import { TimestampUnit } from "@/schema/timestamp-units";

export const detectTimestampUnit = (timestamp: string): TimestampUnit => {
  timestamp = parseInt(timestamp).toString();
  if (timestamp.length > 12) return "milliseconds";
  return "seconds";
};
