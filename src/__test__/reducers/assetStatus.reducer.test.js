import expect from 'expect';

import constants from '../../_constants';
import assetStatusReducer from '../../_reducers/assetStatus.reducer';

const {
  LOAD_AVAILABLE_ASSETS_REQUEST,
  LOAD_AVAILABLE_ASSETS_SUCCESS,
  LOAD_AVAILABLE_ASSETS_FAILURE,
  LOAD_LOST_ASSETS_REQUEST,
  LOAD_LOST_ASSETS_SUCCESS,
  LOAD_LOST_ASSETS_FAILURE,
  LOAD_DAMAGED_ASSETS_REQUEST,
  LOAD_DAMAGED_ASSETS_SUCCESS,
  LOAD_DAMAGED_ASSETS_FAILURE,
  LOAD_ALLOCATED_ASSETS_REQUEST,
  LOAD_ALLOCATED_ASSETS_SUCCESS,
  LOAD_ALLOCATED_ASSETS_FAILURE
} = constants;

const state = {
  lostAssets: {
    assetsList: [],
    assetsCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    activePage: 1
  },
  damagedAssets: {
    assetsList: [],
    assetsCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    activePage: 1
  },
  allocatedAssets: {
    assetsList: [],
    assetsCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    activePage: 1
  },
  availableAssets: {
    assetsList: [],
    assetsCount: 0,
    errorMessage: '',
    hasError: false,
    isLoading: false,
    activePage: 1
  }
};

const action = {
  payload: {}
};

describe('Asset Status Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetStatusReducer(state, {}))
      .toEqual(state);
  });

  it('should handle LOAD_ALLOCATED_ASSETS_REQUEST', () => {
    action.type = LOAD_ALLOCATED_ASSETS_REQUEST;
    expect(assetStatusReducer(state, action).allocatedAssets.isLoading)
      .toBe(true);
  });

  it('should handle LOAD_ALLOCATED_ASSETS_SUCCESS', () => {
    action.type = LOAD_ALLOCATED_ASSETS_SUCCESS;
    expect(assetStatusReducer(state, action).allocatedAssets.assetsList)
      .toEqual(action.payload.results);
    expect(assetStatusReducer(state, action).allocatedAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_ALLOCATED_ASSETS_FAILURE', () => {
    action.type = LOAD_ALLOCATED_ASSETS_FAILURE;
    expect(assetStatusReducer(state, action).allocatedAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_AVAILABLE_ASSETS_REQUEST', () => {
    action.type = LOAD_AVAILABLE_ASSETS_REQUEST;
    expect(assetStatusReducer(state, action).availableAssets.isLoading)
      .toBe(true);
  });

  it('should handle LOAD_AVAILABLE_ASSETS_SUCCESS', () => {
    action.type = LOAD_AVAILABLE_ASSETS_SUCCESS;
    expect(assetStatusReducer(state, action).availableAssets.assetsList)
      .toEqual(action.payload.results);
    expect(assetStatusReducer(state, action).availableAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_AVAILABLE_ASSETS_FAILURE', () => {
    action.type = LOAD_AVAILABLE_ASSETS_FAILURE;
    expect(assetStatusReducer(state, action).availableAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_DAMAGED_ASSETS_REQUEST', () => {
    action.type = LOAD_DAMAGED_ASSETS_REQUEST;
    expect(assetStatusReducer(state, action).damagedAssets.isLoading)
      .toBe(true);
  });

  it('should handle LOAD_DAMAGED_ASSETS_SUCCESS', () => {
    action.type = LOAD_DAMAGED_ASSETS_SUCCESS;
    expect(assetStatusReducer(state, action).damagedAssets.assetsList)
      .toEqual(action.payload.results);
    expect(assetStatusReducer(state, action).damagedAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_DAMAGED_ASSETS_FAILURE', () => {
    action.type = LOAD_DAMAGED_ASSETS_FAILURE;
    expect(assetStatusReducer(state, action).damagedAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_LOST_ASSETS_REQUEST', () => {
    action.type = LOAD_LOST_ASSETS_REQUEST;
    expect(assetStatusReducer(state, action).lostAssets.isLoading)
      .toBe(true);
  });

  it('should handle LOAD_LOST_ASSETS_SUCCESS', () => {
    action.type = LOAD_LOST_ASSETS_SUCCESS;
    expect(assetStatusReducer(state, action).lostAssets.assetsList)
      .toEqual(action.payload.results);
    expect(assetStatusReducer(state, action).lostAssets.isLoading)
      .toBe(false);
  });

  it('should handle LOAD_LOST_ASSETS_FAILURE', () => {
    action.type = LOAD_LOST_ASSETS_FAILURE;
    expect(assetStatusReducer(state, action).lostAssets.isLoading)
      .toBe(false);
  });
});
