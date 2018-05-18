import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../_reducers';
import logger from 'redux-logger';

const middleware = [thunk];

const useReduxDevTools = () => {
  return window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
}

let createStoreWithMiddleware;

if (process.env.NODE_ENV === 'production') {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware)
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(...middleware, logger),
    useReduxDevTools()
  )(createStore);
}

const store = createStoreWithMiddleware(rootReducer);

export default store;