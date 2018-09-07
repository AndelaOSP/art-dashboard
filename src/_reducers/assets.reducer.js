import constants from '../_constants';
import initialState from './initialState';

const {
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS
} = constants;

export default (state = initialState.assets, action) => {
  switch (action.type) {
    case CREATE_ASSET_SUCCESS:
      return {
        ...state,
        assetsList: [action.payload, ...state.assetsList],
        assetsCount: state.assetsCount + 1,
        hasError: false,
        isLoading: false
      };
    case CREATE_ASSET_FAIL:
      return {
        ...state,
        hasError: true
      };
    case LOAD_ASSETS_STARTS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOAD_ASSETS_SUCCESS:
      return {
        ...state,
        assetsList: action.payload.results,
        assetsCount: action.payload.count,
        hasError: false,
        isLoading: action.isLoading
      };
    case LOAD_ASSETS_FAILURE:
      return {
        ...state,
        assetsList: [],
        assetsCount: 0,
        errorMessage: action.payload,
        hasError: true,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
