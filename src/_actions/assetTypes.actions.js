import axios from 'axios';
import constants from '../_constants';

const { LOAD_ASSET_TYPES_SUCCESS } = constants;

export const loadAssetTypes = () => {
  return ((dispatch) => {
    axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/types').then((response) => {
      dispatch({
        type: LOAD_ASSET_TYPES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  });
}
