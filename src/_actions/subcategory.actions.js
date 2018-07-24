import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  CREATE_SUBCATEGORY_SUCCESS,
  LOADING_SUBCATEGORIES,
  CREATE_SUBCATEGORY_FAILURE,
  DROPDOWN_SUBCATEGORIES_SUCCESS
} = constants;

/**
 * load SubCategory thunk
 *
 * @return dispatch type and payload
 */
export const loadSubCategories = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOADING_SUBCATEGORIES });
  return axios.get(`asset-sub-categories?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
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

export const dropdownSubCategoriesSuccess = subcategories => ({
  type: DROPDOWN_SUBCATEGORIES_SUCCESS, payload: subcategories
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

export const loadSubCategoriesDropdown = () => dispatch =>
  axios.get('asset-sub-categories/?paginate=false')
    .then((response) => {
      dispatch(dropdownSubCategoriesSuccess(response.data));
    }).catch((error) => {
      dispatch(loadSubCategoriesFailure(error));
      dispatch(updateToastMessageContent('Could Not Fetch The Sub-Categories',
        'error'));
    });
