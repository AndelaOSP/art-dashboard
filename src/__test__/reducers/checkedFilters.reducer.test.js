import expect from 'expect';
import filtersReducer from '../../_reducers/checkedFilters.reducer';
import constants from '../../_constants';

const { FILTER_SELECTED } = constants;

const initialState = {};

const action = {
  selection: {},
  filterType: 'Model Numbers'
};
const verificationAction = {
  selection: {},
  filterType: 'Verification Status'
};

const activeAction = {
  selection: {},
  filterType: 'Active'
};

describe('Checked Filters Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(filtersReducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle FILTER_SELECTED', () => {
    action.type = FILTER_SELECTED;
    expect(filtersReducer(initialState, action))
      .toEqual({
        'Model Numbers': []
      });
  });

  it('should handle verification status', () => {
    verificationAction.type = FILTER_SELECTED;
    expect(filtersReducer(initialState, verificationAction))
      .toEqual({
        'Verification Status': []
      });
  });

  it('should handle active security status', () => {
    activeAction.type = FILTER_SELECTED;
    expect(filtersReducer(initialState, activeAction))
      .toEqual({
        Active: []
      });
  });
}
);
