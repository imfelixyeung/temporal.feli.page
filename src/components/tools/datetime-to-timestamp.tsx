"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DateTimeToTimestamp() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const handleCurrentDateTime = () => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].substring(0, 8);

    setDate(dateStr);
    setTime(timeStr);
  };

  const { result, error } = useMemo(() => {
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
  }, [date, time]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1"
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          step="1"
          className="w-32"
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" disabled={!date}>
          Convert
        </Button>
        <Button onClick={handleCurrentDateTime} variant="outline">
          Current
        </Button>
      </div>

      {error && (
        <div
          className={`rounded-md border p-3 text-sm ${
            error.includes("Warning")
              ? "border-yellow-200 bg-yellow-50 text-yellow-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {error}
        </div>
      )}

      {result && !error && (
        <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <div className="mb-1 font-semibold">Unix Timestamp:</div>
          <div className="font-mono text-lg">{result}</div>
          <div className="mt-2 text-xs text-green-600">
            = {result} seconds since January 1, 1970 00:00:00 UTC
          </div>
        </div>
      )}
    </div>
  );
}
