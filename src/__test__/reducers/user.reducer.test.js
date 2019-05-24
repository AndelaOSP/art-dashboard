import expect from 'expect';

import constants from '../../_constants';

import userDetailReducer from '../../_reducers/user.reducer';

const { LOADING_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE } = constants;

const state = {
  userDetail: {},
  errorMessage: '',
  successMessage: '',
  hasError: false,
  isLoading: false
};

const userDetail = [
  {
    id: 106,
    email: 'user1@user.com',
    full_name: 'User',
    cohort: '0',
    slack: 'the_user1'
  },
  {
    detail: 'Not Found'
  }
];

describe('User Detail Reducer tests', () => {
  it('should handle LOADING_USER', () => {
    const action = { type: LOADING_USER, isLoading: true };
    expect(userDetailReducer(state, action).isLoading).toEqual(true);
  });

  it('should handle LOAD_USER_SUCCESS', () => {
    const action = { type: LOAD_USER_SUCCESS, payload: userDetail[0], isLoading: false };
    expect(userDetailReducer(state, action)).toEqual({
      errorMessage: '',
      hasError: false,
      isLoading: false,
      successMessage: '',
      userDetail: action.payload
    });
  });

  it('should handle LOAD_USER_FAILURE', () => {
    const action = { type: LOAD_USER_FAILURE, payload: userDetail[1], isLoading: false };
    expect(userDetailReducer(state, action)).toEqual({
      errorMessage: { detail: 'Not Found' },
      hasError: true,
      isLoading: false
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const action = { type: UPDATE_USER_SUCCESS, payload: userDetail[0], isLoading: false };
    expect(userDetailReducer(state, action)).toEqual({
      errorMessage: '',
      hasError: false,
      isLoading: false,
      successMessage: 'Record updated succesfully',
      userDetail: action.payload
    });
  });

  it('should handle UPDATE_USER_FAILURE', () => {
    const action = { type: UPDATE_USER_FAILURE, payload: userDetail[1], isLoading: false };
    expect(userDetailReducer(state, action)).toEqual({
      errorMessage: { detail: 'Not Found' },
      hasError: true,
      isLoading: false
    });
  });
});
