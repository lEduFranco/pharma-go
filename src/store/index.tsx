import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./ducks";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware()));

const composeEnhancers = composeWithDevTools({});
const store = createStore(reducers, composeEnhancers(applyMiddleware()));

export default store;
