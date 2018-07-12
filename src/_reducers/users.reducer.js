import constants from '../_constants';
import initialState from './initialState';

const { LOAD_USER_DETAILS_SUCCESS } = constants;

export default (state = initialState.users, action) => {
  switch (action.type) {
    case LOAD_USER_DETAILS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

