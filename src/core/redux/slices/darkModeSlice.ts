import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type darkModeType = {
  name: "dark" | "light";
};

const darkModeChecker = () => {
  let darkMode: "dark" | "light" = "light";

  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    darkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    if (localStorage && localStorage?.getItem("user-preference") !== null) {
      darkMode = JSON.parse(localStorage.getItem("user-preference") ?? "").theme
        .mode;
    }
    return darkMode;
  }
};

const initialState: darkModeType = {
  name: darkModeChecker() ?? "light",
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode(
      state: typeof initialState,
      action: PayloadAction<darkModeType>
    ) {
      const { name } = action.payload;
      state.name = name;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const { reducer: darkModeReducer } = darkModeSlice;
