import constants from '../_constants';
import initialState from './initialState';

const { UPDATE_ADMIN_STATUS } = constants;

export default (state = initialState.admin, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_STATUS:
      return { ...state, isAdmin: action.isAdmin };

    default:
      return state;
  }
};
