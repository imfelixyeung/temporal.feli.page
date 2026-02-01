"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  calculateDateDifference,
  AVERAGE_DAYS_PER_MONTH,
} from "@/lib/converters/date-difference";
import { useTimezoneStore } from "@/store/timezone";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";

export default function DateDifference() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { timezone } = useTimezoneStore();

  const setCurrentDate = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) => {
      const dateStr = new Date().toISOString().split("T")[0];
      setter(dateStr);
    },
    []
  );

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
          <Button
            onClick={() => setCurrentDate(setStartDate)}
            variant="outline"
          >
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
          <Button onClick={() => setCurrentDate(setEndDate)} variant="outline">
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
                  ({Math.round(result.days % AVERAGE_DAYS_PER_MONTH)} days)
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
