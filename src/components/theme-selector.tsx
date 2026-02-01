"use client";

import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const items = [
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

  return (
    <div className="mt-2 flex items-center gap-2">
      <label htmlFor="theme-select" className="sr-only">
        Theme:
      </label>
      <Select
        value={theme}
        onValueChange={(value) => value && setTheme(value)}
        items={items}
      >
        <SelectTrigger id="theme-select" className="w-32">
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <SunIcon className="mr-2 size-4" />
            Light
          </SelectItem>
          <SelectItem value="dark">
            <MoonIcon className="mr-2 size-4" />
            Dark
          </SelectItem>
          <SelectItem value="system">
            <MonitorIcon className="mr-2 size-4" />
            System
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
