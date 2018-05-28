import axios from 'axios';
import constants from '../_constants';

const { LOAD_ASSET_MODEL_NUMBERS } = constants;

export const loadModelNumbers = () => {
  return ((dispatch) => {
    axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers').then((response) => {
      dispatch({
        type: LOAD_ASSET_MODEL_NUMBERS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  });
}
