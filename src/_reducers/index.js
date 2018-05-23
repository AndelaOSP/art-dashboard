import { combineReducers } from 'redux';
import assetReducer from './asset.reducer';

const rootReducer = combineReducers({
  assetReducer,
});

export default rootReducer;
