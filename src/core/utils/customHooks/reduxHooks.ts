import { useSelector } from "react-redux";
import { reduxStoreStateType } from "src/core/redux/rootReducer";

export const useReduxSelector = <
  TSelected extends reduxStoreStateType[keyof reduxStoreStateType]
>(
  // eslint-disable-next-line no-unused-vars
  selector: (state: reduxStoreStateType) => TSelected
): TSelected => useSelector<reduxStoreStateType, TSelected>(selector);
