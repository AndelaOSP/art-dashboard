import constants from '../_constants';
import initialState from './initialState';

const {
  FETCH_FILTER_VALUES_START,
  FETCH_FILTER_VALUES_SUCCESS,
  FETCH_FILTER_VALUES_FAILURE
} = constants;

const filterValuesReducer = (state = initialState.filters, action) => {
  switch (action.type) {
    case FETCH_FILTER_VALUES_START:
      return {
        ...state,
        isLoading: true
      };

    case FETCH_FILTER_VALUES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cohorts: action.filters.cohorts,
        allocatedAssets: action.filters.asset_count
      };

    case FETCH_FILTER_VALUES_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        cohorts: [],
        allocatedAssets: []
      };

    default:
      return state;
  }
};

export default filterValuesReducer;
