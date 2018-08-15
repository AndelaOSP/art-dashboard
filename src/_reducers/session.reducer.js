import constants from '../_constants';
import initialState from './initialState';

const { SESSION_EXPIRED, SESSION_UNEXPIRED } = constants;

export default (state = initialState.session, action) => {
  switch (action.type) {
    case SESSION_EXPIRED:
      return { ...state, sessionExpired: true };
    case SESSION_UNEXPIRED:
      return { ...state, sessionExpired: false };
    default:
      return state;
  }
};
