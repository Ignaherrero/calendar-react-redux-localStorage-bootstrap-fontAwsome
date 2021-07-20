import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export let store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
