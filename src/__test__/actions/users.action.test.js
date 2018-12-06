import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadUsers, loadAssetAssigneeUsers, addSecurityUser } from '../../_actions/users.actions';
import constants from '../../_constants';
import users, { SecurityUser, AssetAssignee } from '../../_mock/users';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
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
  const url2 = 'asset-assignee/?paginate=false';
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
        isFiltered: false,
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

  it('should dispatch LOAD_USERS_SUCCESS when loadAssetAssigneeUsers is called successfully', () => {
    mock.onGet(url2).reply(200, AssetAssignee);
    return store.dispatch(loadAssetAssigneeUsers()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: AssetAssignee,
        type: LOAD_ASSET_ASSIGNEE_USERS_SUCCESS
      });
    });
  });

  it('should dispatch LOAD_USERS_FAILURE when loadAssetAssigneeUsers is called unsuccessfully', () => {
    mock.onGet(url2).reply(404, {});
    return store.dispatch(loadAssetAssigneeUsers()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 404',
        type: LOAD_USERS_FAILURE
      });
    });
  });

  it('should dispatch CREATE_SECURITY_USER_SUCCESS when addSecurityUser is called successfully', () => {
    mock.onPost(url3).reply(201, SecurityUser);
    return store.dispatch(addSecurityUser()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_SECURITY_USER_SUCCESS,
        payload: SecurityUser
      });
    });
  });

  it('should dispatch UPDATE_TOAST_MESSAGE_CONTENT when addSecurityUser is called successfully', () => {
    mock.onPost(url3).reply(201, SecurityUser);
    return store.dispatch(addSecurityUser()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: UPDATE_TOAST_MESSAGE_CONTENT,
        payload: { message: 'New Security User Added Successfully', type: 'success' }
      });
    });
  });

  it('should dispatch CREATE_SECURITY_USER_FAILURE when addSecurityUser is fails', () => {
    mock.onPost(url3).reply(401);
    return store.dispatch(addSecurityUser()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_SECURITY_USER_FAILURE,
        payload: 'Request failed with status code 401'
      });
    });
  });

  it('should dispatch UPDATE_TOAST_MESSAGE_CONTENT when addSecurityUser fails', () => {
    mock.onPost(url3).reply(401, SecurityUser);
    return store.dispatch(addSecurityUser()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: UPDATE_TOAST_MESSAGE_CONTENT,
        payload: { message: 'Could not save Security User', type: 'error' }
      });
    });
  });
});
