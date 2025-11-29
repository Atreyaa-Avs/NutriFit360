import { createMMKV } from "react-native-mmkv";

// -----------------------------
// MMKV GLOBAL STORAGE
// -----------------------------
// create default MMKV instance
export const mmkv = createMMKV({
  id: "nutrifit-storage",
});

// wrapper API
export const storage = {
  set: (key: string, value: string | number | boolean) => {
    mmkv.set(key, value);
  },
  getString: (key: string): string | undefined => {
    return mmkv.getString(key);
  },
  getNumber: (key: string): number | undefined => {
    return mmkv.getNumber(key);
  },
  getBoolean: (key: string): boolean | undefined => {
    return mmkv.getBoolean(key);
  },
  delete: (key: string) => {
    mmkv.remove(key);
  },
};
