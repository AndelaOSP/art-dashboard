// third-party library
import expect from 'expect';

// reducer
import assetMakeReducer from '../../_reducers/assetMake.reducer';

// initial mock State
import mockStore from '../../_mock/mockStore';

// mock data
import assetMakes from '../../_mock/assetMakes';
import constants from '../../_constants';
import { addAssetMakesSuccess } from '../../_actions/assetMakes.actions';

const {
  LOAD_ASSET_MAKES_SUCCESS,
  LOAD_ASSET_MAKES_FAILURE,
  LOADING_ASSET_MAKES
} = constants;

let action = { payload: {} };

describe('Asset Makes Reducer tests', () => {
  it('should handle LOAD_ASSET_MAKES_SUCCESS', () => {
    action.type = LOAD_ASSET_MAKES_SUCCESS;
    action.payload.results = assetMakes;
    expect(assetMakeReducer(mockStore.assetMakes, action)
      .assetMakes).toEqual(action.payload.results);
  });

  it('should handle LOAD_ASSET_MAKES_FAILURE', () => {
    action.type = LOAD_ASSET_MAKES_FAILURE;
    expect(assetMakeReducer(mockStore.assetMakes, action).assetMakes).toEqual([]);
    expect(assetMakeReducer(mockStore.assetMakes, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_SUBCATEGORIES', () => {
    action.type = LOADING_ASSET_MAKES;
    expect(assetMakeReducer(mockStore.assetMakes, action).assetMakes).toEqual([]);
    expect(assetMakeReducer(mockStore.assetMakes, action).isLoading).toEqual(true);
  });

  it('should handle ADD_ASSET_MAKE_SUCCESS', () => {
    const newAssetMake = { id: 5, asset_make: 'Test asset make', asset_type: 'Test asset type' };
    const expected = [newAssetMake];
    action = addAssetMakesSuccess(newAssetMake);
    expect(mockStore.assetMakes.assetMake.length).toEqual(0);
    expect(assetMakeReducer(mockStore.assetMakes.assetMake, action)).toEqual(expected);
  });
});
