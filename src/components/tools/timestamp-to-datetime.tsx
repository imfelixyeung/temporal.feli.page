"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { ButtonGroup } from "../ui/button-group";
import { convertTimestampToDatetime } from "@/lib/converters/timestamp-to-datetime";

export default function TimestampToDateTime() {
  const [timestamp, setTimestamp] = useState<string>("");

  const handleCurrentTimestamp = () => {
    const currentTimestamp = Math.floor(Date.now() / 1000).toString();
    setTimestamp(currentTimestamp);
  };

  const { result, error } = useMemo(
    () => convertTimestampToDatetime(timestamp),
    [timestamp]
  );

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
