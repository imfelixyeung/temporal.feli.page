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

/**
 * Render an info icon that shows a tooltip with the provided content.
 *
 * @param content - The content to display inside the tooltip.
 * @param side - Position of the tooltip relative to the trigger (default: "top").
 * @param align - Alignment of the tooltip relative to the trigger (default: "center").
 * @param className - Optional additional CSS classes applied to the tooltip content.
 * @returns A React element rendering an information icon that opens a tooltip containing `content`.
 */
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
