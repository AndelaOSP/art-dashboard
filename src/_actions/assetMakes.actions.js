import axios from 'axios';
import constants from '../_constants';

const { LOAD_ASSET_MAKES_SUCCESS } = constants;

export const loadAssetMakes = () => {
  return ((dispatch) => {
    axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/makes').then((response) => {
      dispatch({
        type: LOAD_ASSET_MAKES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  });
}
