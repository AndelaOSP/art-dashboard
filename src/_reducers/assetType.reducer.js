import constants from '../_constants';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE } = constants;

const initialState = {
  assetTypes: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ASSET_TYPE_SUCCESS:
      return {
        ...state,
        assetTypes: [...action.payload.data],
        isLoading: false,
      };
    case LOAD_ASSET_TYPE_FAILURE:
      return {
        ...state,
        assetTypes: [],
        isLoading: false
      };
    default:
      return state;
  }
};
