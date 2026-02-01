"use client";

import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const themeOptions = [
  {
    value: "light",
    label: (
      <>
        <SunIcon className="mr-2 size-4" />
        Light
      </>
    ),
  },
  {
    value: "dark",
    label: (
      <>
        <MoonIcon className="mr-2 size-4" />
        Dark
      </>
    ),
  },
  {
    value: "system",
    label: (
      <>
        <MonitorIcon className="mr-2 size-4" />
        System
      </>
    ),
  },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="theme-select" className="sr-only">
          Theme:
        </label>
        <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
      </div>
    );
  }

  const selectedOption = themeOptions.find((option) => option.value === theme);

  return (
    <div className="mt-2 flex items-center gap-2">
      <label htmlFor="theme-select" className="sr-only">
        Theme:
      </label>
      <Select value={theme} onValueChange={(value) => value && setTheme(value)}>
        <SelectTrigger id="theme-select" className="w-32">
          <SelectValue placeholder="Select theme">
            {selectedOption?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {themeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
