// third-party library
import expect from 'expect';

// reducer
import modelNumberReducer from '../../_reducers/modelNumber.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import modelNumbers from '../../_mock/modelNumbers';

import { loadModelNumbersSuccess } from '../../_actions/modelNumbers.actions';

describe('Category Reducer tests', () => {
  it('should handle LOAD_ASSET_MODEL_NUMBERS', () => {
    let action = loadModelNumbersSuccess(modelNumbers);
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action)).toEqual(modelNumbers);
  });
});
