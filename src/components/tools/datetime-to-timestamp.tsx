"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { ButtonGroup } from "../ui/button-group";

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
      <ButtonGroup className="flex w-full">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="grow"
        />
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          step="1"
          className="grow"
        />
        <Button onClick={handleCurrentDateTime} variant="outline">
          Current
        </Button>
      </ButtonGroup>

      {error && (
        <div
          className={`rounded-md border p-3 text-sm ${
            error.includes("Warning")
              ? "border-yellow-600/20 bg-yellow-600/10"
              : "border-red-600/20 bg-red-600/10"
          }`}
        >
          {error}
        </div>
      )}

      {result && !error && (
        <div className="rounded-md border border-green-600/20 bg-green-600/10 p-3 text-sm">
          <div className="mb-1 font-semibold">Unix Timestamp:</div>
          <div className="font-mono text-lg">{result}</div>
          <div className="text-muted-foreground mt-2 text-xs">
            = {result} seconds since January 1, 1970 00:00:00 UTC
          </div>
        </div>
      )}
    </div>
  );
}
