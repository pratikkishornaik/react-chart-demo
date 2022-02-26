import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer/root.reducer";

const key = "store:state:website";

export const initializeStore = (preloadedState = {}) => {
  var sessionStore = {};

  // try {
  //   sessionStore = parseJson(localStorage.getItem(key));
  // } catch (e) {}

  const store = createStore(
    rootReducer,
    { ...preloadedState, ...sessionStore },
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({})))
  );

  // store.subscribe(() => {
  //   localStorage.setItem(key, JSON.stringify(store.getState()));
  // });

  // store.dispatch(checkLogin());

  return store;
};

const parseJson = (str: string) => {
  try {
    var j = JSON.parse(str);
    return j;
  } catch (e) {
    // return null;
  }
  return j;
};

export const actionCreator = (type: string) => (payload: string) => ({
  type,
  payload,
});
