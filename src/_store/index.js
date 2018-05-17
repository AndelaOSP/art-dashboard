import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../_reducers';

const middleware = [thunk];

const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;