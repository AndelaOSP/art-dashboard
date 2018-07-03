import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE
} = constants;

/**
 * load SubCategory thunk
 *
 * @return dispatch type and payload
 */
export const loadSubCategories = () => (dispatch =>
  axios.get('asset-sub-categories').then((response) => {
    dispatch(loadSubCategoriesSuccess(response.data));
  }).catch((error) => {
    dispatch(loadSubCategoriesFailure(error));
    dispatch(updateToastMessageContent('Could Not Fetch The Sub-Categories',
      'error'));
  })
);


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
