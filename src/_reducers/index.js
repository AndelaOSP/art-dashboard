import { combineReducers } from 'redux';
import loginReducer from './login.reducer';

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
