import expect from 'expect';
import checkedFilters from '../../_reducers/checkedFilters.reducer';
import constants from '../../_constants';

const { ADD_CHECKED_FILTER
} = constants;

const initialState = {};

const action = { checkedFilter: {} };

describe('Checked Filters Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(checkedFilters(initialState, action))
      .toEqual(initialState);
  });

  it('should handle ADD_CHECKED_FILTER', () => {
    action.type = ADD_CHECKED_FILTER;
    action.checkedFilter = {};
    expect(checkedFilters(initialState, action))
      .toEqual(action.checkedFilter);
  });
});
