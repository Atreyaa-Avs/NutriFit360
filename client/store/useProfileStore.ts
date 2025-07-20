import { create } from "zustand";

export type ProfileState = {
  age: number;
  bmi: number;
  height: number;
  weight: number;
  gender: string;
  hypertension: string;
  diabetes: string;
  fitnessLevel: string;
  fitnessGoal: string;
  fitnessType: string;
  setField: <K extends keyof ProfileState>(
    field: K,
    value: ProfileState[K]
  ) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  age: 19,
  bmi: 26,
  height: 1.6,
  weight: 68,
  gender: "male",
  hypertension: "no",
  diabetes: "no",
  fitnessLevel: "normal",
  fitnessGoal: "Weight Loss",
  fitnessType: "Muscular Fitness",
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));

export const titleToKey: Record<string, keyof ProfileState> = {
  Age: "age",
  BMI: "bmi",
  Height: "height",
  Weight: "weight",
  Gender: "gender",
  Hypertension: "hypertension",
  Diabetes: "diabetes",
  "Fitness Level": "fitnessLevel",
  "Fitness Goal": "fitnessGoal",
  "Fitness Type": "fitnessType",
};
