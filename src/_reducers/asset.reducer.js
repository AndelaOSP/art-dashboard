import constants from '../_constants';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE } = constants;

const initialState = {
  assetTypes: [],
  assetTypesCount: 0, 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ASSET_TYPE_SUCCESS:
      return {
        ...state,
        assetTypes: [...action.payload.data],
        assetTypesCount: action.payload.headers['x-total-count'],
      }
    case LOAD_ASSET_TYPE_FAILURE:
      return {
        ...state,
        assetTypes: [],
      }
    default:
      return state;
  }
}
