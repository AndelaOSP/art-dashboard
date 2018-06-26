// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const {
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_TOAST_MESSAGE_CONTENT
} = constants;

/**
 * load Categories thunk
 *
 * @return dispatch type and payload
 */
export const loadCategories = () => (dispatch => axios.get('categories').then((response) => {
  dispatch(loadCategoriesSuccess(response.data));
}).catch(error => dispatch({
  type: LOAD_CATEGORY_FAILURE,
  payload: error,
})));

/**
 * load Categories Success action creator
 *
 * @param {array} categories list of asset categories
 *
 * @return {object} type and payload
 */
export const loadCategoriesSuccess = categories =>
  ({ type: LOAD_CATEGORIES_SUCCESS, payload: categories });

export const createCategory = newCategory => dispatch =>
  axios.post('categories', newCategory).then((response) => {
    dispatch(createCategorySuccess(response.data));
    dispatch(updateToastMessageContent('New Category Saved Successfully',
      'success'));
  }).catch((error) => {
    dispatch(createCategoryFailure(error));
    dispatch(updateToastMessageContent('Could Not Save The Category',
      'error'));
  });

export const createCategorySuccess = category => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: category
});
export const createCategoryFailure = error => ({
  type: CREATE_CATEGORY_FAILURE,
  payload: error
});
export const updateToastMessageContent = (message, type) => ({
  type: UPDATE_TOAST_MESSAGE_CONTENT,
  payload: {
    message,
    type
  }
});
