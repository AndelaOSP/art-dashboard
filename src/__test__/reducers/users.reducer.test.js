import expect from 'expect';
import constants from '../../_constants';
import usersReducer from '../../_reducers/users.reducer';
import users from '../../_mock/users';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_DROPDOWN_USERS_SUCCESS,
  LOAD_DROPDOWN_USERS_FAILURE,
  LOADING_DROPDOWN_USERS
} = constants;

const initialState = {
  usersList: {
    users: [],
    assetsCount: 0,
    hasError: false,
    isLoading: false
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
    expect(usersReducer(initialState, action).users).toEqual(action.payload.results);
    expect(usersReducer(initialState, action).hasError).toEqual(false);
    expect(usersReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_USERS_FAILURE', () => {
    action.type = LOAD_USERS_FAILURE;
    expect(usersReducer(initialState, action).users).toEqual([]);
    expect(usersReducer(initialState, action).isLoading).toEqual(false);
    expect(usersReducer(initialState, action).hasError).toEqual(true);
  });

  it('should handle LOADING_USERS', () => {
    action.type = LOADING_USERS;
    expect(usersReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle LOAD_DROPDOWN_USERS_SUCCESS', () => {
    action.type = LOAD_DROPDOWN_USERS_SUCCESS;
    action.payload = users;
    expect(usersReducer(initialState, action).users).toEqual(action.payload);
    expect(usersReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_DROPDOWN_USERS_FAILURE', () => {
    action.type = LOAD_DROPDOWN_USERS_FAILURE;
    expect(usersReducer(initialState, action).users).toEqual([]);
    expect(usersReducer(initialState, action).isLoading).toEqual(false);
    expect(usersReducer(initialState, action).hasError).toEqual(true);
  });

  it('should handle LOADING_DROPDOWN_USERS', () => {
    action.type = LOADING_DROPDOWN_USERS;
    expect(usersReducer(initialState, action).isLoading).toEqual(true);
  });
});
