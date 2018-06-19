// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const { LOAD_CATEGORIES_SUCCESS } = constants;

/**
 * load Categories thunk
 *
 * @return dispatch type and payload
 */
export const loadCategories = () => {
  return ((dispatch) => {
    return axios.get('categories').then((response) => {
      dispatch(loadCategoriesSuccess(response.data));
    }).catch((error) => {
      console.log(error);
    });
  });
}

/**
 * load Categories Success action creator
 *
 * @param {array} categories list of asset categories
 *
 * @return {object} type and payload
 */
export const loadCategoriesSuccess = (categories) => {
  return { type: LOAD_CATEGORIES_SUCCESS, payload: categories };
}
