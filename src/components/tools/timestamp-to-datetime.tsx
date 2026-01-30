"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

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

    if (timestampNum > 253402300799) { // Year 9999
      return { result: "", error: "Timestamp is too large (exceeds year 9999)" };
    }

    const date = new Date(timestampNum * 1000);
    if (isNaN(date.getTime())) {
      return { result: "", error: "Invalid timestamp" };
    }

    return { 
      result: format(date, "yyyy-MM-dd HH:mm:ss (EEEE)"), 
      error: "" 
    };
  }, [timestamp]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Enter Unix timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleCurrentTimestamp} variant="outline">
          Current
        </Button>
      </div>
      
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {result && !error && (
        <div className="text-sm text-green-700 bg-green-50 p-3 rounded-md border border-green-200">
          <div className="font-semibold mb-1">Converted Date/Time:</div>
          <div className="font-mono">{result}</div>
        </div>
      )}
    </div>
  );
}
