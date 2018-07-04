import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE
} = constants;

export default (state = initialState.subcategories, action) => {
  switch (action.type) {
    case LOAD_SUBCATEGORIES_SUCCESS:
      return action.payload;

    case LOAD_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };

    case CREATE_SUBCATEGORY_SUCCESS:
      return [...state, action.payload];

    case CREATE_SUBCATEGORY_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};
