import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ASSET_SPECS_START,
  LOAD_ASSET_SPECS_SUCCESS,
  LOAD_ASSET_SPECS_FAILURE
} = constants;

const loadAssetSpecsReducer = (state = initialState.assetSpecs, action) => {
  switch (action.type) {
    case LOAD_ASSET_SPECS_START:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_ASSET_SPECS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        specs: action.assetSpecs.results,
        assetSpecsCount: action.assetSpecs.count,
        previousUrl: action.assetSpecs.previous,
        nextUrl: action.assetSpecs.next
      };

    case LOAD_ASSET_SPECS_FAILURE:
      return {
        ...state,
        hasError: true,
        isLoading: false
      };

    default:
      return state;
  }
};

export default loadAssetSpecsReducer;
