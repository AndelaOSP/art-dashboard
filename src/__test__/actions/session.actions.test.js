// third-party libraries
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// constants
import constants from '../../_constants';

// actions
import { expireSession } from '../../_actions/session.action';

// mock data
let isSessionExpired = false;

const { SESSION_EXPIRED } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

afterEach(() => {
  store.clearActions();
});

describe('Session action when a session is expired', () => {
  store = mockStore({});
  it('dispatches SESSION_EXPIRED type and sets isSessionExpired to true', () => {
    isSessionExpired = true;
    store.dispatch(expireSession(isSessionExpired));
    expect(store.getActions()[0].type).toEqual(SESSION_EXPIRED);
    expect(store.getActions()[0].isSessionExpired).toEqual(true);
  });
});

describe('Session action when a session is not expired ', () => {
  store = mockStore({});
  it('dispatches SESSION_EXPIRED type and sets isSessionExpired to false', () => {
    isSessionExpired = false;
    store.dispatch(expireSession(isSessionExpired));
    expect(store.getActions()[0].type).toEqual(SESSION_EXPIRED);
    expect(store.getActions()[0].isSessionExpired).toEqual(false);
  });
});
