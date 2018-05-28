import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import assetReducer from './asset.reducer';

const rootReducer = combineReducers({
  loginReducer,
  assetReducer,
});

export default rootReducer;
