export const convertDateTimeToTimestamp = (date: string, time: string) => {
  if (!date) {
    return { result: "", error: "" };
  }

  const timeValue = time || "00:00:00";
  const dateTimeString = `${date}T${timeValue}`;

  const dateObj = new Date(dateTimeString);

  if (isNaN(dateObj.getTime())) {
    return { result: "", error: "Invalid date or time" };
  }

  if (dateObj.getFullYear() < 1970) {
    return {
      result: "",
      error: "Date must be after January 1, 1970 (Unix epoch)",
    };
  }

  const timestamp = Math.floor(dateObj.getTime() / 1000);

  let errorMessage = "";
  if (dateObj.getFullYear() > 2038) {
    errorMessage = "Warning: Date exceeds 32-bit Unix timestamp limit (2038)";
  }

  return { result: timestamp.toString(), error: errorMessage };
};
