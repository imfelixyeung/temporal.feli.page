import z from "zod";

export const timestampUnits = ["auto", "seconds", "milliseconds"] as const;
export const timestampUnitSchema = z.enum(timestampUnits);
export type TimestampUnit = z.infer<typeof timestampUnitSchema>;

export const timestampUnitLabels: Record<TimestampUnit, string> = {
  auto: "Auto detect",
  milliseconds: "Milliseconds",
  seconds: "Seconds",
};
