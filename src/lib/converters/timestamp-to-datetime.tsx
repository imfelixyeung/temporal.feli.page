import { format } from "date-fns";

export const convertTimestampToDatetime = (timestamp: string) => {
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

  if (timestampNum > 253402300799) {
    // Year 9999
    return {
      result: "",
      error: "Timestamp is too large (exceeds year 9999)",
    };
  }

  const date = new Date(timestampNum * 1000);
  if (isNaN(date.getTime())) {
    return { result: "", error: "Invalid timestamp" };
  }

  return {
    result: format(date, "yyyy-MM-dd HH:mm:ss (EEEE)"),
    error: "",
  };
};
