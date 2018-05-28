import constants from '../_constants';
import initialState from './initialState';

const { LOAD_SUBCATEGORIES_SUCCESS } = constants;

export default (state = initialState.subcategories, action) => {
  switch (action.type) {
    case LOAD_SUBCATEGORIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
