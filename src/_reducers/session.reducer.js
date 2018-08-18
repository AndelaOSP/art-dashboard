import constants from '../_constants';
import initialState from './initialState';

const { SESSION_EXPIRED } = constants;

export default (state = initialState.session, action) => {
  switch (action.type) {
    case SESSION_EXPIRED:
      return { ...state, sessionExpired: action.isSessionExpired };
    default:
      return state;
  }
};
