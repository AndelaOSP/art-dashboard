import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ASSET_CATEGORIES_SUCCESS,
  LOAD_ASSET_CATEGORIES_START,
  LOAD_ASSET_CATEGORIES_FAILURE
} = constants;

const loadAssetCategoriesReducer = (state = initialState.assetCategories, action) => {
  switch (action.type) {
    case LOAD_ASSET_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_ASSET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        categories: action.assetCategories.results,
        assetCategoriesCount: action.assetCategories.count,
        previousUrl: action.assetCategories.previous,
        nextUrl: action.assetCategories.next
      };

    case LOAD_ASSET_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true
      };

    default:
      return state;
  }
};

export default loadAssetCategoriesReducer;
