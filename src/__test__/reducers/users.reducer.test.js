import expect from 'expect';
import constants from '../../_constants';
import usersReducer from '../../_reducers/users.reducer';
import users, { SecurityUser, AssetAssignee } from '../../_mock/users';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE
} = constants;

const initialState = {
  usersList: {
    users: {},
    assetAsigneeUsers: [],
    assetsCount: 0,
    hasError: false,
    isLoading: false,
    securityUser: {},
    activePage: 1
  }
};

const action = { payload: {} };

describe('Users Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(usersReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_USERS_SUCCESS', () => {
    action.type = LOAD_USERS_SUCCESS;
    action.payload.results = users;

    expect(usersReducer(initialState.usersList, action).users).toEqual({
      page_1: [...action.payload.results]
    });
    expect(usersReducer(initialState, action).hasError).toEqual(false);
  });

  it('should handle LOAD_USERS_FAILURE', () => {
    action.type = LOAD_USERS_FAILURE;
    expect(usersReducer(initialState, action).users).toEqual([]);
    expect(usersReducer(initialState, action).hasError).toEqual(true);
  });

  it('should handle LOADING_USERS', () => {
    action.type = LOADING_USERS;
    action.isLoading = true;
    expect(usersReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle LOAD_ASSET_ASSIGNEE_USERS_SUCCESS', () => {
    action.type = LOAD_ASSET_ASSIGNEE_USERS_SUCCESS;
    action.payload = AssetAssignee;
    expect(usersReducer(initialState, action).assetAsigneeUsers).toEqual(action.payload);
  });

  it('should handle CREATE_SECURITY_USER_SUCCESS', () => {
    action.type = CREATE_SECURITY_USER_SUCCESS;
    action.payload = SecurityUser;
    expect(usersReducer(initialState, action).securityUser).toEqual(action.payload);
  });

  it('should handle CREATE_SECURITY_USER_FAILURE', () => {
    action.type = CREATE_SECURITY_USER_FAILURE;
    expect(usersReducer(initialState, action).errorMessage).toEqual(action.payload);
  });
});
