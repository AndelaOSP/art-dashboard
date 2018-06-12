// third-party libraries
import axios from 'axios';

// constants
import constants from '../_constants';

const {LOAD_ASSET_MODEL_NUMBERS ,CREATE_MODEL_NUMBER_SUCCESS,CREATE_MODEL_NUMBER_FAILURE} = constants;

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

/**
 * create new asset model number thunk
 * @param {object} newModel details of new model to be created
 *
*/

export const createModelNumbers = (newModel) => {
  return (dispatch) => {
    return axios.post('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/model_numbers', newModel)
    .then((response) => {
      return dispatch(createModelNumberSuccess(response.data));
    })
    .catch((error) => {
      return dispatch(createModelNumberFailure(error));
    });
  }
};

export const createModelNumberSuccess = (modelNumber) => {
  return { type: CREATE_MODEL_NUMBER_SUCCESS, payload: modelNumber };
}

export const createModelNumberFailure = (error) => {
  return { type: CREATE_MODEL_NUMBER_FAILURE, payload: error };
}
