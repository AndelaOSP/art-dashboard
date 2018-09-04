// third-party library
import expect from 'expect';

// reducer
import modelNumberReducer from '../../_reducers/modelNumber.reducer';

// initial mock State
import mockStore from '../../_mock/mockStore';

// mock data
import { randomModelNumbers } from '../../_mock/modelNumbers';

import {
  loadModelNumbersSuccess,
  createModelNumberSuccess,
  createModelNumberFailure
} from '../../_actions/modelNumbers.actions';

const payload = {
  results: randomModelNumbers
};

describe('Category Reducer tests', () => {
  it('should handle LOAD_ASSET_MODEL_NUMBERS', () => {
    const action = loadModelNumbersSuccess(payload);
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action)).toEqual(payload.results);
  });

  it('should handle CREATE_MODEL_NUMBER_SUCCESS', () => {
    const modelNumberToCreate = {
      model_number: 'MC-LF600',
      make_label: 'Make Label'
    };
    const action = createModelNumberSuccess(modelNumberToCreate);
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action)).toEqual([modelNumberToCreate]);
  });

  it('should handle CREATE_MODEL_NUMBER_FAILURE', () => {
    const action = createModelNumberFailure(
      'Could not create model number'
    );
    expect(mockStore.modelNumbers.length).toEqual(0);
    expect(modelNumberReducer(mockStore.modelNumbers, action)).toEqual([]);
  });
});
