import { create, StateCreator } from "zustand";

type TimezoneStore = {
  timezone: string;
  setTimezone: (timezone: string) => void;
};

const getDefaultTimezone = () => {
  if (typeof window === "undefined") return "UTC";
  return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";
};

export const timezoneStoreCreator: StateCreator<TimezoneStore> = (set) => ({
  timezone: getDefaultTimezone(),
  setTimezone: (timezone: string) => set(() => ({ timezone })),
});

export const useTimezoneStore = create<TimezoneStore>()(timezoneStoreCreator);
