"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convertTimestampToDatetime } from "@/lib/converters/timestamp-to-datetime";
import { detectTimestampUnit } from "@/lib/detect-timestamp-unit";
import { TimestampUnit, timestampUnitLabels } from "@/schema/timestamp-units";
import { useTimezoneStore } from "@/store/timezone";
import { useCallback, useMemo, useState } from "react";
import { SelectTimestampUnit } from "../select-timestamp-unit";
import { ButtonGroup } from "../ui/button-group";

export default function TimestampToDateTime() {
  const [timestamp, setTimestamp] = useState<string>("");
  const [userUnit, setUserUnit] = useState<TimestampUnit>("auto");
  const { timezone } = useTimezoneStore();

  const handleCurrentTimestamp = useCallback(() => {
    const currentTimestamp =
      userUnit === "seconds" ? Math.floor(Date.now() / 1000) : Date.now();
    setTimestamp(currentTimestamp.toString());
  }, [userUnit]);

  const {
    converted: { result, error },
    unit,
  } = useMemo(() => {
    const unit =
      userUnit === "auto" ? detectTimestampUnit(timestamp) : userUnit;
    const converted = convertTimestampToDatetime(timestamp, unit!, timezone);
    return { unit, converted };
  }, [timestamp, userUnit, timezone]);

  const displayedUnitLabels = useMemo(() => {
    if (!unit) return timestampUnitLabels;

    return {
      ...timestampUnitLabels,
      auto: `${timestampUnitLabels.auto} (${timestampUnitLabels[unit]})`,
    };
  }, [unit]);

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
        <SelectTimestampUnit
          items={displayedUnitLabels}
          value={userUnit}
          onValueChange={(v) => setUserUnit(v as TimestampUnit)}
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
          <div className="font-mono whitespace-pre-line">{result}</div>
        </div>
      )}
    </div>
  );
}
