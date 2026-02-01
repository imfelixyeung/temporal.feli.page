import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import SelectTimezone from "../select-timezone";

const Header = ({
  className,
  ...props
}: Omit<ComponentProps<"header">, "children">) => {
  return (
    <header className={cn("border-b py-2", className)} {...props}>
      <div className="container flex items-center justify-between">
        <div className="text-lg font-medium">Temporal</div>
        <SelectTimezone />
      </div>
    </header>
  );
};

export default Header;
