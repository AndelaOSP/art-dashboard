import expect from 'expect';
import filterValuesReducer from '../../_reducers/allFilterValues.reducer';
import constants from '../../_constants';

import { cohorts } from '../../_mock/filters';

const {
  FETCH_FILTER_VALUES_START,
  FETCH_FILTER_VALUES_SUCCESS,
  FETCH_FILTER_VALUES_FAILURE
} = constants;

const initialState = {
  cohorts: [],
  allocatedAssets: [],
  isLoading: false,
  hasError: false
};

const action = { filters: {} };

describe('Filter Values Reducer', () => {
  it('should return initial state when there is no action', () => {
    expect(filterValuesReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCH_FILTER_VALUES_START', () => {
    action.type = FETCH_FILTER_VALUES_START;
    expect(filterValuesReducer(initialState, action).isLoading).toEqual(true);
    expect(filterValuesReducer(initialState, action).cohorts).toEqual([]);
  });

  it('should handle FETCH_FILTER_VALUES_SUCCESS', () => {
    action.type = FETCH_FILTER_VALUES_SUCCESS;
    action.filters.cohorts = cohorts;
    expect(filterValuesReducer(initialState, action).isLoading).toEqual(false);
    expect(filterValuesReducer(initialState, action).hasError).toEqual(false);
    expect(filterValuesReducer(initialState, action).cohorts).toEqual(action.filters.cohorts);
  });

  it('should handle FETCH_FILTER_VALUES_FAILURE', () => {
    action.type = FETCH_FILTER_VALUES_FAILURE;
    expect(filterValuesReducer(initialState, action).isLoading).toEqual(false);
    expect(filterValuesReducer(initialState, action).cohorts).toEqual([]);
    expect(filterValuesReducer(initialState, action).hasError).toEqual(true);
  });
});
