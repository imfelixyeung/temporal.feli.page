"use client";

import { useMemo, useState } from "react";
import { useInterval } from "react-use";

const start = new Date(0);
const startString = start.toDateString();

const Clock = () => {
  const [now, setNow] = useState(() => new Date());

  useInterval(() => {
    setNow(() => new Date());
  }, 1000);

  const template = useMemo(() => {
    return {
      seconds: Math.round(now.getTime() / 1000),
      milliseconds: now.getTime(),
      time: now.toLocaleTimeString(),
    };
  }, [now]);

  return (
    <div>
      <h2 className="tabular-nums">
        {template.seconds}
        <br />
        Seconds since {startString}
      </h2>
      <p>{template.time}</p>
    </div>
  );
};

export default Clock;
