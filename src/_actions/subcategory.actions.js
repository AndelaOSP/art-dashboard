import axios from 'axios';
import constants from '../_constants';

const { LOAD_SUBCATEGORIES_SUCCESS } = constants;

export const loadSubCategories = () => {
  return ((dispatch) => {
    axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/subcategories').then((response) => {
      dispatch({
        type: LOAD_SUBCATEGORIES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  });
}
