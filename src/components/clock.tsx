"use client";

import { useMemo, useState } from "react";
import { useInterval } from "react-use";

const start = new Date(0);
const startString = start.toDateString();

export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  // Update the clock every second
  useInterval(() => setNow(new Date()), 1000);

  const { seconds, time } = useMemo(
    () => ({
      seconds: Math.round(now.getTime() / 1000),
      time: now.toLocaleTimeString(),
    }),
    [now]
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-linear-to-r from-indigo-50 to-purple-50 border border-gray-200">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-3 tabular-nums">
        {seconds}
        <br />
        Seconds since {startString}
      </h2>
      <p className="text-lg font-medium text-purple-800">{time}</p>
    </div>
  );
}
