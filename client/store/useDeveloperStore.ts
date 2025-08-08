import { create } from "zustand";

export type DeveloperState = {
  IP: string;
  setField: <K extends keyof DeveloperState>(
    field: K,
    value: DeveloperState[K]
  ) => void;
};

export const useDeveloperStore = create<DeveloperState>((set) => ({
  IP: "192.168.56.1",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));
