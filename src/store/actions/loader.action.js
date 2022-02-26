import { loaderConstants } from "../reducer/loader.reducer";
import { actionCreator } from "../initializeStore";

export const showLoader = () => {
  return async function thunk(dispatch) {
    dispatch(actionCreator(loaderConstants.SHOW_LOADER)(""));
  };
};

export const hideLoader = () => {
  return async function thunk(dispatch) {
    dispatch(actionCreator(loaderConstants.HIDE_LOADER)(""));
  };
};
