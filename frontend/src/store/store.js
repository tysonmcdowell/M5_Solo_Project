import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Corrected import
import sessionReducer from './session';
import spotsReducer from './spots';

const rootReducer = combineReducers({
    session: sessionReducer,
    spots: spotsReducer,
});

let enhancer;

if (import.meta.env.MODE === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = (await import('redux-logger')).default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preLoadedState) => {
    return createStore(rootReducer, preLoadedState, enhancer);
};

export default configureStore;
