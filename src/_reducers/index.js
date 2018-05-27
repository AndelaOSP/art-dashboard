import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import assetTypeReducer from './assetType.reducer';
import assetsReducer from './assets.reducer';

const rootReducer = combineReducers({
  loginReducer,
  assetTypeReducer,
  assetsReducer,
});

export default rootReducer;
