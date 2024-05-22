import { useReduxSelector } from "./reduxHooks";

export const useToastr = () => useReduxSelector((state) => state.toastr);
