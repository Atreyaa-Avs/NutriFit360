import { ProfileState } from "@/store/useProfileStore";

export const mapProfileToRequestBody = (profile: ProfileState) => ({
  Sex: profile.gender === "male" ? 1 : 0,
  Age: profile.age,
  Height: profile.height,
  Weight: profile.weight,
  Hypertension: profile.hypertension === "yes" ? 1 : 0,
  Diabetes: profile.diabetes === "yes" ? 1 : 0,
  BMI: profile.bmi,
  Level: (() => {
    switch (profile.fitnessLevel.toLowerCase()) {
      case "underweight": return 0;
      case "normal": return 1;
      case "overweight": return 2;
      case "obese": return 3;
      default: return 1;
    }
  })(),
  Fitness_Goal: profile.fitnessGoal === "Weight Gain" ? 0 : 1,
  Fitness_Type: profile.fitnessType === "Muscular Fitness" ? 0 : 1,
});
