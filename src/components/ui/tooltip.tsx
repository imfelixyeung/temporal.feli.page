"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";

/**
 * Wraps and renders a Tooltip provider with a configurable default delay and forwarded props.
 *
 * @param delay - Milliseconds to wait before showing the tooltip (default: 0)
 * @returns A TooltipPrimitive.Provider element with `data-slot="tooltip-provider"`, the configured `delay`, and all other props forwarded
 */
function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  );
}

/**
 * Composes a tooltip root by wrapping TooltipPrimitive.Root with a TooltipProvider and applying an optional delay.
 *
 * @param delay - The tooltip show/hide delay in milliseconds; defaults to 0.
 * @param props - Remaining props forwarded to TooltipPrimitive.Root.
 * @returns The composed tooltip root element (TooltipPrimitive.Root wrapped in TooltipProvider).
 */
function Tooltip({
  delay = 0,
  ...props
}: TooltipPrimitive.Root.Props & { delay?: number }) {
  return (
    <TooltipProvider delay={delay}>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

/**
 * Render a tooltip trigger element that forwards received props and sets data-slot="tooltip-trigger".
 *
 * @returns The tooltip trigger element with forwarded props
 */
function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

/**
 * Renders the tooltip content and arrow with default placement, offsets, styling, and entry/exit animations.
 *
 * @param className - Additional CSS classes to apply to the tooltip popup
 * @param side - Preferred side of the trigger to place the tooltip (default: "top")
 * @param sideOffset - Distance in pixels between trigger and tooltip along the chosen side (default: 4)
 * @param align - Alignment of the tooltip relative to the trigger on the cross axis (default: "center")
 * @param alignOffset - Offset in pixels applied to the alignment (default: 0)
 * @param children - Content to be rendered inside the tooltip popup
 * @returns The rendered tooltip content element including the popup and arrow
 */
function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 bg-foreground text-background z-50 w-fit max-w-xs origin-(--transform-origin) rounded-md px-3 py-1.5 text-xs",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };