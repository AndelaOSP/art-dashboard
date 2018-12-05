import constants from '../_constants';
import initialState from './initialState';

const {
  LOADING_ASSET,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_SUCCESS,
  NEW_ALLOCATION_SUCCESS,
  NEW_ALLOCATION_FAILURE,
  UNASSIGN_SUCCESS,
  UNASSIGN_FAILURE,
  BUTTON_LOADING,
  UPDATE_ASSET_SUCCESS
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
        isLoading: false,
        buttonLoading: false
      };

    case LOAD_ASSET_FAILURE:
      return {
        ...state,
        assetDetail: {},
        errorMessage: action.payload,
        hasError: true,
        isLoading: false
      };

    case BUTTON_LOADING:
      return {
        ...state,
        buttonLoading: action.payload
      };

    case NEW_ALLOCATION_SUCCESS:
      return {
        ...state,
        newAllocation: action.payload.data
      };

    case NEW_ALLOCATION_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
        newAllocation: {}
      };

    case UNASSIGN_SUCCESS:
      return {
        ...state,
        unAssignedAsset: action.payload.data
      };

    case UNASSIGN_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
        unAssignedAsset: {}
      };

    case UPDATE_ASSET_SUCCESS: {
      return {
        ...state,
        assetDetail: action.payload
      };
    }

    default:
      return state;
  }
};
