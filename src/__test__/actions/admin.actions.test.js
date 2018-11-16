import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import { updateAdminStatus } from '../../_actions/admin.actions';

const { UPDATE_ADMIN_STATUS } = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Admin action tests', () => {
  afterEach(() => {
    store.clearActions();
  });

  store = mockStore({});
  let isAdmin = false;

  it('dispatches UPDATE_ADMIN_STATUS type and sets isAdmin to true', () => {
    isAdmin = true;
    store.dispatch(updateAdminStatus(isAdmin));

    expect(store.getActions()).toContainEqual({
      type: UPDATE_ADMIN_STATUS,
      isAdmin: true
    });
  });
});
