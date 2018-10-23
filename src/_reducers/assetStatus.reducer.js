import constants from '../_constants';
import initialState from './initialState';

const {
  ASSET_STATUS_LOADING,
  ASSET_STATUS_FETCH_SUCCESS,
  ASSET_STATUS_FETCH_FAILURE
} = constants;

export default (state = initialState.assetStatus, action) => {
  switch (action.type) {
    case ASSET_STATUS_LOADING:
      return {
        ...state,
        [action.statusType]: {
          ...state[action.statusType],
          loading: action.loading,
          errorMessage: '',
          count: 0
        }
      };

    case ASSET_STATUS_FETCH_SUCCESS:
      return {
        ...state,
        [action.statusType]: {
          ...state[action.statusType],
          assets: action.payload.results,
          count: action.payload.count
        }
      };

    case ASSET_STATUS_FETCH_FAILURE:
      return {
        ...state,
        [action.statusType]: {
          ...state[action.statusType],
          errorMessage: action.payload,
          count: 0
        }
      };

    default:
      return state;
  }
};
