// third-party library
import expect from 'expect';

// reducer
import assetMakeReducer from '../../_reducers/assetMake.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import { randomAssetMakes } from '../../_mock/assetMakes';

import { loadAssetMakesSuccess, addAssetMakesSuccess } from '../../_actions/assetMakes.actions';

const payload = {
  results: randomAssetMakes
};

describe('Asset Makes Reducer tests', () => {
  it('should handle LOAD_ASSET_MAKES_SUCCESS', () => {
    const action = loadAssetMakesSuccess(payload);
    expect(mockStore.assetMakes.length).toEqual(0);
    expect(assetMakeReducer(mockStore.assetMakes, action)).toEqual(payload.results);
  });

  it('should handle ADD_ASSET_MAKE_SUCCESS', () => {
    const newAssetMake = { id: 5, asset_make: 'Test asset make', asset_type: 'Test asset type' };
    const expected = [newAssetMake];
    const action = addAssetMakesSuccess(newAssetMake);
    expect(mockStore.assetMakes.length).toEqual(0);
    expect(assetMakeReducer(mockStore.assetMakes, action)).toEqual(expected);
  });
});
