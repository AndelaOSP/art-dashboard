import expect from 'expect';

import centresReducer from '../../_reducers/centres.reducer';
import centres from '../../_mock/centres';
import constants from '../../_constants';

const {
  LOAD_CENTRES,
  LOAD_CENTRES_SUCCESS,
  LOAD_CENTRES_FAILURE
} = constants;

const state = {
  centreCount: 0,
  centreList: [],
  isLoading: false,
  error: ''
};

const action = {
  payload: {
    results: centres.results,
    count: centres.count
  }
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(centresReducer(state, {})).toEqual(state);
  });

  it('should handle UPDATE_ASSET_SUCCESS', () => {
    action.type = LOAD_CENTRES;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      isLoading: true
    }));
  });

  it('should handle LOAD_CENTRES_SUCCESS', () => {
    action.type = LOAD_CENTRES_SUCCESS;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      centreCount: 2,
      centreList: action.payload.results,
      isLoading: false
    }));
  });

  it('should handle LOAD_CENTRES_FAILURE', () => {
    action.type = LOAD_CENTRES_FAILURE;

    expect(centresReducer(state, action)).toEqual(expect.objectContaining({
      isLoading: false
    }));
  });
});
