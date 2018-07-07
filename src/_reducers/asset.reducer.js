import constants from '../_constants';
import initialState from './initialState';

const {
  LOADING_ASSET,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_SUCCESS
} = constants;

export default (state = initialState.asset, action) => {
  switch (action.type) {
    case LOADING_ASSET:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_ASSET_SUCCESS:
      return {
        ...state,
        assetDetail: action.payload,
        hasError: false,
        isLoading: false
      };
    case LOAD_ASSET_FAILURE:
      return {
        ...state,
        assetDetail: {},
        errorMessage: action.payload,
        hasError: true,
        isLoading: false
      };
    default:
      return state;
  }
};
