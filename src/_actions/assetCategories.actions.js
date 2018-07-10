import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_ASSET_CATEGORIES_START,
  LOAD_ASSET_CATEGORIES_SUCCESS,
  LOAD_ASSET_CATEGORIES_FAILURE
} = constants;

/**
 * Load asset categories successfully
 *
 * @param {object} assetCategories
 * @return {object} type and payload
 */
export const loadAssetCategoriesSuccess = assetCategories => ({
  type: LOAD_ASSET_CATEGORIES_SUCCESS,
  assetCategories
});

/**
 * Asset categories thunk
 *
 * @return {(dispatch:any)=>Promise<TResult2|TResult1>}
 */
export const loadAssetCategories = pageNumber =>
  (dispatch) => {
    dispatch({ type: LOAD_ASSET_CATEGORIES_START });
    return axios.get(`asset-categories?page=${pageNumber}`)
      .then((response) => {
        dispatch(loadAssetCategoriesSuccess(response.data));
      })
      .catch(() => dispatch({ type: LOAD_ASSET_CATEGORIES_FAILURE }));
  };
