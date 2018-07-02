import constants from '../_constants';

const {
  LOAD_ASSET_TYPES_SUCCESS,
  LOAD_ASSET_TYPES_FAILURE,
  LOADING_ASSET_TYPES
} = constants;

const initialState = {
  assetTypes: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ASSET_TYPES:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_ASSET_TYPES_SUCCESS:
      return {
        ...state,
        assetTypes: [...action.payload],
        isLoading: false
      };
    case LOAD_ASSET_TYPES_FAILURE:
      return {
        ...state,
        assetTypes: [],
        isLoading: false
      };
    default:
      return state;
  }
};
