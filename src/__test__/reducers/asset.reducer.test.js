// third-party library
import expect from 'expect';

// reducer
import assetReducer from '../../_reducers/asset.reducer';

// mock data
import { asset, newAllocation, unAssignedAsset } from '../../_mock/asset';

// constants
import constants from '../../_constants';

const { LOAD_ASSET_SUCCESS,
  LOAD_ASSET_FAILURE,
  LOADING_ASSET,
  NEW_ALLOCATION_SUCCESS,
  NEW_ALLOCATION_FAILURE,
  UNASSIGN_SUCCESS,
  UNASSIGN_FAILURE,
  BUTTON_LOADING
} = constants;

const state = {
  assetDetail: {},
  newAllocation: {},
  unAssignedAsset: {},
  buttonLoading: false,
  errorMessage: '',
  hasError: false,
  isLoading: false
};
const action = {
  payload: { asset }
};

const action2 = {
  payload: { newAllocation }
};

const action3 = {
  payload: { unAssignedAsset }
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetReducer(state, {})).toEqual(state);
  });

  it('should handle LOAD_ASSET_SUCCESS', () => {
    action.type = LOAD_ASSET_SUCCESS;
    expect(assetReducer(state, action).assetDetail).toEqual(action.payload);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSET_FAILURE', () => {
    action.type = LOAD_ASSET_FAILURE;
    expect(assetReducer(state, action).hasError).toBe(true);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOADING_ASSET', () => {
    action.type = LOADING_ASSET;
    expect(assetReducer(state, action).isLoading).toBe(true);
  });

  it('should handle NEW_ALLOCATION_SUCCESS', () => {
    action2.type = NEW_ALLOCATION_SUCCESS;
    expect(assetReducer(state, action2).hasError).toEqual(false);
  });

  it('should handle NEW_ALLOCATION_FAILURE', () => {
    action2.type = NEW_ALLOCATION_FAILURE;
    expect(assetReducer(state, action2).hasError).toBe(true);
  });

  it('should handle UNASSIGN_SUCCESS', () => {
    action.type = UNASSIGN_SUCCESS;
    expect(assetReducer(state, action3).hasError).toBe(false);
  });

  it('should handle UNASSIGN_FAILURE', () => {
    action3.type = UNASSIGN_FAILURE;
    expect(assetReducer(state, action3).hasError).toBe(true);
  });

  it('should handle BUTTON_LOADING', () => {
    action.type = BUTTON_LOADING;
    action.payload = true;
    expect(assetReducer(state, action).buttonLoading).toBe(true);
  });
});
