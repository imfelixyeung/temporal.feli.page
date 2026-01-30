import { create, StateCreator } from "zustand";

type ClockStore = {
  time: Date;
  tick: () => void;
};

export const clockStoreCreator: StateCreator<ClockStore> = (set) => ({
  time: new Date(),
  tick: () => set(() => ({ time: new Date() })),
});

export const useClockStore = create<ClockStore>()(clockStoreCreator);
