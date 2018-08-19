// third-party library
import expect from 'expect';
import constants from '../../_constants';
import sessionReducer from '../../_reducers/session.reducer';

const {
  SESSION_EXPIRED
} = constants;

const initialState = {
  sessionExpired: false
};

const action = { payload: {} };

describe('Session Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(sessionReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle SESSION_EXPIRED when the session is expired', () => {
    action.type = SESSION_EXPIRED;
    action.isSessionExpired = true;
    expect(sessionReducer(initialState, action).sessionExpired).toEqual(true);
  });

  it('should handle SESSION_EXPIRED when the session is not expired', () => {
    action.type = SESSION_EXPIRED;
    action.isSessionExpired = false;
    expect(sessionReducer(initialState, action).sessionExpired).toEqual(false);
  });
});
