import { USER_TOKEN_KEY } from "../constants";

export const isLogin = () => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem(USER_TOKEN_KEY);
  }
  return false;
};
