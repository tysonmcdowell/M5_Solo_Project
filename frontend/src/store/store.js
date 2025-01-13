import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// modified code

const configureStore = (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);

  // Attach store to window for debugging
  if (import.meta.env.MODE !== "production") {
    window.store = store;
  }

  return store;
};

// modified code

export default configureStore;
