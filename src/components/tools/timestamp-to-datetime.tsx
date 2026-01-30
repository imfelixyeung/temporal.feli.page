"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import { ButtonGroup } from "../ui/button-group";

export default function TimestampToDateTime() {
  const [timestamp, setTimestamp] = useState<string>("");

  const handleCurrentTimestamp = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000).toString();
    setTimestamp(currentTimestamp);
  };

  const { result, error } = useMemo(() => {
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
  }, [timestamp]);

  return (
    <div className="space-y-4">
      <ButtonGroup className="w-full">
        <Input
          type="number"
          placeholder="Enter Unix timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="grow"
        />
        <Button onClick={handleCurrentTimestamp} variant="outline">
          Current
        </Button>
      </ButtonGroup>

      {error && (
        <div className="rounded-md border border-red-600/20 bg-red-600/20 p-3 text-sm">
          {error}
        </div>
      )}

      {result && !error && (
        <div className="rounded-md border border-green-600/20 bg-green-600/10 p-3 text-sm">
          <div className="mb-1 font-semibold">Converted Date/Time:</div>
          <div className="font-mono">{result}</div>
        </div>
      )}
    </div>
  );
}
