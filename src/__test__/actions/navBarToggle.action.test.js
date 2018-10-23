import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import toggleVisibility from '../../_actions/navBarToggle.action';

const { TOGGLE_NAVIGATION_BAR_VISIBILITY } = constants;

const mockStore = configureMockStore([thunk]);
let store;

describe('Toggle visibility action tests', () => {
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch VISIBILITY_TOGGLED', () => {
    store.dispatch(toggleVisibility());

    expect(store.getActions())
      .toContainEqual({ type: TOGGLE_NAVIGATION_BAR_VISIBILITY });
  });
});
