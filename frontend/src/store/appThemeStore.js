import { create } from "zustand";

export const appThemeStore = create((set, get) => ({
  isDarkMode: false,

  toggleDarkMode: () => {
    set({ isDarkMode: !get().isDarkMode });
  },
}));
