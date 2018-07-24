import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  LOADING_SUBCATEGORIES,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE,
  DROPDOWN_SUBCATEGORIES_SUCCESS
} = constants;

export default (state = initialState.subcategories, action) => {
  switch (action.type) {
    case LOADING_SUBCATEGORIES:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        assetSubCategories: [...action.payload.results],
        assetSubCategoriesCount: action.payload.count,
        isLoading: false
      };

    case DROPDOWN_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        assetSubCategoriesDropdown: action.payload,
        isLoading: false
      };

    case LOAD_SUBCATEGORIES_FAILURE:
      return {
        ...state,
        assetSubCategoriesDropdown: [],
        assetSubCategories: [],
        assetSubCategoriesCount: 0,
        isLoading: false
      };

    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        message: action.payload
      };

    case CREATE_SUBCATEGORY_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
