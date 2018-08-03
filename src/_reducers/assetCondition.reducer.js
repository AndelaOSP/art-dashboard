import constants from '../_constants';
import initialState from './initialState';

const {
  LOADING_ASSET_CONDITION,
  LOAD_ASSET_CONDITION_SUCCESS,
  LOAD_ASSET_CONDITION_FAILURE
} = constants;

export default (state = initialState.assetConditions, action) => {
  switch (action.type) {
    case LOADING_ASSET_CONDITION:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_ASSET_CONDITION_SUCCESS:
      return {
        ...state,
        assetConditionsList: action.payload.results,
        assetConditionsCount: action.payload.count,
        isLoading: false
      };

    case LOAD_ASSET_CONDITION_FAILURE:
      return {
        ...state,
        assetConditionsList: [],
        assetConditionsCount: 0,
        isLoading: false
      };

    default:
      return state;
  }
};
