"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateDateDifference } from "@/lib/converters/date-difference";
import { useTimezoneStore } from "@/store/timezone";
import { useCallback, useMemo, useState } from "react";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";

export default function DateDifference() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { timezone } = useTimezoneStore();

  const handleCurrentStartDate = useCallback(() => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    setStartDate(dateStr);
  }, []);

  const handleCurrentEndDate = useCallback(() => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    setEndDate(dateStr);
  }, []);

  const { result, error } = useMemo(
    () => calculateDateDifference(startDate, endDate, timezone),
    [startDate, endDate, timezone]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <ButtonGroup className="flex w-full">
          <ButtonGroupText className="w-16 justify-end">From</ButtonGroupText>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="grow"
          />
          <Button onClick={handleCurrentStartDate} variant="outline">
            Current
          </Button>
        </ButtonGroup>

        <ButtonGroup className="flex w-full">
          <ButtonGroupText className="w-16 justify-end">To</ButtonGroupText>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="grow"
          />
          <Button onClick={handleCurrentEndDate} variant="outline">
            Current
          </Button>
        </ButtonGroup>
      </div>

      {error && (startDate || endDate) && (
        <div className="rounded-md border border-red-600/20 bg-red-600/10 p-3 text-sm">
          {error}
        </div>
      )}

      {result && !error && startDate && endDate && (
        <div className="rounded-md border border-green-600/20 bg-green-600/10 p-3 text-sm">
          <div className="mb-3 font-semibold">Date Difference Results:</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="font-medium">Days:</span>{" "}
              {result.days.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Weeks:</span>{" "}
              {result.weeks.toLocaleString()}
              {result.weeks > 0 && (
                <span className="text-muted-foreground">
                  {" "}
                  (and {result.days % 7} days)
                </span>
              )}
            </div>
            <div>
              <span className="font-medium">Months (approx):</span>{" "}
              {result.monthsApprox.toLocaleString()}
              {result.monthsApprox > 0 && (
                <span className="text-muted-foreground">
                  {" "}
                  ({Math.round(result.days % 30.44)} days)
                </span>
              )}
            </div>
            <div>
              <span className="font-medium">Hours:</span>{" "}
              {result.hours.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Minutes:</span>{" "}
              {result.minutes.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Seconds:</span>{" "}
              {result.seconds.toLocaleString()}
            </div>
          </div>
          <div className="text-muted-foreground mt-3 text-xs">
            Calculated using timezone: {timezone}
          </div>
        </div>
      )}
    </div>
  );
}
