"use client";

import { useClockStore } from "@/store/clock";
import { useMemo } from "react";
import { useInterval } from "react-use";

const start = new Date(0);
const startString = start.toDateString();

export default function Clock() {
  const { time: now, tick } = useClockStore();

  // Update the clock every second
  useInterval(tick, 1000);

  const { seconds, time } = useMemo(
    () => ({
      seconds: Math.round(now.getTime() / 1000),
      time: now.toLocaleTimeString(),
    }),
    [now]
  );

  return (
    <div className="rounded-lg border p-6 shadow-md">
      <h2 className="mb-3 tabular-nums">
        <span className="text-2xl font-semibold" suppressHydrationWarning>
          {seconds}
        </span>
        <br />
        <span className="text-md font-medium">Seconds since {startString}</span>
      </h2>
      <p className="text-lg font-medium" suppressHydrationWarning>
        {time}
      </p>
    </div>
  );
}
