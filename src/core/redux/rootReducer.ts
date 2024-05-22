import { combineReducers } from "@reduxjs/toolkit";
import { darkModeReducer } from "./slices/darkModeSlice";
import { toastrReducer } from "./slices/toastrSlice";
import { userFarmsReducer } from "./slices/userFarmsReducer";

export const rootReducer = combineReducers({
  userFarms: userFarmsReducer,
  toastr: toastrReducer,
  darkMode: darkModeReducer,
});

export type reduxStoreStateType = ReturnType<typeof rootReducer>;

export type reduxStoreStateKeysArrayType = Array<keyof reduxStoreStateType>;

export default rootReducer;
