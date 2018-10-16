import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_ASSET_SPECS_FAILURE,
  LOAD_ASSET_SPECS_SUCCESS,
  LOAD_ASSET_SPECS_START,
  CREATE_ASSET_SPECS_REQUEST,
  CREATE_ASSET_SPECS_SUCCESS,
  CREATE_ASSET_SPECS_FAILURE
} = constants;

/**
 * Load asset specs successfully
 *
 * @param {object} assetSpecs
 * @return {object} type and payload
 */
export const loadAssetSpecsSuccess = assetSpecs => ({
  type: LOAD_ASSET_SPECS_SUCCESS,
  assetSpecs
});

/**
 * Load asset specs thunk
 *
 * @param {number} pageNumber
 * @return {(dispatch:any)=>Promise<TResult2|TResult1>}
 */
export const loadAssetSpecs = pageNumber =>
  (dispatch) => {
    dispatch({ type: LOAD_ASSET_SPECS_START });
    return axios.get(`asset-specs?page=${pageNumber}`)
      .then((response) => {
        dispatch(loadAssetSpecsSuccess(response.data));
      })
      .catch(() => dispatch({ type: LOAD_ASSET_SPECS_FAILURE }));
  };

export const createAssetSpec = assetSpec => (dispatch) => {
  dispatch(createAssetSpecRequest());

  return axios.post('asset-specs', assetSpec)
    .then((response) => {
      dispatch(createAssetSpecSuccess(response.data));
    })
    .catch((error) => {
      dispatch(createAssetSpecFailure(error));
    });
};

export const createAssetSpecRequest = () => ({
  type: CREATE_ASSET_SPECS_REQUEST
});

export const createAssetSpecSuccess = assetSpec => ({
  type: CREATE_ASSET_SPECS_SUCCESS,
  payload: assetSpec
});

export const createAssetSpecFailure = error => ({
  type: CREATE_ASSET_SPECS_FAILURE,
  payload: error
});
