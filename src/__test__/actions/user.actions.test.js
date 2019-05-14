import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadUserDetail, updateUserDetail } from '../../_actions/user.actions';
import { userDetail as user } from '../../_mock/users';

const userDetail = [
  {
    id: 105,
    email: 'user@user.com',
    full_name: 'User',
    cohort: '0',
    slack: 'the_user'
  },
  {
    detail: 'Not Found'
  }
];

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('User Detail action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'users/';
  const userDetailUrl = `users/${user.id}`;
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOADING_USER when loadUserDetail is called successfully', () => {
    mock.onGet(`${url}${105}`).reply(200, [userDetail[0]]);

    return store.dispatch(loadUserDetail(105)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: [userDetail[0]],
        type: 'LOAD_USER_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_USER_SUCCESS when loadUserDetail is called successfully', () => {
    mock.onGet(`${url}${105}`).reply(200, [userDetail[0]]);

    return store.dispatch(loadUserDetail(105)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: [userDetail[0]],
        type: 'LOAD_USER_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_USER_FAILURE when loadUserDetail fails', () => {
    mock.onGet(`${url}1231`).reply(200, userDetail[1]);

    return store.dispatch(loadUserDetail(34)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 404',
        type: 'LOAD_USER_FAILURE'
      });
    });
  });
  it('should dispatch UPDATE_USER_SUCCESS when updateUserDetail is called successfully', () => {
    mock.onPatch(userDetailUrl).reply(200, user);
    return store.dispatch(updateUserDetail(user)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: user,
        type: 'UPDATE_USER_SUCCESS'
      });
    });
  });

  it('should dispatch UPDATE_USER_FAILURE when updateUserDetail is called unsuccessfully', () => {
    mock.onPatch().reply(404, {});
    return store.dispatch(updateUserDetail(userDetail)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 404',
        type: 'UPDATE_USER_FAILURE'
      });
    });
  });
});
