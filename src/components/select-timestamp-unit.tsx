import { timestampUnitLabels, timestampUnits } from "@/schema/timestamp-units";
import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SelectTimestampUnit = ({
  ...props
}: ComponentProps<typeof Select>) => {
  return (
    <Select items={timestampUnitLabels} {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {timestampUnits.map((unit) => (
          <SelectItem key={unit} value={unit}>
            {timestampUnitLabels[unit]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
