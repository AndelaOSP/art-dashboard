// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const {
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE
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
export const loadCategoriesSuccess = categories => ({
  type: LOAD_CATEGORIES_SUCCESS,
  payload: categories
});

export const createCategory = newCategory => dispatch => axios.post('categories', newCategory)
  .then(response => dispatch({
    type: CREATE_CATEGORY_SUCCESS,
    payload: response
  }))
  .catch(error => dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error }));

// export const createCategorySuccess = (category) => {
//   return { type: CREATE_CATEGORY_SUCCESS, payload: category};
// }
// export const createCategoryFailure = (error) => {
//   return { type: CREATE_CATEGORY_FAILURE, payload: error };
// }
