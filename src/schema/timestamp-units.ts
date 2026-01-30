import z from "zod";

export const timestampUnits = ["seconds", "milliseconds"] as const;
export const timestampUnitSchema = z.enum(timestampUnits);
export type TimestampUnit = z.infer<typeof timestampUnitSchema>;
