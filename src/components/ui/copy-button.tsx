"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./button";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | "xs";
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  enableKeyboardShortcut?: boolean;
}

export function CopyButton({
  value,
  label = "value",
  className,
  size = "icon-sm",
  variant = "ghost",
  enableKeyboardShortcut = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy text:", fallbackErr);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }, [value]);

  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "c" &&
        containerRef.current?.contains(document.activeElement)
      ) {
        event.preventDefault();
        handleCopy();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardShortcut, handleCopy]);

  return (
    <div ref={containerRef} className={className}>
      <Button
        onClick={handleCopy}
        variant={variant}
        size={size}
        aria-label={`Copy ${label}`}
        title={`Copy ${label}`}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <CopyIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
