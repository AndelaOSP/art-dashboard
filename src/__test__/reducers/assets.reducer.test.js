// third-party library
import expect from 'expect';

// reducer
import assetReducer from '../../_reducers/assets.reducer';

// mock data
import asset from '../../_mock/asset';
import assets from '../../_mock/assets';

import {
  createAssetSuccess,
  createAssetFail,
  createAssetRequest
} from '../../_actions/asset.actions';

// constants
import constants from '../../_constants';

const {
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS,
  SET_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE
} = constants;

const state = {
  assetsList: {},
  assetsCount: 0,
  hasError: false,
  isLoading: false,
  activePage: 1
};
let action = {
  payload: {
    results: assets
  }
};
const error = {
  response: {
    data: {
      non_field_errors: ['The fields asset_code and serial_number must be unique.']
    }
  }
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetReducer(state, {})).toEqual(state);
  });

  it('should handle LOAD_ASSETS_SUCCESS', () => {
    action.type = LOAD_ASSETS_SUCCESS;
    action.isLoading = false;
    expect(assetReducer(state, action).assetsList).toEqual({
      page_1: [...action.payload.results]
    });
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle SET_ACTIVE_PAGE', () => {
    const actionTest = {
      payload: 1
    };
    actionTest.type = SET_ACTIVE_PAGE;
    expect(assetReducer(state, actionTest).activePage).toEqual(actionTest.payload);
  });

  it('should handle LOAD_ASSETS_FAILURE', () => {
    action.type = LOAD_ASSETS_FAILURE;
    action.isLoading = false;
    expect(assetReducer(state, action).hasError).toBe(true);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSETS_STARTS', () => {
    action.type = LOAD_ASSETS_STARTS;
    action.isLoading = true;
    expect(assetReducer(state, action).isLoading).toBe(true);
  });

  it('should handle CREATE_ASSET_REQUEST', () => {
    action = createAssetRequest(asset);
    expect(assetReducer(state, {})).toEqual(state);
    expect(assetReducer(state, action).isLoading).toEqual(true);
  });

  it('should handle CREATE_ASSET_SUCCESS', () => {
    const expected = asset;
    action = createAssetSuccess(asset);
    expect(assetReducer(state, {})).toEqual(state);
    expect(assetReducer(state, action).assetsList.page_1[0]).toEqual(expected);
    expect(assetReducer(state, action).assetsCount).toEqual(1);
  });

  it('should handle CREATE_ASSET_FAIL', () => {
    action = createAssetFail(error);
    expect(assetReducer(state, action)).toEqual({
      ...state,
      hasError: true,
      success: '',
      errorMessage: 'The fields asset_code and serial_number must be unique.'
    });
  });

  it('should handle RESET_STATUS_MESSAGE', () => {
    action.type = RESET_STATUS_MESSAGE;
    expect(assetReducer(state, {})).toEqual(state);
    expect(assetReducer(state, action).success).toEqual('');
    expect(assetReducer(state, action).errorMessage).toEqual('');
  });
});
