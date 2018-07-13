import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadUsers } from '../../_actions/users.actions';
import constants from '../../_constants';
import users from '../../_mock/users';

const { LOAD_USERS_SUCCESS, LOAD_USERS_FAILURE, LOADING_USERS } = constants;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'users?page=1';
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_USERS_SUCCESS when loadUsers is called successfully', () => {
    mock.onGet(url).reply(200, users);
    return store.dispatch(loadUsers(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_USERS);
      expect(store.getActions()[1].type).toEqual(LOAD_USERS_SUCCESS);
    });
  });

  it('should dispatch LOAD_USERS_FAILURE when loadUsers is called unsuccessfully', () => {
    mock.onGet(url).reply(404, {});
    return store.dispatch(loadUsers(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_USERS);
      expect(store.getActions()[1].type).toEqual(LOAD_USERS_FAILURE);
    });
  });
});
