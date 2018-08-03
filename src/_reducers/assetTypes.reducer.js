import constants from '../_constants';

const {
  LOAD_ASSET_TYPES_SUCCESS,
  LOAD_ASSET_TYPES_FAILURE,
  LOADING_ASSET_TYPES,
  CREATE_ASSET_TYPE_SUCCESS,
  CREATE_ASSET_TYPE_FAILURE,
  LOAD_DROPDOWN_ASSET_TYPES_SUCCESS,
  LOAD_DROPDOWN_ASSET_TYPES_FAILURE
} = constants;

const initialState = {
  assetTypes: [],
  assetTypesCount: 0,
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
        assetTypes: [...action.payload.results],
        assetTypesCount: action.payload.count,
        isLoading: false
      };
    case LOAD_ASSET_TYPES_FAILURE:
      return {
        ...state,
        assetTypes: [],
        assetTypesCount: 0,
        isLoading: false
      };
    case LOAD_DROPDOWN_ASSET_TYPES_SUCCESS:
      return {
        ...state,
        assetTypes: [...action.payload]
      };
    case LOAD_DROPDOWN_ASSET_TYPES_FAILURE:
      return {
        ...state,
        assetTypes: []
      };
    case CREATE_ASSET_TYPE_SUCCESS: {
      state.assetTypes.push(action.payload);
      return {
        ...state,
        assetTypes: state.assetTypes,
        isLoading: false
      };
    }
    case CREATE_ASSET_TYPE_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
