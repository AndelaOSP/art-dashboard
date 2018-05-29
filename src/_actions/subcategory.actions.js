import axios from 'axios';
import constants from '../_constants';

const { LOAD_SUBCATEGORIES_SUCCESS } = constants;

/**
 * load SubCategories thunk
 *
 * @return dispatch type and payload
 */
export const loadSubCategories = () => {
  return ((dispatch) => {
    return axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/subcategories').then((response) => {
      dispatch(loadSubCategoriesSuccess(response.data));
    }).catch((error) => {
      console.log(error);
    });
  });
}


/**
 * load Subcategories Success action creator
 *
 * @param {array} list of subcategories
 *
 * @return {object} type and payload
 */
export const loadSubCategoriesSuccess = (subcategories) => {
  return { type: LOAD_SUBCATEGORIES_SUCCESS, payload: subcategories };
}
