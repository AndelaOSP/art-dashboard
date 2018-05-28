import axios from 'axios';
import constants from '../_constants';

const { LOAD_CATEGORIES_SUCCESS } = constants;

export const loadCategories = () => {
  return ((dispatch) => {
    axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/categories').then((response) => {
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  });
}
