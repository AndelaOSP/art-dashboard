import constants from '../_constants';

const { LOAD_ASSET_TYPE_SUCCESS,
  LOAD_ASSET_TYPE_FAILURE,
  LOADING_ASSET_TYPE
} = constants;

const initialState = {
  assetType: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ASSET_TYPE_SUCCESS:
      return { ...state,
        assetType: action.payload,
        isLoading: false
      };
    case LOAD_ASSET_TYPE_FAILURE:
      return { ...state,
        assetType: action.payload,
        isLoading: false
      };
    case LOADING_ASSET_TYPE:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
