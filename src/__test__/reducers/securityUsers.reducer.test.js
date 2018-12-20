import expect from 'expect';
import constants from '../../_constants';
import securityUsersReducer from '../../_reducers/securityUsers.reducer';
import { SecurityUser, securityUsers } from '../../_mock/users';

const {
  CREATE_SECURITY_USER_REQUEST,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE,
  LOAD_SECURITY_USERS_REQUEST,
  LOAD_SECURITY_USERS_SUCCESS,
  LOAD_SECURITY_USERS_FAILURE,
  RESET_STATUS_MESSAGE,
  SET_USERS_ACTIVE_PAGE
} = constants;

const initialState = {
  activePage: 1,
  usersList: {
    page_1: []
  },
  usersCount: 0,
  errorMessage: '',
  successMessage: '',
  isLoading: false
};

const action = { payload: {} };

describe('Users Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(securityUsersReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle CREATE_SECURITY_USER_REQUEST', () => {
    action.type = CREATE_SECURITY_USER_REQUEST;
    action.payload = SecurityUser;

    expect(securityUsersReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle CREATE_SECURITY_USER_SUCCESS', () => {
    action.type = CREATE_SECURITY_USER_SUCCESS;
    action.payload = SecurityUser;

    expect(securityUsersReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle CREATE_SECURITY_USER_FAILURE', () => {
    action.type = CREATE_SECURITY_USER_FAILURE;
    action.payload = SecurityUser;

    expect(securityUsersReducer(initialState, action).errorMessage).toEqual(action.payload);
  });

  it('should handle LOAD_SECURITY_USERS_REQUEST', () => {
    action.type = LOAD_SECURITY_USERS_REQUEST;
    action.payload = securityUsers;

    expect(securityUsersReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle LOAD_SECURITY_USERS_SUCCESS', () => {
    action.type = LOAD_SECURITY_USERS_SUCCESS;
    action.payload = securityUsers;

    expect(securityUsersReducer(initialState, action).usersCount).toEqual(3);
  });

  it('should handle LOAD_SECURITY_USERS_FAILURE', () => {
    action.type = LOAD_SECURITY_USERS_FAILURE;
    action.payload = securityUsers;

    expect(securityUsersReducer(initialState, action).errorMessage).toEqual(action.payload);
  });

  it('should handle SET_USERS_ACTIVE_PAGE', () => {
    action.type = SET_USERS_ACTIVE_PAGE;
    action.payload = 1;

    expect(securityUsersReducer(initialState, action).activePage).toEqual(action.payload);
  });

  it('should handle RESET_STATUS_MESSAGE', () => {
    action.type = RESET_STATUS_MESSAGE;

    expect(securityUsersReducer(initialState, action).successMessage).toEqual('');
    expect(securityUsersReducer(initialState, action).errorMessage).toEqual('');
  });
});
