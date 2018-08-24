import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadUsers, loadDropDownUsers, addSecurityUser } from '../../_actions/users.actions';
import constants from '../../_constants';
import users, { SecurityUser } from '../../_mock/users';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_DROPDOWN_USERS_SUCCESS,
  UPDATE_TOAST_MESSAGE_CONTENT,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE
} = constants;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Action tests', () => {
  const mock = new MockAdapter(axios);
  const pageNumber = 1;
  const limit = 10;
  const url = `users?page=${pageNumber}&page_size=${limit}`;
  const url2 = '/users/?paginate=false';
  const url3 = '/security-users/';
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOADING_USERS with isLoading true when fetching users', () => {
    mock.onGet(url).reply(200, users);
    return store.dispatch(loadUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        isLoading: true,
        type: LOADING_USERS
      });
    });
  });

  it('should dispatch LOADING_USERS with isLoading false when done fetching users', () => {
    mock.onGet(url).reply(200, users);
    return store.dispatch(loadUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        isLoading: false,
        type: LOADING_USERS
      });
    });
  });

  it('should dispatch LOAD_USERS_SUCCESS when loadUsers is called successfully', () => {
    mock.onGet(url).reply(200, users);
    return store.dispatch(loadUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: users,
        type: LOAD_USERS_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_USERS_FAILURE when loadUsers is called unsuccessfully', () => {
    mock.onGet(url).reply(404, {});
    return store.dispatch(loadUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 404',
        type: LOAD_USERS_FAILURE
      });
    });
  });

  it('should dispatch LOAD_USERS_SUCCESS when loadDropDownUsers is called successfully', () => {
    mock.onGet(url2).reply(200, users);
    return store.dispatch(loadDropDownUsers()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: users,
        type: LOAD_DROPDOWN_USERS_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_USERS_FAILURE when loadDropDownUsers is called unsuccessfully', () => {
    mock.onGet(url2).reply(404, {});
    return store.dispatch(loadDropDownUsers()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 404',
        type: LOAD_USERS_FAILURE
      });
    });
  });

  it('should dispatch CREATE_SECURITY_USER_SUCCESS when addSecurityUser is called successfully', () => {
    mock.onPost(url3).reply(201, SecurityUser);
    return store.dispatch(addSecurityUser()).then(() => {
      expect(store.getActions()[0].type).toEqual(CREATE_SECURITY_USER_SUCCESS);
      expect(store.getActions()[1].type).toEqual(UPDATE_TOAST_MESSAGE_CONTENT);
    });
  });

  it('should dispatch CREATE_SECURITY_USER_SUCCESS when addSecurityUser is called successfully', () => {
    mock.onPost(url3).reply(401);
    return store.dispatch(addSecurityUser()).then(() => {
      expect(store.getActions()[0].type).toEqual(CREATE_SECURITY_USER_FAILURE);
      expect(store.getActions()[1].type).toEqual(UPDATE_TOAST_MESSAGE_CONTENT);
    });
  });
});
