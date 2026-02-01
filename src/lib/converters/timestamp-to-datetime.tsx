import { TimestampUnit } from "@/schema/timestamp-units";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

export const convertTimestampToDatetime = (
  timestamp: string,
  unit: Exclude<TimestampUnit, "auto">,
  timezone?: string
) => {
  if (!timestamp.trim()) {
    return { result: "", error: "" };
  }

  const timestampNum = parseInt(timestamp.trim());

  if (isNaN(timestampNum)) {
    return { result: "", error: "Please enter a valid Unix timestamp" };
  }

  if (timestampNum < 0) {
    return { result: "", error: "Timestamp must be a positive number" };
  }

  const timestampMs =
    unit === "milliseconds" ? timestampNum : timestampNum * 1000;

  if (timestampNum / 1000 > 253402300799) {
    // Year 9999
    return {
      result: "",
      error: "Timestamp is too large (exceeds year 9999)",
    };
  }

  const date = new Date(timestampMs);
  if (isNaN(date.getTime())) {
    return { result: "", error: "Invalid timestamp" };
  }

  const results: string[] = [];

  // Format in user's timezone if provided
  if (timezone && timezone !== "UTC") {
    try {
      const userDate = new TZDate(date, timezone);
      results.push(
        `${timezone}: ${format(userDate, "yyyy-MM-dd HH:mm:ss (EEEE)")}`
      );
    } catch {
      return { result: "", error: "Invalid timezone" };
    }
  }

  // Always include UTC
  const utcDate = new TZDate(date, "UTC");
  results.push(`UTC: ${format(utcDate, "yyyy-MM-dd HH:mm:ss (EEEE)")}`);

  return {
    result: results.join("\n"),
    error: "",
  };
};
