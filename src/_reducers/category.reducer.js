import initialState from './initialState';
import constants from '../_constants';

const {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE
} = constants;


export default (state = initialState.categories, action) => {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      };

    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        categories: [],
        isLoading: false
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories,
        isLoading: false
      };

    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
