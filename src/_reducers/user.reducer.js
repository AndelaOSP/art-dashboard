import constants from '../_constants';
import initialState from './initialState';

const { LOAD_USER_SUCCESS, LOAD_USER_FAILURE } = constants;

export default (state = initialState.user, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action
      };

    case LOAD_USER_FAILURE:
      return state;

    default:
      return state;
  }
};
