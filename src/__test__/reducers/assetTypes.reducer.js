// third-party library
import expect from 'expect';

// reducer
import assetTypeReducer from '../../_reducers/assetType.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import assetTypes from '../../_mock/assetTypes';

import { loadAssetTypesSuccess } from '../../_actions/assetTypes.actions';

describe('Asset Type Reducer tests', () => {
  it('should handle LOAD_ASSET_TYPES_SUCCESS', () => {
    let action = loadAssetTypesSuccess(assetTypes);
    expect(mockStore.assetTypes.length).toEqual(0);
    expect(assetTypeReducer(mockStore.assetTypes, action)).toEqual(assetTypes);
  });
});
