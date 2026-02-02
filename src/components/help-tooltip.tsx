"use client";

import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HelpTooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
}

export function HelpTooltip({
  content,
  side = "top",
  align = "center",
  className,
}: HelpTooltipProps) {
  return (
    <Tooltip delay={300}>
      <TooltipTrigger aria-label="Help">
        <InfoIcon
          className="text-muted-foreground inline-block h-4 w-4 cursor-help"
          aria-hidden="true"
        />
      </TooltipTrigger>
      <TooltipContent side={side} align={align} className={className}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
