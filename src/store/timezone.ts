import { create, StateCreator } from "zustand";

type TimezoneStore = {
  timezone: string;
  setTimezone: (timezone: string) => void;
};

export const timezoneStoreCreator: StateCreator<TimezoneStore> = (set) => ({
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  setTimezone: (timezone: string) => set(() => ({ timezone })),
});

export const useTimezoneStore = create<TimezoneStore>()(timezoneStoreCreator);
