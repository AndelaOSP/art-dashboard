// third-party library
import expect from 'expect';

// reducer
import assetReducer from '../../_reducers/assets.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import asset from '../../_mock/asset';

import {
  createAssetSuccess,
  createAssetFail
} from '../../_actions/asset.actions';

describe('Asset Reducer tests', () => {

  it('should handle CREATE_ASSET_SUCCESS', () => {
    let expected = [asset];
    let action = createAssetSuccess(asset);
    expect(mockStore.assets.length).toEqual(0);
    expect(assetReducer(mockStore.assets, action)).toEqual(expected);
  });

  it('should handle CREATE_ASSET_FAIL', () => {
    let action = createAssetFail();
    expect(mockStore.assets.length).toEqual(0);
    expect(assetReducer(mockStore.assets, action).length).toEqual(0);
  });
});
