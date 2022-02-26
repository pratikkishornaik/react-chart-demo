export const loaderConstants = {
  SHOW_LOADER: "SHOW_LOADER",
  HIDE_LOADER: "HIDE_LOADER",
};

const initialState = {
  loading: false,
};

export function loader(state: any = initialState, action: any) {
  switch (action.type) {
    case loaderConstants.SHOW_LOADER:
      return {
        ...state,
        loading: true,
      };
    case loaderConstants.HIDE_LOADER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
