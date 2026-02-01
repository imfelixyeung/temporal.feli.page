"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTimezoneStore } from "@/store/timezone";
import { useState } from "react";

const SelectTimezone = () => {
  const [timezones] = useState<string[]>(() => {
    if (Intl.supportedValuesOf) {
      return Intl.supportedValuesOf("timeZone");
    }
    // Provide a fallback for unsupported browsers
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return [defaultTimezone];
  });
  const { timezone, setTimezone } = useTimezoneStore();

  return (
    <div className="mt-2 flex items-center gap-2">
      <label htmlFor="timezone-select" className="sr-only">
        Timezone:
      </label>
      <Select
        value={timezone}
        onValueChange={(value) => value && setTimezone(value)}
      >
        <SelectTrigger id="timezone-select">
          <SelectValue placeholder="Select timezone" />
        </SelectTrigger>
        <SelectContent>
          {timezones.map((timezone) => (
            <SelectItem key={timezone} value={timezone}>
              {timezone}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTimezone;
