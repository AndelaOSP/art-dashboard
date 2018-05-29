// third-party libraries
import axios from 'axios';

// constants
import constants from '../_constants';

const { LOAD_ASSET_MODEL_NUMBERS } = constants;

/**
 * load Model Numbers thunk
 *
 * @return dispatch
 */
export const loadModelNumbers = () => {
  return ((dispatch) => {
    return axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers').then((response) => {
      dispatch(loadModelNumbersSuccess(response.data));
    }).catch((error) => {
      console.log(error);
    });
  });
}

/**
 * load ModelNumbers Success action creator
 *
 * @param {array} modelNumbers list of fetched model numbers
 *
 * @return {object} type and payload
 */
export const loadModelNumbersSuccess = (modelNumbers) => {
  return { type: LOAD_ASSET_MODEL_NUMBERS, payload: modelNumbers };
}
