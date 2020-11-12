import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  siteurl: null,
  list: [],
  approved: false,
  auth: null,
  done: [],
  uploading: false,
  authenticating: false,
};

export type RootState = ReturnType<typeof reducer>;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_SITE_URL":
      return {
        ...state,
        siteurl: action.payload,
      };
    case "START_UPLOADING":
      return {
        ...state,
        uploading: true,
      };
    case "STOP_UPLOADING":
      return {
        ...state,
        uploading: false,
      };
    case "START_AUTHENTICATING":
      return {
        ...state,
        authenticating: true,
      };
    case "STOP_AUTHENTICATING":
      return {
        ...state,
        authenticating: false,
      };
    case "SET_AUTH":
      return {
        ...state,
        auth: action.payload,
      };
    case "SET_LIST":
      return {
        ...state,
        list: action.payload,
      };
    case "APPROVE_LIST":
      return {
        ...state,
        approved: true,
      };
    case "ADD_DONE":
      return {
        ...state,
        done: state.done.concat([action.payload]),
      };
    default:
      return state;
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState?: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
