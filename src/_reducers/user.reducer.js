import constants from '../_constants';
import initialState from './initialState';

const { LOADING_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } = constants;

export default (state = initialState.user, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
        isLoading: action.isLoading
      };

    case LOAD_USER_FAILURE:
      return {
        isLoading: action.isLoading,
        hasError: true,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};
