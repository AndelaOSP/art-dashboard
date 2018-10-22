import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_AVAILABLE_ASSETS_REQUEST,
  LOAD_AVAILABLE_ASSETS_SUCCESS,
  LOAD_AVAILABLE_ASSETS_FAILURE,
  LOAD_LOST_ASSETS_REQUEST,
  LOAD_LOST_ASSETS_SUCCESS,
  LOAD_LOST_ASSETS_FAILURE,
  LOAD_DAMAGED_ASSETS_REQUEST,
  LOAD_DAMAGED_ASSETS_SUCCESS,
  LOAD_DAMAGED_ASSETS_FAILURE,
  LOAD_ALLOCATED_ASSETS_REQUEST,
  LOAD_ALLOCATED_ASSETS_SUCCESS,
  LOAD_ALLOCATED_ASSETS_FAILURE
} = constants;

export default (state = initialState.assetStatus, action) => {
  switch (action.type) {
    case LOAD_AVAILABLE_ASSETS_REQUEST:
      return {
        ...state,
        availableAssets: {
          ...state.availableAssets,
          isLoading: true
        }
      };

    case LOAD_AVAILABLE_ASSETS_SUCCESS:
      return {
        ...state,
        availableAssets: {
          ...state.availableAssets,
          assetsList: action.payload.results,
          assetsCount: action.payload.count,
          hasError: false,
          isLoading: false
        }
      };

    case LOAD_AVAILABLE_ASSETS_FAILURE:
      return {
        ...state,
        availableAssets: {
          ...state.availableAssets,
          assetsList: [],
          assetsCount: 0,
          errorMessage: action.payload,
          hasError: true,
          isLoading: false
        }
      };

    case LOAD_LOST_ASSETS_REQUEST:
      return {
        ...state,
        lostAssets: {
          ...state.lostAssets,
          isLoading: true
        }
      };

    case LOAD_LOST_ASSETS_SUCCESS:
      return {
        ...state,
        lostAssets: {
          ...state.lostAssets,
          assetsList: action.payload.results,
          assetsCount: action.payload.count,
          hasError: false,
          isLoading: false
        }
      };

    case LOAD_LOST_ASSETS_FAILURE:
      return {
        ...state,
        lostAssets: {
          ...state.lostAssets,
          assetsList: [],
          assetsCount: 0,
          errorMessage: action.payload,
          hasError: true,
          isLoading: false
        }
      };

    case LOAD_DAMAGED_ASSETS_REQUEST:
      return {
        ...state,
        damagedAssets: {
          ...state.damagedAssets,
          isLoading: true
        }
      };

    case LOAD_DAMAGED_ASSETS_SUCCESS:
      return {
        ...state,
        damagedAssets: {
          ...state.damagedAssets,
          assetsList: action.payload.results,
          assetsCount: action.payload.count,
          hasError: false,
          isLoading: false
        }
      };

    case LOAD_DAMAGED_ASSETS_FAILURE:
      return {
        ...state,
        damagedAssets: {
          ...state.damagedAssets,
          assetsList: [],
          assetsCount: 0,
          errorMessage: action.payload,
          hasError: true,
          isLoading: false
        }
      };

    case LOAD_ALLOCATED_ASSETS_REQUEST:
      return {
        ...state,
        allocatedAssets: {
          ...state.allocatedAssets,
          isLoading: true
        }
      };

    case LOAD_ALLOCATED_ASSETS_SUCCESS:
      return {
        ...state,
        allocatedAssets: {
          ...state.allocatedAssets,
          assetsList: action.payload.results,
          assetsCount: action.payload.count,
          hasError: false,
          isLoading: false
        }
      };

    case LOAD_ALLOCATED_ASSETS_FAILURE:
      return {
        ...state,
        allocatedAssets: {
          ...state.allocatedAssets,
          assetsList: [],
          assetsCount: 0,
          errorMessage: action.payload,
          hasError: true,
          isLoading: false
        }
      };

    default:
      return state;
  }
};
