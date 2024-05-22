import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type toastrType = {
  message: string;
  type: "error" | "warning" | "info" | "success";
  visibility: boolean;
};

const initialState: toastrType = {
  message: "",
  type: "info",
  visibility: false,
};

const toastrSlice = createSlice({
  name: "toastr",
  initialState,
  reducers: {
    setMessage(
      state: typeof initialState,
      action: PayloadAction<Omit<toastrType, "visibility">>
    ) {
      const { message, type } = action.payload;

      state.message = message; // eslint-disable-line
      state.type = type; // eslint-disable-line
      state.visibility = true; // eslint-disable-line
    },

    hideMessage(state: typeof initialState) {
      state.visibility = false; // eslint-disable-line
    },
  },
});

export const { setMessage: setToastrMessage, hideMessage: hideToastrMessage } =
  toastrSlice.actions;

export const { reducer: toastrReducer } = toastrSlice;
