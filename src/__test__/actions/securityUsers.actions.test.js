import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addSecurityUser,
  loadSecurityUsers,
  updateActiveStatus
} from '../../_actions/securityUsers.actions';
import constants from '../../_constants';
import { SecurityUser, securityUsers } from '../../_mock/users';

const {
  CREATE_SECURITY_USER_REQUEST,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE,
  LOAD_SECURITY_USERS_REQUEST,
  LOAD_SECURITY_USERS_SUCCESS,
  LOAD_SECURITY_USERS_FAILURE,
  UPDATE_ACTIVE_STATUS_REQUEST,
  UPDATE_ACTIVE_STATUS_FAILURE
} = constants;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Security users tests', () => {
  const mock = new MockAdapter(axios);
  const pageNumber = 1;
  const limit = 10;
  const id = 0;
  const filters = { Active: ['false'] };
  const url = '/security-users/';
  const url2 = `/security-users/?page=${pageNumber}&page_size=${limit}&is_active=${'true'}`;
  const url3 = `/security-users/${id}`;
  const url4 = `/security-users/?page=${pageNumber}&page_size=${limit}&is_active=${filters.Active[0]}`;

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch CREATE_SECURITY_USER_REQUEST when addSecurityUser is called', () => {
    mock.onPost(url).reply(201, SecurityUser);
    return store.dispatch(addSecurityUser(SecurityUser)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_SECURITY_USER_REQUEST
      });
    });
  });

  it('should dispatch CREATE_SECURITY_USER_SUCCESS when addSecurityUser succeeds', () => {
    mock.onPost(url).reply(201, SecurityUser);
    return store.dispatch(addSecurityUser(SecurityUser)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_SECURITY_USER_SUCCESS,
        payload: SecurityUser
      });
    });
  });

  it('should dispatch CREATE_SECURITY_USER_FAILURE when addSecurityUser fails', () => {
    mock.onPost(url).reply(400);
    return store.dispatch(addSecurityUser(SecurityUser)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_SECURITY_USER_FAILURE,
        payload: new Error('Request failed with status code 400')
      });
    });
  });

  it('should dispatch LOAD_SECURITY_USERS_REQUEST when loadSecurityUsers is called', () => {
    mock.onGet(url2).reply(200);
    return store.dispatch(loadSecurityUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_SECURITY_USERS_REQUEST
      });
    });
  });

  it('should dispatch LOAD_SECURITY_USERS_SUCCESS when loadSecurityUsers succeeds', () => {
    mock.onGet(url2).reply(200, securityUsers);
    return store.dispatch(loadSecurityUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_SECURITY_USERS_SUCCESS,
        payload: securityUsers
      });
    });
  });

  it('should dispatch LOAD_SECURITY_USERS_FAILURE when loadSecurityUsers fails', () => {
    mock.onGet(url2).reply(401);
    return store.dispatch(loadSecurityUsers(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_SECURITY_USERS_FAILURE,
        payload: 'Request failed with status code 401'
      });
    });
  });

  it('should dispatch LOAD_SECURITY_USERS_SUCCESS when loadSecurityUsers succeeds with filters', () => {
    mock.onGet(url4).reply(200, securityUsers);
    return store.dispatch(loadSecurityUsers(pageNumber, limit, filters)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_SECURITY_USERS_SUCCESS,
        payload: securityUsers
      });
    });
  });

  it('should dispatch LOAD_SECURITY_USERS_FAILURE when loadSecurityUsers fails with filters', () => {
    mock.onGet(url4).reply(401);
    return store.dispatch(loadSecurityUsers(pageNumber, limit, filters)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_SECURITY_USERS_FAILURE,
        payload: 'Request failed with status code 401'
      });
    });
  });

  it('should dispatch UPDATE_ACTIVE_STATUS_REQUEST when a user wants to update', () => {
    mock.onGet(url3).reply(200);
    return store.dispatch(updateActiveStatus(id, securityUsers)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: UPDATE_ACTIVE_STATUS_REQUEST
      });
    });
  });

  it('should dispatch UPDATE_ACTIVE_STATUS_FAILURE when an update fails', () => {
    mock.onGet(url3).reply(401);
    return store.dispatch(updateActiveStatus(id, securityUsers)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: UPDATE_ACTIVE_STATUS_FAILURE,
        payload: 'Request failed with status code 404'
      });
    });
  });
});
