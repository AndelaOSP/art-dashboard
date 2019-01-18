import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addSecurityUser, loadSecurityUsers } from '../../_actions/securityUsers.actions';
import constants from '../../_constants';
import { SecurityUser, securityUsers } from '../../_mock/users';

const {
  CREATE_SECURITY_USER_REQUEST,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE,
  LOAD_SECURITY_USERS_REQUEST,
  LOAD_SECURITY_USERS_SUCCESS,
  LOAD_SECURITY_USERS_FAILURE
} = constants;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Security users tests', () => {
  const mock = new MockAdapter(axios);
  const pageNumber = 1;
  const limit = 10;
  const url = '/security-users/';
  const url2 = `/security-users/?page=${pageNumber}&page_size=${limit}`;
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
});
