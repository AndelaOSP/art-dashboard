import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  CREATE_SUBCATEGORY_SUCCESS,
  LOADING_SUBCATEGORIES,
  CREATE_SUBCATEGORY_FAILURE
} = constants;

/**
 * load SubCategory thunk
 *
 * @return dispatch type and payload
 */
export const loadSubCategories = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_SUBCATEGORIES });
  return axios.get(`asset-sub-categories?page=${pageNumber}`).then((response) => {
    dispatch(loadSubCategoriesSuccess(response.data));
  }).catch((error) => {
    dispatch(loadSubCategoriesFailure(error));
    dispatch(updateToastMessageContent('Could Not Fetch The Sub-Categories',
      'error'));
  });
};

/**
 * load Subcategories Success action creator
 *
 * @param {array} list of subcategories
 *
 * @return {object} type and payload
 */
export const loadSubCategoriesSuccess = subcategories => ({
  type: LOAD_SUBCATEGORIES_SUCCESS, payload: subcategories
});

export const loadSubCategoriesFailure = error => ({
  type: LOAD_SUBCATEGORIES_FAILURE, payload: error
});

/**
 * add sub category thunk
 * @param {object} newSubCategory the sub-category to be created
 */
export const createSubCategory = newSubCategory => dispatch =>
  axios.post('asset-sub-categories', newSubCategory).then((response) => {
    dispatch(createSubCategorySuccess(response.data));
    dispatch(updateToastMessageContent('Sub-Category Saved Successfully',
      'success'));
  }).catch((error) => {
    dispatch(createSubCategoryFailure(error));
    dispatch(updateToastMessageContent('There Was An Error While Saving The Sub-Category',
      'error'));
  });

export const createSubCategorySuccess = modelNumber => ({
  type: CREATE_SUBCATEGORY_SUCCESS, payload: modelNumber
});

export const createSubCategoryFailure = error => ({
  type: CREATE_SUBCATEGORY_FAILURE, payload: error
});

export const loadSubCategoriesDropdown = pageNumber => dispatch => (
  axios.get(`asset-sub-categories?page=${pageNumber}`).then((response) => {
    const pageLimit = Math.ceil(response.data.count / 10);
    if (pageLimit > 1) {
      dispatch(loadSubCategoriesSuccess(response.data));
      while (pageNumber < pageLimit) {
        pageNumber += 1;
        if (response.data.next !== '') {
          axios.get(`asset-sub-categories?page=${pageNumber}`).then((newResponse) => {
            dispatch(loadSubCategoriesSuccess(newResponse.data));
          }).catch((error) => {
            dispatch(loadSubCategoriesFailure(error));
            dispatch(updateToastMessageContent('Could Not Fetch The Sub-Categories',
              'error'));
          });
        }
      }
    } else {
      dispatch(loadSubCategoriesSuccess(response.data));
    }
  }).catch((error) => {
    dispatch(loadSubCategoriesFailure(error));
    dispatch(updateToastMessageContent('Could Not Fetch The Sub-Categories',
      'error'));
  })
);
